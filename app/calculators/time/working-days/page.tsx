"use client"

import { useState } from "react"
import { ArrowLeft, Calendar } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"

export default function WorkingDaysCalculator() {
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [excludeWeekends, setExcludeWeekends] = useState(true)
  const [excludeHolidays, setExcludeHolidays] = useState(false)
  const [result, setResult] = useState<{
    totalDays: number
    workingDays: number
    weekends: number
    holidays: number
    breakdown: { date: string; day: string; isWorkingDay: boolean; reason?: string }[]
  } | null>(null)

  // Common US holidays (simplified)
  const holidays = [
    "2024-01-01", // New Year's Day
    "2024-01-15", // MLK Day
    "2024-02-19", // Presidents Day
    "2024-05-27", // Memorial Day
    "2024-07-04", // Independence Day
    "2024-09-02", // Labor Day
    "2024-10-14", // Columbus Day
    "2024-11-11", // Veterans Day
    "2024-11-28", // Thanksgiving
    "2024-12-25", // Christmas
  ]

  const calculateWorkingDays = () => {
    if (!startDate || !endDate) return

    const start = new Date(startDate)
    const end = new Date(endDate)

    if (start > end) return

    const breakdown: { date: string; day: string; isWorkingDay: boolean; reason?: string }[] = []
    let totalDays = 0
    let workingDays = 0
    let weekends = 0
    let holidayCount = 0

    const current = new Date(start)
    while (current <= end) {
      totalDays++
      const dateStr = current.toISOString().split("T")[0]
      const dayName = current.toLocaleDateString("en-US", { weekday: "long" })
      const dayOfWeek = current.getDay()

      let isWorkingDay = true
      let reason = ""

      // Check if weekend
      if (excludeWeekends && (dayOfWeek === 0 || dayOfWeek === 6)) {
        isWorkingDay = false
        reason = "Weekend"
        weekends++
      }

      // Check if holiday
      if (excludeHolidays && holidays.includes(dateStr)) {
        if (isWorkingDay) {
          isWorkingDay = false
          reason = "Holiday"
          holidayCount++
        } else {
          reason += " & Holiday"
        }
      }

      if (isWorkingDay) {
        workingDays++
      }

      breakdown.push({
        date: current.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
        day: dayName,
        isWorkingDay,
        reason,
      })

      current.setDate(current.getDate() + 1)
    }

    setResult({
      totalDays,
      workingDays,
      weekends,
      holidays: holidayCount,
      breakdown: breakdown.slice(0, 30), // Show first 30 days
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
              <Calendar className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold text-primary font-[var(--font-heading)]">Working Days Calculator</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-[var(--font-heading)]">Working Days Calculator</CardTitle>
              <CardDescription>
                Calculate business days between two dates, excluding weekends and holidays.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      min={startDate}
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="excludeWeekends"
                        checked={excludeWeekends}
                        onCheckedChange={(checked) => setExcludeWeekends(checked as boolean)}
                      />
                      <Label htmlFor="excludeWeekends">Exclude weekends</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="excludeHolidays"
                        checked={excludeHolidays}
                        onCheckedChange={(checked) => setExcludeHolidays(checked as boolean)}
                      />
                      <Label htmlFor="excludeHolidays">Exclude US holidays</Label>
                    </div>
                  </div>

                  <Button onClick={calculateWorkingDays} className="w-full" size="lg">
                    Calculate Working Days
                  </Button>
                </div>

                {result && (
                  <div className="space-y-4">
                    <Card className="bg-muted">
                      <CardContent className="pt-6">
                        <div className="space-y-4">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-primary">{result.workingDays}</div>
                            <div className="text-lg text-muted-foreground">Working Days</div>
                          </div>

                          <div className="grid grid-cols-1 gap-3">
                            <div className="bg-background rounded-lg p-3 flex justify-between">
                              <span className="text-sm text-muted-foreground">Total Days</span>
                              <span className="font-semibold">{result.totalDays}</span>
                            </div>
                            <div className="bg-background rounded-lg p-3 flex justify-between">
                              <span className="text-sm text-muted-foreground">Weekends</span>
                              <span className="font-semibold text-orange-600">{result.weekends}</span>
                            </div>
                            <div className="bg-background rounded-lg p-3 flex justify-between">
                              <span className="text-sm text-muted-foreground">Holidays</span>
                              <span className="font-semibold text-red-600">{result.holidays}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>

              {result && result.breakdown.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-[var(--font-heading)]">
                      Day Breakdown {result.breakdown.length < result.totalDays && "(First 30 days)"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-2">Date</th>
                            <th className="text-left p-2">Day</th>
                            <th className="text-center p-2">Working Day</th>
                            <th className="text-left p-2">Notes</th>
                          </tr>
                        </thead>
                        <tbody>
                          {result.breakdown.map((day, index) => (
                            <tr key={index} className="border-b">
                              <td className="p-2">{day.date}</td>
                              <td className="p-2">{day.day}</td>
                              <td className="text-center p-2">
                                <span
                                  className={`px-2 py-1 rounded text-xs ${
                                    day.isWorkingDay ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                  }`}
                                >
                                  {day.isWorkingDay ? "Yes" : "No"}
                                </span>
                              </td>
                              <td className="p-2 text-muted-foreground">{day.reason || "-"}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
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
