"use client";

import { ArrowLeft, Scale } from "lucide-react";
import Link from "next/link";
import { categories } from "@/data/categories";
import { DarkModeToggle } from "@/components/shared/dark-mode-toggle";

export function QuestionComparisonPage() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary">
              <Scale size={24} color="white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                Question Comparison
              </h1>
              <p className="text-lg text-muted-foreground mt-2">
                Compare pairs of questions and help identify the better ones
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground border border-border rounded-lg px-4 py-3 text-sm font-medium cursor-pointer transition-all duration-200 hover:bg-secondary/80"
            >
              Back to Home
            </Link>
            <DarkModeToggle />
          </div>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const IconComponent = category.icon;

            return (
              <Link
                key={category.name}
                href={`/question-comparison/${category.name.toLowerCase()}`}
                className="block"
              >
                <div className="bg-card border-2 border-border rounded-lg shadow-lg p-8 cursor-pointer transition-all duration-150 hover:border-primary hover:-translate-y-1 hover:shadow-xl text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 bg-primary">
                    <IconComponent size={24} color="white" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-card-foreground">
                      {category.name}
                    </h3>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {category.description}
                  </p>

                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Scale size={16} />
                    <span>Compare questions</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Instructions */}
        <div className="mt-12 bg-card border-2 border-border rounded-lg shadow-lg p-8 transition-all duration-150 hover:border-primary hover:-translate-y-1 hover:shadow-xl">
          <h2 className="text-lg font-semibold text-card-foreground mb-3">
            How it works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-8 h-8 bg-primary rounded-full text-primary-foreground font-bold mb-2">
                1
              </div>
              <p className="text-sm text-muted-foreground">
                Answer the first question and see the explanation
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-8 h-8 bg-primary rounded-full text-primary-foreground font-bold mb-2">
                2
              </div>
              <p className="text-sm text-muted-foreground">
                Answer the second question and see the explanation
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-8 h-8 bg-primary rounded-full text-primary-foreground font-bold mb-2">
                3
              </div>
              <p className="text-sm text-muted-foreground">
                Compare both questions and select which one is better
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
