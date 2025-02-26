import React from "react";

type HeroProps = {
  __typename?: "ComponentPtaHeroSection";
  title?: string | null;
  content?: string | null;
  backgroundImage?: {
    __typename?: "UploadFile";
    url: string;
  } | null;
};

const Hero = async ({ backgroundImage, title, content }: HeroProps) => {
  // console.log(content);
  return (
    <div className="container">
      <div
        className="hero h-96 md:h-[500px] rounded-box overflow-hidden"
        style={{
          backgroundImage: "url(" + (backgroundImage?.url as string) + ")",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">{title}</h1>
            <p className="mb-5">{content}</p>
            <button className="btn btn-primary">Checkout out our events</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
