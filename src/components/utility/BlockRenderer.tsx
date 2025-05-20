// components/BlockRenderer.tsx

import ReactMarkdown from "react-markdown";
import ImageSlider from "@/components/shared/ImageSlider";
import TextWithImage from "../blocks/TextWithImage";
import PtaEventComments from "../blocks/PtaEventComments";
import MediaImage from "../blocks/MediaImage";

import {
  Block,
  RichTextBlock,
  RichTextMarkdownBlock,
  EventComments,
  RichTextWithImageType,
  MediaBlock,
  SliderBlock,
} from "@/types/blocks";

type BlockRendererProps = {
  blocks: (Block | null | undefined)[];
  className?: string;
};

const BlockRenderer = ({ blocks, className }: BlockRendererProps) => {
  if (!blocks?.length) return null;

  return (
    <div key={1} className={className}>
      {blocks.map((block, index) => {
        if (!block) return null;
        const key = block.id
          ? `block-${block.id}-${block.__typename}`
          : `block-${index}-${block.__typename || "unknown"}`;
        // Use type guard with default value
        const blockType = block.__typename || "unknown";

        switch (blockType) {
          case "ComponentSharedRichText":
            return (
              <ReactMarkdown key={key} className="markdown my-4">
                {(block as RichTextBlock).body || ""}
              </ReactMarkdown>
            );

          case "ComponentPtaRichTextMarkdown":
            return (
              <ReactMarkdown key={key} className="markdown my-4">
                {(block as RichTextMarkdownBlock).content || ""}
              </ReactMarkdown>
            );
          case "ComponentPtaEventComments":
            const ptaEventCommentsBlock = block as EventComments;
            if (!ptaEventCommentsBlock.content) return null;
            return <PtaEventComments key={key} {...ptaEventCommentsBlock} />;

          case "ComponentPtaTextWithImage":
            const textWithImageBlock = block as RichTextWithImageType;

            return <TextWithImage key={key} {...textWithImageBlock} />;

          case "ComponentSharedMedia":
            const mediaBlock = block as MediaBlock;

            if (!mediaBlock.file?.url) return null;
            return (
              <div className="my-8" key={key}>
                <MediaImage file={mediaBlock.file} />
              </div>
            );

          case "ComponentSharedQuote":
          case "ComponentSharedSlider":
            const sliderBlock = block as SliderBlock;

            return (
              <div className="my-8" key={key}>
                <ImageSlider slides={sliderBlock.slides || []} heading="Image Gallery" />
              </div>
            );

          case "Error":
            // Handle other types when ready
            return null;

          default:
            console.warn(`Unhandled block type: ${blockType}`);
            return null;
        }
      })}
    </div>
  );
};

export default BlockRenderer;
