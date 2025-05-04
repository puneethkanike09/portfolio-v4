import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import ScrollReveal from "./animations/ScrollReveal";

interface AboutData {
  name: string;
  description: string;
  location: string;
  email: string;
  experience: string;
  imageUrl: string;
}

export function About() {
  const sectionRef = useRef(null);
  const [aboutData, setAboutData] = useState<AboutData>({
    name: 'Puneeth K',
    description: 'My approach is rooted in creating intuitive, responsive designs that not only look stunning but also perform flawlessly across all devices. I thrive on the challenge of turning complex problems into elegant, user-centric solutions. Whether it is building a sleek new website from scratch or enhancing an existing application with innovative features, I collaborate closely with clients to transform their vision into reality.',
    location: 'Guruvayanakere, Belthangadi',
    email: 'reachout.puneeth@gmail.com',
    experience: '0.3 Years',
    imageUrl: '/images/about/about.png'
  });

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch('/api/about');
        if (response.ok) {
          const data = await response.json();
          setAboutData(data);
        }
      } catch (error) {
        console.error('Failed to fetch about data:', error);
      }
    };

    fetchAboutData();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="xl:min-h-screen flex items-center bg-black text-white py-20 relative"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">About Me</h2>
          <div className="mt-2 h-1 w-20 bg-gray-400 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Sticky image container */}
          <div className="md:sticky md:top-24 self-start">
            <div className="relative h-[350px] sm:h-[500px] md:h-[700px] rounded-lg overflow-hidden shadow-lg mx-auto w-full max-w-md md:max-w-full">
              <Image
                src={aboutData.imageUrl}
                alt="Interior Designer Portrait"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="space-y-4 md:space-y-6">
            <h3 className="text-2xl font-semibold">{aboutData.name}</h3>

            {/* ScrollReveal for large screens */}
            <div className="hidden lg:block">
              <ScrollReveal
                scrollContainerRef={undefined}
                enableBlur={true}
                baseOpacity={0}
                baseRotation={0}
                blurStrength={20}
                wordAnimationEnd="bottom center"
              >
                {aboutData.description}
              </ScrollReveal>
            </div>

            {/* Fallback paragraphs for small screens */}
            <div className="block lg:hidden space-y-4">
              <p>
                {aboutData.description}
              </p>
            </div>

            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold">Location</h4>
                <p className="text-gray-400">{aboutData.location}</p>
              </div>
              <div>
                <h4 className="font-semibold">Email</h4>
                <p className="text-gray-400 break-words">{aboutData.email}</p>
              </div>

              <div>
                <h4 className="font-semibold">Experience</h4>
                <p className="text-gray-400">{aboutData.experience}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}