"use client";

import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

type ImageSliderProps = {
  slides?: ({
    alternativeText?: string | null;
    __typename?: "UploadFile";
    url: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    formats?: any;
  } | null)[];
  heading?: string;
};

const ImageSlider = ({ slides, heading }: ImageSliderProps) => {
  if (!slides || slides.length == 0) return null;
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">{heading}</h1>
      <Fade>
        {slides.map(slide => (
          <div className="each-fade" key={`slide-${slide?.url}-${Math.random()}`}>
            <div className="h-[500px] flex items-center justify-center overflow-hidden">
              <img
                src={slide?.formats?.medium?.url}
                alt={slide?.alternativeText || "Gallery image"}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </div>
        ))}
      </Fade>
    </div>
  );
};

export default ImageSlider;
