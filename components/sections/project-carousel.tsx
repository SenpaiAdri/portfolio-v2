"use client";

import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface ProjectCarouselProps {
  images: string[];
  projectName: string;
  accentColor: string;
  allImages: string[][];
  currentProject: number;
}

function ProjectCarouselInner({
  images,
  projectName,
  accentColor,
  projectIndex,
  currentProject,
  onImageClick,
}: {
  images: string[];
  projectName: string;
  accentColor: string;
  projectIndex: number;
  currentProject: number;
  onImageClick: (src: string) => void;
}) {
  const isActive = projectIndex === currentProject;
  const [emblaRef, emblaApi] = useEmbaCarousel(
    { loop: true, duration: 40 },
    isActive
      ? [
          Autoplay({
            delay: 3000,
            stopOnInteraction: false,
            stopOnMouseEnter: false,
          }),
        ]
      : []
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  const prevButton = () => {
    emblaApi?.scrollPrev();
  };
  const nextButton = () => {
    emblaApi?.scrollNext();
  };
  const dotClick = (index: number) => {
    emblaApi?.scrollTo(index);
  };

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    setSelectedIndex(emblaApi.selectedScrollSnap());
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="relative w-full h-full flex items-center">
        <button
          onClick={prevButton}
          className="absolute left-1 z-10 p-1 ml-5 sm:ml-10 rounded-full border-2 border-dashed hover:border-black/70 transition-colors duration-300 ease-in-out delay-300"
          style={{ color: accentColor, borderColor: accentColor }}
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-[15px] h-[15px] sm:w-[20px] sm:h-[20px]" />
        </button>

        <div
          className="embla w-full h-full overflow-hidden"
          ref={emblaRef}
        >
          <div className="embla__container w-full h-full flex">
            {images.map((src, imgIndex) => (
              <div
                key={imgIndex}
                className="embla__slide w-full h-full flex-[0_0_100%] min-w-0 flex items-center justify-center p-2 cursor-pointer"
                onClick={() => onImageClick(src)}
              >
                <div className="relative w-full h-full max-w-[90%] max-h-[90%] rounded-lg">
                  <Image
                    src={src}
                    alt={`${projectName} screenshot ${imgIndex + 1}`}
                    fill
                    className="object-contain rounded-lg"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={nextButton}
          className="absolute right-1 z-10 p-1 mr-5 sm:mr-10 rounded-full border-2 border-dashed hover:border-black/70 transition-colors duration-300 ease-in-out delay-300"
          style={{ color: accentColor, borderColor: accentColor }}
          aria-label="Next slide"
        >
          <ChevronRight className="w-[15px] h-[15px] sm:w-[20px] sm:h-[20px]" />
     
        </button>
      </div>

      <div className="flex items-center justify-center gap-1.5 pb-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => dotClick(index)}
            className="w-2 h-2 rounded-full transition-all duration-300"
            style={{
              backgroundColor:
                index === selectedIndex ? accentColor : "#4a4a4a",
              transform: index === selectedIndex ? "scale(1.2)" : "scale(1)",
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function useEmbaCarousel(
  options: Parameters<typeof useEmblaCarousel>[0],
  plugins: Parameters<typeof useEmblaCarousel>[1]
) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, plugins);
  return [emblaRef, emblaApi] as const;
}

export default function ProjectCarousel({
  images,
  projectName,
  accentColor,
  allImages,
  currentProject,
}: ProjectCarouselProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageClick = (src: string) => {
    setSelectedImage(src);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedImage) {
        setSelectedImage(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {allImages.map((projectImages, projectIndex) => (
        <div
          key={projectIndex}
          className="absolute inset-0"
          style={{
            transform: `translateY(${(projectIndex - currentProject) * 100}%)`,
            transition: "transform 1000ms ease-in-out",
          }}
        >
          <ProjectCarouselInner
            images={projectImages}
            projectName={projectName}
            accentColor={accentColor}
            projectIndex={projectIndex}
            currentProject={currentProject}
            onImageClick={handleImageClick}
          />
        </div>
      ))}

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 cursor-pointer"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-[90vw] max-h-[90vh] w-auto h-auto"
            onClick={() => setSelectedImage(null)}
          >
            <Image
              src={selectedImage}
              alt={projectName}
              width={1200}
              height={800}
              className="max-w-full max-h-[90vh] w-auto h-auto object-contain"
              priority
            />
          </div>
        </div>
      )}
    </div>
  );
}