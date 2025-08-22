"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowUpDown, Square, Calculator } from "lucide-react"
import Link from "next/link"

const areaUnits = [
  { value: "sqm", label: "Square Meters (m²)", factor: 1 },
  { value: "sqkm", label: "Square Kilometers (km²)", factor: 1000000 },
  { value: "sqcm", label: "Square Centimeters (cm²)", factor: 0.0001 },
  { value: "sqmm", label: "Square Millimeters (mm²)", factor: 0.000001 },
  { value: "sqft", label: "Square Feet (ft²)", factor: 0.092903 },
  { value: "sqin", label: "Square Inches (in²)", factor: 0.00064516 },
  { value: "sqyd", label: "Square Yards (yd²)", factor: 0.836127 },
  { value: "acre", label: "Acres", factor: 4046.86 },
  { value: "hectare", label: "Hectares (ha)", factor: 10000 },
  { value: "sqmile", label: "Square Miles (mi²)", factor: 2589988.11 },
]

export default function AreaConverter() {
  const [inputValue, setInputValue] = useState<string>("1")
  const [fromUnit, setFromUnit] = useState<string>("sqm")
  const [toUnit, setToUnit] = useState<string>("sqft")
  const [result, setResult] = useState<number>(0)

  const convertArea = () => {
    const value = Number.parseFloat(inputValue) || 0
    const fromFactor = areaUnits.find((unit) => unit.value === fromUnit)?.factor || 1
    const toFactor = areaUnits.find((unit) => unit.value === toUnit)?.factor || 1

    // Convert to square meters first, then to target unit
    const squareMeters = value * fromFactor
    const converted = squareMeters / toFactor

    setResult(converted)
  }

  useEffect(() => {
    convertArea()
  }, [inputValue, fromUnit, toUnit])

  const swapUnits = () => {
    setFromUnit(toUnit)
    setToUnit(fromUnit)
  }

  const fromUnitData = areaUnits.find((unit) => unit.value === fromUnit)
  const toUnitData = areaUnits.find((unit) => unit.value === toUnit)

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center text-primary hover:text-primary/80 mb-4">
            ← Back to ConvertorHub
          </Link>
          <h1 className="text-4xl font-bold text-foreground mb-4 font-[var(--font-heading)]">Area Converter</h1>
          <p className="text-xl text-muted-foreground">Convert between different area measurements</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calculator */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Area Conversion
              </CardTitle>
              <CardDescription>Enter value and select units to convert</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Input Value */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Value</label>
                <Input
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter area value"
                  min="0"
                  step="any"
                />
              </div>

              {/* From Unit */}
              <div className="space-y-2">
                <label className="text-sm font-medium">From</label>
                <Select value={fromUnit} onValueChange={setFromUnit}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {areaUnits.map((unit) => (
                      <SelectItem key={unit.value} value={unit.value}>
                        {unit.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Swap Button */}
              <div className="flex justify-center">
                <Button variant="outline" size="sm" onClick={swapUnits}>
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </div>

              {/* To Unit */}
              <div className="space-y-2">
                <label className="text-sm font-medium">To</label>
                <Select value={toUnit} onValueChange={setToUnit}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {areaUnits.map((unit) => (
                      <SelectItem key={unit.value} value={unit.value}>
                        {unit.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Square className="h-5 w-5" />
                Conversion Result
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center p-6 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-muted-foreground mb-2">
                  {Number.parseFloat(inputValue) || 0} {fromUnitData?.label.split("(")[1]?.replace(")", "") || fromUnit}
                </div>
                <div className="text-4xl font-bold text-primary mb-2">
                  {result.toLocaleString(undefined, { maximumFractionDigits: 8 })}{" "}
                  {toUnitData?.label.split("(")[1]?.replace(")", "") || toUnit}
                </div>
                <div className="text-sm text-muted-foreground">
                  1 {fromUnitData?.label.split("(")[1]?.replace(")", "") || fromUnit} ={" "}
                  {(result / (Number.parseFloat(inputValue) || 1)).toLocaleString(undefined, {
                    maximumFractionDigits: 8,
                  })}{" "}
                  {toUnitData?.label.split("(")[1]?.replace(")", "") || toUnit}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Common Area Conversions</h3>
                <div className="grid grid-cols-1 gap-2 text-sm">
                  <div className="flex justify-between">
                    <span>1 m² =</span>
                    <span>10.764 ft²</span>
                  </div>
                  <div className="flex justify-between">
                    <span>1 acre =</span>
                    <span>4,047 m²</span>
                  </div>
                  <div className="flex justify-between">
                    <span>1 hectare =</span>
                    <span>2.471 acres</span>
                  </div>
                  <div className="flex justify-between">
                    <span>1 km² =</span>
                    <span>100 hectares</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">📐 Area Tips</h4>
                <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                  <li>• Area = length × width for rectangles</li>
                  <li>• 1 hectare = 10,000 square meters</li>
                  <li>• 1 acre ≈ 0.4047 hectares</li>
                  <li>• Use consistent units when calculating</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
