"use client"

import { useState } from "react"
import { ArrowLeft, Footprints } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

export default function StepsToKmConverter() {
  const [steps, setSteps] = useState("")
  const [height, setHeight] = useState("")
  const [unit, setUnit] = useState("cm")
  const [result, setResult] = useState<{
    kilometers: number
    miles: number
    meters: number
    calories: number
    strideLength: number
  } | null>(null)

  const calculateDistance = () => {
    const stepsNum = Number.parseInt(steps)
    const heightNum = Number.parseFloat(height)

    if (!stepsNum || stepsNum <= 0 || !heightNum || heightNum <= 0) return

    // Convert height to cm if needed
    const heightCm = unit === "cm" ? heightNum : heightNum * 2.54

    // Calculate stride length (approximately 0.413 * height for walking)
    const strideLengthCm = heightCm * 0.413
    const strideLengthM = strideLengthCm / 100

    // Calculate distances
    const meters = stepsNum * strideLengthM
    const kilometers = meters / 1000
    const miles = kilometers * 0.621371

    // Estimate calories burned (rough estimate: 0.04 calories per step)
    const calories = Math.round(stepsNum * 0.04)

    setResult({
      kilometers: Math.round(kilometers * 100) / 100,
      miles: Math.round(miles * 100) / 100,
      meters: Math.round(meters),
      calories,
      strideLength: Math.round(strideLengthCm),
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
              <Footprints className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold text-primary font-[var(--font-heading)]">Steps to KM Converter</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-[var(--font-heading)]">Steps to Distance Converter</CardTitle>
              <CardDescription>
                Convert your daily steps to kilometers, miles, and estimate calories burned.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="steps">Number of Steps</Label>
                  <Input
                    id="steps"
                    type="number"
                    value={steps}
                    onChange={(e) => setSteps(e.target.value)}
                    placeholder="10000"
                    min="1"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="height">Height</Label>
                    <Input
                      id="height"
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      placeholder={unit === "cm" ? "170" : "67"}
                      step="0.1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="unit">Unit</Label>
                    <Select value={unit} onValueChange={setUnit}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cm">Centimeters</SelectItem>
                        <SelectItem value="inches">Inches</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button onClick={calculateDistance} className="w-full" size="lg">
                  Convert Steps to Distance
                </Button>
              </div>

              {result && (
                <Card className="bg-muted">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary">{result.kilometers} km</div>
                        <div className="text-lg text-muted-foreground">{result.miles} miles</div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-background rounded-lg p-4 text-center">
                          <div className="text-xl font-bold text-secondary">{result.meters}</div>
                          <div className="text-sm text-muted-foreground">Meters</div>
                        </div>
                        <div className="bg-background rounded-lg p-4 text-center">
                          <div className="text-xl font-bold text-secondary">{result.calories}</div>
                          <div className="text-sm text-muted-foreground">Calories Burned</div>
                        </div>
                        <div className="bg-background rounded-lg p-4 text-center">
                          <div className="text-xl font-bold text-secondary">{result.strideLength} cm</div>
                          <div className="text-sm text-muted-foreground">Stride Length</div>
                        </div>
                      </div>

                      <div className="text-xs text-muted-foreground mt-4">
                        <p>
                          <strong>Notes:</strong>
                        </p>
                        <p>• Stride length calculated as 41.3% of height (walking average)</p>
                        <p>• Calorie estimate based on average walking pace</p>
                        <p>• 10,000 steps ≈ 5 miles for most people</p>
                        <p>• Actual distance may vary based on walking speed and terrain</p>
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
