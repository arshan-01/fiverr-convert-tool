"use client"

import { useState } from "react"
import { ArrowLeft, Droplets } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"

export default function WaterIntakeCalculator() {
  const [weight, setWeight] = useState("")
  const [unit, setUnit] = useState("kg")
  const [activityLevel, setActivityLevel] = useState("moderate")
  const [climate, setClimate] = useState("temperate")
  const [pregnant, setPregnant] = useState(false)
  const [breastfeeding, setBreastfeeding] = useState(false)
  const [result, setResult] = useState<{ liters: number; glasses: number; ounces: number } | null>(null)

  const calculateWaterIntake = () => {
    const w = Number.parseFloat(weight)
    if (!w || w <= 0) return

    // Convert weight to kg if needed
    const weightKg = unit === "kg" ? w : w * 0.453592

    // Base calculation: 35ml per kg of body weight
    let waterMl = weightKg * 35

    // Adjust for activity level
    switch (activityLevel) {
      case "low":
        waterMl *= 0.9
        break
      case "high":
        waterMl *= 1.3
        break
      case "very-high":
        waterMl *= 1.5
        break
    }

    // Adjust for climate
    if (climate === "hot") {
      waterMl *= 1.2
    } else if (climate === "very-hot") {
      waterMl *= 1.4
    }

    // Adjust for pregnancy/breastfeeding
    if (pregnant) {
      waterMl += 300 // Additional 300ml for pregnancy
    }
    if (breastfeeding) {
      waterMl += 700 // Additional 700ml for breastfeeding
    }

    const liters = Math.round((waterMl / 1000) * 10) / 10
    const glasses = Math.round(waterMl / 250) // 250ml per glass
    const ounces = Math.round((waterMl / 29.5735) * 10) / 10

    setResult({ liters, glasses, ounces })
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
              <Droplets className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold text-primary font-[var(--font-heading)]">Water Intake Calculator</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-[var(--font-heading)]">Daily Water Intake Calculator</CardTitle>
              <CardDescription>
                Calculate your recommended daily water intake based on your weight, activity level, and other factors.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="weight">Weight</Label>
                    <Input
                      id="weight"
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      placeholder="70"
                    />
                  </div>
                  <div>
                    <Label htmlFor="unit">Unit</Label>
                    <Select value={unit} onValueChange={setUnit}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kg">Kilograms (kg)</SelectItem>
                        <SelectItem value="lbs">Pounds (lbs)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="activity">Activity Level</Label>
                  <Select value={activityLevel} onValueChange={setActivityLevel}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low (little to no exercise)</SelectItem>
                      <SelectItem value="moderate">Moderate (light exercise 1-3 days/week)</SelectItem>
                      <SelectItem value="high">High (moderate exercise 3-5 days/week)</SelectItem>
                      <SelectItem value="very-high">Very High (intense exercise 6-7 days/week)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="climate">Climate</Label>
                  <Select value={climate} onValueChange={setClimate}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cold">Cold</SelectItem>
                      <SelectItem value="temperate">Temperate</SelectItem>
                      <SelectItem value="hot">Hot</SelectItem>
                      <SelectItem value="very-hot">Very Hot</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="pregnant"
                      checked={pregnant}
                      onCheckedChange={(checked) => setPregnant(checked as boolean)}
                    />
                    <Label htmlFor="pregnant">Pregnant</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="breastfeeding"
                      checked={breastfeeding}
                      onCheckedChange={(checked) => setBreastfeeding(checked as boolean)}
                    />
                    <Label htmlFor="breastfeeding">Breastfeeding</Label>
                  </div>
                </div>

                <Button onClick={calculateWaterIntake} className="w-full" size="lg">
                  Calculate Water Intake
                </Button>
              </div>

              {result && (
                <Card className="bg-muted">
                  <CardContent className="pt-6">
                    <div className="text-center space-y-4">
                      <div className="text-3xl font-bold text-primary">{result.liters}L</div>
                      <div className="text-lg text-muted-foreground">per day</div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                        <div className="bg-background rounded-lg p-4">
                          <div className="text-2xl font-bold text-secondary">{result.glasses}</div>
                          <div className="text-sm text-muted-foreground">Glasses (250ml each)</div>
                        </div>
                        <div className="bg-background rounded-lg p-4">
                          <div className="text-2xl font-bold text-secondary">{result.ounces} fl oz</div>
                          <div className="text-sm text-muted-foreground">Fluid Ounces</div>
                        </div>
                      </div>

                      <div className="text-xs text-muted-foreground mt-4 text-left">
                        <p>
                          <strong>Tips:</strong>
                        </p>
                        <p>• Drink water throughout the day, not all at once</p>
                        <p>• Increase intake during exercise or hot weather</p>
                        <p>• Monitor urine color - pale yellow indicates good hydration</p>
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
