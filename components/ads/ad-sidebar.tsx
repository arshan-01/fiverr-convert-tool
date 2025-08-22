import { AdBanner } from "./ad-banner"

export function AdSidebar() {
  return (
    <div className="space-y-6">
      <AdBanner size="rectangle" label="Sponsored Content" />
      <AdBanner size="rectangle" label="Related Tools" />
    </div>
  )
}
