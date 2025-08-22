"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowUpDown, Box, Calculator } from "lucide-react"
import Link from "next/link"

const volumeUnits = [
  { value: "liter", label: "Liters (L)", factor: 1 },
  { value: "ml", label: "Milliliters (mL)", factor: 0.001 },
  { value: "gallon_us", label: "US Gallons (gal)", factor: 3.78541 },
  { value: "gallon_uk", label: "UK Gallons (gal)", factor: 4.54609 },
  { value: "quart_us", label: "US Quarts (qt)", factor: 0.946353 },
  { value: "pint_us", label: "US Pints (pt)", factor: 0.473176 },
  { value: "cup_us", label: "US Cups", factor: 0.236588 },
  { value: "floz_us", label: "US Fluid Ounces (fl oz)", factor: 0.0295735 },
  { value: "tbsp", label: "Tablespoons (tbsp)", factor: 0.0147868 },
  { value: "tsp", label: "Teaspoons (tsp)", factor: 0.00492892 },
  { value: "cubic_m", label: "Cubic Meters (m³)", factor: 1000 },
  { value: "cubic_cm", label: "Cubic Centimeters (cm³)", factor: 0.001 },
  { value: "cubic_ft", label: "Cubic Feet (ft³)", factor: 28.3168 },
  { value: "cubic_in", label: "Cubic Inches (in³)", factor: 0.0163871 },
]

export default function VolumeConverter() {
  const [inputValue, setInputValue] = useState<string>("1")
  const [fromUnit, setFromUnit] = useState<string>("liter")
  const [toUnit, setToUnit] = useState<string>("gallon_us")
  const [result, setResult] = useState<number>(0)

  const convertVolume = () => {
    const value = Number.parseFloat(inputValue) || 0
    const fromFactor = volumeUnits.find((unit) => unit.value === fromUnit)?.factor || 1
    const toFactor = volumeUnits.find((unit) => unit.value === toUnit)?.factor || 1

    // Convert to liters first, then to target unit
    const liters = value * fromFactor
    const converted = liters / toFactor

    setResult(converted)
  }

  useEffect(() => {
    convertVolume()
  }, [inputValue, fromUnit, toUnit])

  const swapUnits = () => {
    setFromUnit(toUnit)
    setToUnit(fromUnit)
  }

  const fromUnitData = volumeUnits.find((unit) => unit.value === fromUnit)
  const toUnitData = volumeUnits.find((unit) => unit.value === toUnit)

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center text-primary hover:text-primary/80 mb-4">
            ← Back to ConvertorHub
          </Link>
          <h1 className="text-4xl font-bold text-foreground mb-4 font-[var(--font-heading)]">Volume Converter</h1>
          <p className="text-xl text-muted-foreground">Convert between different volume measurements</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calculator */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Volume Conversion
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
                  placeholder="Enter volume value"
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
                    {volumeUnits.map((unit) => (
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
                    {volumeUnits.map((unit) => (
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
                <Box className="h-5 w-5" />
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
                <h3 className="font-semibold">Common Volume Conversions</h3>
                <div className="grid grid-cols-1 gap-2 text-sm">
                  <div className="flex justify-between">
                    <span>1 L =</span>
                    <span>0.264 US gal</span>
                  </div>
                  <div className="flex justify-between">
                    <span>1 US gal =</span>
                    <span>3.785 L</span>
                  </div>
                  <div className="flex justify-between">
                    <span>1 cup =</span>
                    <span>236.6 mL</span>
                  </div>
                  <div className="flex justify-between">
                    <span>1 m³ =</span>
                    <span>1,000 L</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">🥤 Volume Tips</h4>
                <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                  <li>• US and UK gallons are different sizes</li>
                  <li>• 1 liter = 1,000 milliliters</li>
                  <li>• Volume = length × width × height</li>
                  <li>• Cooking measurements vary by region</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
