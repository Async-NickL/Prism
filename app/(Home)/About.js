import ShinyText from "@/components/ui/ShinyText";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const About = () => {
    return (
        <div id="About" className="mb-10 w-full text-center flex flex-col pt-5">
            <ShinyText
                text="About Prism"
                className="text-7xl max-sm:text-4xl font-semibold mb-12"
            />
            <section className="h-fit w-full grid grid-cols-2 max-md:grid-cols-1">
                <Card className={"bg-background/10 rounded-none"}>
                    <CardHeader>
                        <CardTitle className="text-5xl text-left max-sm:text-[30px] max-md:text-6xl font-bold text-neutral-600 dark:text-neutral-200">
                            Our Vision
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-2xl text-balance font-light text-foreground/70 text-left max-md:text-xl">
                        Prism is a comprehensive project management platform designed for modern teams. We combine the power of organization-based project management with intuitive sprint planning and agile methodologies. Our platform features drag-and-drop Kanban boards, real-time issue tracking with priority levels, and robust role-based permissions. Whether you&apos;re managing a small team or a large enterprise, Prism provides the tools you need to plan sprints, track progress, assign tasks, and deliver projects on time with complete transparency and collaboration.
                    </CardContent>
                </Card>
                <Card className={"bg-background/10 rounded-none"}>
                    <CardHeader>
                        <CardTitle className="text-5xl max-sm:text-[30px] text-left max-md:text-6xl font-bold text-neutral-600 dark:text-neutral-200">
                            Our Mission
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-2xl text-balance text-foreground/70 font-light text-left max-md:text-xl ">
                        We&apos;re on a mission to revolutionize how teams work together. Prism eliminates the complexity of traditional project management tools while delivering enterprise-grade features. From creating projects with unique keys to managing sprints with date ranges, from tracking issues across multiple statuses to providing real-time feedback with beautiful UI components - we&apos;ve built everything you need in one seamless platform. Our modern, responsive design ensures your team stays productive whether they&apos;re in the office or working remotely.
                    </CardContent>
                </Card>
            </section>
        </div>
    );
};

export default About;