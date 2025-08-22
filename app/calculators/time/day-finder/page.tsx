"use client"

import { useState } from "react"
import { ArrowLeft, Calendar } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function DayOfWeekFinder() {
  const [selectedDate, setSelectedDate] = useState("")
  const [result, setResult] = useState<{
    dayOfWeek: string
    dayNumber: number
    weekOfYear: number
    dayOfYear: number
    isLeapYear: boolean
    zodiacSign: string
    season: string
  } | null>(null)

  const getZodiacSign = (month: number, day: number) => {
    const signs = [
      { name: "Capricorn", start: [12, 22], end: [1, 19] },
      { name: "Aquarius", start: [1, 20], end: [2, 18] },
      { name: "Pisces", start: [2, 19], end: [3, 20] },
      { name: "Aries", start: [3, 21], end: [4, 19] },
      { name: "Taurus", start: [4, 20], end: [5, 20] },
      { name: "Gemini", start: [5, 21], end: [6, 20] },
      { name: "Cancer", start: [6, 21], end: [7, 22] },
      { name: "Leo", start: [7, 23], end: [8, 22] },
      { name: "Virgo", start: [8, 23], end: [9, 22] },
      { name: "Libra", start: [9, 23], end: [10, 22] },
      { name: "Scorpio", start: [10, 23], end: [11, 21] },
      { name: "Sagittarius", start: [11, 22], end: [12, 21] },
    ]

    for (const sign of signs) {
      if (sign.name === "Capricorn") {
        if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
          return sign.name
        }
      } else {
        const [startMonth, startDay] = sign.start
        const [endMonth, endDay] = sign.end
        if ((month === startMonth && day >= startDay) || (month === endMonth && day <= endDay)) {
          return sign.name
        }
      }
    }
    return "Unknown"
  }

  const getSeason = (month: number, day: number) => {
    if ((month === 12 && day >= 21) || month <= 2 || (month === 3 && day < 20)) {
      return "Winter"
    } else if ((month === 3 && day >= 20) || month <= 5 || (month === 6 && day < 21)) {
      return "Spring"
    } else if ((month === 6 && day >= 21) || month <= 8 || (month === 9 && day < 23)) {
      return "Summer"
    } else {
      return "Autumn"
    }
  }

  const getWeekOfYear = (date: Date) => {
    const start = new Date(date.getFullYear(), 0, 1)
    const days = Math.floor((date.getTime() - start.getTime()) / (24 * 60 * 60 * 1000))
    return Math.ceil((days + start.getDay() + 1) / 7)
  }

  const getDayOfYear = (date: Date) => {
    const start = new Date(date.getFullYear(), 0, 1)
    return Math.floor((date.getTime() - start.getTime()) / (24 * 60 * 60 * 1000)) + 1
  }

  const isLeapYear = (year: number) => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
  }

  const findDayOfWeek = () => {
    if (!selectedDate) return

    const date = new Date(selectedDate)
    const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" })
    const dayNumber = date.getDay() // 0 = Sunday, 1 = Monday, etc.
    const weekOfYear = getWeekOfYear(date)
    const dayOfYear = getDayOfYear(date)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    setResult({
      dayOfWeek,
      dayNumber,
      weekOfYear,
      dayOfYear,
      isLeapYear: isLeapYear(year),
      zodiacSign: getZodiacSign(month, day),
      season: getSeason(month, day),
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
              <h1 className="text-xl font-bold text-primary font-[var(--font-heading)]">Day of Week Finder</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-[var(--font-heading)]">Day of the Week Finder</CardTitle>
              <CardDescription>
                Find out what day of the week any date falls on, plus additional date information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="selectedDate">Select Date</Label>
                  <Input
                    id="selectedDate"
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </div>

                <Button onClick={findDayOfWeek} className="w-full" size="lg">
                  Find Day of Week
                </Button>
              </div>

              {result && (
                <Card className="bg-muted">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground mb-2">
                          {new Date(selectedDate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </div>
                        <div className="text-3xl font-bold text-primary">{result.dayOfWeek}</div>
                        <div className="text-lg text-muted-foreground">Day of the Week</div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-background rounded-lg p-4 text-center">
                          <div className="text-xl font-bold text-secondary">{result.weekOfYear}</div>
                          <div className="text-sm text-muted-foreground">Week of Year</div>
                        </div>
                        <div className="bg-background rounded-lg p-4 text-center">
                          <div className="text-xl font-bold text-secondary">{result.dayOfYear}</div>
                          <div className="text-sm text-muted-foreground">Day of Year</div>
                        </div>
                        <div className="bg-background rounded-lg p-4 text-center">
                          <div className="text-xl font-bold text-secondary">{result.zodiacSign}</div>
                          <div className="text-sm text-muted-foreground">Zodiac Sign</div>
                        </div>
                        <div className="bg-background rounded-lg p-4 text-center">
                          <div className="text-xl font-bold text-secondary">{result.season}</div>
                          <div className="text-sm text-muted-foreground">Season</div>
                        </div>
                      </div>

                      <div className="bg-background rounded-lg p-4">
                        <div className="text-sm space-y-1">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Day Number:</span>
                            <span>{result.dayNumber} (0=Sunday, 1=Monday, etc.)</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Leap Year:</span>
                            <span>{result.isLeapYear ? "Yes" : "No"}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-xs text-muted-foreground">
                        <p>
                          <strong>Fun Facts:</strong>
                        </p>
                        <p>• The Gregorian calendar repeats every 400 years</p>
                        <p>• Friday the 13th occurs at least once every year</p>
                        <p>• The most common birthday is September 9th</p>
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
