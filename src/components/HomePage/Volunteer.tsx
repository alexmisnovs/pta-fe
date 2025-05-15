import Image from "next/image";
import Link from "next/link";

import ReactMarkdown from "react-markdown";

import { VolunteerSectionBlock } from "@/types/blocks";

const Volunteer = ({ content, image }: VolunteerSectionBlock) => {
  return (
    <div className="container flex flex-col md:flex-row items-center gap-8 md:gap-12">
      <div className="flex-1 md:order-2 max-w-xl">
        <ReactMarkdown className="markdown prose">{content}</ReactMarkdown>
        <Link href="/volunteer">
          <button className="btn bg-custom-red hover:bg-custom-blue text-white font-bold py-2 px-4 rounded border-0 mt-4">
            Signup
          </button>
        </Link>
      </div>

      <div className="md:order-1 flex-1 flex justify-end">
        <Image
          src={image?.formats?.medium?.url || image?.url}
          alt={image?.formats?.medium?.alternativeText || "Volunteer image"}
          width={450}
          height={450}
          className="object-cover rounded-lg w-full max-w-[450px] h-[450px]"
          priority={false}
          sizes="(max-width: 768px) 100vw, 450px"
          quality={80}
        />
      </div>
    </div>
  );
};

export default Volunteer;
