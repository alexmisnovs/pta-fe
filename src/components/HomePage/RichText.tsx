import ReactMarkdown from "react-markdown";

import { RichTextMarkdown } from "@/types/blocks";

const RichText = ({ content, heading }: RichTextMarkdown) => {
  return (
    <div className="container">
      <h2 className="text-3xl font-bold text-center mb-8 pt-6">{heading}</h2>
      <ReactMarkdown className="markdown prose">{content}</ReactMarkdown>
    </div>
  );
};

export default RichText;
