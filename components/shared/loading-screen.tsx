"use client"

interface LoadingScreenProps {
  progress: number
  step: string
  showButton?: boolean
  buttonText?: string
  onButtonClick?: () => void
}

export default function LoadingScreen({
  progress,
  step,
  showButton = false,
  buttonText = "Retry",
  onButtonClick,
}: LoadingScreenProps) {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: "24rem" }}>
        <div
          style={{
            width: "4rem",
            height: "4rem",
            border: "4px solid var(--muted)",
            borderTop: "4px solid var(--primary)",
            borderRadius: "50%",
            margin: "0 auto 2rem auto",
            animation: "spin 1s linear infinite",
          }}
        />
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "700",
            color: "var(--foreground)",
            marginBottom: "1rem",
          }}
        >
          Analyzing Your Performance
        </h2>
        <p
          style={{
            fontSize: "1rem",
            color: "var(--muted-foreground)",
            marginBottom: "2rem",
          }}
        >
          {step}
        </p>
        <div
          style={{
            width: "100%",
            height: "0.5rem",
            backgroundColor: "var(--muted)",
            borderRadius: "9999px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              backgroundColor: "var(--primary)",
              borderRadius: "9999px",
              width: `${progress}%`,
              transition: "width 0.3s ease-in-out",
            }}
          />
        </div>
        <p
          style={{
            fontSize: "0.875rem",
            color: "var(--muted-foreground)",
            marginTop: "1rem",
          }}
        >
          {progress}% complete
        </p>
        {showButton && (
          <button
            onClick={onButtonClick}
            style={{
              marginTop: "2rem",
              backgroundColor: "var(--primary)",
              color: "var(--primary-foreground)",
              border: "none",
              borderRadius: "var(--radius)",
              padding: "0.75rem 1.5rem",
              fontSize: "1rem",
              fontWeight: "500",
              cursor: "pointer",
              transition: "opacity 0.2s ease-in-out, transform 0.1s ease-in-out",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
            onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            {buttonText}
          </button>
        )}
        
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  )
}
