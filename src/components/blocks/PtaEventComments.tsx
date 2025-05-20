import ReactMarkdown from "react-markdown";

import { type EventComments } from "@/types/blocks";
import ImageSlider from "../shared/ImageSlider";

type PtaEventCommentsProps = EventComments & {
  key?: string; // Make key optional
};

const PtaEventComments = ({ content, slider, heading, amountRaised }: PtaEventCommentsProps) => {
  return (
    <div className="border-2 border-gray-200 rounded-lg p-6 my-8 shadow-md">
      <h2 className="text-3xl font-bold text-center mb-8">{heading}</h2>
      <ReactMarkdown className="markdown my-4">{content || ""}</ReactMarkdown>

      {/* Add slider if present */}
      {slider && (
        <div className="my-8">
          <ImageSlider slides={slider.slides || []} heading="Event Gallery" />
        </div>
      )}

      {amountRaised && (
        <div className="flex justify-center my-8">
          <div className="bg-green-100 border-2 border-green-500 rounded-lg px-6 py-4 text-center max-w-md">
            <h3 className="text-xl font-bold text-green-700 mb-1">Amount Raised</h3>
            <p className="text-3xl font-bold text-green-600">£{amountRaised.toLocaleString()}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PtaEventComments;
