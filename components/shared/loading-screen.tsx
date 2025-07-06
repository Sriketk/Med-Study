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
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <div className="text-center max-w-sm">
        <div className="w-16 h-16 border-4 border-muted border-t-primary rounded-full mx-auto mb-8 animate-spin" />
        
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Analyzing Your Performance
        </h2>
        
        <p className="text-base text-muted-foreground mb-8">
          {step}
        </p>
        
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <p className="text-sm text-muted-foreground mt-4">
          {progress}% complete
        </p>
        
        {showButton && (
          <button
            onClick={onButtonClick}
            className="mt-8 bg-primary text-primary-foreground border-none rounded px-6 py-3 text-base font-medium cursor-pointer transition-all duration-200 hover:opacity-90 active:scale-98"
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  )
}
