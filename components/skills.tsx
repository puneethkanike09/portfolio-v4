import { Card, CardContent } from "@/components/ui/card"
import { Brush, Lightbulb, Ruler, Palette, Home, Building2, Sofa, Lamp } from "lucide-react"
import SpotlightCard from "./animations/SpotlightCard"

export function Skills() {
  const skills = [
    {
      icon: <Brush className="h-10 w-10 text-primary" />,
      title: "Interior Styling",
      description: "Expert arrangement of furniture, accessories, and decor to create cohesive, beautiful spaces.",
    },
    {
      icon: <Lightbulb className="h-10 w-10 text-primary" />,
      title: "Lighting Design",
      description: "Strategic lighting plans that enhance ambiance, functionality, and aesthetic appeal.",
    },
    {
      icon: <Ruler className="h-10 w-10 text-primary" />,
      title: "Space Planning",
      description: "Optimizing layout and flow to maximize functionality and comfort in any space.",
    },
    {
      icon: <Palette className="h-10 w-10 text-primary" />,
      title: "Color Consultation",
      description: "Expert color selection to create the desired mood and complement existing elements.",
    },
    {
      icon: <Home className="h-10 w-10 text-primary" />,
      title: "Residential Design",
      description: "Creating beautiful, functional homes that reflect the personality and lifestyle of their owners.",
    },
    {
      icon: <Building2 className="h-10 w-10 text-primary" />,
      title: "Commercial Design",
      description: "Functional, brand-aligned spaces for businesses that enhance productivity and customer experience.",
    },
    {
      icon: <Sofa className="h-10 w-10 text-primary" />,
      title: "Furniture Selection",
      description: "Sourcing and selecting the perfect pieces to complement your space and meet your needs.",
    },
    {
      icon: <Lamp className="h-10 w-10 text-primary" />,
      title: "Accessory Curation",
      description: "Selecting the finishing touches that bring personality and cohesion to your space.",
    },
  ]

  return (
    <section id="skills" className="xl:min-h-screen flex items-center py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">My Skills</h2>
          <div className="mt-2 h-1 w-20 bg-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            With expertise across various aspects of interior design, I bring a comprehensive approach to every project.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <SpotlightCard
              key={index}
              className="custom-spotlight-card"
              spotlightColor="rgba(128, 128, 128, 0.5)"
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
  )
}