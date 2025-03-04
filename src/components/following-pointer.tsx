// Core component that receives mouse positions and renders pointer and content

import React, { useEffect, useState } from "react";

import {motion, AnimatePresence, useMotionValue, MotionValue} from "framer-motion";
import { cn } from "../utils/cn";

export const FollowerPointerCard = ({
                                        children,
                                        className,
                                        title,
                                    }: {
    children: React.ReactNode;
    className?: string;
    title?: string | React.ReactNode;
}) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const ref = React.useRef<HTMLDivElement>(null);
    const [rect, setRect] = useState<DOMRect | null>(null);
    const [isInside, setIsInside] = useState<boolean>(false); // Add this line

    useEffect(() => {
        if (ref.current) {
            setRect(ref.current.getBoundingClientRect());
        }
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        console.log("handleMouseMove");
        console.log(e.clientX, e.clientY);
        if (rect) {
            const scrollX = window.scrollX;
            const scrollY = window.scrollY;
            x.set(e.clientX - rect.left + scrollX);
            y.set(e.clientY - rect.top + scrollY);
        }
    };
    const handleMouseLeave = () => {
        setIsInside(false);
    };

    const handleMouseEnter = () => {
        setIsInside(true);
    };
    return (
        <div
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            ref={ref}
            className={cn("relative", className)}
        >
            <AnimatePresence>
                {isInside && <FollowPointer x={x} y={y} title={title} />}
            </AnimatePresence>
            {children}
        </div>
    );
};

export const FollowPointer = ({
                                  x,
                                  y,
                                  title,
                              }: {
    x: MotionValue<number>;
    y: MotionValue<number>;
    title?: string | React.ReactNode;
}) => {
    return (
        <motion.div
            className="h-4 w-4 rounded-full absolute z-50"
            style={{
                top: y,
                left: x,
                pointerEvents: "none",
            }}
            initial={{
                scale: 1,
                opacity: 1,
            }}
            animate={{
                scale: 1,
                opacity: 1,
            }}
            exit={{
                scale: 0,
                opacity: 0,
            }}
        >
            <motion.div
                style={{
                    borderColor: "grey",
                    borderWidth: 1,
                    backgroundColor: "var(--background-emphasis)",
                }}
                initial={{
                    scale: 0.5,
                    opacity: 0,
                }}
                animate={{
                    scale: 1,
                    opacity: 1,
                }}
                exit={{
                    scale: 0.5,
                    opacity: 0,
                }}
                className={
                    "px-2 py-2 text whitespace-nowrap min-w-max text-xs rounded-full"
                }
            >
                {title || `William Shakespeare`}
            </motion.div>
        </motion.div>
    );
};
