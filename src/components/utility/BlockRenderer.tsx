// components/BlockRenderer.tsx
import Image from "next/image";
import ReactMarkdown from "react-markdown";

// Define all possible block types from your GraphQL schema
type BlockType =
  | "ComponentSharedRichText"
  | "ComponentSharedMedia"
  | "ComponentSharedQuote"
  | "ComponentSharedSlider"
  | "ComponentPtaRichTextMarkdown"
  | "ComponentPtaTextWithImage"
  | "Error";

// Base block type with required __typename
type BaseBlock = {
  __typename?: BlockType;
  id?: string;
};

// Specific block types
type RichTextBlock = BaseBlock & {
  __typename: "ComponentSharedRichText";
  body?: string;
};

type RichTextMarkdownBlock = BaseBlock & {
  __typename: "ComponentPtaRichTextMarkdown";
  content?: string;
};

type TextWithImageBlock = BaseBlock & {
  __typename: "ComponentPtaTextWithImage";
  heading?: string;
  content?: string;
  file?: {
    url: string;
    alternativeText?: string | null;
    width?: number;
    height?: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    formats?: any;
  } | null;
  imageSide?: "left" | "right";
};

type MediaBlock = BaseBlock & {
  __typename: "ComponentSharedMedia";
  file?: {
    url: string;
    alternativeText?: string | null;
    width?: number;
    height?: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    formats?: any;
  } | null;
};

type QuoteBlock = BaseBlock & {
  __typename: "ComponentSharedQuote";
  // Add quote-specific fields
};

type SliderBlock = BaseBlock & {
  __typename: "ComponentSharedSlider";
  // Add slider-specific fields
};

type ErrorBlock = BaseBlock & {
  __typename: "Error";
  // Add error-specific fields
};

// Union type for all possible blocks
export type Block =
  | RichTextBlock
  | MediaBlock
  | QuoteBlock
  | SliderBlock
  | RichTextMarkdownBlock
  | TextWithImageBlock
  | ErrorBlock;

type BlockRendererProps = {
  blocks: (Block | null | undefined)[];
  className?: string;
};

const BlockRenderer = ({ blocks, className }: BlockRendererProps) => {
  if (!blocks?.length) return null;

  return (
    <div className={className}>
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

          case "ComponentPtaTextWithImage":
            const textWithImageBlock = block as TextWithImageBlock;
            if (!textWithImageBlock.file?.url) return null;
            const imageSide = textWithImageBlock.imageSide || "left";

            return (
              <div key={key}>
                <h2 className="text-3xl font-bold text-center mb-8 pt-6">
                  {textWithImageBlock.heading}
                </h2>
                <div className="my-6 overflow-hidden">
                  {/* Image with conditional floating and responsive sizing */}
                  <figure
                    className={`
                      w-full mx-auto mb-4 
                      md:w-[45%] md:max-w-lg 
                      ${
                        imageSide === "right"
                          ? "md:float-right md:ml-8 md:mb-4"
                          : "md:float-left md:mr-8 md:mb-4"
                      }
                    `}
                  >
                    <div className="relative aspect-video">
                      <Image
                        src={
                          textWithImageBlock.file.formats?.medium?.url ||
                          textWithImageBlock.file.url
                        }
                        alt={textWithImageBlock.file.alternativeText || ""}
                        width={textWithImageBlock.file.formats?.medium?.width || 0}
                        height={textWithImageBlock.file.formats?.medium?.height || 0}
                        sizes="(max-width: 768px) 100vw, 800px"
                        className="object-cover"
                        quality={80}
                      />
                    </div>
                  </figure>

                  {/* Text content that wraps around image */}
                  <ReactMarkdown className="markdown prose max-w-none">
                    {textWithImageBlock.content || ""}
                  </ReactMarkdown>
                </div>
              </div>
            );
          case "ComponentSharedMedia":
            const mediaBlock = block as MediaBlock;
            if (!mediaBlock.file?.url) return null;
            return (
              <figure key={key} className="my-6">
                <div className="relative w-full max-w-2xl mx-auto aspect-video">
                  <Image
                    src={mediaBlock.file.formats?.medium?.url || mediaBlock.file.url}
                    alt={mediaBlock.file.alternativeText || ""}
                    width={mediaBlock.file.formats?.medium?.width || 0}
                    height={mediaBlock.file.formats?.medium?.height || 0}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                    className="object-cover"
                    quality={80}
                  />
                </div>
              </figure>
            );

          case "ComponentSharedQuote":
          case "ComponentSharedSlider":
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
