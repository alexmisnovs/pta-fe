import Link from "next/link";
import Image from "next/image"; // Add this import

type FeaturedPojectProps = {
  __typename?: "ComponentPtaFeaturedProject";
  heading?: string | null;
  description?: string | null;
  goalDonations?: number | null;
  currentDonations?: number | null;
  image?: {
    __typename?: "UploadFile";
    url: string;
    alternativeText?: string | null;
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    formats?: any | null;
  } | null;
  projectLink?: {
    __typename?: "ComponentSharedButtonLink";
    link?: string | null;
    buttonText?: string | null;
  } | null;
};
const FeaturedProject = async (projectData: FeaturedPojectProps) => {
  const raised = projectData.currentDonations || 0;
  const target = projectData.goalDonations || 0;
  const percentage = ((raised / target) * 100).toFixed(0);

  // console.log(projectData.image?.formats);
  return (
    <div className="container flex flex-col md:flex-row gap-8 items-start py-8">
      {/* Image Section - Left Side */}
      <div className="w-full md:w-1/2 h-69 md:h-[500px] relative rounded-xl overflow-hidden">
        {/* <img
          src={projectData.image?.formats?.medium.url}
          alt={projectData.heading || ""}
          className="w-full h-full object-cover"
        /> */}
        <Image
          src={projectData.image?.formats?.medium.url || projectData?.image?.url}
          alt={projectData.image?.alternativeText || projectData?.heading || "Project name"}
          layout="responsive" // Optional: adjust as needed
          width={500} // Set an appropriate width
          height={500} // Set an appropriate height
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Section - Right Side */}
      <div className="w-full md:w-1/2 flex flex-col gap-6">
        {/* Title and Description */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold mb-12">{projectData.heading}</h1>
          <p className="text-lg text-gray-600">{projectData.description}</p>
          <Link
            className="inline-block bg-custom-red hover:bg-custom-blue text-white font-bold py-3 px-8 rounded-lg transition-colors"
            href={projectData.projectLink?.link || "/projects"}
          >
            {projectData.projectLink?.buttonText || "More details"}
          </Link>
        </div>

        {/* Donation Data */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Current Total</h3>

          <div className="flex justify-between items-center mb-4">
            <span className="text-3xl font-bold text-green-600">£{raised.toLocaleString()}</span>
            <span className="text-xl text-gray-500">£{target.toLocaleString()}</span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
            <div
              className="bg-green-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${percentage}%` }}
            />
          </div>

          <div className="flex justify-between text-base">
            <div>
              <p className="font-semibold text-gray-800">{percentage}% Funded</p>
              {/* <p className="text-sm text-gray-500 mt-1">Our Goal</p> */}
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-800">£{raised.toLocaleString()} Raised</p>
              {/* <p className="text-sm text-gray-500 mt-1">Target: £{target.toLocaleString()}</p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
// const FeaturedProject = async (projectData: FeaturedPojectProps) => {
//   const raised = 2176;
//   const target = 7500;
//   const percentage = ((raised / target) * 100).toFixed(0);

//   return (
//     <div className="container flex flex-col md:flex-row gap-8 items-center py-8">
//       {/* Image Section - Left Side */}
//       <div className="w-full md:w-1/2 h-96 md:h-[500px] relative rounded-xl overflow-hidden">
//         <img
//           src={projectData.image?.url}
//           alt={projectData.heading || ""}
//           className="w-full h-full object-cover"
//         />
//         <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4">
//           <div className="text-center text-white">
//             <h1 className="text-4xl md:text-5xl font-bold mb-4">{projectData.heading}</h1>
//             <p className="text-lg md:text-xl mb-6">{projectData.description}</p>
//             <Link
//               className="btn bg-custom-red hover:bg-custom-blue text-white font-bold py-2 px-6 rounded-lg"
//               href="/projects"
//             >
//               Check out projects
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* Donation Data - Right Side */}
//       <div className="w-full md:w-1/2 max-w-md bg-white p-6 rounded-xl shadow-lg">
//         <h3 className="text-2xl font-bold text-gray-800 mb-6">Current Total</h3>

//         <div className="flex justify-between items-center mb-4">
//           <span className="text-3xl font-bold text-green-600">£{raised.toLocaleString()}</span>
//           <span className="text-xl text-gray-500">£{target.toLocaleString()}</span>
//         </div>

//         <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
//           <div
//             className="bg-green-500 h-3 rounded-full transition-all duration-300"
//             style={{ width: `${percentage}%` }}
//           />
//         </div>

//         <div className="flex justify-between text-base">
//           <div>
//             <p className="font-semibold text-gray-800">{percentage}% Funded</p>
//             <p className="text-sm text-gray-500 mt-1">Our Goal</p>
//           </div>
//           <div className="text-right">
//             <p className="font-semibold text-gray-800">£{raised.toLocaleString()} Raised</p>
//             <p className="text-sm text-gray-500 mt-1">Target: £{target.toLocaleString()}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// const FeaturedProject = async (projectData: FeaturedPojectProps) => {
//   // Calculate funding progress
//   const raised = 2176;
//   const target = 7500;
//   const percentage = ((raised / target) * 100).toFixed(0);

//   return (
//     <div className="container">
//       {/* Hero Section (existing code remains the same) */}
//       <div
//         className="hero h-96 md:h-[500px] overflow-hidden"
//         style={{ backgroundImage: `url(${projectData.image?.url})` }}
//       >
//         <div className="hero-overlay bg-opacity-60"></div>
//         <div className="hero-content text-neutral-content text-center">
//           <div className="max-w-md">
//             <h1 className="mb-5 text-5xl font-bold">{projectData.heading}</h1>
//             <p className="mb-5">{projectData.description}</p>
//             <Link
//               className="btn bg-custom-red hover:bg-custom-blue text-white font-bold py-2 px-4 rounded border-inherit"
//               href="/projects"
//             >
//               Check out projects
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* Funding Progress Section - Updated to match screenshot */}
//       <div className="max-w-md mx-auto mt-8 px-4 sm:px-0">
//         <h3 className="text-lg font-semibold text-gray-700 text-center mb-4">Current Total</h3>

//         <div className="flex justify-between items-center mb-3">
//           <span className="text-3xl font-bold text-green-600">£{raised.toLocaleString()}</span>
//           <span className="text-xl text-gray-500">£{target.toLocaleString()}</span>
//         </div>

//         <div
//           className="w-full bg-gray-200 rounded-full h-3 mb-4"
//           role="progressbar"
//           aria-valuenow={raised}
//           aria-valuemin={0}
//           aria-valuemax={target}
//         >
//           <div
//             className="bg-green-500 h-3 rounded-full transition-all duration-300"
//             style={{ width: `${percentage}%` }}
//           />
//         </div>

//         <div className="flex justify-between text-sm">
//           <div className="text-left">
//             <p className="font-medium text-gray-700">{percentage}% Funded</p>
//             <p className="text-gray-500 text-xs mt-1">Goal</p>
//           </div>
//           <div className="text-right">
//             <p className="font-medium text-gray-700">£{raised.toLocaleString()} Raised</p>
//             <p className="text-gray-500 text-xs mt-1">Target: £{target.toLocaleString()}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const FeaturedProject = async (projectData: FeaturedPojectProps) => {
//   // console.log(content);
//   return (
//     <div className="container">
//       <div
//         className="hero h-96 md:h-[500px]  overflow-hidden"
//         style={{
//           backgroundImage: "url(" + (projectData.image?.url as string) + ")",
//         }}
//       >
//         <div className="hero-overlay bg-opacity-60"></div>
//         <div className="hero-content text-neutral-content text-center">
//           <div className="max-w-md">
//             <h1 className="mb-5 text-5xl font-bold">{projectData.heading}</h1>
//             <p className="mb-5">{projectData.description}</p>
//             <Link
//               className="btn bg-custom-red hover:bg-custom-blue text-white font-bold py-2 px-4 rounded border-inherit"
//               href="/projects"
//             >
//               Check out projects
//             </Link>
//           </div>
//         </div>
//       </div>
//       {/* funding section example 1 */}
//       {/* <div className="max-w-md mx-auto space-y-4">
//         <h3 className="text-xl font-bold text-center">Current Total</h3>

//         <div className="flex justify-between items-baseline font-semibold">
//           <span className="text-2xl text-primary">£2,176</span>
//           <span className="text-lg text-neutral">£7,500</span>
//         </div>

//         <div
//           className="progress progress-primary bg-base-200 h-4"
//           role="progressbar"
//           aria-valuenow={2176}
//           aria-valuemin={0}
//           aria-valuemax={7500}
//         >
//           <div
//             className="progress-bar"
//             style={{ width: "29%" }} // Calculate dynamically as (raised/total)*100
//           ></div>
//         </div>

//         <div className="flex justify-between text-sm">
//           <div className="space-y-1">
//             <p className="font-medium">29% Funded</p>
//             <p className="text-neutral">Goal</p>
//           </div>
//           <div className="text-right space-y-1">
//             <p className="font-medium">£2,176 Raised</p>
//             <p className="text-neutral">Target: £7,500</p>
//           </div>
//         </div>
//       </div> */}
//       <div className="max-w-md mx-auto space-y-4 font-sans">
//         <h3 className="text-lg font-semibold text-center text-gray-700 mb-4">Current Total</h3>

//         {/* Amounts Row */}
//         <div className="flex justify-between items-baseline">
//           <span className="text-3xl font-bold text-green-600">£2,176</span>
//           <span className="text-xl text-gray-500">£7,500</span>
//         </div>

//         {/* Progress Bar */}
//         <div className="w-full bg-gray-200 rounded-full h-4">
//           <div
//             className="bg-green-500 h-4 rounded-full transition-all duration-300"
//             style={{ width: "29%" }}
//           ></div>
//         </div>

//         {/* Status Row */}
//         <div className="flex justify-between">
//           <div className="text-left">
//             <p className="text-sm font-medium text-gray-700">29% Funded</p>
//             <p className="text-xs text-gray-500 mt-1">Goal</p>
//           </div>
//           <div className="text-right">
//             <p className="text-sm font-medium text-gray-700">£2,176 Raised</p>
//             <p className="text-xs text-gray-500 mt-1">Target: £7,500</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

export default FeaturedProject;
