"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import RotatingText from "./animations/RotatingText"; // Adjust path as needed

export function ContactForm() {



  return (
    <section id="contact" className="xl:min-h-screen flex items-center py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Get In Touch</h2>
          <div className="mt-2 h-1 w-20 bg-primary mx-auto" />
          <div className="mt-4 flex flex-row items-center justify-center gap-2">
            <div>
              Reach me for
            </div>
            <div>
              <RotatingText
                texts={["Hiring", "Web Development"]}
                mainClassName="inline-flex px-2 sm:px-3 md:px-4 bg-black text-white py-1 sm:py-2 md:py-2 justify-center rounded-lg items-center min-h-[2rem]"
                staggerFrom="last"
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                staggerDuration={0.05}
                splitLevelClassName="overflow-hidden mx-0.5"
                elementLevelClassName="inline-block"
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                rotationInterval={3000}
              />
            </div>


          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="border-none ">
            <CardContent className="p-6">

              <form action="https://formspree.io/f/mwpejavr" method='post' className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium block">
                      Full Name
                    </label>
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Your Name"


                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium block">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      id="email"

                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium block">
                    Your Message
                  </label>
                  <Textarea
                    name="message"
                    placeholder="Your Message"
                    id="message"
                    required
                  />
                </div>
                <Button type="submit" className="w-full p-7">
                  Send Message
                </Button>
              </form>

            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default ContactForm;