"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Drawer } from "../ui/drawer";
import {
  IconHome,
  IconBriefcase,
  IconArticle,
  IconUser,
  IconDownload,
} from "@tabler/icons-react";
import { getResumeUrl } from "@/lib/api";

const NAV_LINKS = [
  { href: "/", label: "Home", Icon: IconHome },
  { href: "/works", label: "Works", Icon: IconBriefcase },
  { href: "/blog", label: "Blog", Icon: IconArticle },
  { href: "/about", label: "About", Icon: IconUser },
];

export default function Header() {
  const pathname = usePathname();
  const [opened, { open, close }] = useDisclosure(false);
  const resumeUrl = getResumeUrl();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  const navPill = (
    <nav className="flex flex-wrap justify-end items-center gap-1 p-1.5 rounded-full bg-white/[0.06] backdrop-blur-xl border border-white/[0.08] shadow-lg shadow-black/20">
      {NAV_LINKS.map(link => {
        const active = isActive(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={close}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm transition-colors duration-200 ${
              active
                ? "bg-accent text-primary shadow-sm"
                : "text-white/80 hover:text-white hover:bg-white/10"
            }`}
          >
            <link.Icon size={18} stroke={2} />
            {link.label}
          </Link>
        );
      })}
      <a
        href={resumeUrl}
        download
        className="flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors"
      >
        <IconDownload size={18} stroke={2} />
        Resume
      </a>
    </nav>
  );

  return (
    <header className="sticky top-0 z-50 py-3 bg-primary/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center gap-4">
        <Link
          href="/"
          className="text-4xl font-semibold shrink-0 text-white hover:text-accent transition-colors"
        >
          Vaskar<span className="text-accent">.</span>
        </Link>

        <div className="hidden lg:flex flex-1 justify-end">{navPill}</div>

        <div className="flex lg:hidden items-center gap-2">
          <Burger opened={opened} onClick={open} size="sm" aria-label="Menu" />
          <Drawer open={opened} onOpenChange={o => !o && close()} title="Menu">
            <div className="pt-8 flex flex-col gap-2">
              {NAV_LINKS.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={close}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium ${
                    isActive(link.href)
                      ? "bg-accent/20 text-accent"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  <link.Icon size={22} stroke={2} />
                  {link.label}
                </Link>
              ))}
              <a
                href={resumeUrl}
                download
                onClick={close}
                className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-white hover:bg-white/10"
              >
                <IconDownload size={22} stroke={2} />
                Resume
              </a>
            </div>
          </Drawer>
        </div>
      </div>
    </header>
  );
}
