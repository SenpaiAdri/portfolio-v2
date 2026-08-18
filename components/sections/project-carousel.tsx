"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay, { type AutoplayType } from "embla-carousel-autoplay";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

interface ProjectCarouselProps {
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
  const prefersReducedMotion = usePrefersReducedMotion();
  const autoplayPlugin = useMemo(
    () =>
      isActive && !prefersReducedMotion
        ? [
            Autoplay({
              delay: 3000,
              stopOnInteraction: false,
              stopOnMouseEnter: false,
            }),
          ]
        : [],
    [isActive, prefersReducedMotion]
  );
  const [emblaRef, emblaApi] = useEmbaCarousel(
    { loop: true, duration: 40 },
    autoplayPlugin
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const autoplayRef = useRef<AutoplayType | null>(null);

  useEffect(() => {
    autoplayRef.current = emblaApi?.plugins()?.autoplay ?? null;
  }, [emblaApi]);

  const pauseAutoplay = useCallback(() => {
    autoplayRef.current?.stop();
  }, []);

  const resumeAutoplay = useCallback(() => {
    autoplayRef.current?.play();
  }, []);

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
    <div
      className="w-full h-full flex flex-col items-center justify-center"
      onPointerEnter={pauseAutoplay}
      onPointerLeave={resumeAutoplay}
      onFocusCapture={pauseAutoplay}
      onBlurCapture={resumeAutoplay}
    >
      <div className="relative w-full h-full flex items-center">
        <button
          onClick={prevButton}
          className="absolute left-1 z-10 p-1 ml-5 sm:ml-10 rounded-full border-2 border-dashed hover:border-white/70 transition-colors duration-300 ease-in-out delay-300"
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
              <button
                key={imgIndex}
                type="button"
                onClick={() => onImageClick(src)}
                aria-label={`View full size: ${projectName} screenshot ${imgIndex + 1}`}
                className="embla__slide w-full h-full flex-[0_0_100%] min-w-0 flex items-center justify-center p-2 cursor-pointer"
              >
                <span className="relative w-full h-full max-w-[90%] max-h-[90%] rounded-lg block">
                  <Image
                    src={src}
                    alt={`${projectName} screenshot ${imgIndex + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 62vw"
                    className="object-contain rounded-lg"
                  />
                </span>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={nextButton}
          className="absolute right-1 z-10 p-1 mr-5 sm:mr-10 rounded-full border-2 border-dashed hover:border-white/70 transition-colors duration-300 ease-in-out delay-300"
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
            className="w-2 h-2 rounded-full transition-[background-color,transform] duration-300"
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
  projectName,
  accentColor,
  allImages,
  currentProject,
}: ProjectCarouselProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const focusReturnRef = useRef<HTMLElement | null>(null);

  const closeModal = useCallback(() => {
    setSelectedImage(null);
  }, []);

  const handleImageClick = (src: string) => {
    focusReturnRef.current = document.activeElement as HTMLElement | null;
    setSelectedImage(src);
  };

  useEffect(() => {
    if (!selectedImage) {
      focusReturnRef.current?.focus();
      focusReturnRef.current = null;
      return;
    }
    closeButtonRef.current?.focus();
  }, [selectedImage]);

  // Trap focus inside the open modal.
  useEffect(() => {
    if (!selectedImage) return;
    const modal = modalRef.current;
    if (!modal) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const focusables = Array.from(
        modal.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => el.offsetParent !== null);
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    modal.addEventListener("keydown", handleKeyDown);
    return () => modal.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedImage) {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, closeModal]);

  // Keep wheel/touch events on the open modal from reaching the
  // RevealScroll container listeners (which would navigate sections).
  useEffect(() => {
    const modal = modalRef.current;
    if (!modal || !selectedImage) return;
    const stop = (e: Event) => e.stopPropagation();
    modal.addEventListener("wheel", stop, { passive: false });
    modal.addEventListener("touchstart", stop, { passive: true });
    modal.addEventListener("touchend", stop, { passive: true });
    return () => {
      modal.removeEventListener("wheel", stop);
      modal.removeEventListener("touchstart", stop);
      modal.removeEventListener("touchend", stop);
    };
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
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${projectName} full-size screenshot`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 cursor-zoom-out"
          onClick={closeModal}
          onKeyDown={(e) => {
            if (e.key === "ArrowUp" || e.key === "ArrowDown") {
              e.stopPropagation();
            }
          }}
        >
          <div
            className="relative w-[95vw] h-[95vh] sm:w-[90vw] sm:h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage}
              alt={projectName}
              fill
              className="object-contain"
              priority
              sizes="100vw"
            />
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={closeModal}
            aria-label="Close image"
            className="absolute right-6 top-6 z-10 p-2 rounded-full border-2 border-dashed border-gray-600 text-gray-400 hover:border-red-500 hover:text-red-500 focus-visible:border-red-500 focus-visible:text-red-500 transition-colors"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}