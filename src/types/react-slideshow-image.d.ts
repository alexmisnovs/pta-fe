declare module "react-slideshow-image" {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  export class Zoom extends React.Component<ZoomProps & any, any> {
    goBack(): void;
    goNext(): void;
    goTo(index: number): void;
  }
  /* eslint-disable @typescript-eslint/no-explicit-any */
  export class Fade extends React.Component<SlideshowProps & any, any> {
    goBack(): void;
    goNext(): void;
    goTo(index: number): void;
  }
  /* eslint-disable @typescript-eslint/no-explicit-any */
  export class Slide extends React.Component<SlideshowProps & any, any> {
    goBack(): void;
    goNext(): void;
    goTo(index: number): void;
  }
  export interface SlideshowProps {
    duration?: number;
    transitionDuration?: number;
    defaultIndex?: number;
    indicators?: boolean;
    prevArrow?: object;
    nextArrow?: object;
    arrows?: boolean;
    autoplay?: boolean;
    infinite?: boolean;
    onChange?(oldIndex: number, newIndex: number): void;
    pauseOnHover?: boolean;
    slidesToShow?: number;
    slidesToScroll?: number;
    canSwipe?: boolean;
    easing?: string;
    cssClass?: string;
  }
  export interface ZoomProps extends SlideshowProps {
    scale: number;
  }
}
