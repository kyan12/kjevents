"use client";

import { useEffect, useState } from 'react';

export default function FallingPetals() {
    const [petals, setPetals] = useState<any[]>([]);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Generate ~12 petals with random properties for subtlety
        const newPetals = Array.from({ length: 12 }).map((_, i) => ({
            id: i,
            start: Math.random() * 100, // starting viewport width %
            del: `${Math.random() * 15}s`, // delay
            dur: `${15 + Math.random() * 20}s`, // slow duration
            sway: (Math.random() - 0.5) * 150, // sway distance
            rot: `${(Math.random() - 0.5) * 450}deg`, // rotation
            scale: 0.6 + Math.random() * 0.6, // slight scale variation
        }));
        setPetals(newPetals);

        const handleScroll = () => {
            // Show petals only when scrolled past the hero section (approx 80vh)
            if (window.scrollY > window.innerHeight * 0.8) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Check on initial load

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (petals.length === 0 || !isVisible) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-[40] overflow-hidden">
            {petals.map((p) => (
                <div
                    key={p.id}
                    className="global-petal"
                    style={{
                        '--start': p.start,
                        '--del': p.del,
                        '--dur': p.dur,
                        '--sway': p.sway,
                        '--rot': p.rot,
                        '--scale': p.scale,
                    } as React.CSSProperties}
                />
            ))}
        </div>
    );
}
