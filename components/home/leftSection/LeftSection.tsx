"use client";

import Link from "next/link";
import { IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";

interface LeftSectionProps {
  title?: string;
  name?: string;
  description?: string;
  socialLinks?: { github?: string; linkedin?: string };
}

const DEFAULT_SOCIAL = {
  github: "https://github.com/vcdas123",
  linkedin: "https://www.linkedin.com/in/vcdas/",
};

const LeftSection = ({
  title = "Software Developer",
  name = "Vaskar Chandra Das",
  description = "I enjoy delivering engaging digital solutions and am skilled in using multiple programming languages and technologies.",
  socialLinks,
}: LeftSectionProps) => {
  const nameParts = name.split(" ");
  const firstName = nameParts[0] || "Vaskar";
  const restName = nameParts.slice(1).join(" ") || "Chandra Das";
  const links = [
    {
      Icon: IconBrandGithub,
      href: socialLinks?.github || DEFAULT_SOCIAL.github,
    },
    {
      Icon: IconBrandLinkedin,
      href: socialLinks?.linkedin || DEFAULT_SOCIAL.linkedin,
    },
  ];

  return (
    <div className="text-center xl:text-left order-2 xl:order-none h-full">
      <span className="text-xl text-white/80">{title}</span>
      <h1 className="h1 mt-2 text-white">
        Hello I&apos;m <br />
        <span className="text-accent underline underline-offset-8">
          {firstName} <br /> {restName}
        </span>
      </h1>
      <p className="max-w-[700px] mt-2 text-white/80 mx-auto xl:mx-0">
        {description}
      </p>
      <div className="flex gap-4 mt-6 justify-center xl:justify-start">
        {links.map(({ Icon, href }) => (
          <Link
            key={href}
            href={href}
            target="_blank"
            rel="noopener"
            className="text-white/70 hover:text-accent transition-colors"
          >
            <Icon size={24} stroke={2} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LeftSection;
