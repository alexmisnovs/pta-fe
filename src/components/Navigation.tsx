"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import MenuLinks, { type MenuLink } from "./MenuLinks";
// Return a list of `params` to populate the [data] dynamic segment
type NavProps = {
  data: {
    header?: {
      logoText?: string | null;
      donateButtonLink?: {
        link?: string | null;
      } | null;
      menuLink?: Array<{
        buttonText?: string | null;
        link?: string | null;
      } | null> | null;
      logoImage?: {
        url: string;
        // eslint-disable-next-line  @typescript-eslint/no-explicit-any
        formats?: any | null;
      } | null;
    } | null;
  };
  // data: typeof HeaderDocument;
};

export const Navigation = (data: NavProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Close menu when clicking outside
  useEffect(() => {
    if (isMenuOpen) {
      const handleClickOutside = () => {
        setIsMenuOpen(false);
      };

      // Add a slight delay to avoid immediate closure
      setTimeout(() => {
        document.addEventListener("click", handleClickOutside);
      }, 30);

      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }
  }, [isMenuOpen]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Return a simplified placeholder during server rendering
  if (!isMounted) {
    return (
      <div className="sticky top-0 z-30 w-full">
        <div className="navbar bg-base-100 shadow-lg">
          {/* Simplified navbar for initial render */}
          <div className="navbar-start">
            <div className="flex w-full max-lg:justify-start max-sm:justify-start">
              <div className="btn btn-ghost px-1 sm:px-2 gap-3 sm:gap-2 min-h-0 h-auto">
                <div className="h-8 w-8 sm:h-10 sm:w-10"></div>
                <div className="text-l sm:text-xl truncate sm:max-w-none">
                  {data?.data?.header?.logoText}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const toggleMenu = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation(); // Prevent event bubbling
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  const DynamicMobileMenu = dynamic(() => import("./MobileMenuLinks"), { ssr: false });

  return (
    <div className="sticky top-0 z-30 w-full">
      <div className="navbar bg-base-100 shadow-lg">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden"
              onClick={toggleMenu}
              onTouchEnd={toggleMenu}
              suppressHydrationWarning
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>

            {isMenuOpen && (
              <div onClick={e => e.stopPropagation()} suppressHydrationWarning>
                <DynamicMobileMenu
                  links={data?.data?.header?.menuLink as MenuLink[]}
                  onLinkClick={closeMobileMenu}
                />
              </div>
            )}
          </div>
          {/* Modified logo section */}
          <div className="flex w-full max-lg:justify-start max-sm:justify-start">
            <Link href="/" className="btn btn-ghost px-1 sm:px-2 gap-3 sm:gap-2 min-h-0 h-auto">
              <Image
                src={data?.data?.header?.logoImage?.url as string}
                alt="Logo"
                width={50}
                height={50}
                className="h-8 w-8 sm:h-10 sm:w-10"
              />
              <div className="text-l sm:text-xl truncate  sm:max-w-none">
                {data?.data?.header?.logoText}
              </div>
            </Link>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <MenuLinks links={data?.data?.header?.menuLink as MenuLink[]} />
        </div>
        <div className="navbar-end">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={data?.data?.header?.donateButtonLink?.link ?? ""}
            className="hidden sm:inline-flex btn btn-md bg-custom-red hover:bg-custom-blue text-white font-bold rounded px-4"
          >
            Donate
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
