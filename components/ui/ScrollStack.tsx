'use client';

import React, { useRef } from 'react';
import type { ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export interface ScrollStackItemProps {
    itemClassName?: string;
    children: ReactNode;
    index?: number;
    total?: number;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({
    children,
    itemClassName = '',
    index = 0,
    total = 1
}) => {
    const containerRef = useRef<HTMLDivElement>(null);

    // Track scroll progress through this specific card's container (the h-[120vh] wrapper below it)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // Scale down beautifully as we scroll PAST this item
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
    const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0.2]);

    // Calculate dynamic sticky top position. Let's make later cards stack slightly lower.
    // E.g., Card 0: 20vh, Card 1: 20vh + 30px, Card 2: 20vh + 60px
    const stickyTopOffset = `calc(20vh + ${index * 30}px)`;

    // Z-index goes up as index goes up, so 02 is on top of 01.
    const zIndex = 10 + index;

    return (
        <div ref={containerRef} className="relative w-full h-[120vh]">
            <motion.div
                className={`scroll-stack-card sticky w-full box-border origin-top will-change-transform ${itemClassName}`.trim()}
                style={{
                    top: stickyTopOffset,
                    zIndex: zIndex,
                    scale,
                    opacity,
                    backfaceVisibility: 'hidden',
                }}
            >
                {children}
            </motion.div>
        </div>
    );
};

interface ScrollStackProps {
    className?: string;
    children: ReactNode;
}

const ScrollStack: React.FC<ScrollStackProps> = ({
    children,
    className = '',
}) => {
    // We need to inject the `index` and `total` into each child 
    // so they know their stacking order and z-index.
    const childrenArray = React.Children.toArray(children);
    const total = childrenArray.length;

    return (
        <div className={`relative w-full ${className}`.trim()}>
            <div className="scroll-stack-inner w-full">
                {React.Children.map(childrenArray, (child, index) => {
                    if (React.isValidElement(child)) {
                        return React.cloneElement(child as React.ReactElement<ScrollStackItemProps>, { index, total });
                    }
                    return child;
                })}
            </div>
        </div>
    );
};

export default ScrollStack;
