"use client";

import {
    motion,
    useMotionValue,
    useSpring,
    useTransform,
    AnimatePresence,
} from "framer-motion";
import React from "react";
import {
    Children,
    cloneElement,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";

import { ReactNode } from "react";

function DockItem({
    children,
    className = "",
    onClick,
    mouseX,
    spring,
    distance,
    magnification,
    baseItemSize,
}: {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    mouseX: any;
    spring: any;
    distance: number;
    magnification: number;
    baseItemSize: number;
}) {
    const ref = useRef<HTMLDivElement | null>(null);
    const isHovered = useMotionValue(0);

    const mouseDistance = useTransform(mouseX, (val) => {
        const rect = ref.current?.getBoundingClientRect() ?? {
            x: 0,
            width: baseItemSize,
        };
        return (val as number) - rect.x - baseItemSize / 2;
    });

    const targetSize = useTransform(
        mouseDistance,
        [-distance, 0, distance],
        [baseItemSize, magnification, baseItemSize]
    );
    const size = useSpring(targetSize, spring);

    return (
        <motion.div
            ref={ref}
            style={{
                width: size,
                height: size,
            }}
            onHoverStart={() => isHovered.set(1)}
            onHoverEnd={() => isHovered.set(0)}
            onFocus={() => isHovered.set(1)}
            onBlur={() => isHovered.set(0)}
            onClick={onClick}
            className={`relative top-1 inline-flex items-center justify-center rounded-full bg-[#060606] ${className}`}
            tabIndex={0}
            role="button"
            aria-haspopup="true"
        >
            <div className="text-white">
                {Children.map(children, (child) =>
                    React.isValidElement<{ isHovered?: any }>(child) && child.props && typeof child.props === "object"
                        ? cloneElement(child, { isHovered })
                        : child
                )}
            </div>
        </motion.div>
    );
}

function DockLabel({ children, className = "", ...rest }: { children: ReactNode; className?: string;[key: string]: any }) {
    const { isHovered } = rest;
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const unsubscribe = isHovered.on("change", (latest: number) => {
            setIsVisible(latest === 1);
        });
        return () => unsubscribe();
    }, [isHovered]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: 1, y: -10 }}
                    exit={{ opacity: 0, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`${className} absolute top-20 left-1/2 w-fit whitespace-pre rounded-md border  bg-[#060606] px-2 py-0.5 text-xs text-white`}
                    role="tooltip"
                    style={{ x: "-50%" }}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
}

function DockIcon({ children, className = "" }: { children: ReactNode; className?: string }) {
    return (
        <div className={`flex items-center justify-center text-white ${className}`}>
            {children}
        </div>
    );
}

interface DockItemProps {
    icon: ReactNode;
    label: ReactNode;
    onClick?: () => void;
    className?: string;
}

export default function Dock({
    items,
    className = "",
    spring = { mass: 0.1, stiffness: 150, damping: 12 },
    magnification = 70,
    distance = 200,
    baseItemSize = 50,
}: {
    items: DockItemProps[];
    className?: string;
    spring?: { mass: number; stiffness: number; damping: number };
    magnification?: number;
    distance?: number;
    baseItemSize?: number;
}) {
    const mouseX = useMotionValue(Infinity);

    return (
        <div className="mx-2 flex max-w-full items-center h-16 mb-2 mt-2">
            <motion.div
                onMouseMove={(event) => {
                    mouseX.set(event.clientX);
                }}
                onMouseLeave={() => {
                    mouseX.set(Infinity);
                }}
                className={`${className} flex items-center w-fit gap-4 rounded-full pb-2 px-4 h-16 bg-background/30 backdrop-blur-md`}
                role="toolbar"
                aria-label="Navigation dock"
            >
                {items.map((item, index) => (
                    <DockItem
                        key={index}
                        onClick={item.onClick}
                        className={item.className}
                        mouseX={mouseX}
                        spring={spring}
                        distance={distance}
                        magnification={magnification}
                        baseItemSize={baseItemSize}
                    >
                        <DockIcon>{item.icon}</DockIcon>
                        <DockLabel>{item.label}</DockLabel>
                    </DockItem>
                ))}
            </motion.div>
        </div>
    );
}