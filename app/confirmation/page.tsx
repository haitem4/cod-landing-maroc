import React, { Suspense } from "react";
import { ConfirmationClient } from "./ConfirmationClient";

export default function ConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
          <div className="text-slate-500 text-sm animate-pulse">Loading confirmation...</div>
        </div>
      }
    >
      <ConfirmationClient />
    </Suspense>
  );
}
