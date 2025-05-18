"use client";

import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

import Image from "next/image";

type ImageSliderProps = {
  slides: Array<{
    __typename?: "UploadFile";
    url: string;
    alternativeText?: string | null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    formats?: any;
  } | null>;
};

const ImageSlider = ({ slides }: ImageSliderProps) => {
  // console.log(slides);
  if (!FileSystemDirectoryReader) return <h1>No slides yet</h1>;
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Gallery</h1>
      <Fade>
        {slides.map(slide => (
          <div className="each-fade" key={slide?.url}>
            <Image
              className="h-auto w-full"
              src={slide?.formats?.medium?.url || slide?.url || ""}
              alt={slide?.alternativeText || "Gallery image"}
              width={1200}
              height={800}
            />
          </div>
        ))}
      </Fade>
    </div>
  );
};

export default ImageSlider;
