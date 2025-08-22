"use client"

import { useState } from "react"
import { ArrowLeft, Moon } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

export default function SleepCalculator() {
  const [wakeTime, setWakeTime] = useState("")
  const [ageGroup, setAgeGroup] = useState("adult")
  const [calculationType, setCalculationType] = useState("bedtime")
  const [bedTime, setBedTime] = useState("")
  const [result, setResult] = useState<{
    bedtimes?: string[]
    wakeTimes?: string[]
    sleepDuration?: string
  } | null>(null)

  const getSleepDuration = (age: string) => {
    switch (age) {
      case "newborn":
        return { min: 14, max: 17 }
      case "infant":
        return { min: 12, max: 15 }
      case "toddler":
        return { min: 11, max: 14 }
      case "preschool":
        return { min: 10, max: 13 }
      case "school":
        return { min: 9, max: 11 }
      case "teen":
        return { min: 8, max: 10 }
      case "adult":
        return { min: 7, max: 9 }
      case "older":
        return { min: 7, max: 8 }
      default:
        return { min: 7, max: 9 }
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  const calculateSleep = () => {
    if (calculationType === "bedtime" && !wakeTime) return
    if (calculationType === "waketime" && !bedTime) return

    const sleepDuration = getSleepDuration(ageGroup)

    if (calculationType === "bedtime") {
      // Calculate bedtime based on wake time
      const wake = new Date(`2024-01-01 ${wakeTime}`)
      const bedtimes: string[] = []

      // Calculate for different sleep durations
      for (let hours = sleepDuration.min; hours <= sleepDuration.max; hours++) {
        const bedtime = new Date(wake.getTime() - (hours * 60 + 15) * 60 * 1000) // Add 15 min to fall asleep
        bedtimes.push(formatTime(bedtime))
      }

      setResult({ bedtimes })
    } else {
      // Calculate wake time based on bedtime
      const bed = new Date(`2024-01-01 ${bedTime}`)
      const wakeTimes: string[] = []

      for (let hours = sleepDuration.min; hours <= sleepDuration.max; hours++) {
        const wakeTime = new Date(bed.getTime() + (hours * 60 + 15) * 60 * 1000)
        wakeTimes.push(formatTime(wakeTime))
      }

      setResult({ wakeTimes })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <Moon className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold text-primary font-[var(--font-heading)]">Sleep Calculator</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-[var(--font-heading)]">Sleep Calculator</CardTitle>
              <CardDescription>
                Calculate optimal bedtime or wake time based on sleep cycles and age recommendations.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="calculationType">What do you want to calculate?</Label>
                  <Select value={calculationType} onValueChange={setCalculationType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bedtime">Bedtime (I know when I need to wake up)</SelectItem>
                      <SelectItem value="waketime">Wake time (I know when I go to bed)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="ageGroup">Age Group</Label>
                  <Select value={ageGroup} onValueChange={setAgeGroup}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newborn">Newborn (0-3 months)</SelectItem>
                      <SelectItem value="infant">Infant (4-11 months)</SelectItem>
                      <SelectItem value="toddler">Toddler (1-2 years)</SelectItem>
                      <SelectItem value="preschool">Preschool (3-5 years)</SelectItem>
                      <SelectItem value="school">School age (6-13 years)</SelectItem>
                      <SelectItem value="teen">Teen (14-17 years)</SelectItem>
                      <SelectItem value="adult">Adult (18-64 years)</SelectItem>
                      <SelectItem value="older">Older adult (65+ years)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {calculationType === "bedtime" ? (
                  <div>
                    <Label htmlFor="wakeTime">Wake Up Time</Label>
                    <Input id="wakeTime" type="time" value={wakeTime} onChange={(e) => setWakeTime(e.target.value)} />
                  </div>
                ) : (
                  <div>
                    <Label htmlFor="bedTime">Bedtime</Label>
                    <Input id="bedTime" type="time" value={bedTime} onChange={(e) => setBedTime(e.target.value)} />
                  </div>
                )}

                <Button onClick={calculateSleep} className="w-full" size="lg">
                  Calculate Sleep Schedule
                </Button>
              </div>

              {result && (
                <Card className="bg-muted">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      {result.bedtimes && (
                        <div>
                          <h3 className="text-lg font-semibold mb-3">Recommended Bedtimes:</h3>
                          <div className="grid grid-cols-1 gap-2">
                            {result.bedtimes.map((time, index) => (
                              <div key={index} className="bg-background rounded-lg p-3 text-center">
                                <div className="text-xl font-bold text-primary">{time}</div>
                                <div className="text-sm text-muted-foreground">
                                  {getSleepDuration(ageGroup).min + index} hours of sleep
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {result.wakeTimes && (
                        <div>
                          <h3 className="text-lg font-semibold mb-3">Recommended Wake Times:</h3>
                          <div className="grid grid-cols-1 gap-2">
                            {result.wakeTimes.map((time, index) => (
                              <div key={index} className="bg-background rounded-lg p-3 text-center">
                                <div className="text-xl font-bold text-primary">{time}</div>
                                <div className="text-sm text-muted-foreground">
                                  {getSleepDuration(ageGroup).min + index} hours of sleep
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="text-xs text-muted-foreground mt-4">
                        <p>
                          <strong>Note:</strong> Times include 15 minutes to fall asleep. Sleep cycles are approximately
                          90 minutes long.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
