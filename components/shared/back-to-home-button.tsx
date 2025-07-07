"use client";

import { useRouter } from "next/navigation";

export function BackToHomeButton() {
  const router = useRouter();

  const handleBackToHome = () => {
    router.push("/home");
  };

  return (
    <button
      onClick={handleBackToHome}
      className="bg-secondary text-secondary-foreground border border-border rounded-lg px-4 py-3 text-sm font-medium cursor-pointer transition-all duration-200 hover:bg-secondary/80"
    >
      Back to Home
    </button>
  );
} 