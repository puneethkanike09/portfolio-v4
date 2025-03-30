"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import TrueFocus from "./animations/TrueFocus"

export function Hero() {
  const mainPhrase = "I build things for the Web"

  return (
    <section id="home" className="relative xl:min-h-screen flex items-center">
      <div className="absolute inset-0 z-0">
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="Code background"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 py-20">
        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl font-bold leading-tight">
              <TrueFocus
                sentence="Puneeth K"
                blurAmount={5}
                borderColor="black"
                animationDuration={2}
                pauseBetweenAnimations={1}
              />
            </h1>
            <div className="h-8 md:h-10">
              <p className="text-lg md:text-xl text-primary font-medium">
                {mainPhrase}
              </p>
            </div>
            <p className="text-lg text-muted-foreground max-w-md">
              I specialize in building responsive and dynamic web applications using the MERN stack. I bring ideas to life through code.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <a href="#projects">View Projects</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#contact">Get in Touch</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="/files/puneethResume.pdf" download>
                  Resume
                </a>
              </Button>
            </div>
          </div>

          {/* VS Code style editor */}
          {/* VS Code style editor */}
          <div className="relative h-[400px] rounded-lg overflow-hidden hidden lg:block bg-[#000000] font-mono">
            <div className="flex items-center gap-2 p-2 bg-[#181818]">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
              <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
            </div>
            <div className="p-4 text-sm text-gray-300 h-[calc(100%-36px)] overflow-y-auto custom-scrollbar">
              <div className="flex">
                <div className="select-none text-gray-500 pr-4 text-right min-w-[40px]">
                  {Array.from({ length: 32 }, (_, i) => (
                    <div key={i}>{i + 1}</div>
                  ))}
                </div>
                <pre className="whitespace-pre-wrap">
                  <span className="text-green-400">"use client"</span>
                  <br />
                  <br />
                  <span className="text-blue-400">import</span> {'{ SmoothCursor }'} <span className="text-blue-400">from</span> "@/components/animations/smooth-cursor"
                  <br />
                  <span className="text-blue-400">import</span> {'{ Preloader }'} <span className="text-blue-400">from</span> "@/components/preloader"
                  <br />
                  <span className="text-blue-400">import</span> {'{ Sidebar }'} <span className="text-blue-400">from</span> "@/components/sidebar"
                  <br />
                  <span className="text-blue-400">import</span> {'{ Hero }'} <span className="text-blue-400">from</span> "@/components/hero"
                  <br />
                  <span className="text-blue-400">import</span> {'{ About }'} <span className="text-blue-400">from</span> "@/components/about"
                  <br />
                  <span className="text-blue-400">import</span> {'{ Skills }'} <span className="text-blue-400">from</span> "@/components/skills"
                  <br />
                  <span className="text-blue-400">import</span> {'{ Experience }'} <span className="text-blue-400">from</span> "@/components/experience"
                  <br />
                  <span className="text-blue-400">import</span> {'{ Education }'} <span className="text-blue-400">from</span> "@/components/education"
                  <br />
                  <span className="text-blue-400">import</span> {'{ Projects }'} <span className="text-blue-400">from</span> "@/components/projects"
                  <br />
                  <span className="text-blue-400">import</span> {'{ ContactForm }'} <span className="text-blue-400">from</span> "@/components/contact-form"
                  <br />
                  <span className="text-blue-400">import</span> {'{ Footer }'} <span className="text-blue-400">from</span> "@/components/footer"
                  <br />
                  <br />
                  <span className="text-blue-400">export default function</span> Home() {'{'}
                  <br />
                  &nbsp;&nbsp;<span className="text-blue-400">return</span> (
                  <br />
                  &nbsp;&nbsp;&lt;<span className="text-yellow-300">div</span> <span className="text-purple-400">className</span>="<span className="text-green-400">min-h-screen bg-background</span>"&gt;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-yellow-300">SmoothCursor</span> /&gt;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-yellow-300">Preloader</span> /&gt;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-yellow-300">Sidebar</span> /&gt;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-yellow-300">main</span>&gt;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-yellow-300">Hero</span> /&gt;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-yellow-300">About</span> /&gt;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-yellow-300">Skills</span> /&gt;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-yellow-300">Experience</span> /&gt;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-yellow-300">Education</span> /&gt;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-yellow-300">Projects</span> /&gt;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-yellow-300">ContactForm</span> /&gt;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&lt;/<span className="text-yellow-300">main</span>&gt;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-yellow-300">Footer</span> /&gt;
                  <br />
                  &nbsp;&nbsp;&lt;/<span className="text-yellow-300">div</span>&gt;
                  <br />
                  );
                  <br />
                  {'}'}
                </pre>
              </div>
            </div>
          </div>


        </div>
      </div>
    </section>
  )
}