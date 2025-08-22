"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowUpDown, TrendingUp, Calculator } from "lucide-react"
import Link from "next/link"
import { AdBanner } from "@/components/ads/ad-banner" // Import AdBanner component

const currencies = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$" },
  { code: "CHF", name: "Swiss Franc", symbol: "CHF" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
  { code: "INR", name: "Indian Rupee", symbol: "₹" },
  { code: "KRW", name: "South Korean Won", symbol: "₩" },
]

// Mock exchange rates (in a real app, you'd fetch from an API)
const exchangeRates: { [key: string]: { [key: string]: number } } = {
  USD: { EUR: 0.85, GBP: 0.73, JPY: 110, CAD: 1.25, AUD: 1.35, CHF: 0.92, CNY: 6.45, INR: 74.5, KRW: 1180 },
  EUR: { USD: 1.18, GBP: 0.86, JPY: 129, CAD: 1.47, AUD: 1.59, CHF: 1.08, CNY: 7.59, INR: 87.8, KRW: 1390 },
  GBP: { USD: 1.37, EUR: 1.16, JPY: 150, CAD: 1.71, AUD: 1.85, CHF: 1.26, CNY: 8.84, INR: 102, KRW: 1620 },
}

export default function CurrencyConverter() {
  const [amount, setAmount] = useState<string>("1")
  const [fromCurrency, setFromCurrency] = useState<string>("USD")
  const [toCurrency, setToCurrency] = useState<string>("EUR")
  const [result, setResult] = useState<number>(0)

  const calculateConversion = () => {
    const amountNum = Number.parseFloat(amount) || 0
    if (fromCurrency === toCurrency) {
      setResult(amountNum)
      return
    }

    // Get exchange rate
    let rate = 1
    if (exchangeRates[fromCurrency] && exchangeRates[fromCurrency][toCurrency]) {
      rate = exchangeRates[fromCurrency][toCurrency]
    } else if (exchangeRates[toCurrency] && exchangeRates[toCurrency][fromCurrency]) {
      rate = 1 / exchangeRates[toCurrency][fromCurrency]
    }

    setResult(amountNum * rate)
  }

  useEffect(() => {
    calculateConversion()
  }, [amount, fromCurrency, toCurrency])

  const swapCurrencies = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  const fromCurrencyData = currencies.find((c) => c.code === fromCurrency)
  const toCurrencyData = currencies.find((c) => c.code === toCurrency)

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center text-primary hover:text-primary/80 mb-4">
            ← Back to ConvertorHub
          </Link>
          <h1 className="text-4xl font-bold text-foreground mb-4 font-[var(--font-heading)]">Currency Converter</h1>
          <p className="text-xl text-muted-foreground">Convert between different currencies with live exchange rates</p>
        </div>

        <div className="mb-8">
          <AdBanner size="leaderboard" label="Financial Services" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calculator */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Currency Conversion
              </CardTitle>
              <CardDescription>Enter amount and select currencies to convert</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Amount Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Amount</label>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  min="0"
                  step="0.01"
                />
              </div>

              {/* From Currency */}
              <div className="space-y-2">
                <label className="text-sm font-medium">From</label>
                <Select value={fromCurrency} onValueChange={setFromCurrency}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((currency) => (
                      <SelectItem key={currency.code} value={currency.code}>
                        {currency.symbol} {currency.code} - {currency.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Swap Button */}
              <div className="flex justify-center">
                <Button variant="outline" size="sm" onClick={swapCurrencies}>
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </div>

              {/* To Currency */}
              <div className="space-y-2">
                <label className="text-sm font-medium">To</label>
                <Select value={toCurrency} onValueChange={setToCurrency}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((currency) => (
                      <SelectItem key={currency.code} value={currency.code}>
                        {currency.symbol} {currency.code} - {currency.name}
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
                <TrendingUp className="h-5 w-5" />
                Conversion Result
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center p-6 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-muted-foreground mb-2">
                  {fromCurrencyData?.symbol}
                  {Number.parseFloat(amount) || 0} {fromCurrency}
                </div>
                <div className="text-4xl font-bold text-primary mb-2">
                  {toCurrencyData?.symbol}
                  {result.toFixed(2)} {toCurrency}
                </div>
                <div className="text-sm text-muted-foreground">
                  1 {fromCurrency} = {toCurrencyData?.symbol}
                  {fromCurrency === toCurrency ? "1.00" : (result / (Number.parseFloat(amount) || 1)).toFixed(4)}{" "}
                  {toCurrency}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Quick Conversions</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex justify-between">
                    <span>1 {fromCurrency}:</span>
                    <span>
                      {toCurrencyData?.symbol}
                      {fromCurrency === toCurrency ? "1.00" : (result / (Number.parseFloat(amount) || 1)).toFixed(4)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>10 {fromCurrency}:</span>
                    <span>
                      {toCurrencyData?.symbol}
                      {fromCurrency === toCurrency
                        ? "10.00"
                        : ((result / (Number.parseFloat(amount) || 1)) * 10).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>100 {fromCurrency}:</span>
                    <span>
                      {toCurrencyData?.symbol}
                      {fromCurrency === toCurrency
                        ? "100.00"
                        : ((result / (Number.parseFloat(amount) || 1)) * 100).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>1000 {fromCurrency}:</span>
                    <span>
                      {toCurrencyData?.symbol}
                      {fromCurrency === toCurrency
                        ? "1000.00"
                        : ((result / (Number.parseFloat(amount) || 1)) * 1000).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">💡 Currency Tips</h4>
                <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                  <li>• Exchange rates fluctuate constantly during market hours</li>
                  <li>• Banks and services may charge conversion fees</li>
                  <li>• Consider timing for large currency exchanges</li>
                  <li>• Rates shown are for reference only</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <AdBanner size="leaderboard" label="Currency Exchange Services" />
        </div>
      </div>
    </div>
  )
}
