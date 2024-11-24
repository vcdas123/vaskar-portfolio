"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { CiMenuFries } from "react-icons/ci";

interface LinksIn {
  name: string;
  path: string;
}

const LINKS_DATA: LinksIn[] = [
  {
    name: "home",
    path: "/",
  },
  {
    name: "services",
    path: "/services",
  },
  {
    name: "resume",
    path: "/resume",
  },
  // {
  //   name: "work",
  //   path: "/work",
  // },
  {
    name: "contact",
    path: "/contact",
  },
];

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const links = (
    <>
      {LINKS_DATA?.map((link: LinksIn) => {
        return (
          <Link
            key={link?.name}
            href={link?.path}
            className={`capitalize transition-all hover:text-accent-hover font-medium ${
              link.path === pathname && "text-accent border-b-2 border-accent"
            }`}
            onClick={handleClose}
          >
            {link?.name}
          </Link>
        );
      })}
    </>
  );

  const desktop = (
    <div className="hidden xl:flex items-center gap-8">
      <nav className="flex gap-8">{links}</nav>
      <Link href="/projects">
        <Button>Projects</Button>
      </Link>
    </div>
  );

  const mobile = (
    <div className="xl:hidden">
      <Sheet open={isOpen} onOpenChange={flag => setIsOpen(flag)}>
        <SheetTrigger className="flex justify-center items-center">
          <CiMenuFries className="text-[32px] text-accent" />
        </SheetTrigger>
        <SheetContent>
          <div className="mt-32 mb-40 text-center text-2xl">
            <Link href={"/"} onClick={handleClose}>
              <h1 className="text-4xl font-semibold">
                Vaskar<span className="text-accent">.</span>
              </h1>
            </Link>
          </div>
          <nav className="flex flex-col gap-4 justify-center items-center">
            {links}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );

  return (
    <>
      {desktop}
      {mobile}
    </>
  );
};

export default Nav;
