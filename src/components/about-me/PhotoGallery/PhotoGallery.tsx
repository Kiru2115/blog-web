import type { ReactNode } from "react";
import PageSection from "@/components/shared/PageSection/PageSection";
import type { Photo } from "@/types/about-me";

interface Props {
  id?: string;
  title: ReactNode;
  photos: Photo[];
}

const PhotoGallery = ({ id, title, photos }: Props) => {
  return (
    <PageSection id={id} title={title}>
      <ul className="columns-1 gap-4 sm:columns-2">
        {photos.map((photo, index) => (
          <li
            key={photo.src}
            className={
              index === 0 ? "mb-4 [column-span:all]" : "mb-4 break-inside-avoid"
            }
          >
            <div className="overflow-hidden rounded-lg">
              <img
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                loading="lazy"
                className="h-auto w-full transition-transform duration-500 motion-safe:hover:scale-105"
              />
            </div>
          </li>
        ))}
      </ul>
    </PageSection>
  );
};

export default PhotoGallery;
