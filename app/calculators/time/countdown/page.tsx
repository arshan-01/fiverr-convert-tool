"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function CountdownTimer() {
  const [targetDate, setTargetDate] = useState("")
  const [targetTime, setTargetTime] = useState("00:00")
  const [eventName, setEventName] = useState("")
  const [timeLeft, setTimeLeft] = useState<{
    days: number
    hours: number
    minutes: number
    seconds: number
    isExpired: boolean
  } | null>(null)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive && targetDate) {
      interval = setInterval(() => {
        const target = new Date(`${targetDate}T${targetTime}`)
        const now = new Date()
        const difference = target.getTime() - now.getTime()

        if (difference > 0) {
          const days = Math.floor(difference / (1000 * 60 * 60 * 24))
          const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
          const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
          const seconds = Math.floor((difference % (1000 * 60)) / 1000)

          setTimeLeft({ days, hours, minutes, seconds, isExpired: false })
        } else {
          setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true })
          setIsActive(false)
        }
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, targetDate, targetTime])

  const startCountdown = () => {
    if (!targetDate) return
    setIsActive(true)
  }

  const stopCountdown = () => {
    setIsActive(false)
  }

  const resetCountdown = () => {
    setIsActive(false)
    setTimeLeft(null)
  }

  const getTimeUntilTarget = () => {
    if (!targetDate) return null

    const target = new Date(`${targetDate}T${targetTime}`)
    const now = new Date()
    const difference = target.getTime() - now.getTime()

    if (difference <= 0) return null

    const days = Math.floor(difference / (1000 * 60 * 60 * 24))
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((difference % (1000 * 60)) / 1000)

    return { days, hours, minutes, seconds }
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
              <h1 className="text-xl font-bold text-primary font-[var(--font-heading)]">Countdown Timer</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-[var(--font-heading)]">Countdown Timer</CardTitle>
              <CardDescription>Create a countdown timer to any future date and time.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="eventName">Event Name (Optional)</Label>
                  <Input
                    id="eventName"
                    type="text"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    placeholder="New Year 2025"
                  />
                </div>

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

                <div className="flex space-x-2">
                  {!isActive ? (
                    <Button onClick={startCountdown} className="flex-1" size="lg">
                      Start Countdown
                    </Button>
                  ) : (
                    <Button onClick={stopCountdown} variant="outline" className="flex-1 bg-transparent" size="lg">
                      Stop Countdown
                    </Button>
                  )}
                  <Button onClick={resetCountdown} variant="outline" size="lg">
                    Reset
                  </Button>
                </div>
              </div>

              {(timeLeft || (!isActive && targetDate)) && (
                <Card className="bg-muted">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      {eventName && (
                        <div className="text-center">
                          <div className="text-lg font-semibold text-foreground">{eventName}</div>
                        </div>
                      )}

                      <div className="text-center">
                        <div className="text-sm text-muted-foreground mb-2">
                          {new Date(`${targetDate}T${targetTime}`).toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "numeric",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>

                      {timeLeft?.isExpired ? (
                        <div className="text-center">
                          <div className="text-3xl font-bold text-red-600">Event Has Passed!</div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {[
                            { label: "Days", value: timeLeft?.days || getTimeUntilTarget()?.days || 0 },
                            { label: "Hours", value: timeLeft?.hours || getTimeUntilTarget()?.hours || 0 },
                            { label: "Minutes", value: timeLeft?.minutes || getTimeUntilTarget()?.minutes || 0 },
                            { label: "Seconds", value: timeLeft?.seconds || getTimeUntilTarget()?.seconds || 0 },
                          ].map((item, index) => (
                            <div key={index} className="bg-background rounded-lg p-4 text-center">
                              <div className="text-2xl md:text-3xl font-bold text-primary">
                                {String(item.value).padStart(2, "0")}
                              </div>
                              <div className="text-sm text-muted-foreground">{item.label}</div>
                            </div>
                          ))}
                        </div>
                      )}

                      {isActive && (
                        <div className="text-center">
                          <div className="inline-flex items-center space-x-2 text-sm text-green-600">
                            <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
                            <span>Live Countdown Active</span>
                          </div>
                        </div>
                      )}
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
