"use client"
import React, { useMemo, useEffect, useState } from 'react';
import { Marquee } from '@/components/ui/marquee';
import ShinyText from '@/components/ui/ShinyText';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const testimonials = [
    {
        name: "Pratik Mane",
        role: "FullStack Intern",
        company: "Appwizer Solution",
        feedback: "Prism has revolutionized how we manage our projects. The organization-based structure and sprint management features are incredibly intuitive."
    },
    {
        name: "Pranav Naik",
        role: "FullStack Intern",
        company: "Appwizer Solution",
        feedback: "The Kanban board and issue tracking system is exactly what our team needed. It's made our workflow so much more efficient."
    },
    {
        name: "Om Patil",
        role: "AI Intern",
        company: "Neuday AI",
        feedback: "As an AI intern, I appreciate the clean interface and role-based access control. It makes collaboration seamless across different teams."
    },
    {
        name: "Swapnil Dudhane",
        role: "AI Intern",
        company: "Neuday AI",
        feedback: "The real-time feedback and modern UI make Prism stand out. It's not just functional, it's a pleasure to use."
    },
    {
        name: "Amey Nakil",
        role: "Intern",
        company: "Wolfox Solutions",
        feedback: "Prism's sprint planning features have transformed how we organize our development cycles. Highly recommended for any tech team."
    },
    {
        name: "Atharv Hanche",
        role: "AI/ML Intern",
        company: "Sumago PVT LTD",
        feedback: "The issue tracking with priorities and assignees is perfect for our AI/ML projects. It keeps everything organized and on track."
    }
];

const TestimonialCard = React.memo(({ testimonial, index, isMobile }) => {
    const initials = useMemo(() =>
        testimonial.name.split(' ').map(n => n[0]).join(''),
        [testimonial.name]
    );

    return (
        <Card className={`w-[350px] mx-3 ${isMobile ? 'bg-card' : 'bg-card/50 backdrop-blur-sm'} border-border/50`}>
            <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                    <Avatar className="h-12 w-12">
                        <AvatarImage alt={testimonial.name} />
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                            {initials}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <h3 className="font-semibold text-foreground">{testimonial.name}</h3>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        <p className="text-xs text-muted-foreground">{testimonial.company}</p>
                    </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                    &ldquo;{testimonial.feedback}&rdquo;
                </p>
            </CardContent>
        </Card>
    );
});

TestimonialCard.displayName = 'TestimonialCard';

const Feedback = React.memo(() => {
    const [isMobile, setIsMobile] = useState(false);
    const [isLowPerformance, setIsLowPerformance] = useState(false);

    useEffect(() => {
        const checkDevice = () => {
            const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            setIsMobile(isMobileDevice);

            const cores = navigator.hardwareConcurrency || 1;
            const memory = navigator.deviceMemory || 1;
            const isLowEnd = cores <= 2 || memory <= 2;
            setIsLowPerformance(isLowEnd);
        };

        checkDevice();
        window.addEventListener('resize', checkDevice);
        return () => window.removeEventListener('resize', checkDevice);
    }, []);

    const memoizedTestimonials = useMemo(() => testimonials, []);

    if (isLowPerformance) {
        return (
            <div className="relative flex flex-col w-full justify-center overflow-hidden bg-background pb-10">
                <ShinyText
                    text={"What People Say About Us"}
                    className="relative border-b-2 pb-10 z-10 text-2xl md:text-7xl text-center font-sans font-bold mb-16"
                />

                <div className="w-full px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                        {memoizedTestimonials.map((testimonial, index) => (
                            <TestimonialCard
                                key={index}
                                testimonial={testimonial}
                                index={index}
                                isMobile={true}
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative flex flex-col w-full justify-center overflow-hidden bg-background pb-10">
            <ShinyText
                text={"What People Say About Us"}
                className="relative border-b-2 pb-10 z-10 text-2xl md:text-7xl text-center font-sans font-bold mb-16"
            />

            <div className="w-full">
                <div className="relative">
                    <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>

                    <Marquee
                        className="py-8"
                        pauseOnHover={!isMobile}
                        speed={isMobile ? 30 : 50}
                    >
                        {memoizedTestimonials.map((testimonial, index) => (
                            <TestimonialCard
                                key={index}
                                testimonial={testimonial}
                                index={index}
                                isMobile={isMobile}
                            />
                        ))}
                    </Marquee>

                    <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>
                </div>
            </div>
        </div>
    );
});

Feedback.displayName = 'Feedback';

export default Feedback;