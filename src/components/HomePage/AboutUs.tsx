import ReactMarkdown from "react-markdown";

import { AboutSectionBlock } from "@/types/blocks";

const AboutUs = ({ heading, description, content }: AboutSectionBlock) => {
  // console.log(content);
  return (
    <div className="container">
      <h2 className="text-3xl font-bold text-center mb-8">{heading}</h2>
      <p className="markdown prose">{description}</p>
      <ReactMarkdown className="markdown prose">{content}</ReactMarkdown>
    </div>
  );
};

export default AboutUs;
