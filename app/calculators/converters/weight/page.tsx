"use client"

import { useState } from "react"
import { ArrowLeft, Scale } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

const weightUnits = {
  // Metric
  mg: { name: "Milligrams", factor: 0.000001 },
  g: { name: "Grams", factor: 0.001 },
  kg: { name: "Kilograms", factor: 1 },
  t: { name: "Metric Tons", factor: 1000 },
  // Imperial
  oz: { name: "Ounces", factor: 0.0283495 },
  lb: { name: "Pounds", factor: 0.453592 },
  st: { name: "Stones", factor: 6.35029 },
  ton: { name: "US Tons", factor: 907.185 },
  // Other
  ct: { name: "Carats", factor: 0.0002 },
  gr: { name: "Grains", factor: 0.0000647989 },
}

export default function WeightConverter() {
  const [inputValue, setInputValue] = useState("")
  const [fromUnit, setFromUnit] = useState("kg")
  const [toUnit, setToUnit] = useState("lb")
  const [result, setResult] = useState<number | null>(null)

  const convertWeight = () => {
    const value = Number.parseFloat(inputValue)
    if (isNaN(value)) return

    // Convert to kilograms first, then to target unit
    const kilograms = value * weightUnits[fromUnit as keyof typeof weightUnits].factor
    const converted = kilograms / weightUnits[toUnit as keyof typeof weightUnits].factor

    setResult(converted)
  }

  const swapUnits = () => {
    const temp = fromUnit
    setFromUnit(toUnit)
    setToUnit(temp)
    if (result !== null) {
      setInputValue(result.toString())
      convertWeight()
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
              <Scale className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold text-primary font-[var(--font-heading)]">Weight Converter</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-[var(--font-heading)]">Weight Converter</CardTitle>
              <CardDescription>
                Convert between different weight and mass units including metric, imperial, and specialized
                measurements.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="inputValue">Value to Convert</Label>
                  <Input
                    id="inputValue"
                    type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="70"
                    step="any"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fromUnit">From</Label>
                    <Select value={fromUnit} onValueChange={setFromUnit}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <optgroup label="Metric">
                          <SelectItem value="mg">Milligrams (mg)</SelectItem>
                          <SelectItem value="g">Grams (g)</SelectItem>
                          <SelectItem value="kg">Kilograms (kg)</SelectItem>
                          <SelectItem value="t">Metric Tons (t)</SelectItem>
                        </optgroup>
                        <optgroup label="Imperial">
                          <SelectItem value="oz">Ounces (oz)</SelectItem>
                          <SelectItem value="lb">Pounds (lb)</SelectItem>
                          <SelectItem value="st">Stones (st)</SelectItem>
                          <SelectItem value="ton">US Tons</SelectItem>
                        </optgroup>
                        <optgroup label="Other">
                          <SelectItem value="ct">Carats (ct)</SelectItem>
                          <SelectItem value="gr">Grains (gr)</SelectItem>
                        </optgroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="toUnit">To</Label>
                    <Select value={toUnit} onValueChange={setToUnit}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <optgroup label="Metric">
                          <SelectItem value="mg">Milligrams (mg)</SelectItem>
                          <SelectItem value="g">Grams (g)</SelectItem>
                          <SelectItem value="kg">Kilograms (kg)</SelectItem>
                          <SelectItem value="t">Metric Tons (t)</SelectItem>
                        </optgroup>
                        <optgroup label="Imperial">
                          <SelectItem value="oz">Ounces (oz)</SelectItem>
                          <SelectItem value="lb">Pounds (lb)</SelectItem>
                          <SelectItem value="st">Stones (st)</SelectItem>
                          <SelectItem value="ton">US Tons</SelectItem>
                        </optgroup>
                        <optgroup label="Other">
                          <SelectItem value="ct">Carats (ct)</SelectItem>
                          <SelectItem value="gr">Grains (gr)</SelectItem>
                        </optgroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button onClick={convertWeight} className="flex-1" size="lg">
                    Convert
                  </Button>
                  <Button onClick={swapUnits} variant="outline" size="lg">
                    ⇄ Swap
                  </Button>
                </div>
              </div>

              {result !== null && (
                <Card className="bg-muted">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground mb-2">
                          {inputValue} {weightUnits[fromUnit as keyof typeof weightUnits].name} =
                        </div>
                        <div className="text-3xl font-bold text-primary">
                          {result.toLocaleString(undefined, { maximumFractionDigits: 10 })}
                        </div>
                        <div className="text-lg text-muted-foreground">
                          {weightUnits[toUnit as keyof typeof weightUnits].name}
                        </div>
                      </div>

                      <div className="bg-background rounded-lg p-4">
                        <div className="text-sm">
                          <p>
                            <strong>Formula:</strong>
                          </p>
                          <p>
                            1 {weightUnits[fromUnit as keyof typeof weightUnits].name} ={" "}
                            {(
                              weightUnits[fromUnit as keyof typeof weightUnits].factor /
                              weightUnits[toUnit as keyof typeof weightUnits].factor
                            ).toExponential(3)}{" "}
                            {weightUnits[toUnit as keyof typeof weightUnits].name}
                          </p>
                        </div>
                      </div>

                      <div className="text-xs text-muted-foreground">
                        <p>
                          <strong>Common Conversions:</strong>
                        </p>
                        <p>• 1 kilogram = 2.20462 pounds = 35.274 ounces</p>
                        <p>• 1 pound = 453.592 grams = 16 ounces</p>
                        <p>• 1 stone = 14 pounds = 6.35029 kilograms</p>
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
