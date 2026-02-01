"use client";

import Link from "next/link";
import { IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";

interface SocialsProps {
  containerStyles: string;
  iconStyles: string;
  socialLinks?: Record<string, string>;
}

const DEFAULT_LINKS = {
  github: "https://github.com/vcdas123",
  linkedin: "https://www.linkedin.com/in/vcdas/",
};

const Socials = ({
  containerStyles,
  iconStyles,
  socialLinks = {},
}: SocialsProps) => {
  const links = [
    { Icon: IconBrandGithub, href: socialLinks.github || DEFAULT_LINKS.github },
    {
      Icon: IconBrandLinkedin,
      href: socialLinks.linkedin || DEFAULT_LINKS.linkedin,
    },
  ];

  return (
    <div className={containerStyles}>
      {links.map(({ Icon, href }) => (
        <Link
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={iconStyles}
        >
          <Icon size={20} stroke={2} />
        </Link>
      ))}
    </div>
  );
};

export default Socials;
