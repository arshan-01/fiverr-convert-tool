"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, Calculator, PieChart } from "lucide-react"
import Link from "next/link"

interface CompoundResult {
  finalAmount: number
  totalInterest: number
  yearlyBreakdown: Array<{
    year: number
    principal: number
    interest: number
    total: number
  }>
}

export default function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState<string>("10000")
  const [rate, setRate] = useState<string>("5")
  const [time, setTime] = useState<string>("10")
  const [frequency, setFrequency] = useState<string>("12")
  const [monthlyContribution, setMonthlyContribution] = useState<string>("0")
  const [result, setResult] = useState<CompoundResult>({
    finalAmount: 0,
    totalInterest: 0,
    yearlyBreakdown: [],
  })

  const calculateCompoundInterest = () => {
    const P = Number.parseFloat(principal) || 0
    const r = (Number.parseFloat(rate) || 0) / 100
    const t = Number.parseFloat(time) || 0
    const n = Number.parseFloat(frequency) || 1
    const PMT = Number.parseFloat(monthlyContribution) || 0

    if (P <= 0 || r <= 0 || t <= 0) {
      setResult({ finalAmount: 0, totalInterest: 0, yearlyBreakdown: [] })
      return
    }

    // Calculate compound interest with regular contributions
    const yearlyBreakdown = []
    let currentPrincipal = P

    for (let year = 1; year <= t; year++) {
      const yearStartPrincipal = currentPrincipal

      // Add monthly contributions throughout the year
      const yearlyContributions = PMT * 12

      // Calculate compound interest for the year
      const A = currentPrincipal * Math.pow(1 + r / n, n)

      // Add contributions with compound interest (assuming contributions are made monthly)
      let contributionGrowth = 0
      if (PMT > 0) {
        // Future value of annuity formula for monthly contributions
        contributionGrowth = (PMT * (Math.pow(1 + r / 12, 12) - 1)) / (r / 12)
      }

      const yearEndTotal = A + contributionGrowth
      const yearInterest = yearEndTotal - yearStartPrincipal - yearlyContributions

      yearlyBreakdown.push({
        year,
        principal: yearStartPrincipal + yearlyContributions,
        interest: yearInterest,
        total: yearEndTotal,
      })

      currentPrincipal = yearEndTotal
    }

    const finalAmount = currentPrincipal
    const totalContributions = P + PMT * 12 * t
    const totalInterest = finalAmount - totalContributions

    setResult({
      finalAmount,
      totalInterest,
      yearlyBreakdown,
    })
  }

  useEffect(() => {
    calculateCompoundInterest()
  }, [principal, rate, time, frequency, monthlyContribution])

  const frequencyOptions = [
    { value: "1", label: "Annually" },
    { value: "2", label: "Semi-annually" },
    { value: "4", label: "Quarterly" },
    { value: "12", label: "Monthly" },
    { value: "365", label: "Daily" },
  ]

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center text-primary hover:text-primary/80 mb-4">
            ← Back to ConvertorHub
          </Link>
          <h1 className="text-4xl font-bold text-foreground mb-4 font-[var(--font-heading)]">
            Compound Interest Calculator
          </h1>
          <p className="text-xl text-muted-foreground">Calculate the power of compound interest on your investments</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calculator */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Investment Details
              </CardTitle>
              <CardDescription>Enter your investment parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Initial Principal ($)</label>
                <Input
                  type="number"
                  value={principal}
                  onChange={(e) => setPrincipal(e.target.value)}
                  placeholder="Enter initial amount"
                  min="0"
                  step="100"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Annual Interest Rate (%)</label>
                <Input
                  type="number"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  placeholder="Enter interest rate"
                  min="0"
                  step="0.1"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Time Period (Years)</label>
                <Input
                  type="number"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  placeholder="Enter number of years"
                  min="1"
                  step="1"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Compounding Frequency</label>
                <Select value={frequency} onValueChange={setFrequency}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {frequencyOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Monthly Contribution ($)</label>
                <Input
                  type="number"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(e.target.value)}
                  placeholder="Optional monthly addition"
                  min="0"
                  step="50"
                />
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Investment Growth
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                  <div className="text-sm text-green-600 dark:text-green-400">Final Amount</div>
                  <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                    $
                    {result.finalAmount.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </div>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <div className="text-sm text-blue-600 dark:text-blue-400">Total Interest Earned</div>
                  <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                    $
                    {result.totalInterest.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </div>
                </div>

                <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                  <div className="text-sm text-purple-600 dark:text-purple-400">Total Contributions</div>
                  <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                    $
                    {(
                      (Number.parseFloat(principal) || 0) +
                      (Number.parseFloat(monthlyContribution) || 0) * 12 * (Number.parseFloat(time) || 0)
                    ).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
                <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">💡 Investment Tips</h4>
                <ul className="text-sm text-yellow-800 dark:text-yellow-200 space-y-1">
                  <li>• Start investing early to maximize compound growth</li>
                  <li>• Regular contributions significantly boost returns</li>
                  <li>• Higher compounding frequency increases returns</li>
                  <li>• Time is your most powerful investment tool</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Yearly Breakdown */}
        {result.yearlyBreakdown.length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                Year-by-Year Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Year</th>
                      <th className="text-right p-2">Principal</th>
                      <th className="text-right p-2">Interest</th>
                      <th className="text-right p-2">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.yearlyBreakdown.slice(0, 10).map((year) => (
                      <tr key={year.year} className="border-b">
                        <td className="p-2">{year.year}</td>
                        <td className="text-right p-2">
                          ${year.principal.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </td>
                        <td className="text-right p-2 text-green-600">
                          ${year.interest.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </td>
                        <td className="text-right p-2 font-semibold">
                          ${year.total.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {result.yearlyBreakdown.length > 10 && (
                  <div className="text-center text-muted-foreground mt-4">
                    Showing first 10 years of {result.yearlyBreakdown.length} total years
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
