'use client';
import React, { ReactNode, useState } from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { CiMenuFries } from 'react-icons/ci';
import { FaAddressCard, FaHome } from 'react-icons/fa';
import { IoMdContact } from 'react-icons/io';
import { GrProjects } from 'react-icons/gr';
import { RiCustomerService2Fill } from 'react-icons/ri';

interface LinksIn {
  name: string;
  path: string;
  icon: ReactNode;
}

const LINKS_DATA: LinksIn[] = [
  {
    name: 'home',
    path: '/',
    icon: <FaHome />,
  },
  {
    name: 'services',
    path: '#services',
    icon: <RiCustomerService2Fill />,
  },
  {
    name: 'resume',
    path: '#resume',
    icon: <FaAddressCard />,
  },
  // {
  //   name: "work",
  //   path: "/work",
  // },
  {
    name: 'contact',
    path: '#contact',
    icon: <IoMdContact />,
  },
];

const Nav = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathname = usePathname();

  // const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const links = (
    <>
      {LINKS_DATA?.map((link: LinksIn) => {
        return (
          <Link
            key={link?.name}
            href={link?.path}
            className={`capitalize transition-all flex items-center gap-1 hover:text-accent-hover font-medium ${
              link.path === pathname && 'text-accent border-b-2 border-accent'
            }`}
            onClick={handleClose}
          >
            {link?.icon}
            {link?.name}
          </Link>
        );
      })}
    </>
  );

  const desktop = (
    <div className="hidden xl:flex items-center gap-8">
      <nav className="flex gap-8">{links}</nav>
      <Link href="#projects">
        <Button className="flex gap-1">
          <GrProjects /> Projects
        </Button>
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
            <Link href={'/'} onClick={handleClose}>
              <h1 className="text-4xl font-semibold">
                Vaskar<span className="text-accent">.</span>
              </h1>
            </Link>
          </div>
          <nav className="flex flex-col gap-4 justify-center items-center">
            {links}
            <Link
              href={'#projects'}
              className={`capitalize transition-all flex items-center gap-1 hover:text-accent-hover font-medium ${
                '/projects' === pathname && 'text-accent border-b-2 border-accent'
              }`}
              onClick={handleClose}
            >
              <GrProjects className="text-sm" /> Projects
            </Link>
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
