"use client";
import Link from "next/link";
import React from "react";
import Nav from "../nav/Nav";

const Header = () => {
  return (
    <header className="py-8 xl:py-12 text-white sticky top-0 z-10 bg-primary">
      <div className="container mx-auto flex justify-between items-center">
        {/* LOGO */}
        <Link href={"/"}>
          <h1 className="text-4xl font-semibold">
            Vaskar<span className="text-accent">.</span>
          </h1>
        </Link>

        <Nav />
      </div>
    </header>
  );
};

export default Header;
