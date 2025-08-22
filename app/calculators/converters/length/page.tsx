"use client"

import { useState } from "react"
import { ArrowLeft, Ruler } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

const lengthUnits = {
  // Metric
  mm: { name: "Millimeters", factor: 0.001 },
  cm: { name: "Centimeters", factor: 0.01 },
  m: { name: "Meters", factor: 1 },
  km: { name: "Kilometers", factor: 1000 },
  // Imperial
  in: { name: "Inches", factor: 0.0254 },
  ft: { name: "Feet", factor: 0.3048 },
  yd: { name: "Yards", factor: 0.9144 },
  mi: { name: "Miles", factor: 1609.344 },
  // Other
  nm: { name: "Nautical Miles", factor: 1852 },
  ly: { name: "Light Years", factor: 9.461e15 },
}

export default function LengthConverter() {
  const [inputValue, setInputValue] = useState("")
  const [fromUnit, setFromUnit] = useState("m")
  const [toUnit, setToUnit] = useState("ft")
  const [result, setResult] = useState<number | null>(null)

  const convertLength = () => {
    const value = Number.parseFloat(inputValue)
    if (isNaN(value)) return

    // Convert to meters first, then to target unit
    const meters = value * lengthUnits[fromUnit as keyof typeof lengthUnits].factor
    const converted = meters / lengthUnits[toUnit as keyof typeof lengthUnits].factor

    setResult(converted)
  }

  const swapUnits = () => {
    const temp = fromUnit
    setFromUnit(toUnit)
    setToUnit(temp)
    if (result !== null) {
      setInputValue(result.toString())
      convertLength()
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
              <Ruler className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold text-primary font-[var(--font-heading)]">Length Converter</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-[var(--font-heading)]">Length Converter</CardTitle>
              <CardDescription>
                Convert between different length units including metric, imperial, and specialized measurements.
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
                          <SelectItem value="mm">Millimeters (mm)</SelectItem>
                          <SelectItem value="cm">Centimeters (cm)</SelectItem>
                          <SelectItem value="m">Meters (m)</SelectItem>
                          <SelectItem value="km">Kilometers (km)</SelectItem>
                        </optgroup>
                        <optgroup label="Imperial">
                          <SelectItem value="in">Inches (in)</SelectItem>
                          <SelectItem value="ft">Feet (ft)</SelectItem>
                          <SelectItem value="yd">Yards (yd)</SelectItem>
                          <SelectItem value="mi">Miles (mi)</SelectItem>
                        </optgroup>
                        <optgroup label="Other">
                          <SelectItem value="nm">Nautical Miles</SelectItem>
                          <SelectItem value="ly">Light Years</SelectItem>
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
                          <SelectItem value="mm">Millimeters (mm)</SelectItem>
                          <SelectItem value="cm">Centimeters (cm)</SelectItem>
                          <SelectItem value="m">Meters (m)</SelectItem>
                          <SelectItem value="km">Kilometers (km)</SelectItem>
                        </optgroup>
                        <optgroup label="Imperial">
                          <SelectItem value="in">Inches (in)</SelectItem>
                          <SelectItem value="ft">Feet (ft)</SelectItem>
                          <SelectItem value="yd">Yards (yd)</SelectItem>
                          <SelectItem value="mi">Miles (mi)</SelectItem>
                        </optgroup>
                        <optgroup label="Other">
                          <SelectItem value="nm">Nautical Miles</SelectItem>
                          <SelectItem value="ly">Light Years</SelectItem>
                        </optgroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button onClick={convertLength} className="flex-1" size="lg">
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
                          {inputValue} {lengthUnits[fromUnit as keyof typeof lengthUnits].name} =
                        </div>
                        <div className="text-3xl font-bold text-primary">
                          {result.toLocaleString(undefined, { maximumFractionDigits: 10 })}
                        </div>
                        <div className="text-lg text-muted-foreground">
                          {lengthUnits[toUnit as keyof typeof lengthUnits].name}
                        </div>
                      </div>

                      <div className="bg-background rounded-lg p-4">
                        <div className="text-sm">
                          <p>
                            <strong>Formula:</strong>
                          </p>
                          <p>
                            1 {lengthUnits[fromUnit as keyof typeof lengthUnits].name} ={" "}
                            {(
                              lengthUnits[fromUnit as keyof typeof lengthUnits].factor /
                              lengthUnits[toUnit as keyof typeof lengthUnits].factor
                            ).toExponential(3)}{" "}
                            {lengthUnits[toUnit as keyof typeof lengthUnits].name}
                          </p>
                        </div>
                      </div>

                      <div className="text-xs text-muted-foreground">
                        <p>
                          <strong>Common Conversions:</strong>
                        </p>
                        <p>• 1 meter = 3.28084 feet = 39.3701 inches</p>
                        <p>• 1 kilometer = 0.621371 miles = 0.539957 nautical miles</p>
                        <p>• 1 inch = 2.54 centimeters</p>
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
