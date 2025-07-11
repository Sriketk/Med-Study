"use client";

import { useState, useEffect } from "react";
import { Brain, LogOut } from "lucide-react";
import { DarkModeToggle } from "@/components/shared/dark-mode-toggle";
import { OnboardingData } from "@/lib/types";
import Link from "next/link";
import { HOME_CARDS, CardConfig } from "./home-config";
import { authClient } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface HomePageProps {
  onboardingData: OnboardingData;
  onStartQuiz: () => void;
  onStartCaseStudy: () => void;
  onStartPrepare: () => void;
}

// Reusable Card Component
interface CardProps {
  config: CardConfig;
  index: number;
}

/**
 * 🎨 STYLING PATTERN: CSS-based transitions
 *
 * ✅ BEST PRACTICE:
 * - Colors/borders: Use CSS classes (hover:border-primary)
 * - Transforms: Use CSS transforms (hover:transform hover:-translate-y-1)
 *
 * 💡 WHY: CSS handles all transitions and transforms efficiently
 */

function HomeCard({ config, index }: CardProps) {
  const { title, description, href, icon: Icon, badge } = config;
  const BadgeIcon = badge.icon;

  return (
    <Link href={href} passHref>
      <div className="bg-card p-6 rounded-lg border border-border hover:border-2 hover:border-primary shadow-lg hover:shadow-xl text-center cursor-pointer h-full flex flex-col transition-all duration-200 hover:-translate-y-1">
        <Icon size={32} className="text-primary mx-auto mb-4" />
        <h3 className="text-xl font-bold text-card-foreground mb-3 min-h-[3rem] flex items-center justify-center">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 flex-grow min-h-[4rem] flex items-center">
          {description}
        </p>
        <div className="flex items-center justify-center gap-2 mt-auto">
          <BadgeIcon size={16} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{badge.text}</span>
        </div>
      </div>
    </Link>
  );
}

export default function HomePage({
  onboardingData,
  onStartQuiz,
  onStartCaseStudy,
  onStartPrepare,
}: HomePageProps) {
  const [mounted, setMounted] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  // Ensure component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Logged out successfully");
            router.push("/");
          },
        },
      });
    } catch (error) {
      toast.error("Failed to logout");
      console.error("Logout error:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute -top-1/2 -right-1/4 w-2/5 h-full opacity-5 rounded-full transform -rotate-12 bg-gradient-to-br from-primary to-accent" />
      <div className="absolute -bottom-1/3 -left-1/4 w-1/3 h-3/5 opacity-5 rounded-full bg-gradient-to-tr from-primary to-accent" />

      <div className="fixed top-6 right-6 z-50 flex items-center gap-3">
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="bg-card text-foreground border border-border rounded-lg p-3 cursor-pointer shadow-sm transition-all duration-200 hover:bg-card/80 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Logout"
        >
          <LogOut size={16} />
        </button>
        <DarkModeToggle />
      </div>

      <div className="flex items-center justify-center min-h-screen p-8 relative z-10">
        <div className="text-center max-w-7xl w-full">
          {/* Header with icon */}
          <div className="mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-full mb-8 shadow-xl">
              <Brain size={32} className="text-primary-foreground" />
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-foreground mb-4 tracking-normal leading-tight">
              USMLE Step 1
            </h1>
            <div className="text-xl md:text-2xl font-normal text-foreground mb-6">
              Preparation Platform
            </div>
            <p className="text-lg md:text-xl text-muted-foreground font-normal italic max-w-md mx-auto">
              Test your knowledge and study effectively
            </p>
          </div>

          {/* Dynamic Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 max-w-7xl mx-auto">
            {HOME_CARDS.map((card, index) => (
              <HomeCard key={card.href} config={card} index={index} />
            ))}
          </div>

          {/* Subtitle */}
          <p className="text-sm text-muted-foreground font-light">
            Choose your learning path to excel in your USMLE Step 1 preparation
          </p>
        </div>
      </div>
    </div>
  );
}
