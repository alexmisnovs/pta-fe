import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { type RichTextWithImageType } from "@/types/blocks";

const TextWithImage = ({ content, file, heading, imageSide }: RichTextWithImageType) => {
  if (!file?.url) return null;
  const side = imageSide || "left";

  return (
    <div>
      <h2 className="text-3xl font-bold text-center mb-8 pt-6">{heading}</h2>
      <div className="my-6 overflow-hidden">
        {/* Image with conditional floating and responsive sizing */}
        <figure
          className={`
                      w-full mx-auto mb-4 
                      md:w-[45%] md:max-w-lg 
                      ${
                        side === "right"
                          ? "md:float-right md:ml-8 md:mb-4"
                          : "md:float-left md:mr-8 md:mb-4"
                      }
                    `}
        >
          <div className="relative aspect-video">
            <Image
              src={file.formats?.medium?.url || file.url}
              alt={file.alternativeText || ""}
              width={file.formats?.medium?.width || 0}
              height={file.formats?.medium?.height || 0}
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-cover"
              quality={80}
            />
          </div>
        </figure>

        {/* Text content that wraps around image */}
        <ReactMarkdown className="markdown prose max-w-none">{content || ""}</ReactMarkdown>
      </div>
    </div>
  );
};

export default TextWithImage;
