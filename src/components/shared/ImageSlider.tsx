"use client";

import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

// const fadeImages = [
//   "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
//   "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
//   "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
// ];

type ImageSliderProps = {
  slides?: ({
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
            <img style={{ width: "100%" }} className="h-auto" src={slide?.formats?.medium?.url} />
          </div>
        ))}
      </Fade>
    </div>
  );
};

export default ImageSlider;
