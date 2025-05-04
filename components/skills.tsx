"use client"

import { Card, CardContent } from "@/components/ui/card";
import { Code, Database, Globe, Layers, Terminal, FileCode, Palette, Monitor } from "lucide-react";
import SpotlightCard from "./animations/SpotlightCard";
import { useEffect, useState } from "react";

interface SkillData {
  title: string;
  description: string;
  iconType: string;
}

export function Skills() {
  const [skillsData, setSkillsData] = useState<SkillData[]>([
    {
      iconType: "Code",
      title: "JavaScript (ES6+)",
      description: "Proficient in modern JavaScript development, including ES6+ features.",
    },
    {
      iconType: "Globe",
      title: "Next.js",
      description: "Experienced in building server-side rendered React applications with Next.js.",
    },
    {
      iconType: "Layers",
      title: "React",
      description: "Skilled in creating dynamic and interactive user interfaces with React.",
    },
    {
      iconType: "Terminal",
      title: "Node.js",
      description: "Experience with server-side development using Node.js.",
    },
    {
      iconType: "FileCode",
      title: "TypeScript",
      description: "Proficient in using TypeScript for statically typed JavaScript development.",
    },
    {
      iconType: "Monitor",
      title: "Angular",
      description: "Experienced in building robust web applications using the Angular framework.",
    },
    {
      iconType: "Database",
      title: "MongoDB",
      description: "Skilled in designing and managing NoSQL databases with MongoDB.",
    },
    {
      iconType: "Palette",
      title: "Tailwind CSS",
      description: "Proficient in using Tailwind CSS for utility-first CSS styling.",
    },
  ]);

  const [sectionTitle, setSectionTitle] = useState("My Skills");
  const [sectionDescription, setSectionDescription] = useState(
    "With expertise in various web development technologies, I bring a comprehensive approach to every project."
  );

  useEffect(() => {
    const fetchSkillsData = async () => {
      try {
        const response = await fetch('/api/skills');
        if (response.ok) {
          const data = await response.json();
          if (data.skills) setSkillsData(data.skills);
          if (data.sectionTitle) setSectionTitle(data.sectionTitle);
          if (data.sectionDescription) setSectionDescription(data.sectionDescription);
        }
      } catch (error) {
        console.error('Failed to fetch skills data:', error);
      }
    };

    fetchSkillsData();
  }, []);

  // Function to render the appropriate icon based on iconType
  const renderIcon = (iconType: string) => {
    switch (iconType) {
      case "Code":
        return <Code className="h-10 w-10 text-primary" aria-label="JavaScript Icon" />;
      case "Globe":
        return <Globe className="h-10 w-10 text-primary" aria-label="Next.js Icon" />;
      case "Layers":
        return <Layers className="h-10 w-10 text-primary" aria-label="React Icon" />;
      case "Terminal":
        return <Terminal className="h-10 w-10 text-primary" aria-label="Node.js Icon" />;
      case "FileCode":
        return <FileCode className="h-10 w-10 text-primary" aria-label="TypeScript Icon" />;
      case "Monitor":
        return <Monitor className="h-10 w-10 text-primary" aria-label="Angular Icon" />;
      case "Database":
        return <Database className="h-10 w-10 text-primary" aria-label="MongoDB Icon" />;
      case "Palette":
        return <Palette className="h-10 w-10 text-primary" aria-label="Tailwind CSS Icon" />;
      default:
        return <Code className="h-10 w-10 text-primary" aria-label="Skill Icon" />;
    }
  };

  return (
    <section id="skills" className="xl:min-h-screen flex items-center py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">{sectionTitle}</h2>
          <div className="mt-2 h-1 w-20 bg-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            {sectionDescription}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillsData.map((skill, index) => (
            <SpotlightCard
              key={index}
              className="custom-spotlight-card"
              spotlightColor="white"
            >
              <Card className="border-none shadow-md hover:shadow-lg transition-shadow h-full">
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <div className="mx-auto">{renderIcon(skill.iconType)}</div>
                    <h3 className="font-semibold text-lg">{skill.title}</h3>
                    <p className="text-sm text-muted-foreground">{skill.description}</p>
                  </div>
                </CardContent>
              </Card>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
