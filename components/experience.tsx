"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export function Experience() {
  const experiences = [
    {
      period: "2018 - Present",
      title: "Principal Designer",
      company: "Interior Studio NYC",
      description:
        "Leading a team of designers on high-end residential and commercial projects. Responsible for client relations, concept development, and project management.",
      tags: ["Residential", "Commercial", "Team Leadership"],
    },
    {
      period: "2015 - 2018",
      title: "Senior Interior Designer",
      company: "Modern Spaces Design",
      description:
        "Managed multiple residential projects from concept to completion. Collaborated with architects and contractors to ensure design integrity throughout the construction process.",
      tags: ["Residential", "Project Management", "Client Relations"],
    },
    {
      period: "2012 - 2015",
      title: "Interior Designer",
      company: "Urban Living Interiors",
      description:
        "Designed residential spaces with a focus on urban apartments and lofts. Created detailed design presentations and material specifications.",
      tags: ["Urban Spaces", "Space Planning", "Material Selection"],
    },
    {
      period: "2010 - 2012",
      title: "Junior Designer",
      company: "Elite Design Associates",
      description:
        "Assisted senior designers with project research, material sourcing, and client presentations. Developed CAD drawings and 3D visualizations.",
      tags: ["CAD", "3D Visualization", "Research"],
    },
  ];

  const cardVariants = {
    hidden: (index: number) => ({
      opacity: 0,
      rotateY: index % 2 === 0 ? -90 : 90,
      x: index % 2 === 0 ? 200 : -200,
    }),
    visible: {
      opacity: 1,
      rotateY: 0,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.8,
      },
    },
  };

  return (
    <section id="experience" className="py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Professional Experience</h2>
          <div className="mt-2 h-1 w-20 bg-gray-400 mx-auto"></div>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            My career journey in the world of interior design.
          </p>
        </div>

        {/* Mobile Layout (below md) */}
        <div className="space-y-6 max-w-4xl mx-auto md:hidden">
          {experiences.map((exp, index) => (
            <Card key={index} className="border-l-4 border-l-gray-500 bg-black text-white">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">{exp.title}</h3>
                    <p className="text-gray-400">{exp.company}</p>
                  </div>
                  <Badge variant="outline" className="w-fit border-gray-500 text-gray-400">
                    {exp.period}
                  </Badge>
                </div>
                <p className="mb-4 text-gray-400">{exp.description}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="secondary" className="bg-gray-300 text-black">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Desktop Layout (md and above) */}
        <div className="hidden md:block relative max-w-4xl mx-auto px-4">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 transform -translate-x-1/2"></div>

          {experiences.map((exp, index) => {
            const controls = useAnimation();
            const [ref, inView] = useInView({
              triggerOnce: true,
              threshold: 0.5, // Increased from 0.2 to 0.5 (50% of card must be visible)
              rootMargin: "-50px 0px", // Delays trigger until card is 50px closer to viewport
            });

            useEffect(() => {
              if (inView) {
                controls.start("visible");
              }
            }, [controls, inView]);

            return (
              <div
                key={index}
                className={`relative mb-12 last:mb-0 flex items-center ${index % 2 === 0 ? "flex-row-reverse" : "flex-row"
                  }`}
              >
                {/* Centered dot */}
                <div className="absolute left-1/2 top-1/2 w-3 h-3 rounded-full bg-white z-10 transform -translate-x-1/2 -translate-y-1/2"></div>

                <motion.div
                  ref={ref}
                  custom={index}
                  initial="hidden"
                  animate={controls}
                  variants={cardVariants}
                  className="w-[calc(50%-2rem)] mx-4"
                >
                  <Card className="border-l-4 border-l-gray-500 bg-black text-white">
                    <CardContent className="p-6">
                      <div className="flex flex-row items-center justify-between gap-4 mb-4">
                        <div>
                          <h3 className="text-xl font-semibold">{exp.title}</h3>
                          <p className="text-gray-400">{exp.company}</p>
                        </div>
                        <Badge variant="outline" className="w-fit shrink-0 border-gray-500 text-gray-400">
                          {exp.period}
                        </Badge>
                      </div>
                      <p className="mb-4 text-gray-400">{exp.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {exp.tags.map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="secondary" className="bg-gray-300 text-black">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}