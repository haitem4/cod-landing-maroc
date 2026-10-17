"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Sparkles, ChevronLeft, ChevronRight, Award } from "lucide-react";
import { Lang } from "@/lib/content";

interface HeroGalleryProps {
  images: string[];
  title: string;
  lang: Lang;
  activeImage?: string;
}

export const HeroGallery: React.FC<HeroGalleryProps> = ({
  images,
  title,
  lang,
  activeImage,
}) => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const touchStartX = useRef<number | null>(null);

  // Sync with color change from outside: when color changes, show the new color's photo
  useEffect(() => {
    setSelectedIdx(0);
  }, [activeImage]);

  // Always display the currently selected image index
  const displayImage = images[selectedIdx] || images[0];

  const handlePrev = () => {
    setSelectedIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Mobile swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        // Swipe left -> next image (in LTR) or prev (in RTL)
        lang === "ar" ? handlePrev() : handleNext();
      } else {
        // Swipe right -> prev image (in LTR) or next (in RTL)
        lang === "ar" ? handleNext() : handlePrev();
      }
    }
    touchStartX.current = null;
  };

  return (
    <div className="w-full space-y-3">
      {/* Main Image Frame with Touch Swipe */}
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative aspect-square w-full rounded-3xl overflow-hidden bg-slate-50 shadow-md border border-slate-200/90 group select-none cursor-grab active:cursor-grabbing"
      >
        <Image
          key={displayImage}
          src={displayImage}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 550px"
          priority
          className="object-cover transition-opacity duration-200"
        />

        {/* Floating Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
          <div className="bg-gradient-to-r from-orange-600 to-amber-500 text-white text-[11px] font-black px-3 py-1 rounded-full shadow-lg flex items-center gap-1 animate-shimmer">
            <Sparkles className="w-3.5 h-3.5 text-amber-200" />
            <span>{lang === "ar" ? "تخفيض -45%" : "SAVE 45%"}</span>
          </div>

          <div className="bg-slate-900/85 backdrop-blur-md text-emerald-400 text-[11px] font-black px-3 py-1 rounded-full shadow-lg flex items-center gap-1 border border-slate-700/60">
            <Award className="w-3.5 h-3.5 text-emerald-400" />
            <span>{lang === "ar" ? "أصلي ومضمون 100%" : "100% ORIGINAL QUALITY"}</span>
          </div>
        </div>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous image"
              className="absolute left-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/85 hover:bg-white text-slate-800 shadow-lg flex items-center justify-center transition-all opacity-80 hover:opacity-100 active:scale-90"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next image"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/85 hover:bg-white text-slate-800 shadow-lg flex items-center justify-center transition-all opacity-80 hover:opacity-100 active:scale-90"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Image index counter */}
        <div className="absolute bottom-3 right-3 bg-black/65 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow">
          {selectedIdx + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails list */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar justify-start sm:justify-center">
          {images.map((img, idx) => {
            const isSelected = selectedIdx === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedIdx(idx)}
                className={`relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 transition-all ${
                  isSelected
                    ? "border-orange-600 ring-2 ring-orange-500/30 scale-105 shadow-md"
                    : "border-slate-200 opacity-60 hover:opacity-100 hover:border-slate-400"
                }`}
              >
                <Image
                  src={img}
                  alt={`Vignette ${idx + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
