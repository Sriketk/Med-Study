"use client"

import { useTheme } from "next-themes"
import { Moon, Sun, Brain, BookOpen, Target, TrendingUp, TrendingDown } from "lucide-react"

interface AnalyticsSession {
  id: string
  type: "quiz" | "practice"
  category?: string
  date: Date
  score: number
  correct: number
  total: number
}

interface AnalyticsCategoryStats {
  correct: number
  total: number
  sessions: number
}

interface AnalyticsData {
  sessions: AnalyticsSession[]
  categoryStats: Record<string, AnalyticsCategoryStats>
  overallStats: {
    totalQuestions: number
    totalCorrect: number
    totalSessions: number
  }
}

interface Category {
  name: string
  icon: any
  color: string
  description: string
  questionCount: number
}

interface AnalyticsPageProps {
  analyticsData: AnalyticsData
  categories: Category[]
  onBackToHome: () => void
  onSelectCategory: (categoryName: string) => void
}

export default function AnalyticsPage({
  analyticsData,
  categories,
  onBackToHome,
  onSelectCategory,
}: AnalyticsPageProps) {
  const { theme, setTheme } = useTheme()
  const overallAccuracy =
    analyticsData.overallStats.totalQuestions > 0
      ? Math.round((analyticsData.overallStats.totalCorrect / analyticsData.overallStats.totalQuestions) * 100)
      : 0

  const categoryPerformance = categories
    .map((category) => {
      const stats = analyticsData.categoryStats[category.name]
      if (stats) {
        return {
          category: category.name,
          accuracy: stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0,
          correct: stats.correct,
          total: stats.total,
          sessions: stats.sessions,
        }
      }
      return {
        category: category.name,
        accuracy: 0,
        correct: 0,
        total: 0,
        sessions: 0,
      }
    })
    .sort((a, b) => b.accuracy - a.accuracy)

  const strongestAreas = categoryPerformance.filter((cat) => cat.accuracy >= 80).slice(0, 3)
  const weakestAreas = categoryPerformance.filter((cat) => cat.accuracy < 80).slice(-3)

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-black text-foreground mb-2">
              Performance Analytics
            </h1>
            <p className="text-lg text-muted-foreground">
              Track your progress and identify areas for improvement
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onBackToHome}
              className="bg-secondary text-secondary-foreground border border-border rounded-lg px-4 py-3 text-sm font-medium cursor-pointer transition-all duration-200 hover:bg-secondary/80"
            >
              Back to Home
            </button>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="bg-card text-foreground border border-border rounded-lg p-3 cursor-pointer shadow-sm transition-all duration-200 hover:bg-card/80"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-card border border-border rounded-lg shadow-lg p-6 text-center">
            <div className="text-4xl font-black text-primary mb-2">
              {overallAccuracy}%
            </div>
            <div className="text-sm text-muted-foreground font-medium">
              Overall Accuracy
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg shadow-lg p-6 text-center">
            <div className="text-4xl font-black text-green-500 mb-2">
              {analyticsData.overallStats.totalSessions}
            </div>
            <div className="text-sm text-muted-foreground font-medium">
              Total Sessions
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg shadow-lg p-6 text-center">
            <div className="text-4xl font-black text-amber-500 mb-2">
              {Object.keys(analyticsData.categoryStats).length}
            </div>
            <div className="text-sm text-muted-foreground font-medium">
              Categories Practiced
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg shadow-lg p-6 text-center">
            <div className="text-4xl font-black text-violet-500 mb-2">
              {analyticsData.overallStats.totalQuestions}
            </div>
            <div className="text-sm text-muted-foreground font-medium">
              Total Questions
            </div>
          </div>
        </div>

        {/* Performance by Category */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 bg-card border border-border rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold text-card-foreground mb-6">
              Performance by Category
            </h3>

            <div className="grid gap-4">
              {categoryPerformance.map((category) => {
                const categoryInfo = categories.find((cat) => cat.name === category.category)

                return (
                  <div
                    key={category.category}
                    className="flex items-center justify-between p-4 bg-secondary rounded-md border border-border"
                  >
                    <div className="flex items-center gap-3">
                      {categoryInfo && (
                        <div
                          className="flex items-center justify-center w-8 h-8 rounded-full"
                          style={{ backgroundColor: categoryInfo.color }}
                        >
                          <categoryInfo.icon size={16} color="white" />
                        </div>
                      )}
                      <div>
                        <h4 className="text-base font-semibold text-card-foreground">
                          {category.category}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {category.correct}/{category.total} correct • {category.sessions} sessions
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className={`text-xl font-bold ${
                        category.accuracy >= 80 ? "text-green-500" : 
                        category.accuracy >= 60 ? "text-amber-500" : "text-red-500"
                      }`}>
                        {category.accuracy}%
                      </div>
                      <div className="w-16 h-1 bg-muted rounded-full overflow-hidden mt-1">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${
                            category.accuracy >= 80 ? "bg-green-500" : 
                            category.accuracy >= 60 ? "bg-amber-500" : "bg-red-500"
                          }`}
                          style={{ width: `${category.accuracy}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {categoryPerformance.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <Brain size={48} className="mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg mb-2">No data yet</p>
                <p className="text-sm">Take a quiz or practice session to see your analytics</p>
              </div>
            )}
          </div>

          {/* Areas for Improvement */}
          <div className="grid gap-6">
            {/* Strongest Areas */}
            <div className="bg-card border border-border rounded-lg shadow-lg p-6">
              <h4 className="text-lg font-semibold text-card-foreground mb-4 flex items-center gap-2">
                <TrendingUp size={20} className="text-green-500" />
                Strongest Areas
              </h4>

              {strongestAreas.length > 0 ? (
                <div className="grid gap-3">
                  {strongestAreas.map((area) => (
                    <div
                      key={area.category}
                      className="flex items-center justify-between p-3 bg-green-50 rounded-md border border-green-500"
                    >
                      <span className="text-sm font-medium text-green-800">
                        {area.category}
                      </span>
                      <span className="text-sm font-semibold text-green-500">
                        {area.accuracy}%
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center">
                  Complete more sessions to identify your strengths
                </p>
              )}
            </div>

            {/* Areas for Improvement */}
            <div className="bg-card border border-border rounded-lg shadow-lg p-6">
              <h4 className="text-lg font-semibold text-card-foreground mb-4 flex items-center gap-2">
                <TrendingDown size={20} className="text-red-500" />
                Areas for Improvement
              </h4>

              {weakestAreas.length > 0 ? (
                <div className="grid gap-3">
                  {weakestAreas.map((area) => (
                    <div key={area.category} className="p-3 bg-red-50 rounded-md border border-red-500">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-red-800">
                          {area.category}
                        </span>
                        <span className="text-sm font-semibold text-red-500">
                          {area.accuracy}%
                        </span>
                      </div>
                      <button
                        onClick={() => onSelectCategory(area.category)}
                        className="w-full text-xs text-red-600 bg-red-100 hover:bg-red-200 rounded px-2 py-1 transition-colors duration-200"
                      >
                        Practice Now
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center">
                  Great job! No weak areas identified
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Recent Sessions */}
        <div className="bg-card border border-border rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-bold text-card-foreground mb-6">
            Recent Sessions
          </h3>

          {analyticsData.sessions.length > 0 ? (
            <div className="grid gap-4">
              {analyticsData.sessions.slice(0, 10).map((session) => (
                <div
                  key={session.id}
                  className="flex items-center justify-between p-4 bg-secondary rounded-md border border-border"
                >
                  <div className="flex items-center gap-3">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                      session.type === "quiz" ? "bg-primary" : "bg-violet-500"
                    }`}>
                      {session.type === "quiz" ? (
                        <Target size={16} color="white" />
                      ) : (
                        <BookOpen size={16} color="white" />
                      )}
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-card-foreground">
                        {session.type === "quiz" ? "Assessment Quiz" : `${session.category} Practice`}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {session.date.toLocaleDateString()} • {session.correct}/{session.total} correct
                      </p>
                    </div>
                  </div>

                  <div className={`text-lg font-bold ${
                    session.score >= 80 ? "text-green-500" : 
                    session.score >= 60 ? "text-amber-500" : "text-red-500"
                  }`}>
                    {session.score}%
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <BookOpen size={48} className="mx-auto mb-4 text-muted-foreground" />
              <p className="text-lg mb-2">No sessions yet</p>
              <p className="text-sm">Your recent quiz and practice sessions will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
