'use client';

import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Award, BookOpen } from "lucide-react";
import SpotlightCard from "./animations/SpotlightCard";
import { useEffect, useState } from "react";

interface EducationItem {
  icon: string;
  degree: string;
  institution: string;
  year: string;
  description: string;
}

interface EducationData {
  sectionTitle: string;
  sectionDescription: string;
  education: EducationItem[];
}

const iconMap = {
  GraduationCap,
  Award,
  BookOpen
};

export function Education() {
  const [educationData, setEducationData] = useState<EducationData>({
    sectionTitle: "Education",
    sectionDescription: "My academic background in computer applications.",
    education: []
  });

  useEffect(() => {
    const fetchEducationData = async () => {
      try {
        const response = await fetch('/api/education');
        if (response.ok) {
          const data = await response.json();
          setEducationData(data);
        }
      } catch (error) {
        console.error('Failed to fetch education data:', error);
      }
    };

    fetchEducationData();
  }, []);

  const getIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName as keyof typeof iconMap];
    return <IconComponent className="h-10 w-10 text-primary" />;
  };

  return (
    <section id="education" className="xl:min-h-screen flex items-center py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">{educationData.sectionTitle}</h2>
          <div className="mt-2 h-1 w-20 bg-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            {educationData.sectionDescription}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {educationData.education.map((item, index) => (
            <SpotlightCard
              key={index}
              className="custom-spotlight-card"
              spotlightColor="white"
            >
              <Card className="border-none shadow-md hover:shadow-lg transition-shadow h-full">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="mt-1">{getIcon(item.icon)}</div>
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
