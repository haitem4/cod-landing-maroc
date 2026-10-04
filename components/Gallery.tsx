"use client";

import React, { useState } from "react";
import Image from "next/image";

interface GalleryProps {
  images: string[];
  title: string;
}

export const Gallery: React.FC<GalleryProps> = ({ images, title }) => {
  const [selectedIdx, setSelectedIdx] = useState(0);

  if (!images || images.length === 0) return null;

  const currentImage = images[selectedIdx] || images[0];

  return (
    <div className="w-full space-y-3">
      {/* Main Image */}
      <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-100 shadow-md border border-slate-100">
        <Image
          src={currentImage}
          alt={`${title} - image ${selectedIdx + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, 600px"
          priority
          className="object-cover transition-all duration-300 hover:scale-105"
        />
        <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full font-medium">
          {selectedIdx + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2.5 overflow-x-auto pb-1 no-scrollbar">
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedIdx(idx)}
              className={`relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-all ${
                selectedIdx === idx
                  ? "border-primary ring-2 ring-primary/30 scale-105"
                  : "border-slate-200 opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
