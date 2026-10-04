"use client";

import { useEffect } from "react";
import { initFacebookPixel, trackPixelEvent } from "@/lib/pixel";

interface FacebookPixelProps {
  pixelId?: string;
  productTitle: string;
  price: number;
}

export const FacebookPixel: React.FC<FacebookPixelProps> = ({
  pixelId,
  productTitle,
  price,
}) => {
  useEffect(() => {
    if (!pixelId) return;

    // 1. Initialize Pixel
    initFacebookPixel(pixelId);

    // 2. Fire PageView
    trackPixelEvent("PageView");

    // 3. Fire ViewContent
    trackPixelEvent("ViewContent", {
      content_name: productTitle,
      content_type: "product",
      value: price,
      currency: "MAD",
    });
  }, [pixelId, productTitle, price]);

  return null;
};
