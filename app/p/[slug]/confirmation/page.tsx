import React, { Suspense } from "react";
import { getAllProductSlugs } from "@/lib/products";
import { OrderConfirmationClient } from "./OrderConfirmationClient";

export async function generateStaticParams() {
  const slugs = getAllProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default function OrderConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
          <div className="text-slate-500 text-sm animate-pulse">Chargement de la confirmation...</div>
        </div>
      }
    >
      <OrderConfirmationClient />
    </Suspense>
  );
}
