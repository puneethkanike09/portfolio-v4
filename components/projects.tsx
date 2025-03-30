"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PixelTransition from "./animations/PixelTransition";

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<{
    id: number;
    title: string;
    category: string;
    images: string[];
    description: string;
    tags: string[];
  } | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [filter, setFilter] = useState("all");

  const projects = [
    {
      id: 1,
      title: "Modern Minimalist Apartment",
      category: "residential",
      images: [
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800&text=Image2",
        "/placeholder.svg?height=600&width=800&text=Image3",
      ],
      description: "A clean, minimalist design for a city apartment that maximizes space and light.",
      tags: ["Minimalist", "Urban", "Space Optimization"],
    },
    {
      id: 2,
      title: "Luxury Penthouse Redesign",
      category: "residential",
      images: [
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800&text=Image2",
      ],
      description: "Complete renovation of a penthouse with panoramic city views and custom furniture.",
      tags: ["Luxury", "Custom Furniture", "Open Concept"],
    },
    {
      id: 3,
      title: "Boutique Hotel Lobby",
      category: "commercial",
      images: [
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800&text=Image2",
        "/placeholder.svg?height=600&width=800&text=Image3",
      ],
      description: "A welcoming yet sophisticated lobby design for a boutique hotel in downtown.",
      tags: ["Hospitality", "Statement Lighting", "Custom Millwork"],
    },
    {
      id: 4,
      title: "Tech Startup Office",
      category: "commercial",
      images: ["/placeholder.svg?height=600&width=800"],
      description: "Dynamic, flexible workspace designed to foster creativity and collaboration.",
      tags: ["Workspace", "Collaborative", "Flexible Layout"],
    },
    {
      id: 5,
      title: "Coastal Beach House",
      category: "residential",
      images: [
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800&text=Image2",
        "/placeholder.svg?height=600&width=800&text=Image3",
      ],
      description: "Serene beach house with natural materials and a seamless indoor-outdoor flow.",
      tags: ["Coastal", "Natural Materials", "Indoor-Outdoor"],
    },
    {
      id: 6,
      title: "Fine Dining Restaurant",
      category: "commercial",
      images: [
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800&text=Image2",
      ],
      description: "Elegant restaurant interior with custom lighting and intimate seating arrangements.",
      tags: ["Restaurant", "Ambient Lighting", "Custom Seating"],
    },
    {
      id: 7,
      title: "Urban Loft Conversion",
      category: "residential",
      images: [
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800&text=Image2",
      ],
      description: "Transformed an old warehouse into a modern loft with industrial charm.",
      tags: ["Industrial", "Loft", "Modern"],
    },
    {
      id: 8,
      title: "Eco-Friendly Cafe",
      category: "commercial",
      images: [
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800&text=Image2",
        "/placeholder.svg?height=600&width=800&text=Image3",
      ],
      description: "Sustainable cafe design using recycled materials and energy-efficient lighting.",
      tags: ["Sustainable", "Eco-Friendly", "Modern"],
    },
    {
      id: 9,
      title: "Mountain Retreat Cabin",
      category: "residential",
      images: [
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800&text=Image2",
      ],
      description: "Cozy cabin in the mountains with rustic elements and modern amenities.",
      tags: ["Rustic", "Cozy", "Mountain"],
    },
    {
      id: 10,
      title: "Retail Store Makeover",
      category: "commercial",
      images: [
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800&text=Image2",
      ],
      description: "Revamped a retail space to create an inviting shopping experience.",
      tags: ["Retail", "Modern", "Inviting"],
    },
  ];

  const filteredProjects = filter === "all" ? projects : projects.filter((project) => project.category === filter);

  const openProject = (project: {
    id: number;
    title: string;
    category: string;
    images: string[];
    description: string;
    tags: string[];
  }) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };

  const closeProject = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedProject && currentImageIndex < selectedProject.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const prevImage = () => {
    if (selectedProject && currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  return (
    <section id="projects" className="min-h-screen flex items-center py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Featured Projects</h2>
          <div className="mt-2 h-1 w-20 bg-gray-400 mx-auto"></div>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            A selection of my most notable interior design projects across various styles and spaces.
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
              className={`
        ${filter === "all"
                  ? "bg-white text-black"
                  : "bg-black text-white border-white"} 
        hover:bg-white hover:text-black transition-colors
      `}
            >
              All Projects
            </Button>
            <Button
              variant={filter === "residential" ? "default" : "outline"}
              onClick={() => setFilter("residential")}
              className={`
        ${filter === "residential"
                  ? "bg-white text-black"
                  : "bg-black text-white border-white"} 
        hover:bg-white hover:text-black transition-colors
      `}
            >
              Residential
            </Button>
            <Button
              variant={filter === "commercial" ? "default" : "outline"}
              onClick={() => setFilter("commercial")}
              className={`
        ${filter === "commercial"
                  ? "bg-white text-black"
                  : "bg-black text-white border-white"} 
        hover:bg-white hover:text-black transition-colors
      `}
            >
              Commercial
            </Button>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className="overflow-hidden border-none transition-all cursor-pointer bg-black text-white"
              onClick={() => openProject(project)}
            >
              <div className="relative w-full">
                {/* Fallback image for small screens */}
                <img
                  src={project.images[0] || "/placeholder.svg"}
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
                        src={project.images[0] || "/placeholder.svg"}
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
            <div className="relative h-[300px] sm:h-[400px] w-full mt-4">
              <Image
                src={selectedProject.images[currentImageIndex] || "/placeholder.svg"}
                alt={`${selectedProject.title} - Image ${currentImageIndex + 1}`}
                fill
                className="object-cover rounded-md"
              />
              {selectedProject.images.length > 1 && (
                <>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-400"
                    onClick={prevImage}
                    disabled={currentImageIndex === 0}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-400"
                    onClick={nextImage}
                    disabled={currentImageIndex === selectedProject.images.length - 1}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
                    {selectedProject.images.map((_, index) => (
                      <div
                        key={index}
                        className={`h-2 w-2 rounded-full ${index === currentImageIndex ? "bg-white" : "bg-white/50"}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
            <div className="space-y-4">
              <p>{selectedProject.description}</p>
              <div className="flex flex-wrap gap-2">
                {selectedProject.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="bg-gray-300">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
}

export default Projects;
