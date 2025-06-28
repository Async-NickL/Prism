import React from "react";
import ShinyText from '@/components/ui/ShinyText';
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
  IconBuildingCommunity,
  IconCalendarStats,
  IconLayoutKanban,
  IconUserShield,
  IconListCheck,
  IconDeviceImacCog,
  IconBellRinging,
} from "@tabler/icons-react";

const ImageHeader = ({ images, isBigger = false }) => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl overflow-hidden">
    {images.map((image, index) => (
      <div
        key={index}
        className={`flex-1 relative ${isBigger ? 'h-full' : 'h-full'}`}
      >
        <img
          src={image}
          alt={`Feature ${index + 1}`}
          className="w-full h-full object-cover object-right"
        />
      </div>
    ))}
  </div>
);

const items = [
  {
    title: "Organization-based Management",
    description: "Manage multiple projects within organizations, with admin-only permissions for sensitive actions.",
    header: <ImageHeader images={["/Features/org1.png"]} />,
    icon: <IconBuildingCommunity className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Sprint Planning & Management",
    description: "Create, start, and complete sprints with date ranges and status management.",
    header: <ImageHeader images={["/Features/sprint1.png"]} />,
    icon: <IconCalendarStats className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Kanban/Sprint Board",
    description: "Drag-and-drop issues across multiple statuses for visual project tracking.",
    header: <ImageHeader images={["/Features/issue1.png"]} />,
    icon: <IconLayoutKanban className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Role-based Access Control",
    description: "Only organization admins can create or delete projects and manage sprints.",
    header: <ImageHeader images={["/Features/auth.png", "/Features/auth2.png"]} isBigger={true} />,
    icon: <IconUserShield className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Rich Issue Tracking",
    description: "Issues have priorities, assignees, reporters, markdown descriptions, and are linked to sprints and projects.",
    header: <ImageHeader images={["/Features/issue2.png"]} />,
    icon: <IconListCheck className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Modern UI/UX",
    description: "Beautiful, animated, and responsive UI components for a delightful experience.",
    header: <ImageHeader images={["/Features/ui.png"]} />,
    icon: <IconDeviceImacCog className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Real-time Feedback",
    description: "Toasts and skeleton loaders provide a smooth, interactive experience.",
    header: <ImageHeader images={["/Features/loader.png", "/Features/loader2.png"]} isBigger={true} />,
    icon: <IconBellRinging className="h-4 w-4 text-neutral-500" />,
  },
];

const Feature = () => {
  return (  
    <div className="min-h-[calc(100vh-4.5rem)] border-b-2 mb-14 pb-5 relative flex flex-col w-full justify-center overflow-hidden bg-background ">
      <ShinyText text={"Key Features"} className="relative border-b-2 pb-10 z-10 text-4xl md:text-7xl  text-center font-sans font-bold" />
      <div className="w-full my-10">
        <BentoGrid className="w-full py-5 px-10">
          {items.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              header={item.header}
              icon={item.icon}
              className={i === 3 || i === 6 ? "md:col-span-2 border-2 border-foreground/20" : "border-2 border-foreground/20"}
            />
          ))}
        </BentoGrid>
      </div>
    </div>
  );
}

export default Feature;
