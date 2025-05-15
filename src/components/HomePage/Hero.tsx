import Link from "next/link";
import Image from "next/image";

import { HeroSectionBlock } from "@/types/blocks";

const Hero = ({ backgroundImage, title, content }: HeroSectionBlock) => {
  return (
    <div className="w-full relative">
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage?.formats?.medium?.url || ""}
          alt="Hero background"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={85}
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>
      <div className="relative z-10 min-h-[400px] md:h-[500px] flex items-center justify-center">
        <div className="hero-content text-neutral-content text-center">
          <div className="md:w-3xl max-w-3xl px-4">
            <h1 className="mb-5 text-3xl md:text-5xl font-bold">{title}</h1>
            <p className="mb-5 text-sm md:text-base">{content}</p>
            <Link
              className="btn bg-custom-red hover:bg-custom-blue text-white font-bold py-3 px-6 rounded-lg text-sm md:text-base md:py-2 md:px-4 border-0"
              href="/events"
            >
              Checkout out our events
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
