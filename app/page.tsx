"use client"
import { ContactForm } from "@/components/contact-form"
import { Education } from "@/components/education"
import { Experience } from "@/components/experience"
import { Footer } from "@/components/footer"
import { Hero } from "@/components/hero"
import { Sidebar } from "@/components/sidebar"
import { Projects } from "@/components/projects"
import { Skills } from "@/components/skills"
import { About } from "@/components/about"
import { Preloader } from "@/components/preloader"
import { SmoothCursor } from "@/components/animations/smooth-cursor"


export default function Home() {

  return (
    <div className="min-h-screen bg-background">
      <SmoothCursor />
      <Preloader />
      <Sidebar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Education />
        <Projects />
        <ContactForm />
      </main>
      <Footer />
    </div>
  )
}

