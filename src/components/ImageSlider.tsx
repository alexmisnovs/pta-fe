"use client";

import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

// const fadeImages = [
//   "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
//   "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
//   "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
// ];
type Slide = {
  url: string;
  __typename?: string;
};

type ImageSliderProps = {
  slides: Slide[];
};

const ImageSlider = ({ slides }: ImageSliderProps) => {
  console.log(slides);
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <Fade>
          <div className="each-fade">
            <img src={slides[0].url} />
          </div>
          <div className="each-fade">
            <img src={slides[1].url} />
          </div>
          <div className="each-fade">
            <img src={slides[2].url} />
          </div>
        </Fade>
      </div>
    </section>
  );
};

export default ImageSlider;
