"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FaGlobe, FaGithub, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import PixelTransition from "./animations/PixelTransition";

interface ProjectData {
  id: number;
  title: string;
  category: string;
  image: string;
  images?: string[];
  description: string;
  tags: string[];
  websiteUrl: string;
  githubUrl: string;
}

interface ProjectsData {
  sectionTitle: string;
  sectionDescription: string;
  projects: ProjectData[];
}

export function Projects() {
  const [projectsData, setProjectsData] = useState<ProjectsData>({
    sectionTitle: "Featured Projects",
    sectionDescription: "A selection of my most notable web development projects across various technologies and domains.",
    projects: [
      {
        id: 1,
        title: "Project Title",
        category: "web",
        image: "/images/projects/project1-main.jpg",
        images: [
          "/images/projects/project1-main.jpg",
          "/images/projects/project1-detail1.jpg",
          "/images/projects/project1-detail2.jpg"
        ],
        description: "Project description text...",
        tags: ["React", "Next.js", "Tailwind CSS"],
        websiteUrl: "https://example.com",
        githubUrl: "https://github.com/username/repo"
      }
    ]
  });

  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchProjectsData = async () => {
      try {
        const response = await fetch('/api/projects');
        if (response.ok) {
          const data = await response.json();
          if (data) {
            setProjectsData(data);
          }
        }
      } catch (error) {
        console.error('Failed to fetch projects data:', error);
      }
    };

    fetchProjectsData();
  }, []);

  const openProject = (project: ProjectData) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };

  const closeProject = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (!selectedProject || !selectedProject.images) return;
    setCurrentImageIndex((prev) =>
      prev === selectedProject.images!.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    if (!selectedProject || !selectedProject.images) return;
    setCurrentImageIndex((prev) =>
      prev === 0 ? selectedProject.images!.length - 1 : prev - 1
    );
  };

  const getProjectImages = (project: ProjectData | null) => {
    if (!project) return [];

    // If project has images array, use it; otherwise, use the main image
    if (project.images && project.images.length > 0) {
      return project.images;
    }

    return [project.image];
  };

  return (
    <section id="projects" className="min-h-screen flex items-center py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">{projectsData.sectionTitle}</h2>
          <div className="mt-2 h-1 w-20 bg-gray-400 mx-auto"></div>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            {projectsData.sectionDescription}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsData.projects.map((project) => (
            <Card
              key={project.id}
              className="overflow-hidden border-none transition-all bg-black text-white"
            >
              <div onClick={() => openProject(project)} className="relative w-full cursor-pointer">
                {/* Fallback image for small screens */}
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="block lg:hidden w-full h-auto object-cover rounded-[15px] border-none"
                  style={{ aspectRatio: "16/9" }}
                />
                {/* PixelTransition for large screens */}
                <div className="hidden lg:block">
                  <PixelTransition
                    firstContent={
                      <img
                        className="border-none rounded-[15px]"
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    }
                    secondContent={
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "grid",
                          placeItems: "center",
                          backgroundColor: "#111",
                        }}
                      >
                        <p style={{ fontWeight: 900, fontSize: "1.5rem", color: "#ffffff", textAlign: "center" }}>
                          {project.title}
                        </p>
                      </div>
                    }
                    gridSize={12}
                    pixelColor="#ffffff"
                    animationStepDuration={0.4}
                    className="custom-pixel-card"
                    aspectRatio="56.25%" // 16:9 aspect ratio
                  />
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold">{project.title}</h3>
                <p className="text-sm text-gray-400 mt-1">{project.description}</p>
                <div className="flex flex-wrap gap-1 mt-3">
                  {project.tags.slice(0, 2).map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs bg-gray-300">
                      {tag}
                    </Badge>
                  ))}
                  {project.tags.length > 2 && (
                    <Badge variant="outline" className="text-xs border-gray-400 text-gray-400">
                      +{project.tags.length - 2}
                    </Badge>
                  )}
                </div>
                <div className="flex justify-between mt-4">
                  <div className="flex space-x-2">
                    <a href={project.websiteUrl} target="_blank" rel="noopener noreferrer">
                      <FaGlobe className="h-5 w-5 text-gray-400 hover:text-white" />
                    </a>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <FaGithub className="h-5 w-5 text-gray-400 hover:text-white" />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {selectedProject && (
        <Dialog open={!!selectedProject} onOpenChange={closeProject}>
          <DialogContent className="sm:max-w-3xl bg-black text-white">
            <DialogHeader>
              <DialogTitle>{selectedProject.title}</DialogTitle>
              <DialogDescription>
                {selectedProject.category.charAt(0).toUpperCase() + selectedProject.category.slice(1)} Project
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 mt-4">
              {/* Image gallery with navigation */}
              <div className="relative">
                <div className="w-full h-64 md:h-96 relative overflow-hidden rounded-md">
                  <img
                    src={getProjectImages(selectedProject)[currentImageIndex] || "/placeholder.svg"}
                    alt={`${selectedProject.title} - Image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>

                {getProjectImages(selectedProject).length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                      aria-label="Previous image"
                    >
                      <FaChevronLeft />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                      aria-label="Next image"
                    >
                      <FaChevronRight />
                    </button>

                    {/* Image indicators */}
                    <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2">
                      {getProjectImages(selectedProject).map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-2 h-2 rounded-full ${index === currentImageIndex ? "bg-white" : "bg-gray-500"
                            }`}
                          aria-label={`Go to image ${index + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              <p>{selectedProject.description}</p>
              <div className="flex flex-wrap gap-2">
                {selectedProject.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="bg-gray-300">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex justify-between mt-4">
                <div className="flex space-x-2">
                  <a href={selectedProject.websiteUrl} target="_blank" rel="noopener noreferrer">
                    <FaGlobe className="h-5 w-5 text-gray-400 hover:text-white" />
                  </a>
                  <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer">
                    <FaGithub className="h-5 w-5 text-gray-400 hover:text-white" />
                  </a>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
}

export default Projects;
