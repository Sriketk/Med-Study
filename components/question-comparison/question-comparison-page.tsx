"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Scale } from "lucide-react"
import Link from "next/link"
import { categories } from "@/data/categories"

export function QuestionComparisonPage() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
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
        </motion.div>

        {/* Category Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((category, index) => {
            const IconComponent = category.icon
            
            return (
              <Link
                key={category.name}
                href={`/question-comparison/${category.name.toLowerCase()}`}
                className="block"
              >
                <motion.div
                  className="bg-card hover:bg-card/80 border border-border rounded-lg p-6 text-center transition-all duration-200 hover:shadow-lg hover:border-primary/50"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                    style={{ backgroundColor: `${category.color}20` }}
                  >
                    <IconComponent 
                      size={32} 
                      style={{ color: category.color }}
                    />
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
                </motion.div>
              </Link>
            )
          })}
        </motion.div>

        {/* Instructions */}
        <motion.div
          className="mt-12 bg-card border border-border rounded-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
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
        </motion.div>
      </div>
    </div>
  )
} 