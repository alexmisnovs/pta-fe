import Image from "next/image";
import { type MediaBlock } from "@/types/blocks";

type MediaImageProps = {
  file: MediaBlock["file"];
  styles?: string;
};

const MediaImage = ({ file, styles }: MediaImageProps) => {
  return (
    <figure className={`${styles} my-6`}>
      <div className="relative w-full max-w-2xl mx-auto aspect-video">
        <Image
          src={file?.formats?.medium?.url || file?.url}
          alt={file?.alternativeText || ""}
          width={file?.formats?.medium?.width || 0}
          height={file?.formats?.medium?.height || 0}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
          className="object-cover"
          quality={80}
        />
      </div>
    </figure>
  );
};

export default MediaImage;
