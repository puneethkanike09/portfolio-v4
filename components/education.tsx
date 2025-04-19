import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Award, BookOpen } from "lucide-react";
import SpotlightCard from "./animations/SpotlightCard";

export function Education() {
  const education = [
    {
      icon: <GraduationCap className="h-10 w-10 text-primary" />,
      degree: "MCA (Master of Computer Applications)",
      institution: "St Joseph Engineering College, Mangaluru",
      year: "Feb 2023 - Aug 2024",
      description: "Specialized in advanced computer applications with a CGPA of 8.57.",
    },
    {
      icon: <GraduationCap className="h-10 w-10 text-primary" />,
      degree: "BCA (Bachelor of Computer Applications)",
      institution: "SDM Degree College, Ujire",
      year: "Jan 2020 - Sep 2022",
      description: "Foundation in computer applications with a CGPA of 7.15.",
    },
  ];

  return (
    <section id="education" className="xl:min-h-screen flex items-center py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Education</h2>
          <div className="mt-2 h-1 w-20 bg-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            My academic background in computer applications.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {education.map((item, index) => (
            <SpotlightCard
              key={index}
              className="custom-spotlight-card"
              spotlightColor="white" // Changed from black to medium gray
            >
              <Card className="border-none shadow-md hover:shadow-lg transition-shadow h-full">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="mt-1">{item.icon}</div>
                    <div>
                      <h3 className="text-xl font-semibold">{item.degree}</h3>
                      <p className="text-muted-foreground">
                        {item.institution}, {item.year}
                      </p>
                      <p className="mt-2">{item.description}</p>
                    </div>
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
