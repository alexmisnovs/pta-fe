import Link from "next/link";

type HeroProps = {
  __typename?: "ComponentPtaHeroSection";
  title?: string | null;
  content?: string | null;
  backgroundImage?: {
    __typename?: "UploadFile";
    url: string;
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    formats?: any | null;
  } | null;
};

// const Hero = async ({ backgroundImage, title, content }: HeroProps) => {
//   // console.log(content);
//   return (
//     <div className="container">
//       <div
//         className="hero h-96 md:h-[500px]  overflow-hidden"
//         style={{
//           backgroundImage: "url(" + (backgroundImage?.url as string) + ")",
//         }}
//       >
//         <div className="hero-overlay bg-opacity-60"></div>
//         <div className="hero-content text-neutral-content text-center">
//           <div className="max-w-md">
//             <h1 className="mb-5 text-5xl font-bold">{title}</h1>
//             <p className="mb-5">{content}</p>
//             <Link
//               className="btn bg-custom-red hover:bg-custom-blue text-white font-bold py-2 px-4 rounded"
//               href="/events"
//             >
//               Checkout out our events
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
const Hero = async ({ backgroundImage, title, content }: HeroProps) => {
  // console.log(backgroundImage?.formats);
  return (
    <div className="container">
      <div
        className="hero min-h-[400px] md:h-[500px] overflow-hidden"
        style={{
          backgroundImage: `url(${backgroundImage?.formats?.medium?.url})`,
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md px-4">
            <h1 className="mb-5 text-4xl md:text-5xl font-bold">{title}</h1>
            <p className="mb-5 text-sm md:text-base">{content}</p>
            <Link
              className="btn bg-custom-red hover:bg-custom-blue text-white font-bold py-3 px-6 rounded-lg text-sm md:text-base md:py-2 md:px-4"
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
