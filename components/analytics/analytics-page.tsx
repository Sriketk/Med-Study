"use client"

import { motion } from "framer-motion"
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
  isDark: boolean
  toggleTheme: () => void
  onBackToHome: () => void
  onSelectCategory: (categoryName: string) => void
}

export default function AnalyticsPage({
  analyticsData,
  categories,
  isDark,
  toggleTheme,
  onBackToHome,
  onSelectCategory,
}: AnalyticsPageProps) {
  const overallAccuracy =
    analyticsData.overallStats.totalQuestions > 0
      ? Math.round((analyticsData.overallStats.totalCorrect / analyticsData.overallStats.totalQuestions) * 100)
      : 0

  const categoryPerformance = Object.entries(analyticsData.categoryStats)
    .map(([category, stats]) => ({
      category,
      accuracy: stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0,
      correct: stats.correct,
      total: stats.total,
      sessions: stats.sessions,
    }))
    .sort((a, b) => b.accuracy - a.accuracy)

  const strongestAreas = categoryPerformance.filter((cat) => cat.accuracy >= 80).slice(0, 3)
  const weakestAreas = categoryPerformance.filter((cat) => cat.accuracy < 80).slice(-3)

  return (
    <motion.div
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
        padding: "2rem",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div style={{ maxWidth: "64rem", margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "3rem",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h1
              style={{
                fontSize: "2.5rem",
                fontWeight: "900",
                color: "var(--foreground)",
                marginBottom: "0.5rem",
              }}
            >
              Performance Analytics
            </h1>
            <p
              style={{
                fontSize: "1.125rem",
                color: "var(--muted-foreground)",
              }}
            >
              Track your progress and identify areas for improvement
            </p>
          </div>

          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button
              onClick={onBackToHome}
              style={{
                backgroundColor: "var(--secondary)",
                color: "var(--secondary-foreground)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                padding: "0.75rem 1rem",
                fontSize: "0.875rem",
                fontWeight: "500",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              Back to Home
            </button>
            <button
              onClick={toggleTheme}
              style={{
                backgroundColor: "var(--card)",
                color: "var(--foreground)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                padding: "0.75rem",
                cursor: "pointer",
                boxShadow: "var(--shadow-sm)",
                transition: "all 0.2s ease",
              }}
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </motion.div>

        {/* Overview Stats */}
        <motion.div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1.5rem",
            marginBottom: "3rem",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div
            style={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              boxShadow: "var(--shadow-lg)",
              padding: "1.5rem",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "2.5rem",
                fontWeight: "900",
                color: "var(--primary)",
                marginBottom: "0.5rem",
              }}
            >
              {overallAccuracy}%
            </div>
            <div
              style={{
                fontSize: "0.875rem",
                color: "var(--muted-foreground)",
                fontWeight: "500",
              }}
            >
              Overall Accuracy
            </div>
          </div>

          <div
            style={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              boxShadow: "var(--shadow-lg)",
              padding: "1.5rem",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "2.5rem",
                fontWeight: "900",
                color: "#10b981",
                marginBottom: "0.5rem",
              }}
            >
              {analyticsData.overallStats.totalSessions}
            </div>
            <div
              style={{
                fontSize: "0.875rem",
                color: "var(--muted-foreground)",
                fontWeight: "500",
              }}
            >
              Total Sessions
            </div>
          </div>

          <div
            style={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              boxShadow: "var(--shadow-lg)",
              padding: "1.5rem",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "2.5rem",
                fontWeight: "900",
                color: "#f59e0b",
                marginBottom: "0.5rem",
              }}
            >
              {Object.keys(analyticsData.categoryStats).length}
            </div>
            <div
              style={{
                fontSize: "0.875rem",
                color: "var(--muted-foreground)",
                fontWeight: "500",
              }}
            >
              Categories Practiced
            </div>
          </div>

          <div
            style={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              boxShadow: "var(--shadow-lg)",
              padding: "1.5rem",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "2.5rem",
                fontWeight: "900",
                color: "#8b5cf6",
                marginBottom: "0.5rem",
              }}
            >
              {analyticsData.overallStats.totalQuestions}
            </div>
            <div
              style={{
                fontSize: "0.875rem",
                color: "var(--muted-foreground)",
                fontWeight: "500",
              }}
            >
              Questions Answered
            </div>
          </div>
        </motion.div>

        {/* Performance by Category */}
        <motion.div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "2rem",
            marginBottom: "3rem",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div
            style={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              boxShadow: "var(--shadow-lg)",
              padding: "2rem",
            }}
          >
            <h3
              style={{
                fontSize: "1.5rem",
                fontWeight: "700",
                color: "var(--card-foreground)",
                marginBottom: "1.5rem",
              }}
            >
              Performance by Category
            </h3>

            <div style={{ display: "grid", gap: "1rem" }}>
              {categoryPerformance.map((category) => {
                const categoryInfo = categories.find((cat) => cat.name === category.category)

                return (
                  <div
                    key={category.category}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "1rem",
                      backgroundColor: "var(--secondary)",
                      borderRadius: "calc(var(--radius) - 2px)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      {categoryInfo && (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "2rem",
                            height: "2rem",
                            backgroundColor: categoryInfo.color,
                            borderRadius: "50%",
                          }}
                        >
                          <categoryInfo.icon size={16} color="white" />
                        </div>
                      )}
                      <div>
                        <h4
                          style={{
                            fontSize: "1rem",
                            fontWeight: "600",
                            color: "var(--card-foreground)",
                            margin: 0,
                          }}
                        >
                          {category.category}
                        </h4>
                        <p
                          style={{
                            fontSize: "0.875rem",
                            color: "var(--muted-foreground)",
                            margin: 0,
                          }}
                        >
                          {category.correct}/{category.total} correct • {category.sessions} sessions
                        </p>
                      </div>
                    </div>

                    <div style={{ textAlign: "right" }}>
                      <div
                        style={{
                          fontSize: "1.25rem",
                          fontWeight: "700",
                          color: category.accuracy >= 80 ? "#10b981" : category.accuracy >= 60 ? "#f59e0b" : "#ef4444",
                        }}
                      >
                        {category.accuracy}%
                      </div>
                      <div
                        style={{
                          width: "4rem",
                          height: "0.25rem",
                          backgroundColor: "var(--muted)",
                          borderRadius: "9999px",
                          overflow: "hidden",
                          marginTop: "0.25rem",
                        }}
                      >
                        <div
                          style={{
                            width: `${category.accuracy}%`,
                            height: "100%",
                            backgroundColor:
                              category.accuracy >= 80 ? "#10b981" : category.accuracy >= 60 ? "#f59e0b" : "#ef4444",
                            borderRadius: "9999px",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {categoryPerformance.length === 0 && (
              <div
                style={{
                  textAlign: "center",
                  padding: "3rem",
                  color: "var(--muted-foreground)",
                }}
              >
                <Brain size={48} color="var(--muted-foreground)" style={{ margin: "0 auto 1rem auto" }} />
                <p style={{ fontSize: "1.125rem", marginBottom: "0.5rem" }}>No data yet</p>
                <p style={{ fontSize: "0.875rem" }}>Take a quiz or practice session to see your analytics</p>
              </div>
            )}
          </div>

          {/* Areas for Improvement */}
          <div style={{ display: "grid", gap: "1.5rem" }}>
            {/* Strongest Areas */}
            <div
              style={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                boxShadow: "var(--shadow-lg)",
                padding: "1.5rem",
              }}
            >
              <h4
                style={{
                  fontSize: "1.125rem",
                  fontWeight: "600",
                  color: "var(--card-foreground)",
                  marginBottom: "1rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <TrendingUp size={20} color="#10b981" />
                Strongest Areas
              </h4>

              {strongestAreas.length > 0 ? (
                <div style={{ display: "grid", gap: "0.75rem" }}>
                  {strongestAreas.map((area) => (
                    <div
                      key={area.category}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "0.75rem",
                        backgroundColor: "#dcfce7",
                        borderRadius: "calc(var(--radius) - 2px)",
                        border: "1px solid #10b981",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.875rem",
                          fontWeight: "500",
                          color: "#065f46",
                        }}
                      >
                        {area.category}
                      </span>
                      <span
                        style={{
                          fontSize: "0.875rem",
                          fontWeight: "600",
                          color: "#10b981",
                        }}
                      >
                        {area.accuracy}%
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--muted-foreground)",
                    textAlign: "center",
                  }}
                >
                  Complete more sessions to identify your strengths
                </p>
              )}
            </div>

            {/* Areas for Improvement */}
            <div
              style={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                boxShadow: "var(--shadow-lg)",
                padding: "1.5rem",
              }}
            >
              <h4
                style={{
                  fontSize: "1.125rem",
                  fontWeight: "600",
                  color: "var(--card-foreground)",
                  marginBottom: "1rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <TrendingDown size={20} color="#ef4444" />
                Areas for Improvement
              </h4>

              {weakestAreas.length > 0 ? (
                <div style={{ display: "grid", gap: "0.75rem" }}>
                  {weakestAreas.map((area) => (
                    <div
                      key={area.category}
                      style={{
                        padding: "0.75rem",
                        backgroundColor: "#fef2f2",
                        borderRadius: "calc(var(--radius) - 2px)",
                        border: "1px solid #ef4444",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginBottom: "0.5rem",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "0.875rem",
                            fontWeight: "500",
                            color: "#991b1b",
                          }}
                        >
                          {area.category}
                        </span>
                        <span
                          style={{
                            fontSize: "0.875rem",
                            fontWeight: "600",
                            color: "#ef4444",
                          }}
                        >
                          {area.accuracy}%
                        </span>
                      </div>
                      <button
                        onClick={() => onSelectCategory(area.category)}
                        style={{
                          width: "100%",
                          backgroundColor: "#ef4444",
                          color: "white",
                          border: "none",
                          borderRadius: "calc(var(--radius) - 4px)",
                          padding: "0.5rem",
                          fontSize: "0.75rem",
                          fontWeight: "500",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                        }}
                      >
                        Practice Now
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--muted-foreground)",
                    textAlign: "center",
                  }}
                >
                  Great job! No weak areas identified yet
                </p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Recent Sessions */}
        <motion.div
          style={{
            backgroundColor: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius)",
            boxShadow: "var(--shadow-lg)",
            padding: "2rem",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3
            style={{
              fontSize: "1.5rem",
              fontWeight: "700",
              color: "var(--card-foreground)",
              marginBottom: "1.5rem",
            }}
          >
            Recent Sessions
          </h3>

          {analyticsData.sessions.length > 0 ? (
            <div style={{ display: "grid", gap: "1rem" }}>
              {analyticsData.sessions
                .slice(-5)
                .reverse()
                .map((session) => (
                  <div
                    key={session.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "1rem",
                      backgroundColor: "var(--secondary)",
                      borderRadius: "calc(var(--radius) - 2px)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "2rem",
                          height: "2rem",
                          backgroundColor: session.type === "quiz" ? "var(--primary)" : "#8b5cf6",
                          borderRadius: "50%",
                        }}
                      >
                        {session.type === "quiz" ? (
                          <Target size={16} color="white" />
                        ) : (
                          <BookOpen size={16} color="white" />
                        )}
                      </div>
                      <div>
                        <h4
                          style={{
                            fontSize: "1rem",
                            fontWeight: "600",
                            color: "var(--card-foreground)",
                            margin: 0,
                          }}
                        >
                          {session.type === "quiz" ? "Assessment Quiz" : `${session.category} Practice`}
                        </h4>
                        <p
                          style={{
                            fontSize: "0.875rem",
                            color: "var(--muted-foreground)",
                            margin: 0,
                          }}
                        >
                          {session.date.toLocaleDateString()} • {session.correct}/{session.total} correct
                        </p>
                      </div>
                    </div>

                    <div
                      style={{
                        fontSize: "1.125rem",
                        fontWeight: "700",
                        color: session.score >= 80 ? "#10b981" : session.score >= 60 ? "#f59e0b" : "#ef4444",
                      }}
                    >
                      {session.score}%
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div
              style={{
                textAlign: "center",
                padding: "3rem",
                color: "var(--muted-foreground)",
              }}
            >
              <BookOpen size={48} color="var(--muted-foreground)" style={{ margin: "0 auto 1rem auto" }} />
              <p style={{ fontSize: "1.125rem", marginBottom: "0.5rem" }}>No sessions yet</p>
              <p style={{ fontSize: "0.875rem" }}>Your recent quiz and practice sessions will appear here</p>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}
