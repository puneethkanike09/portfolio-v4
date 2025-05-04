// components/navigation.tsx
"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { VscHome, VscInfo, VscCode, VscBriefcase, VscMortarBoard, VscProject, VscMail, VscKey } from "react-icons/vsc"
import Dock from "./animations/Dock"

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const sidebarRef = useRef<HTMLDivElement | null>(null)
  const buttonRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
      const sections = document.querySelectorAll("section[id]")
      const scrollPosition = window.scrollY + window.innerHeight / 3

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop
        const sectionHeight = (section as HTMLElement).offsetHeight
        const sectionId = section.getAttribute("id")

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          if (sectionId) {
            setActiveSection(sectionId)
          }
        }
      })
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Sidebar-specific effects
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node) &&
        isOpen
      ) {
        setIsOpen(false)
      }
    }

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mouseup", handleClickOutside)
    document.addEventListener("keydown", handleEscKey)
    document.body.style.overflow = isOpen ? "hidden" : ""

    return () => {
      document.removeEventListener("mouseup", handleClickOutside)
      document.removeEventListener("keydown", handleEscKey)
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement> | undefined, href: string) => {
    if (e) e.preventDefault()
    setIsOpen(false)

    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      window.history.pushState(null, "", href)
    }
  }

  const navItems = [
    { icon: <VscHome size={18} />, label: "Home", href: "#home" },
    { icon: <VscInfo size={18} />, label: "About", href: "#about" },
    { icon: <VscCode size={18} />, label: "Skills", href: "#skills" },
    { icon: <VscBriefcase size={18} />, label: "Experience", href: "#experience" },
    { icon: <VscMortarBoard size={18} />, label: "Education", href: "#education" },
    { icon: <VscProject size={18} />, label: "Projects", href: "#projects" },
    { icon: <VscMail size={18} />, label: "Contact", href: "#contact" },
    { icon: <VscKey size={18} />, label: "Admin", href: "/admin", isExternal: true }
  ]

  return (
    <>
      {/* Navbar with Dock for big screens - transparent bg except for dock */}
      <div
        className="fixed top-2 left-0 right-0 z-50 transition-all duration-200 hidden lg:flex lg:justify-center"
      >
        <Dock
          items={navItems.map((item) => ({
            icon: item.icon,
            label: item.label,
            onClick: item.isExternal
              ? () => window.location.href = item.href
              : () => handleNavClick(undefined, item.href),
            href: item.isExternal ? item.href : undefined,
          }))}
          baseItemSize={40}
          magnification={60}
        />
      </div>

      {/* Sidebar for small screens */}
      <div className="lg:hidden">
        <Button
          ref={buttonRef}
          variant="outline"
          size="icon"
          className={cn(
            "fixed top-6 right-6 z-50 rounded-full w-12 h-12 shadow-lg transition-colors duration-200",
            scrolled ? "bg-background/80 backdrop-blur-sm" : "bg-background",
            isOpen
              ? "bg-primary text-primary-foreground hover:bg-white hover:text-black"
              : "hover:bg-black hover:text-white"
          )}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>

        <div
          ref={sidebarRef}
          className={cn(
            "fixed inset-y-0 right-0 z-40 w-64 bg-black shadow-xl transition-transform duration-300 ease-in-out",
            isOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex flex-col h-full pt-20 pb-6">
            <div className="px-6 mb-8">
              <Link href="/" className="text-xl font-bold text-white">
                Puneeth<span className="text-gray-500">Kanike</span>
              </Link>
            </div>
            <nav className="flex-1 px-6">
              <ul className="space-y-6">
                {navItems.map((link) => (
                  <li key={link.href}>
                    {link.isExternal ? (
                      <Link
                        href={link.href}
                        className={cn(
                          "relative inline-block text-lg font-medium py-2 transition-colors",
                          "text-white hover:after:scale-x-100 after:scale-x-0 pl-4",
                          "after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:h-[3px] after:w-full after:bg-gray-500",
                          "after:origin-center after:transform after:-translate-x-1/2 after:transition-transform after:duration-300"
                        )}
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <Link
                        href={link.href}
                        className={cn(
                          "relative inline-block text-lg font-medium py-2 transition-colors",
                          activeSection === link.href.substring(1)
                            ? "border-l-4 border-gray-500 text-gray-300 pl-4"
                            : "text-white hover:after:scale-x-100 after:scale-x-0 pl-4",
                          "after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:h-[3px] after:w-full after:bg-gray-500",
                          "after:origin-center after:transform after:-translate-x-1/2 after:transition-transform after:duration-300"
                        )}
                        onClick={(e) => handleNavClick(e, link.href)}
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
            <div className="px-6 mt-auto">
              <p className="text-sm text-white/60">© {new Date().getFullYear()} Puneeth K</p>
            </div>
          </div>
        </div>

        <div
          className={cn(
            "fixed inset-0 bg-black/50 z-30 transition-opacity duration-300",
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
          onClick={() => setIsOpen(false)}
        />
      </div>
    </>
  )
}