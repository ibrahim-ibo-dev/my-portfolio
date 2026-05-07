"use client";

import { useEffect } from "react";

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
    <div className="min-h-screen flex items-center justify-center bg-primary px-6">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-2xl border border-accent/20 bg-accent/5 flex items-center justify-center mx-auto mb-6">
          <span className="text-2xl font-bold text-gradient">!</span>
        </div>
        <h2 className="text-xl font-semibold text-white mb-3">Something went wrong</h2>
        <p className="text-sm text-muted mb-8 leading-relaxed">
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={reset}
          className="btn-primary focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
