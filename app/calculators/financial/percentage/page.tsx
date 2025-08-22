"use client"

import { useState } from "react"
import { ArrowLeft, Percent } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

export default function PercentageCalculator() {
  const [calculationType, setCalculationType] = useState("percentage-of")
  const [value1, setValue1] = useState("")
  const [value2, setValue2] = useState("")
  const [result, setResult] = useState<number | null>(null)

  const calculatePercentage = () => {
    const num1 = Number.parseFloat(value1)
    const num2 = Number.parseFloat(value2)

    if (isNaN(num1) || isNaN(num2)) return

    let calculatedResult: number

    switch (calculationType) {
      case "percentage-of":
        // What is X% of Y?
        calculatedResult = (num1 / 100) * num2
        break
      case "what-percentage":
        // X is what percentage of Y?
        if (num2 === 0) return
        calculatedResult = (num1 / num2) * 100
        break
      case "percentage-change":
        // Percentage change from X to Y
        if (num1 === 0) return
        calculatedResult = ((num2 - num1) / num1) * 100
        break
      case "percentage-increase":
        // X increased by Y%
        calculatedResult = num1 + (num1 * num2) / 100
        break
      case "percentage-decrease":
        // X decreased by Y%
        calculatedResult = num1 - (num1 * num2) / 100
        break
      default:
        return
    }

    setResult(Math.round(calculatedResult * 100) / 100)
  }

  const getCalculationDescription = () => {
    switch (calculationType) {
      case "percentage-of":
        return `What is ${value1}% of ${value2}?`
      case "what-percentage":
        return `${value1} is what percentage of ${value2}?`
      case "percentage-change":
        return `Percentage change from ${value1} to ${value2}`
      case "percentage-increase":
        return `${value1} increased by ${value2}%`
      case "percentage-decrease":
        return `${value1} decreased by ${value2}%`
      default:
        return ""
    }
  }

  const getResultLabel = () => {
    switch (calculationType) {
      case "percentage-of":
        return "Result"
      case "what-percentage":
        return "Percentage"
      case "percentage-change":
        return "Change"
      case "percentage-increase":
        return "New Value"
      case "percentage-decrease":
        return "New Value"
      default:
        return "Result"
    }
  }

  const getResultUnit = () => {
    switch (calculationType) {
      case "what-percentage":
      case "percentage-change":
        return "%"
      default:
        return ""
    }
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
              <Percent className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold text-primary font-[var(--font-heading)]">Percentage Calculator</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-[var(--font-heading)]">Percentage Calculator</CardTitle>
              <CardDescription>
                Calculate percentages, percentage changes, and solve various percentage problems.
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
                      <SelectItem value="percentage-of">What is X% of Y?</SelectItem>
                      <SelectItem value="what-percentage">X is what percentage of Y?</SelectItem>
                      <SelectItem value="percentage-change">Percentage change from X to Y</SelectItem>
                      <SelectItem value="percentage-increase">X increased by Y%</SelectItem>
                      <SelectItem value="percentage-decrease">X decreased by Y%</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="value1">
                      {calculationType === "percentage-of"
                        ? "Percentage"
                        : calculationType === "what-percentage"
                          ? "Value"
                          : calculationType === "percentage-change"
                            ? "Original Value"
                            : calculationType === "percentage-increase"
                              ? "Original Value"
                              : calculationType === "percentage-decrease"
                                ? "Original Value"
                                : "First Value"}
                    </Label>
                    <Input
                      id="value1"
                      type="number"
                      value={value1}
                      onChange={(e) => setValue1(e.target.value)}
                      placeholder={calculationType === "percentage-of" ? "25" : "100"}
                      step="0.01"
                    />
                  </div>
                  <div>
                    <Label htmlFor="value2">
                      {calculationType === "percentage-of"
                        ? "Of Value"
                        : calculationType === "what-percentage"
                          ? "Total Value"
                          : calculationType === "percentage-change"
                            ? "New Value"
                            : calculationType === "percentage-increase"
                              ? "Increase %"
                              : calculationType === "percentage-decrease"
                                ? "Decrease %"
                                : "Second Value"}
                    </Label>
                    <Input
                      id="value2"
                      type="number"
                      value={value2}
                      onChange={(e) => setValue2(e.target.value)}
                      placeholder={
                        calculationType === "percentage-of"
                          ? "200"
                          : calculationType === "what-percentage"
                            ? "400"
                            : calculationType === "percentage-change"
                              ? "120"
                              : "10"
                      }
                      step="0.01"
                    />
                  </div>
                </div>

                <Button onClick={calculatePercentage} className="w-full" size="lg">
                  Calculate
                </Button>
              </div>

              {result !== null && (
                <Card className="bg-muted">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground mb-2">{getCalculationDescription()}</div>
                        <div className="text-3xl font-bold text-primary">
                          {result.toLocaleString()}
                          {getResultUnit()}
                        </div>
                        <div className="text-lg text-muted-foreground">{getResultLabel()}</div>
                      </div>

                      {calculationType === "percentage-change" && (
                        <div className="bg-background rounded-lg p-4">
                          <div className="text-sm space-y-1">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Original Value:</span>
                              <span>{Number.parseFloat(value1 || "0").toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">New Value:</span>
                              <span>{Number.parseFloat(value2 || "0").toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Difference:</span>
                              <span>
                                {(Number.parseFloat(value2 || "0") - Number.parseFloat(value1 || "0")).toLocaleString()}
                              </span>
                            </div>
                            <div className="flex justify-between font-semibold border-t pt-1">
                              <span>Percentage Change:</span>
                              <span className={result >= 0 ? "text-green-600" : "text-red-600"}>
                                {result >= 0 ? "+" : ""}
                                {result}%
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="text-xs text-muted-foreground">
                        <p>
                          <strong>Common Uses:</strong>
                        </p>
                        <p>• Calculate tips, taxes, and discounts</p>
                        <p>• Analyze business growth and changes</p>
                        <p>• Compare values and ratios</p>
                        <p>• Solve math and finance problems</p>
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
