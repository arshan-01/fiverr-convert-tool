"use client"

import { useState } from "react"
import { ArrowLeft, Utensils } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Link from "next/link"

export default function CalorieNeedsCalculator() {
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("male")
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [unit, setUnit] = useState("metric")
  const [activityLevel, setActivityLevel] = useState("moderate")
  const [goal, setGoal] = useState("maintain")
  const [result, setResult] = useState<{
    bmr: number
    tdee: number
    goalCalories: number
    macros: { protein: number; carbs: number; fat: number }
  } | null>(null)

  const calculateCalories = () => {
    const ageNum = Number.parseInt(age)
    const heightNum = Number.parseFloat(height)
    const weightNum = Number.parseFloat(weight)

    if (!ageNum || !heightNum || !weightNum || ageNum <= 0 || heightNum <= 0 || weightNum <= 0) return

    // Convert to metric if needed
    const heightCm = unit === "metric" ? heightNum : heightNum * 2.54
    const weightKg = unit === "metric" ? weightNum : weightNum * 0.453592

    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr: number
    if (gender === "male") {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageNum + 5
    } else {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageNum - 161
    }

    // Calculate TDEE based on activity level
    let activityMultiplier: number
    switch (activityLevel) {
      case "sedentary":
        activityMultiplier = 1.2
        break
      case "light":
        activityMultiplier = 1.375
        break
      case "moderate":
        activityMultiplier = 1.55
        break
      case "active":
        activityMultiplier = 1.725
        break
      case "very-active":
        activityMultiplier = 1.9
        break
      default:
        activityMultiplier = 1.55
    }

    const tdee = bmr * activityMultiplier

    // Calculate goal calories
    let goalCalories: number
    switch (goal) {
      case "lose-aggressive":
        goalCalories = tdee - 750 // 1.5 lbs per week
        break
      case "lose-moderate":
        goalCalories = tdee - 500 // 1 lb per week
        break
      case "lose-slow":
        goalCalories = tdee - 250 // 0.5 lbs per week
        break
      case "maintain":
        goalCalories = tdee
        break
      case "gain-slow":
        goalCalories = tdee + 250 // 0.5 lbs per week
        break
      case "gain-moderate":
        goalCalories = tdee + 500 // 1 lb per week
        break
      default:
        goalCalories = tdee
    }

    // Calculate macros (40% carbs, 30% protein, 30% fat)
    const macros = {
      protein: Math.round((goalCalories * 0.3) / 4), // 4 calories per gram
      carbs: Math.round((goalCalories * 0.4) / 4), // 4 calories per gram
      fat: Math.round((goalCalories * 0.3) / 9), // 9 calories per gram
    }

    setResult({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      goalCalories: Math.round(goalCalories),
      macros,
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
              <Utensils className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold text-primary font-[var(--font-heading)]">Calorie Needs Calculator</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-[var(--font-heading)]">Daily Calorie Needs Calculator</CardTitle>
              <CardDescription>
                Calculate your daily calorie needs and macronutrient breakdown based on your goals.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <Label>Gender</Label>
                    <RadioGroup value={gender} onValueChange={setGender} className="flex space-x-4 mt-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="male" id="male" />
                        <Label htmlFor="male">Male</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id="female" />
                        <Label htmlFor="female">Female</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

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
                      step="0.1"
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
                      step="0.1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="activity">Activity Level</Label>
                  <Select value={activityLevel} onValueChange={setActivityLevel}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sedentary">Sedentary (little to no exercise)</SelectItem>
                      <SelectItem value="light">Light (light exercise 1-3 days/week)</SelectItem>
                      <SelectItem value="moderate">Moderate (moderate exercise 3-5 days/week)</SelectItem>
                      <SelectItem value="active">Active (hard exercise 6-7 days/week)</SelectItem>
                      <SelectItem value="very-active">Very Active (very hard exercise, physical job)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="goal">Goal</Label>
                  <Select value={goal} onValueChange={setGoal}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lose-aggressive">Lose Weight Fast (1.5 lbs/week)</SelectItem>
                      <SelectItem value="lose-moderate">Lose Weight (1 lb/week)</SelectItem>
                      <SelectItem value="lose-slow">Lose Weight Slowly (0.5 lbs/week)</SelectItem>
                      <SelectItem value="maintain">Maintain Weight</SelectItem>
                      <SelectItem value="gain-slow">Gain Weight Slowly (0.5 lbs/week)</SelectItem>
                      <SelectItem value="gain-moderate">Gain Weight (1 lb/week)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={calculateCalories} className="w-full" size="lg">
                  Calculate Calorie Needs
                </Button>
              </div>

              {result && (
                <Card className="bg-muted">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary">{result.goalCalories}</div>
                        <div className="text-lg text-muted-foreground">Calories per day</div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-background rounded-lg p-4 text-center">
                          <div className="text-xl font-bold text-secondary">{result.bmr}</div>
                          <div className="text-sm text-muted-foreground">BMR (Base Metabolic Rate)</div>
                        </div>
                        <div className="bg-background rounded-lg p-4 text-center">
                          <div className="text-xl font-bold text-secondary">{result.tdee}</div>
                          <div className="text-sm text-muted-foreground">TDEE (Maintenance Calories)</div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-3">Daily Macronutrient Targets</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-background rounded-lg p-4 text-center">
                            <div className="text-xl font-bold text-green-600">{result.macros.protein}g</div>
                            <div className="text-sm text-muted-foreground">Protein (30%)</div>
                          </div>
                          <div className="bg-background rounded-lg p-4 text-center">
                            <div className="text-xl font-bold text-blue-600">{result.macros.carbs}g</div>
                            <div className="text-sm text-muted-foreground">Carbs (40%)</div>
                          </div>
                          <div className="bg-background rounded-lg p-4 text-center">
                            <div className="text-xl font-bold text-yellow-600">{result.macros.fat}g</div>
                            <div className="text-sm text-muted-foreground">Fat (30%)</div>
                          </div>
                        </div>
                      </div>

                      <div className="text-xs text-muted-foreground mt-4">
                        <p>
                          <strong>Notes:</strong>
                        </p>
                        <p>• BMR calculated using Mifflin-St Jeor equation</p>
                        <p>• Macro split: 30% protein, 40% carbs, 30% fat</p>
                        <p>• Adjust portions based on hunger, energy, and results</p>
                        <p>• Consult a nutritionist for personalized advice</p>
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
