"use client";

import { ArrowLeft, Scale } from "lucide-react";
import Link from "next/link";
import { categories } from "@/data/categories";

export function QuestionComparisonPage() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft size={20} />
            Back to Home
          </Link>

          <div className="flex items-center gap-4 mb-4">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary rounded-full">
              <Scale size={24} className="text-primary-foreground" />
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
                <div className="bg-card hover:bg-card/80 border border-border rounded-lg p-6 text-center transition-all duration-200 hover:shadow-lg hover:border-primary/50">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 bg-primary/20">
                    <IconComponent size={32} className="text-primary" />
                  </div>

                  <h3 className="text-xl font-semibold text-card-foreground mb-2">
                    {category.name}
                  </h3>

                  <p className="text-sm text-muted-foreground mb-4">
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
        <div className="mt-12 bg-card border border-border rounded-lg p-6">
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
