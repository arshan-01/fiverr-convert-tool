import { Card } from "@/components/ui/card"

interface AdBannerProps {
  size: "leaderboard" | "rectangle" | "skyscraper" | "mobile-banner"
  className?: string
  label?: string
}

const adSizes = {
  leaderboard: { width: "728px", height: "90px", className: "w-full max-w-[728px] h-[90px]" },
  rectangle: { width: "300px", height: "250px", className: "w-[300px] h-[250px]" },
  skyscraper: { width: "160px", height: "600px", className: "w-[160px] h-[600px]" },
  "mobile-banner": { width: "320px", height: "50px", className: "w-full max-w-[320px] h-[50px]" },
}

export function AdBanner({ size, className = "", label }: AdBannerProps) {
  const adConfig = adSizes[size]

  return (
    <div className={`flex justify-center ${className}`}>
      <Card
        className={`${adConfig.className} bg-muted border-dashed border-2 border-muted-foreground/20 flex items-center justify-center`}
      >
        <div className="text-center text-muted-foreground">
          <div className="text-xs font-medium mb-1">Advertisement</div>
          <div className="text-xs opacity-60">{label || `${adConfig.width} × ${adConfig.height}`}</div>
        </div>
      </Card>
    </div>
  )
}
