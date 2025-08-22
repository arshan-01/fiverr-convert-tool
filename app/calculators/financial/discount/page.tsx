"use client"

import { useState } from "react"
import { ArrowLeft, Tag } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

export default function DiscountCalculator() {
  const [originalPrice, setOriginalPrice] = useState("")
  const [discountValue, setDiscountValue] = useState("")
  const [discountType, setDiscountType] = useState("percentage")
  const [result, setResult] = useState<{
    discountAmount: number
    finalPrice: number
    savings: number
    discountPercentage: number
  } | null>(null)

  const calculateDiscount = () => {
    const price = Number.parseFloat(originalPrice)
    const discount = Number.parseFloat(discountValue)

    if (!price || !discount || price <= 0 || discount < 0) return

    let discountAmount: number
    let finalPrice: number
    let discountPercentage: number

    if (discountType === "percentage") {
      if (discount > 100) return // Invalid percentage
      discountAmount = (price * discount) / 100
      finalPrice = price - discountAmount
      discountPercentage = discount
    } else {
      // Fixed amount discount
      if (discount > price) return // Discount can't be more than price
      discountAmount = discount
      finalPrice = price - discountAmount
      discountPercentage = (discountAmount / price) * 100
    }

    setResult({
      discountAmount: Math.round(discountAmount * 100) / 100,
      finalPrice: Math.round(finalPrice * 100) / 100,
      savings: Math.round(discountAmount * 100) / 100,
      discountPercentage: Math.round(discountPercentage * 10) / 10,
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
              <Tag className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold text-primary font-[var(--font-heading)]">Discount Calculator</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-[var(--font-heading)]">Discount Calculator</CardTitle>
              <CardDescription>Calculate discounts, final prices, and savings on any purchase.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="originalPrice">Original Price ($)</Label>
                  <Input
                    id="originalPrice"
                    type="number"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(e.target.value)}
                    placeholder="100.00"
                    step="0.01"
                    min="0"
                  />
                </div>

                <div>
                  <Label htmlFor="discountType">Discount Type</Label>
                  <Select value={discountType} onValueChange={setDiscountType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage (%)</SelectItem>
                      <SelectItem value="fixed">Fixed Amount ($)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="discountValue">
                    Discount {discountType === "percentage" ? "Percentage (%)" : "Amount ($)"}
                  </Label>
                  <Input
                    id="discountValue"
                    type="number"
                    value={discountValue}
                    onChange={(e) => setDiscountValue(e.target.value)}
                    placeholder={discountType === "percentage" ? "20" : "20.00"}
                    step={discountType === "percentage" ? "0.1" : "0.01"}
                    min="0"
                    max={discountType === "percentage" ? "100" : undefined}
                  />
                </div>

                <Button onClick={calculateDiscount} className="w-full" size="lg">
                  Calculate Discount
                </Button>
              </div>

              {result && (
                <Card className="bg-muted">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary">${result.finalPrice}</div>
                        <div className="text-lg text-muted-foreground">Final Price</div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-background rounded-lg p-4 text-center">
                          <div className="text-xl font-bold text-red-600">${result.discountAmount}</div>
                          <div className="text-sm text-muted-foreground">Discount Amount</div>
                        </div>
                        <div className="bg-background rounded-lg p-4 text-center">
                          <div className="text-xl font-bold text-green-600">${result.savings}</div>
                          <div className="text-sm text-muted-foreground">You Save</div>
                        </div>
                        <div className="bg-background rounded-lg p-4 text-center">
                          <div className="text-xl font-bold text-blue-600">{result.discountPercentage}%</div>
                          <div className="text-sm text-muted-foreground">Discount Rate</div>
                        </div>
                      </div>

                      <div className="bg-background rounded-lg p-4">
                        <div className="text-sm space-y-1">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Original Price:</span>
                            <span>${Number.parseFloat(originalPrice || "0").toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Discount:</span>
                            <span className="text-red-600">-${result.discountAmount}</span>
                          </div>
                          <div className="flex justify-between font-semibold border-t pt-1">
                            <span>Final Price:</span>
                            <span>${result.finalPrice}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-xs text-muted-foreground">
                        <p>
                          <strong>Savings Tip:</strong> Compare prices across different stores to maximize your savings!
                        </p>
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
