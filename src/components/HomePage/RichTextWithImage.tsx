interface RichTextWithImageProps {
  heading?: string;
  content?: string;
  image?: {
    url: string;
    alt: string;
  };
  imagePosition?: "left" | "right";
}

const RichTextWithImage: React.FC<RichTextWithImageProps> = ({
  heading,
  content,
  image,
  imagePosition = "left",
}) => {
  return (
    <section className="py-12 px-4">
      <div className="container mx-auto">
        <div
          className={`flex flex-col md:flex-row items-center gap-8 ${
            imagePosition === "right" ? "md:flex-row-reverse" : ""
          }`}
        >
          {image && (
            <div className="w-full md:w-1/2">
              <img src={image.url} alt={image.alt} className="w-full h-auto rounded-lg shadow-lg" />
            </div>
          )}
          <div className="w-full md:w-1/2">
            {heading && <h2 className="text-3xl font-bold mb-4">{heading}</h2>}
            {content && (
              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RichTextWithImage;
