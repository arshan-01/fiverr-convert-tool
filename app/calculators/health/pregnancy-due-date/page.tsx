"use client"

import { useState } from "react"
import { ArrowLeft, Baby } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

export default function PregnancyDueDateCalculator() {
  const [lastPeriod, setLastPeriod] = useState("")
  const [cycleLength, setCycleLength] = useState("28")
  const [calculationMethod, setCalculationMethod] = useState("lmp")
  const [conceptionDate, setConceptionDate] = useState("")
  const [result, setResult] = useState<{
    dueDate: string
    weeksPregnant: number
    daysPregnant: number
    trimester: number
    conceptionDate: string
    remainingWeeks: number
  } | null>(null)

  const calculateDueDate = () => {
    let conception: Date

    if (calculationMethod === "lmp") {
      if (!lastPeriod) return
      const lmp = new Date(lastPeriod)
      const cycleNum = Number.parseInt(cycleLength)

      // Conception typically occurs 14 days after LMP for 28-day cycle
      // Adjust for different cycle lengths
      const ovulationDay = cycleNum - 14
      conception = new Date(lmp.getTime() + ovulationDay * 24 * 60 * 60 * 1000)
    } else {
      if (!conceptionDate) return
      conception = new Date(conceptionDate)
    }

    // Due date is 280 days (40 weeks) from LMP, or 266 days (38 weeks) from conception
    const dueDate = new Date(conception.getTime() + 266 * 24 * 60 * 60 * 1000)

    // Calculate current pregnancy progress
    const today = new Date()
    const daysSinceConception = Math.floor((today.getTime() - conception.getTime()) / (24 * 60 * 60 * 1000))
    const weeksSinceConception = Math.floor(daysSinceConception / 7)

    // Pregnancy weeks are calculated from LMP (conception + 2 weeks)
    const pregnancyWeeks = weeksSinceConception + 2
    const pregnancyDays = daysSinceConception + 14

    // Determine trimester
    let trimester: number
    if (pregnancyWeeks <= 12) {
      trimester = 1
    } else if (pregnancyWeeks <= 27) {
      trimester = 2
    } else {
      trimester = 3
    }

    // Calculate remaining weeks
    const remainingDays = Math.floor((dueDate.getTime() - today.getTime()) / (24 * 60 * 60 * 1000))
    const remainingWeeks = Math.floor(remainingDays / 7)

    setResult({
      dueDate: dueDate.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      weeksPregnant: pregnancyWeeks,
      daysPregnant: pregnancyDays,
      trimester,
      conceptionDate: conception.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      remainingWeeks: Math.max(0, remainingWeeks),
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
              <Baby className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold text-primary font-[var(--font-heading)]">
                Pregnancy Due Date Calculator
              </h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-[var(--font-heading)]">Pregnancy Due Date Calculator</CardTitle>
              <CardDescription>Calculate your estimated due date and track your pregnancy progress.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="method">Calculation Method</Label>
                  <Select value={calculationMethod} onValueChange={setCalculationMethod}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lmp">Last Menstrual Period (LMP)</SelectItem>
                      <SelectItem value="conception">Conception Date</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {calculationMethod === "lmp" ? (
                  <>
                    <div>
                      <Label htmlFor="lastPeriod">First Day of Last Menstrual Period</Label>
                      <Input
                        id="lastPeriod"
                        type="date"
                        value={lastPeriod}
                        onChange={(e) => setLastPeriod(e.target.value)}
                        max={new Date().toISOString().split("T")[0]}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cycleLength">Average Cycle Length (days)</Label>
                      <Select value={cycleLength} onValueChange={setCycleLength}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="21">21 days</SelectItem>
                          <SelectItem value="22">22 days</SelectItem>
                          <SelectItem value="23">23 days</SelectItem>
                          <SelectItem value="24">24 days</SelectItem>
                          <SelectItem value="25">25 days</SelectItem>
                          <SelectItem value="26">26 days</SelectItem>
                          <SelectItem value="27">27 days</SelectItem>
                          <SelectItem value="28">28 days (average)</SelectItem>
                          <SelectItem value="29">29 days</SelectItem>
                          <SelectItem value="30">30 days</SelectItem>
                          <SelectItem value="31">31 days</SelectItem>
                          <SelectItem value="32">32 days</SelectItem>
                          <SelectItem value="33">33 days</SelectItem>
                          <SelectItem value="34">34 days</SelectItem>
                          <SelectItem value="35">35 days</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                ) : (
                  <div>
                    <Label htmlFor="conceptionDate">Conception Date</Label>
                    <Input
                      id="conceptionDate"
                      type="date"
                      value={conceptionDate}
                      onChange={(e) => setConceptionDate(e.target.value)}
                      max={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                )}

                <Button onClick={calculateDueDate} className="w-full" size="lg">
                  Calculate Due Date
                </Button>
              </div>

              {result && (
                <Card className="bg-muted">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary mb-2">Due Date</div>
                        <div className="text-xl text-foreground">{result.dueDate}</div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-background rounded-lg p-4 text-center">
                          <div className="text-2xl font-bold text-secondary">{result.weeksPregnant}</div>
                          <div className="text-sm text-muted-foreground">Weeks Pregnant</div>
                        </div>
                        <div className="bg-background rounded-lg p-4 text-center">
                          <div className="text-2xl font-bold text-secondary">{result.trimester}</div>
                          <div className="text-sm text-muted-foreground">Trimester</div>
                        </div>
                        <div className="bg-background rounded-lg p-4 text-center">
                          <div className="text-2xl font-bold text-secondary">{result.remainingWeeks}</div>
                          <div className="text-sm text-muted-foreground">Weeks Remaining</div>
                        </div>
                        <div className="bg-background rounded-lg p-4 text-center">
                          <div className="text-2xl font-bold text-secondary">{result.daysPregnant}</div>
                          <div className="text-sm text-muted-foreground">Days Pregnant</div>
                        </div>
                      </div>

                      <div className="bg-background rounded-lg p-4">
                        <div className="text-sm">
                          <p>
                            <strong>Estimated Conception Date:</strong> {result.conceptionDate}
                          </p>
                        </div>
                      </div>

                      <div className="text-xs text-muted-foreground mt-4">
                        <p>
                          <strong>Important Notes:</strong>
                        </p>
                        <p>• This is an estimate - only 5% of babies are born on their due date</p>
                        <p>• Most babies are born within 2 weeks of the due date</p>
                        <p>• Consult your healthcare provider for accurate pregnancy tracking</p>
                        <p>• Due date may be adjusted based on ultrasound measurements</p>
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
