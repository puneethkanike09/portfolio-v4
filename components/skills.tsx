import { Card, CardContent } from "@/components/ui/card";
import { Code, Database, Globe, Layers, Terminal, FileCode, Palette, Monitor } from "lucide-react";
import SpotlightCard from "./animations/SpotlightCard";

export function Skills() {
  const skills = [
    {
      icon: <Code className="h-10 w-10 text-primary" aria-label="JavaScript Icon" />,
      title: "JavaScript (ES6+)",
      description: "Proficient in modern JavaScript development, including ES6+ features.",
    },
    {
      icon: <Globe className="h-10 w-10 text-primary" aria-label="Next.js Icon" />,
      title: "Next.js",
      description: "Experienced in building server-side rendered React applications with Next.js.",
    },
    {
      icon: <Layers className="h-10 w-10 text-primary" aria-label="React Icon" />,
      title: "React",
      description: "Skilled in creating dynamic and interactive user interfaces with React.",
    },
    {
      icon: <Terminal className="h-10 w-10 text-primary" aria-label="Node.js Icon" />,
      title: "Node.js",
      description: "Experience with server-side development using Node.js.",
    },
    {
      icon: <FileCode className="h-10 w-10 text-primary" aria-label="TypeScript Icon" />,
      title: "TypeScript",
      description: "Proficient in using TypeScript for statically typed JavaScript development.",
    },
    {
      icon: <Monitor className="h-10 w-10 text-primary" aria-label="Angular Icon" />,
      title: "Angular",
      description: "Experienced in building robust web applications using the Angular framework.",
    },
    {
      icon: <Database className="h-10 w-10 text-primary" aria-label="MongoDB Icon" />,
      title: "MongoDB",
      description: "Skilled in designing and managing NoSQL databases with MongoDB.",
    },
    {
      icon: <Palette className="h-10 w-10 text-primary" aria-label="Tailwind CSS Icon" />,
      title: "Tailwind CSS",
      description: "Proficient in using Tailwind CSS for utility-first CSS styling.",
    },
  ];

  return (
    <section id="skills" className="xl:min-h-screen flex items-center py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">My Skills</h2>
          <div className="mt-2 h-1 w-20 bg-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            With expertise in various web development technologies, I bring a comprehensive approach to every project.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <SpotlightCard
              key={index}
              className="custom-spotlight-card"
              spotlightColor="white"
            >
              <Card className="border-none shadow-md hover:shadow-lg transition-shadow h-full">
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <div className="mx-auto">{skill.icon}</div>
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
