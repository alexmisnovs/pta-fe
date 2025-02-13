import Link from "next/link";
import { usePathname } from "next/navigation";

type MenuLink = {
  buttonText: string;
  link: string;
};

type LinksProps = {
  links: MenuLink[];
};

export default function MobileMenuLinks({ links }: LinksProps) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path ? "active" : "";
  };

  return (
    <ul
      tabIndex={0}
      className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
    >
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
