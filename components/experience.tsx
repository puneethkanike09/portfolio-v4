"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export function Experience() {
  const experiences = [
    {
      period: "Jan 2025 - Present",
      title: "Software Engineer",
      company: "The Web People",
      description:
        "Developing and maintaining web applications using modern technologies. Collaborating with cross-functional teams to deliver high-quality products.",
      tags: ["Web Development", "Team Collaboration", "Project Management"],
    },
    {
      period: "Jun 2024 - Aug 2024",
      title: "MERN Developer Intern",
      company: "Codelab Systems",
      description:
        "Assisted in developing full-stack applications using the MERN stack. Contributed to code reviews and participated in agile development processes.",
      tags: ["MERN Stack", "Full-Stack Development", "Agile Methodologies"],
    },
    {
      period: "May 2024 - Jun 2024",
      title: "React Developer Intern",
      company: "RDL Technologies",
      description:
        "Worked on building user interfaces using React.js. Collaborated with designers to implement responsive and interactive web components.",
      tags: ["React.js", "UI Development", "Responsive Design"],
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
            My career journey in the world of web development.
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
