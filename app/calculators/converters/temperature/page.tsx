"use client"

import { useState } from "react"
import { ArrowLeft, Thermometer } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

export default function TemperatureConverter() {
  const [inputValue, setInputValue] = useState("")
  const [fromUnit, setFromUnit] = useState("c")
  const [toUnit, setToUnit] = useState("f")
  const [result, setResult] = useState<number | null>(null)

  const convertTemperature = () => {
    const value = Number.parseFloat(inputValue)
    if (isNaN(value)) return

    let celsius: number

    // Convert input to Celsius first
    switch (fromUnit) {
      case "c":
        celsius = value
        break
      case "f":
        celsius = ((value - 32) * 5) / 9
        break
      case "k":
        celsius = value - 273.15
        break
      case "r":
        celsius = ((value - 491.67) * 5) / 9
        break
      default:
        return
    }

    // Convert from Celsius to target unit
    let converted: number
    switch (toUnit) {
      case "c":
        converted = celsius
        break
      case "f":
        converted = (celsius * 9) / 5 + 32
        break
      case "k":
        converted = celsius + 273.15
        break
      case "r":
        converted = (celsius * 9) / 5 + 491.67
        break
      default:
        return
    }

    setResult(Math.round(converted * 100) / 100)
  }

  const swapUnits = () => {
    const temp = fromUnit
    setFromUnit(toUnit)
    setToUnit(temp)
    if (result !== null) {
      setInputValue(result.toString())
      convertTemperature()
    }
  }

  const getUnitName = (unit: string) => {
    switch (unit) {
      case "c":
        return "Celsius"
      case "f":
        return "Fahrenheit"
      case "k":
        return "Kelvin"
      case "r":
        return "Rankine"
      default:
        return ""
    }
  }

  const getUnitSymbol = (unit: string) => {
    switch (unit) {
      case "c":
        return "°C"
      case "f":
        return "°F"
      case "k":
        return "K"
      case "r":
        return "°R"
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
              <Thermometer className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold text-primary font-[var(--font-heading)]">Temperature Converter</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-[var(--font-heading)]">Temperature Converter</CardTitle>
              <CardDescription>
                Convert between Celsius, Fahrenheit, Kelvin, and Rankine temperature scales.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="inputValue">Temperature Value</Label>
                  <Input
                    id="inputValue"
                    type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="25"
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
                        <SelectItem value="c">Celsius (°C)</SelectItem>
                        <SelectItem value="f">Fahrenheit (°F)</SelectItem>
                        <SelectItem value="k">Kelvin (K)</SelectItem>
                        <SelectItem value="r">Rankine (°R)</SelectItem>
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
                        <SelectItem value="c">Celsius (°C)</SelectItem>
                        <SelectItem value="f">Fahrenheit (°F)</SelectItem>
                        <SelectItem value="k">Kelvin (K)</SelectItem>
                        <SelectItem value="r">Rankine (°R)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button onClick={convertTemperature} className="flex-1" size="lg">
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
                          {inputValue}
                          {getUnitSymbol(fromUnit)} =
                        </div>
                        <div className="text-3xl font-bold text-primary">
                          {result}
                          {getUnitSymbol(toUnit)}
                        </div>
                        <div className="text-lg text-muted-foreground">{getUnitName(toUnit)}</div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-background rounded-lg p-4">
                          <div className="text-sm">
                            <p>
                              <strong>All Conversions:</strong>
                            </p>
                            <p>Celsius: {(((Number.parseFloat(inputValue) - 32) * 5) / 9).toFixed(2)}°C</p>
                            <p>Fahrenheit: {((Number.parseFloat(inputValue) * 9) / 5 + 32).toFixed(2)}°F</p>
                            <p>Kelvin: {(Number.parseFloat(inputValue) + 273.15).toFixed(2)}K</p>
                            <p>Rankine: {((Number.parseFloat(inputValue) * 9) / 5 + 491.67).toFixed(2)}°R</p>
                          </div>
                        </div>
                        <div className="bg-background rounded-lg p-4">
                          <div className="text-sm">
                            <p>
                              <strong>Reference Points:</strong>
                            </p>
                            <p>Water freezes: 0°C, 32°F, 273.15K</p>
                            <p>Water boils: 100°C, 212°F, 373.15K</p>
                            <p>Absolute zero: -273.15°C, -459.67°F, 0K</p>
                          </div>
                        </div>
                      </div>

                      <div className="text-xs text-muted-foreground">
                        <p>
                          <strong>Formulas:</strong>
                        </p>
                        <p>• °F = °C × 9/5 + 32</p>
                        <p>• °C = (°F - 32) × 5/9</p>
                        <p>• K = °C + 273.15</p>
                        <p>• °R = °F + 459.67</p>
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
