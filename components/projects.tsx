"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FaGlobe, FaGithub } from "react-icons/fa";
import PixelTransition from "./animations/PixelTransition";
import { projects } from "@/data/projects/projects";

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<{
    id: number;
    title: string;
    category: string;
    image: string;
    description: string;
    tags: string[];
    websiteUrl: string;
    githubUrl: string;
  } | null>(null);

  const openProject = (project: {
    id: number;
    title: string;
    category: string;
    image: string;
    description: string;
    tags: string[];
    websiteUrl: string;
    githubUrl: string;
  }) => {
    setSelectedProject(project);
  };

  const closeProject = () => {
    setSelectedProject(null);
  };

  return (
    <section id="projects" className="min-h-screen flex items-center py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Featured Projects</h2>
          <div className="mt-2 h-1 w-20 bg-gray-400 mx-auto"></div>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            A selection of my most notable web development projects across various technologies and domains.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
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
