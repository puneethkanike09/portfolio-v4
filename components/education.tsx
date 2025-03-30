import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap, Award, BookOpen } from "lucide-react"
import SpotlightCard from "./animations/SpotlightCard"

export function Education() {
  const education = [
    {
      icon: <GraduationCap className="h-10 w-10 text-primary" />,
      degree: "Master of Fine Arts in Interior Design",
      institution: "Parsons School of Design",
      year: "2010",
      description: "Specialized in sustainable design practices and innovative space planning solutions.",
    },
    {
      icon: <GraduationCap className="h-10 w-10 text-primary" />,
      degree: "Bachelor of Arts in Architecture",
      institution: "Rhode Island School of Design",
      year: "2008",
      description: "Foundation in architectural principles with a focus on residential design.",
    },
    {
      icon: <Award className="h-10 w-10 text-primary" />,
      degree: "Certificate in Sustainable Design",
      institution: "Green Design Institute",
      year: "2012",
      description: "Advanced training in eco-friendly materials and energy-efficient design strategies.",
    },
    {
      icon: <BookOpen className="h-10 w-10 text-primary" />,
      degree: "Professional Certification in Lighting Design",
      institution: "International Association of Lighting Designers",
      year: "2014",
      description: "Specialized training in residential and commercial lighting solutions.",
    },
  ]

  return (
    <section id="education" className="xl:min-h-screen flex items-center py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Education & Certifications</h2>
          <div className="mt-2 h-1 w-20 bg-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            My academic background and professional certifications in design.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {education.map((item, index) => (
            <SpotlightCard
              key={index}
              className="custom-spotlight-card"
              spotlightColor="rgba(128, 128, 128, 0.5)" // Changed from black to medium gray
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
  )
}