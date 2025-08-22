"use client"

import { useState } from "react"
import { ArrowLeft, Receipt } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function TipCalculator() {
  const [billAmount, setBillAmount] = useState("")
  const [tipPercentage, setTipPercentage] = useState("18")
  const [numberOfPeople, setNumberOfPeople] = useState("1")
  const [result, setResult] = useState<{
    tipAmount: number
    totalAmount: number
    perPersonAmount: number
    perPersonTip: number
  } | null>(null)

  const calculateTip = () => {
    const bill = Number.parseFloat(billAmount)
    const tip = Number.parseFloat(tipPercentage)
    const people = Number.parseInt(numberOfPeople)

    if (!bill || !tip || !people || bill <= 0 || tip < 0 || people <= 0) return

    const tipAmount = (bill * tip) / 100
    const totalAmount = bill + tipAmount
    const perPersonAmount = totalAmount / people
    const perPersonTip = tipAmount / people

    setResult({
      tipAmount: Math.round(tipAmount * 100) / 100,
      totalAmount: Math.round(totalAmount * 100) / 100,
      perPersonAmount: Math.round(perPersonAmount * 100) / 100,
      perPersonTip: Math.round(perPersonTip * 100) / 100,
    })
  }

  const setQuickTip = (percentage: string) => {
    setTipPercentage(percentage)
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
              <Receipt className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold text-primary font-[var(--font-heading)]">Tip Calculator</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-[var(--font-heading)]">Tip Calculator</CardTitle>
              <CardDescription>Calculate tips and split bills easily among multiple people.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="billAmount">Bill Amount ($)</Label>
                  <Input
                    id="billAmount"
                    type="number"
                    value={billAmount}
                    onChange={(e) => setBillAmount(e.target.value)}
                    placeholder="50.00"
                    step="0.01"
                    min="0"
                  />
                </div>

                <div>
                  <Label htmlFor="tipPercentage">Tip Percentage (%)</Label>
                  <Input
                    id="tipPercentage"
                    type="number"
                    value={tipPercentage}
                    onChange={(e) => setTipPercentage(e.target.value)}
                    placeholder="18"
                    step="0.1"
                    min="0"
                  />
                  <div className="flex space-x-2 mt-2">
                    {["15", "18", "20", "22", "25"].map((percentage) => (
                      <Button
                        key={percentage}
                        variant={tipPercentage === percentage ? "default" : "outline"}
                        size="sm"
                        onClick={() => setQuickTip(percentage)}
                      >
                        {percentage}%
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="numberOfPeople">Number of People</Label>
                  <Input
                    id="numberOfPeople"
                    type="number"
                    value={numberOfPeople}
                    onChange={(e) => setNumberOfPeople(e.target.value)}
                    placeholder="1"
                    min="1"
                  />
                </div>

                <Button onClick={calculateTip} className="w-full" size="lg">
                  Calculate Tip
                </Button>
              </div>

              {result && (
                <Card className="bg-muted">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-background rounded-lg p-4 text-center">
                          <div className="text-2xl font-bold text-primary">${result.tipAmount}</div>
                          <div className="text-sm text-muted-foreground">Tip Amount</div>
                        </div>
                        <div className="bg-background rounded-lg p-4 text-center">
                          <div className="text-2xl font-bold text-secondary">${result.totalAmount}</div>
                          <div className="text-sm text-muted-foreground">Total Amount</div>
                        </div>
                      </div>

                      {Number.parseInt(numberOfPeople) > 1 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-background rounded-lg p-4 text-center">
                            <div className="text-xl font-bold text-green-600">${result.perPersonAmount}</div>
                            <div className="text-sm text-muted-foreground">Per Person Total</div>
                          </div>
                          <div className="bg-background rounded-lg p-4 text-center">
                            <div className="text-xl font-bold text-blue-600">${result.perPersonTip}</div>
                            <div className="text-sm text-muted-foreground">Per Person Tip</div>
                          </div>
                        </div>
                      )}

                      <div className="bg-background rounded-lg p-4">
                        <div className="text-sm space-y-1">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Bill Amount:</span>
                            <span>${Number.parseFloat(billAmount || "0").toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Tip ({tipPercentage}%):</span>
                            <span>${result.tipAmount}</span>
                          </div>
                          <div className="flex justify-between font-semibold border-t pt-1">
                            <span>Total:</span>
                            <span>${result.totalAmount}</span>
                          </div>
                        </div>
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
