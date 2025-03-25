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

        // Use type guard with default value
        const blockType = block.__typename || "unknown";
        const keyBase = `block-${index}-${blockType}`;

        switch (blockType) {
          case "ComponentSharedRichText":
            return (
              <ReactMarkdown key={keyBase} className="markdown my-4">
                {(block as RichTextBlock).body || ""}
              </ReactMarkdown>
            );

          case "ComponentPtaRichTextMarkdown":
            return (
              <ReactMarkdown key={keyBase} className="markdown my-4">
                {(block as RichTextMarkdownBlock).content || ""}
              </ReactMarkdown>
            );

          case "ComponentSharedMedia":
            const mediaBlock = block as MediaBlock;
            if (!mediaBlock.file?.url) return null;
            return (
              <figure key={keyBase} className="my-6">
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
