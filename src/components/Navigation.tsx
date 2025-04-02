"use client";

import Link from "next/link";
import Image from "next/image";

import MenuLinks, { type MenuLink } from "./MenuLinks";
import MobileMenuLinks from "./MobileMenuLinks";
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
  return (
    <div className="sticky top-0 z-30 w-full">
      <div className="navbar bg-base-100 shadow-lg">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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

            <MobileMenuLinks links={data?.data?.header?.menuLink as MenuLink[]} />
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
