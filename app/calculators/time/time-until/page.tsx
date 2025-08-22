"use client"

import { useState } from "react"
import { ArrowLeft, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

export default function TimeUntilCalculator() {
  const [targetDate, setTargetDate] = useState("")
  const [targetTime, setTargetTime] = useState("00:00")
  const [calculationType, setCalculationType] = useState("specific-date")
  const [quickOption, setQuickOption] = useState("")
  const [result, setResult] = useState<{
    totalDays: number
    totalHours: number
    totalMinutes: number
    totalSeconds: number
    breakdown: {
      years: number
      months: number
      days: number
      hours: number
      minutes: number
      seconds: number
    }
    percentage: {
      yearProgress: number
      monthProgress: number
      weekProgress: number
      dayProgress: number
    }
  } | null>(null)

  const getQuickDate = (option: string) => {
    const now = new Date()
    const target = new Date()

    switch (option) {
      case "end-of-day":
        target.setHours(23, 59, 59, 999)
        break
      case "end-of-week":
        const daysUntilSunday = (7 - now.getDay()) % 7
        target.setDate(now.getDate() + daysUntilSunday)
        target.setHours(23, 59, 59, 999)
        break
      case "end-of-month":
        target.setMonth(now.getMonth() + 1, 0)
        target.setHours(23, 59, 59, 999)
        break
      case "end-of-year":
        target.setFullYear(now.getFullYear(), 11, 31)
        target.setHours(23, 59, 59, 999)
        break
      case "next-birthday":
        // Assuming birthday is January 1st for demo
        target.setFullYear(now.getFullYear(), 0, 1)
        if (target < now) {
          target.setFullYear(now.getFullYear() + 1)
        }
        break
      case "christmas":
        target.setFullYear(now.getFullYear(), 11, 25)
        if (target < now) {
          target.setFullYear(now.getFullYear() + 1)
        }
        break
      case "new-year":
        target.setFullYear(now.getFullYear() + 1, 0, 1)
        target.setHours(0, 0, 0, 0)
        break
      default:
        return null
    }

    return target
  }

  const calculateTimeUntil = () => {
    let target: Date

    if (calculationType === "specific-date") {
      if (!targetDate) return
      target = new Date(`${targetDate}T${targetTime}`)
    } else {
      if (!quickOption) return
      const quickDate = getQuickDate(quickOption)
      if (!quickDate) return
      target = quickDate
    }

    const now = new Date()
    const difference = target.getTime() - now.getTime()

    if (difference <= 0) return

    // Calculate totals
    const totalSeconds = Math.floor(difference / 1000)
    const totalMinutes = Math.floor(totalSeconds / 60)
    const totalHours = Math.floor(totalMinutes / 60)
    const totalDays = Math.floor(totalHours / 24)

    // Calculate breakdown
    const years = Math.floor(totalDays / 365)
    const months = Math.floor((totalDays % 365) / 30)
    const days = Math.floor((totalDays % 365) % 30)
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((difference % (1000 * 60)) / 1000)

    // Calculate progress percentages
    const yearStart = new Date(now.getFullYear(), 0, 1)
    const yearEnd = new Date(now.getFullYear() + 1, 0, 1)
    const yearProgress = ((now.getTime() - yearStart.getTime()) / (yearEnd.getTime() - yearStart.getTime())) * 100

    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
    const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 1)
    const monthProgress = ((now.getTime() - monthStart.getTime()) / (monthEnd.getTime() - monthStart.getTime())) * 100

    const weekStart = new Date(now)
    weekStart.setDate(now.getDate() - now.getDay())
    weekStart.setHours(0, 0, 0, 0)
    const weekEnd = new Date(weekStart)
    weekEnd.setDate(weekStart.getDate() + 7)
    const weekProgress = ((now.getTime() - weekStart.getTime()) / (weekEnd.getTime() - weekStart.getTime())) * 100

    const dayStart = new Date(now)
    dayStart.setHours(0, 0, 0, 0)
    const dayEnd = new Date(dayStart)
    dayEnd.setDate(dayStart.getDate() + 1)
    const dayProgress = ((now.getTime() - dayStart.getTime()) / (dayEnd.getTime() - dayStart.getTime())) * 100

    setResult({
      totalDays,
      totalHours,
      totalMinutes,
      totalSeconds,
      breakdown: { years, months, days, hours, minutes, seconds },
      percentage: {
        yearProgress: Math.round(yearProgress * 10) / 10,
        monthProgress: Math.round(monthProgress * 10) / 10,
        weekProgress: Math.round(weekProgress * 10) / 10,
        dayProgress: Math.round(dayProgress * 10) / 10,
      },
    })
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
              <Clock className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold text-primary font-[var(--font-heading)]">Time Until Calculator</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-[var(--font-heading)]">Time Until Calculator</CardTitle>
              <CardDescription>
                Calculate the time remaining until a specific date or common milestones.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="calculationType">Calculation Type</Label>
                  <Select value={calculationType} onValueChange={setCalculationType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="specific-date">Specific Date & Time</SelectItem>
                      <SelectItem value="quick-options">Quick Options</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {calculationType === "specific-date" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="targetDate">Target Date</Label>
                      <Input
                        id="targetDate"
                        type="date"
                        value={targetDate}
                        onChange={(e) => setTargetDate(e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </div>
                    <div>
                      <Label htmlFor="targetTime">Target Time</Label>
                      <Input
                        id="targetTime"
                        type="time"
                        value={targetTime}
                        onChange={(e) => setTargetTime(e.target.value)}
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <Label htmlFor="quickOption">Quick Options</Label>
                    <Select value={quickOption} onValueChange={setQuickOption}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="end-of-day">End of Today</SelectItem>
                        <SelectItem value="end-of-week">End of This Week</SelectItem>
                        <SelectItem value="end-of-month">End of This Month</SelectItem>
                        <SelectItem value="end-of-year">End of This Year</SelectItem>
                        <SelectItem value="christmas">Christmas</SelectItem>
                        <SelectItem value="new-year">New Year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <Button onClick={calculateTimeUntil} className="w-full" size="lg">
                  Calculate Time Until
                </Button>
              </div>

              {result && (
                <Card className="bg-muted">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary">{result.totalDays}</div>
                        <div className="text-lg text-muted-foreground">Days Remaining</div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="bg-background rounded-lg p-3 text-center">
                          <div className="text-lg font-bold text-secondary">{result.breakdown.years}</div>
                          <div className="text-xs text-muted-foreground">Years</div>
                        </div>
                        <div className="bg-background rounded-lg p-3 text-center">
                          <div className="text-lg font-bold text-secondary">{result.breakdown.months}</div>
                          <div className="text-xs text-muted-foreground">Months</div>
                        </div>
                        <div className="bg-background rounded-lg p-3 text-center">
                          <div className="text-lg font-bold text-secondary">{result.breakdown.days}</div>
                          <div className="text-xs text-muted-foreground">Days</div>
                        </div>
                        <div className="bg-background rounded-lg p-3 text-center">
                          <div className="text-lg font-bold text-secondary">{result.breakdown.hours}</div>
                          <div className="text-xs text-muted-foreground">Hours</div>
                        </div>
                        <div className="bg-background rounded-lg p-3 text-center">
                          <div className="text-lg font-bold text-secondary">{result.breakdown.minutes}</div>
                          <div className="text-xs text-muted-foreground">Minutes</div>
                        </div>
                        <div className="bg-background rounded-lg p-3 text-center">
                          <div className="text-lg font-bold text-secondary">{result.breakdown.seconds}</div>
                          <div className="text-xs text-muted-foreground">Seconds</div>
                        </div>
                      </div>

                      <div className="bg-background rounded-lg p-4">
                        <div className="text-sm space-y-2">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Total Hours:</span>
                            <span>{result.totalHours.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Total Minutes:</span>
                            <span>{result.totalMinutes.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Total Seconds:</span>
                            <span>{result.totalSeconds.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-background rounded-lg p-4">
                        <div className="text-sm">
                          <p className="font-semibold mb-2">Current Progress:</p>
                          <div className="space-y-1">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Year:</span>
                              <span>{result.percentage.yearProgress}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Month:</span>
                              <span>{result.percentage.monthProgress}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Week:</span>
                              <span>{result.percentage.weekProgress}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Day:</span>
                              <span>{result.percentage.dayProgress}%</span>
                            </div>
                          </div>
                        </div>
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
