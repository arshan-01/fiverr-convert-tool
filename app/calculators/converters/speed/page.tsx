"use client"

import { useState } from "react"
import { ArrowLeft, Gauge } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

const speedUnits = {
  // Metric
  "m/s": { name: "Meters per Second", factor: 1 },
  "km/h": { name: "Kilometers per Hour", factor: 0.277778 },
  "km/s": { name: "Kilometers per Second", factor: 1000 },
  // Imperial
  "ft/s": { name: "Feet per Second", factor: 0.3048 },
  mph: { name: "Miles per Hour", factor: 0.44704 },
  "ft/min": { name: "Feet per Minute", factor: 0.00508 },
  // Nautical
  knot: { name: "Knots", factor: 0.514444 },
  // Other
  c: { name: "Speed of Light", factor: 299792458 },
  mach: { name: "Mach (at sea level)", factor: 343 },
}

export default function SpeedConverter() {
  const [inputValue, setInputValue] = useState("")
  const [fromUnit, setFromUnit] = useState("km/h")
  const [toUnit, setToUnit] = useState("mph")
  const [result, setResult] = useState<number | null>(null)

  const convertSpeed = () => {
    const value = Number.parseFloat(inputValue)
    if (isNaN(value)) return

    // Convert to m/s first, then to target unit
    const metersPerSecond = value * speedUnits[fromUnit as keyof typeof speedUnits].factor
    const converted = metersPerSecond / speedUnits[toUnit as keyof typeof speedUnits].factor

    setResult(converted)
  }

  const swapUnits = () => {
    const temp = fromUnit
    setFromUnit(toUnit)
    setToUnit(temp)
    if (result !== null) {
      setInputValue(result.toString())
      convertSpeed()
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
              <Gauge className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold text-primary font-[var(--font-heading)]">Speed Converter</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-[var(--font-heading)]">Speed Converter</CardTitle>
              <CardDescription>
                Convert between different speed units including metric, imperial, nautical, and specialized
                measurements.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="inputValue">Speed Value</Label>
                  <Input
                    id="inputValue"
                    type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="100"
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
                          <SelectItem value="m/s">Meters per Second</SelectItem>
                          <SelectItem value="km/h">Kilometers per Hour</SelectItem>
                          <SelectItem value="km/s">Kilometers per Second</SelectItem>
                        </optgroup>
                        <optgroup label="Imperial">
                          <SelectItem value="ft/s">Feet per Second</SelectItem>
                          <SelectItem value="mph">Miles per Hour</SelectItem>
                          <SelectItem value="ft/min">Feet per Minute</SelectItem>
                        </optgroup>
                        <optgroup label="Other">
                          <SelectItem value="knot">Knots</SelectItem>
                          <SelectItem value="mach">Mach</SelectItem>
                          <SelectItem value="c">Speed of Light</SelectItem>
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
                          <SelectItem value="m/s">Meters per Second</SelectItem>
                          <SelectItem value="km/h">Kilometers per Hour</SelectItem>
                          <SelectItem value="km/s">Kilometers per Second</SelectItem>
                        </optgroup>
                        <optgroup label="Imperial">
                          <SelectItem value="ft/s">Feet per Second</SelectItem>
                          <SelectItem value="mph">Miles per Hour</SelectItem>
                          <SelectItem value="ft/min">Feet per Minute</SelectItem>
                        </optgroup>
                        <optgroup label="Other">
                          <SelectItem value="knot">Knots</SelectItem>
                          <SelectItem value="mach">Mach</SelectItem>
                          <SelectItem value="c">Speed of Light</SelectItem>
                        </optgroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button onClick={convertSpeed} className="flex-1" size="lg">
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
                          {inputValue} {speedUnits[fromUnit as keyof typeof speedUnits].name} =
                        </div>
                        <div className="text-3xl font-bold text-primary">
                          {result.toLocaleString(undefined, { maximumFractionDigits: 10 })}
                        </div>
                        <div className="text-lg text-muted-foreground">
                          {speedUnits[toUnit as keyof typeof speedUnits].name}
                        </div>
                      </div>

                      <div className="bg-background rounded-lg p-4">
                        <div className="text-sm">
                          <p>
                            <strong>Formula:</strong>
                          </p>
                          <p>
                            1 {speedUnits[fromUnit as keyof typeof speedUnits].name} ={" "}
                            {(
                              speedUnits[fromUnit as keyof typeof speedUnits].factor /
                              speedUnits[toUnit as keyof typeof speedUnits].factor
                            ).toExponential(3)}{" "}
                            {speedUnits[toUnit as keyof typeof speedUnits].name}
                          </p>
                        </div>
                      </div>

                      <div className="text-xs text-muted-foreground">
                        <p>
                          <strong>Common Conversions:</strong>
                        </p>
                        <p>• 1 km/h = 0.621371 mph = 0.277778 m/s</p>
                        <p>• 1 mph = 1.60934 km/h = 0.44704 m/s</p>
                        <p>• 1 knot = 1.852 km/h = 1.15078 mph</p>
                        <p>• Mach 1 ≈ 343 m/s (at sea level, 20°C)</p>
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
