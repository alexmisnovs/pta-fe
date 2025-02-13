import React from "react";

type HeroProps = {
  title: string;
  content: string;
  url: string;
};

const Hero = async ({ url, title, content }: HeroProps) => {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: "url(" + (url as string) + ")",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">{title}</h1>
          <p className="mb-5">
            {content}
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
            exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
          </p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
