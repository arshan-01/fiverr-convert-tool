"use client"

import { useState } from "react"
import { ArrowLeft, Heart } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

export default function HeartRateZoneCalculator() {
  const [age, setAge] = useState("")
  const [restingHR, setRestingHR] = useState("")
  const [method, setMethod] = useState("karvonen")
  const [result, setResult] = useState<{
    maxHR: number
    zones: { name: string; range: string; percentage: string; color: string }[]
  } | null>(null)

  const calculateHeartRateZones = () => {
    const ageNum = Number.parseInt(age)
    const restingNum = Number.parseInt(restingHR)

    if (!ageNum || ageNum <= 0 || ageNum > 120) return
    if (method === "karvonen" && (!restingNum || restingNum <= 0 || restingNum > 100)) return

    const maxHR = 220 - ageNum

    let zones: { name: string; range: string; percentage: string; color: string }[] = []

    if (method === "karvonen") {
      // Karvonen Formula: Target HR = ((Max HR - Resting HR) × %Intensity) + Resting HR
      const hrReserve = maxHR - restingNum

      zones = [
        {
          name: "Recovery Zone",
          percentage: "50-60%",
          range: `${Math.round(hrReserve * 0.5 + restingNum)}-${Math.round(hrReserve * 0.6 + restingNum)}`,
          color: "bg-blue-100 text-blue-800",
        },
        {
          name: "Aerobic Base Zone",
          percentage: "60-70%",
          range: `${Math.round(hrReserve * 0.6 + restingNum)}-${Math.round(hrReserve * 0.7 + restingNum)}`,
          color: "bg-green-100 text-green-800",
        },
        {
          name: "Aerobic Zone",
          percentage: "70-80%",
          range: `${Math.round(hrReserve * 0.7 + restingNum)}-${Math.round(hrReserve * 0.8 + restingNum)}`,
          color: "bg-yellow-100 text-yellow-800",
        },
        {
          name: "Lactate Threshold",
          percentage: "80-90%",
          range: `${Math.round(hrReserve * 0.8 + restingNum)}-${Math.round(hrReserve * 0.9 + restingNum)}`,
          color: "bg-orange-100 text-orange-800",
        },
        {
          name: "Neuromuscular Power",
          percentage: "90-100%",
          range: `${Math.round(hrReserve * 0.9 + restingNum)}-${Math.round(hrReserve * 1.0 + restingNum)}`,
          color: "bg-red-100 text-red-800",
        },
      ]
    } else {
      // Simple percentage of max HR
      zones = [
        {
          name: "Recovery Zone",
          percentage: "50-60%",
          range: `${Math.round(maxHR * 0.5)}-${Math.round(maxHR * 0.6)}`,
          color: "bg-blue-100 text-blue-800",
        },
        {
          name: "Fat Burn Zone",
          percentage: "60-70%",
          range: `${Math.round(maxHR * 0.6)}-${Math.round(maxHR * 0.7)}`,
          color: "bg-green-100 text-green-800",
        },
        {
          name: "Cardio Zone",
          percentage: "70-80%",
          range: `${Math.round(maxHR * 0.7)}-${Math.round(maxHR * 0.8)}`,
          color: "bg-yellow-100 text-yellow-800",
        },
        {
          name: "Peak Zone",
          percentage: "80-90%",
          range: `${Math.round(maxHR * 0.8)}-${Math.round(maxHR * 0.9)}`,
          color: "bg-orange-100 text-orange-800",
        },
        {
          name: "Max Zone",
          percentage: "90-100%",
          range: `${Math.round(maxHR * 0.9)}-${Math.round(maxHR * 1.0)}`,
          color: "bg-red-100 text-red-800",
        },
      ]
    }

    setResult({ maxHR, zones })
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
              <Heart className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold text-primary font-[var(--font-heading)]">Heart Rate Zone Calculator</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-[var(--font-heading)]">Heart Rate Zone Calculator</CardTitle>
              <CardDescription>
                Calculate your target heart rate zones for different training intensities.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="30"
                    min="1"
                    max="120"
                  />
                </div>

                <div>
                  <Label htmlFor="method">Calculation Method</Label>
                  <Select value={method} onValueChange={setMethod}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="simple">Simple (220 - age)</SelectItem>
                      <SelectItem value="karvonen">Karvonen Formula (more accurate)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {method === "karvonen" && (
                  <div>
                    <Label htmlFor="restingHR">Resting Heart Rate (bpm)</Label>
                    <Input
                      id="restingHR"
                      type="number"
                      value={restingHR}
                      onChange={(e) => setRestingHR(e.target.value)}
                      placeholder="60"
                      min="30"
                      max="100"
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      Measure your resting heart rate first thing in the morning
                    </p>
                  </div>
                )}

                <Button onClick={calculateHeartRateZones} className="w-full" size="lg">
                  Calculate Heart Rate Zones
                </Button>
              </div>

              {result && (
                <Card className="bg-muted">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">Max HR: {result.maxHR} bpm</div>
                      </div>

                      <div className="space-y-3">
                        {result.zones.map((zone, index) => (
                          <div key={index} className={`rounded-lg p-4 ${zone.color}`}>
                            <div className="flex justify-between items-center">
                              <div>
                                <div className="font-semibold">{zone.name}</div>
                                <div className="text-sm opacity-75">{zone.percentage} intensity</div>
                              </div>
                              <div className="text-right">
                                <div className="font-bold">{zone.range} bpm</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="text-xs text-muted-foreground mt-4">
                        <p>
                          <strong>Zone Benefits:</strong>
                        </p>
                        <p>• Recovery: Active recovery and warm-up</p>
                        <p>• Fat Burn/Aerobic Base: Fat burning and endurance</p>
                        <p>• Cardio/Aerobic: Cardiovascular fitness</p>
                        <p>• Peak/Lactate Threshold: Performance improvement</p>
                        <p>• Max/Neuromuscular: Maximum effort training</p>
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
