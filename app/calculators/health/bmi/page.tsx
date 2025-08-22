"use client"

import { useState } from "react"
import { Calculator, ArrowLeft } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AdBanner } from "@/components/ads/ad-banner"
import { AdSidebar } from "@/components/ads/ad-sidebar"
import Link from "next/link"

export default function BMICalculator() {
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [unit, setUnit] = useState("metric")
  const [result, setResult] = useState<{ bmi: number; category: string; color: string } | null>(null)

  const calculateBMI = () => {
    const h = Number.parseFloat(height)
    const w = Number.parseFloat(weight)

    if (!h || !w || h <= 0 || w <= 0) return

    let bmi: number
    if (unit === "metric") {
      bmi = w / (h / 100) ** 2
    } else {
      bmi = (w / h ** 2) * 703
    }

    let category: string
    let color: string

    if (bmi < 18.5) {
      category = "Underweight"
      color = "text-blue-600"
    } else if (bmi < 25) {
      category = "Normal weight"
      color = "text-green-600"
    } else if (bmi < 30) {
      category = "Overweight"
      color = "text-yellow-600"
    } else {
      category = "Obese"
      color = "text-red-600"
    }

    setResult({ bmi: Math.round(bmi * 10) / 10, category, color })
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
              <Calculator className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold text-primary font-[var(--font-heading)]">BMI Calculator</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="py-4 px-4 bg-muted/30">
        <AdBanner size="leaderboard" label="Health & Fitness Tools" />
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="max-w-2xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-[var(--font-heading)]">Body Mass Index Calculator</CardTitle>
                  <CardDescription>
                    Calculate your BMI to assess if you're at a healthy weight for your height.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="unit">Unit System</Label>
                      <Select value={unit} onValueChange={setUnit}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="metric">Metric (cm, kg)</SelectItem>
                          <SelectItem value="imperial">Imperial (inches, lbs)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="height">Height {unit === "metric" ? "(cm)" : "(inches)"}</Label>
                        <Input
                          id="height"
                          type="number"
                          value={height}
                          onChange={(e) => setHeight(e.target.value)}
                          placeholder={unit === "metric" ? "170" : "67"}
                        />
                      </div>
                      <div>
                        <Label htmlFor="weight">Weight {unit === "metric" ? "(kg)" : "(lbs)"}</Label>
                        <Input
                          id="weight"
                          type="number"
                          value={weight}
                          onChange={(e) => setWeight(e.target.value)}
                          placeholder={unit === "metric" ? "70" : "154"}
                        />
                      </div>
                    </div>

                    <Button onClick={calculateBMI} className="w-full" size="lg">
                      Calculate BMI
                    </Button>
                  </div>

                  {result && (
                    <>
                      <div className="py-4">
                        <AdBanner size="mobile-banner" label="Health Products" className="md:hidden" />
                      </div>
                      <Card className="bg-muted">
                        <CardContent className="pt-6">
                          <div className="text-center space-y-2">
                            <div className="text-3xl font-bold text-primary">{result.bmi}</div>
                            <div className={`text-lg font-semibold ${result.color}`}>{result.category}</div>
                            <div className="text-sm text-muted-foreground mt-4">
                              <p>
                                <strong>BMI Categories:</strong>
                              </p>
                              <p>Underweight: Below 18.5</p>
                              <p>Normal weight: 18.5-24.9</p>
                              <p>Overweight: 25-29.9</p>
                              <p>Obese: 30 and above</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </>
                  )}
                </CardContent>
              </Card>

              <div className="mt-8">
                <AdBanner size="leaderboard" label="Related Health Tools" />
              </div>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="sticky top-24">
              <AdSidebar />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
