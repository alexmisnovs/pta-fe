import Image from "next/image";
import Link from "next/link";

type FooterProps = {
  data: {
    footer?: {
      copyright?: string | null;
      socialLink?: Array<{
        buttonText?: string | null;
        link?: string | null;
      } | null> | null;
      footerLogo?: {
        url: string;
        // eslint-disable-next-line  @typescript-eslint/no-explicit-any
        formats?: any | null;
        alternativeText?: string | null;
      } | null;
    } | null;
  };
  siteName?: string;
};

const Footer = ({ data, siteName }: FooterProps) => {
  const socialLinks = data?.footer?.socialLink?.map(link => ({
    buttonText: link?.buttonText,
    url: link?.link?.startsWith("http") ? link.link : `https://${link?.link}`,
  }));

  return (
    <footer className="bg-custom-blue text-neutral-content">
      <div className="container mx-auto py-8">
        {/* Main footer content */}
        <div className="footer items-start px-4">
          {/* Logo and Site Name */}
          <aside className="flex flex-col items-start">
            <div className="flex items-center gap-2">
              <Link href="/" className="btn btn-ghost px-0">
                <Image
                  src={data?.footer?.footerLogo?.url as string}
                  alt="Logo"
                  width={50}
                  height={50}
                />
              </Link>
              <h2 className="text-base">{siteName}</h2>
            </div>
          </aside>

          {/* Address and Registration */}
          <div className="flex flex-col gap-2">
            <p className="max-w-md">
              St Modwen&apos;s School PTA, St Modwen&apos;s Catholic Primary School, Tutbury Road,
              Burton-on-Trent, Staffordshire, DE13 0AJ
            </p>
            <p>
              Registered with the Charity Commission as{" "}
              <a
                className="underline ml-1"
                target="_blank"
                href="https://register-of-charities.charitycommission.gov.uk/charity-search/-/results/page/1/delta/20/keywords/1017392"
              >
                1017392
              </a>
            </p>
          </div>

          {/* Social Links */}
          <nav className="flex gap-4">
            {socialLinks?.map(link => (
              <a
                key={link.buttonText}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-custom-red transition-colors"
              >
                {link.buttonText === "Facebook" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="fill-current"
                  >
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="fill-current"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                )}
              </a>
            ))}
          </nav>
        </div>

        {/* Copyright at bottom */}
        <div className="border-t border-gray-600 mt-8 pt-4 px-4">
          <p className="text-center text-sm">{data?.footer?.copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
