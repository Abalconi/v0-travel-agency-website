interface ProgressBarProps {
  progress: number
  step: number
  total: number
}

export function ProgressBar({ progress, step, total }: ProgressBarProps) {
  return (
    <div className="px-4 pb-6">
      {/* Dots */}
      <div className="flex items-center justify-center gap-2 mb-3">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`h-2 rounded-full transition-all duration-400 ${
              i < step
                ? "bg-primary w-6"
                : i === step
                ? "bg-primary/80 w-4"
                : "bg-border w-2"
            }`}
          />
        ))}
      </div>
      {/* Bar */}
      <div className="h-0.5 bg-border rounded-full overflow-hidden max-w-sm mx-auto">
        <div
          className="h-full bg-primary rounded-full progress-bar-fill"
          style={{ width: `${Math.max(progress, 5)}%` }}
        />
      </div>
    </div>
  )
}
