import Link from "next/link";
import { MenuLink } from "./MenuLinks";

type MobileMenuLinksProps = {
  links: MenuLink[];
  onLinkClick: () => void;
};

const MobileMenuLinks = ({ links, onLinkClick }: MobileMenuLinksProps) => {
  return (
    <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 absolute">
      {links?.map((link, index) => (
        <li key={index}>
          <Link href={link?.link || "#"} onClick={onLinkClick}>
            {link?.buttonText}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MobileMenuLinks;
