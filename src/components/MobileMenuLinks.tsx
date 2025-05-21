"use client";

// import Link from "next/link";
import { useRouter } from "next/navigation";
import { type MenuLink } from "./MenuLinks";

type MobileMenuLinksProps = {
  links: MenuLink[];
  onLinkClick: () => void;
};

const MobileMenuLinks = ({ links, onLinkClick }: MobileMenuLinksProps) => {
  const router = useRouter();

  // Handle both click and touch events
  const handleNavigation = (e: React.MouseEvent | React.TouchEvent, href: string) => {
    e.preventDefault();
    e.stopPropagation();

    // Delay closing the menu slightly to ensure the click registers
    setTimeout(() => {
      onLinkClick();
      router.push(href);
    }, 50);
  };

  return (
    <ul
      tabIndex={0}
      className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
    >
      {links?.map((link, index) => (
        <li key={index}>
          <a
            href={link?.link || "#"}
            onClick={e => handleNavigation(e, link?.link || "/")}
            onTouchEnd={e => handleNavigation(e, link?.link || "/")}
          >
            {link?.buttonText}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default MobileMenuLinks;
