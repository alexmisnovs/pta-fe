"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type MenuLink = {
  buttonText: string;
  link: string;
};

type LinksProps = {
  links: MenuLink[];
};

export default function MenuLinks({ links }: LinksProps) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path ? "active" : "";
  };

  return (
    <ul className="menu menu-horizontal px-1">
      {links?.map(link => (
        <li key={link.buttonText}>
          <Link href={link.link} className={isActive(link.link)}>
            {link.buttonText}
          </Link>
        </li>
      ))}
    </ul>
  );
}
