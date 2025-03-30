"use client"

import { useEffect, useState, useRef } from "react"

export function SmoothCursor() {
    const cursorRef = useRef<HTMLDivElement | null>(null)
    const cursorOuterRef = useRef<HTMLDivElement | null>(null)
    const [visible, setVisible] = useState(false)
    const [clicked, setClicked] = useState(false)
    const [linkHovered, setLinkHovered] = useState(false)
    const [isDesktop, setIsDesktop] = useState(false)

    useEffect(() => {
        const checkScreenSize = () => {
            setIsDesktop(window.innerWidth >= 768)
        }

        checkScreenSize()
        window.addEventListener("resize", checkScreenSize)
        return () => window.removeEventListener("resize", checkScreenSize)
    }, [])

    useEffect(() => {
        if (!isDesktop) return

        document.body.style.cursor = "default"

        let mouseX = 0
        let mouseY = 0
        let cursorX = 0
        let cursorY = 0
        let cursorOuterX = 0
        let cursorOuterY = 0

        const innerFactor = 0.2
        const outerFactor = 0.15

        const updatePosition = (e: MouseEvent) => {
            mouseX = e.clientX
            mouseY = e.clientY
            setVisible(true)
        }

        const handleMouseDown = () => setClicked(true)
        const handleMouseUp = () => setClicked(false)

        const handleMouseEnterLink = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isLinkOrButton =
                target?.tagName === "A" ||
                target?.tagName === "BUTTON" ||
                target?.closest("a") ||
                target?.closest("button");

            if (isLinkOrButton) {
                console.log("Hover detected on:", target); // Debug log
                setLinkHovered(true);
            }
        }

        const handleMouseLeaveLink = (e: MouseEvent) => {
            const target = e.target;
            const isLinkOrButton =
                (target as HTMLElement).tagName === "A" ||
                (target as HTMLElement).tagName === "BUTTON" ||
                (target as HTMLElement).closest("a") ||
                (target as HTMLElement).closest("button");

            if (isLinkOrButton) {
                console.log("Hover left:", target); // Debug log
                setLinkHovered(false);
            }
        }

        const animateCursor = () => {
            const dx1 = mouseX - cursorX
            const dy1 = mouseY - cursorY
            const dx2 = mouseX - cursorOuterX
            const dy2 = mouseY - cursorOuterY

            cursorX += dx1 * innerFactor
            cursorY += dy1 * innerFactor
            cursorOuterX += dx2 * outerFactor
            cursorOuterY += dy2 * outerFactor

            if (cursorRef.current) {
                cursorRef.current.style.left = `${cursorX}px`
                cursorRef.current.style.top = `${cursorY}px`
            }

            if (cursorOuterRef.current) {
                cursorOuterRef.current.style.left = `${cursorOuterX}px`
                cursorOuterRef.current.style.top = `${cursorOuterY}px`
            }

            requestAnimationFrame(animateCursor)
        }

        // Use "mouseover" and "mouseout" on the document level
        document.addEventListener("mousemove", updatePosition)
        document.addEventListener("mousedown", handleMouseDown)
        document.addEventListener("mouseup", handleMouseUp)
        document.addEventListener("mouseover", handleMouseEnterLink)
        document.addEventListener("mouseout", handleMouseLeaveLink)

        requestAnimationFrame(animateCursor)

        return () => {
            document.removeEventListener("mousemove", updatePosition)
            document.removeEventListener("mousedown", handleMouseDown)
            document.removeEventListener("mouseup", handleMouseUp)
            document.removeEventListener("mouseover", handleMouseEnterLink)
            document.removeEventListener("mouseout", handleMouseLeaveLink)
        }
    }, [isDesktop])

    if (!isDesktop) return null

    return (
        <>
            <div
                ref={cursorRef}
                className={`fixed pointer-events-none z-[9999] rounded-full mix-blend-difference ${visible ? "opacity-100" : "opacity-0"
                    } ${clicked ? "scale-90" : ""} ${linkHovered ? "scale-150 animate-pulse" : ""}`}
                style={{
                    width: "16px",
                    height: "16px",
                    backgroundColor: "white",
                    transform: "translate(-50%, -50%)",
                    transition: "opacity 0.3s ease-out, transform 0.2s ease-out",
                }}
            />
            <div
                ref={cursorOuterRef}
                className={`fixed pointer-events-none z-[9999] rounded-full mix-blend-difference ${visible ? "opacity-100" : "opacity-0"
                    } ${linkHovered ? "animate-spin-slow" : ""}`}
                style={{
                    width: "30px",
                    height: "30px",
                    border: "1px solid white",
                    transform: "translate(-50%, -50%)",
                    transition: "opacity 0.3s ease-out",
                }}
            />
            <style jsx>{`
                @keyframes pulse {
                    0% {
                        transform: translate(-50%, -50%) scale(1.5);
                    }
                    50% {
                        transform: translate(-50%, -50%) scale(1.3);
                    }
                    100% {
                        transform: translate(-50%, -50%) scale(1.5);
                    }
                }

                @keyframes spin-slow {
                    0% {
                        transform: translate(-50%, -50%) rotate(0deg);
                    }
                    100% {
                        transform: translate(-50%, -50%) rotate(360deg);
                    }
                }

                .animate-pulse {
                    animation: pulse 0.6s infinite;
                }

                .animate-spin-slow {
                    animation: spin-slow 2s linear infinite;
                }
            `}</style>
        </>
    )
}