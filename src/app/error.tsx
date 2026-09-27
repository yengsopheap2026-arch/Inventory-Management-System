"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-full bg-slate-50 text-slate-800">
      <AlertTriangle size={48} className="text-orange-500 mb-4" />
      <h1 className="text-3xl font-bold mb-2">Something went wrong!</h1>
      <p className="text-slate-500 mb-2 text-sm">An unexpected error occurred.</p>
      <p className="text-slate-400 text-xs mb-6">{error.message}</p>
      <div className="flex gap-3">
        <button
          onClick={() => reset()}
          className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold px-6 py-2.5 rounded-xl shadow-lg shadow-purple-600/30 transition-all"
        >
          Try Again
        </button>
        <a
          href="/dashboard"
          className="bg-slate-200 hover:bg-slate-300 text-slate-800 text-sm font-semibold px-6 py-2.5 rounded-xl transition-all"
        >
          Go to Dashboard
        </a>
      </div>
    </div>
  );
}
