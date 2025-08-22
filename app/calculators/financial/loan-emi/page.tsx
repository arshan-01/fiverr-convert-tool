"use client"

import { useState } from "react"
import { ArrowLeft, DollarSign } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function LoanEMICalculator() {
  const [loanAmount, setLoanAmount] = useState("")
  const [interestRate, setInterestRate] = useState("")
  const [loanTenure, setLoanTenure] = useState("")
  const [tenureType, setTenureType] = useState("years")
  const [result, setResult] = useState<{
    emi: number
    totalAmount: number
    totalInterest: number
    breakdown: { month: number; emi: number; principal: number; interest: number; balance: number }[]
  } | null>(null)

  const calculateEMI = () => {
    const principal = Number.parseFloat(loanAmount)
    const rate = Number.parseFloat(interestRate)
    const tenure = Number.parseFloat(loanTenure)

    if (!principal || !rate || !tenure || principal <= 0 || rate <= 0 || tenure <= 0) return

    // Convert tenure to months if needed
    const tenureMonths = tenureType === "years" ? tenure * 12 : tenure

    // Monthly interest rate
    const monthlyRate = rate / (12 * 100)

    // EMI calculation using formula: P * r * (1+r)^n / ((1+r)^n - 1)
    const emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
      (Math.pow(1 + monthlyRate, tenureMonths) - 1)

    const totalAmount = emi * tenureMonths
    const totalInterest = totalAmount - principal

    // Generate amortization schedule (first 12 months)
    const breakdown: { month: number; emi: number; principal: number; interest: number; balance: number }[] = []
    let remainingBalance = principal

    for (let month = 1; month <= Math.min(12, tenureMonths); month++) {
      const interestPayment = remainingBalance * monthlyRate
      const principalPayment = emi - interestPayment
      remainingBalance -= principalPayment

      breakdown.push({
        month,
        emi: Math.round(emi),
        principal: Math.round(principalPayment),
        interest: Math.round(interestPayment),
        balance: Math.round(Math.max(0, remainingBalance)),
      })
    }

    setResult({
      emi: Math.round(emi),
      totalAmount: Math.round(totalAmount),
      totalInterest: Math.round(totalInterest),
      breakdown,
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
              <DollarSign className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold text-primary font-[var(--font-heading)]">Loan EMI Calculator</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-[var(--font-heading)]">Loan EMI Calculator</CardTitle>
              <CardDescription>
                Calculate your monthly loan payments (EMI) and view the complete amortization schedule.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="loanAmount">Loan Amount ($)</Label>
                    <Input
                      id="loanAmount"
                      type="number"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(e.target.value)}
                      placeholder="100000"
                      min="1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="interestRate">Annual Interest Rate (%)</Label>
                    <Input
                      id="interestRate"
                      type="number"
                      value={interestRate}
                      onChange={(e) => setInterestRate(e.target.value)}
                      placeholder="7.5"
                      step="0.1"
                      min="0.1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="loanTenure">Loan Tenure</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="loanTenure"
                        type="number"
                        value={loanTenure}
                        onChange={(e) => setLoanTenure(e.target.value)}
                        placeholder="15"
                        min="1"
                        className="flex-1"
                      />
                      <select
                        value={tenureType}
                        onChange={(e) => setTenureType(e.target.value)}
                        className="px-3 py-2 border border-input bg-background rounded-md"
                      >
                        <option value="years">Years</option>
                        <option value="months">Months</option>
                      </select>
                    </div>
                  </div>

                  <Button onClick={calculateEMI} className="w-full" size="lg">
                    Calculate EMI
                  </Button>
                </div>

                {result && (
                  <div className="space-y-4">
                    <Card className="bg-muted">
                      <CardContent className="pt-6">
                        <div className="space-y-4">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-primary">${result.emi.toLocaleString()}</div>
                            <div className="text-lg text-muted-foreground">Monthly EMI</div>
                          </div>

                          <div className="grid grid-cols-1 gap-3">
                            <div className="bg-background rounded-lg p-3 flex justify-between">
                              <span className="text-sm text-muted-foreground">Total Amount</span>
                              <span className="font-semibold">${result.totalAmount.toLocaleString()}</span>
                            </div>
                            <div className="bg-background rounded-lg p-3 flex justify-between">
                              <span className="text-sm text-muted-foreground">Total Interest</span>
                              <span className="font-semibold text-red-600">
                                ${result.totalInterest.toLocaleString()}
                              </span>
                            </div>
                            <div className="bg-background rounded-lg p-3 flex justify-between">
                              <span className="text-sm text-muted-foreground">Principal Amount</span>
                              <span className="font-semibold text-green-600">
                                ${Number.parseFloat(loanAmount).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>

              {result && result.breakdown.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-[var(--font-heading)]">
                      Amortization Schedule (First 12 Months)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-2">Month</th>
                            <th className="text-right p-2">EMI</th>
                            <th className="text-right p-2">Principal</th>
                            <th className="text-right p-2">Interest</th>
                            <th className="text-right p-2">Balance</th>
                          </tr>
                        </thead>
                        <tbody>
                          {result.breakdown.map((row) => (
                            <tr key={row.month} className="border-b">
                              <td className="p-2">{row.month}</td>
                              <td className="text-right p-2">${row.emi.toLocaleString()}</td>
                              <td className="text-right p-2 text-green-600">${row.principal.toLocaleString()}</td>
                              <td className="text-right p-2 text-red-600">${row.interest.toLocaleString()}</td>
                              <td className="text-right p-2">${row.balance.toLocaleString()}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
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
