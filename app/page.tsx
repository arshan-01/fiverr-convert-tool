import { Calculator, Heart, DollarSign, Ruler, Clock, Zap } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const calculatorCategories = [
  {
    title: "Health & Fitness",
    icon: Heart,
    color: "text-red-500",
    calculators: [
      { name: "BMI Calculator", description: "Calculate your Body Mass Index", href: "/calculators/health/bmi" },
      { name: "Age Calculator", description: "Calculate your exact age", href: "/calculators/health/age" },
      { name: "Sleep Calculator", description: "Optimize your sleep schedule", href: "/calculators/health/sleep" },
      {
        name: "Water Intake Calculator",
        description: "Daily water requirement",
        href: "/calculators/health/water-intake",
      },
      {
        name: "Heart Rate Zone Calculator",
        description: "Find your target heart rate",
        href: "/calculators/health/heart-rate-zone",
      },
      {
        name: "Steps to KM Converter",
        description: "Convert steps to kilometers",
        href: "/calculators/health/steps-to-km",
      },
      {
        name: "Pregnancy Due Date Calculator",
        description: "Calculate due date",
        href: "/calculators/health/pregnancy-due-date",
      },
      { name: "Body Fat Percentage Calculator", description: "Estimate body fat percentage", href: "#" },
      {
        name: "Calorie Needs Calculator",
        description: "Daily calorie requirements",
        href: "/calculators/health/calorie-needs",
      },
      { name: "Sleep Debt Calculator", description: "Track your sleep deficit", href: "#" },
    ],
  },
  {
    title: "Financial",
    icon: DollarSign,
    color: "text-green-500",
    calculators: [
      {
        name: "Loan EMI Calculator",
        description: "Calculate monthly loan payments",
        href: "/calculators/financial/loan-emi",
      },
      { name: "Salary to Hourly Converter", description: "Convert salary to hourly rate", href: "#" },
      { name: "Tip Calculator", description: "Calculate tips and split bills", href: "/calculators/financial/tip" },
      {
        name: "Discount Calculator",
        description: "Calculate discounts and savings",
        href: "/calculators/financial/discount",
      },
      {
        name: "Percentage Calculator",
        description: "Calculate percentages easily",
        href: "/calculators/financial/percentage",
      },
      { name: "Compound Interest Calculator", description: "Calculate compound interest", href: "#" },
      { name: "Currency Percentage Change Calculator", description: "Currency change percentage", href: "#" },
      { name: "Unit Price Calculator", description: "Compare unit prices", href: "#" },
    ],
  },
  {
    title: "Unit Converters",
    icon: Ruler,
    color: "text-blue-500",
    calculators: [
      { name: "Length Converter", description: "Convert between length units", href: "/calculators/converters/length" },
      { name: "Weight Converter", description: "Convert between weight units", href: "/calculators/converters/weight" },
      {
        name: "Temperature Converter",
        description: "Convert temperature scales",
        href: "/calculators/converters/temperature",
      },
      { name: "Speed Converter", description: "Convert speed measurements", href: "/calculators/converters/speed" },
      { name: "Area Converter", description: "Convert area measurements", href: "#" },
      { name: "Volume Converter", description: "Convert volume measurements", href: "#" },
      { name: "Pressure Converter", description: "Convert pressure units", href: "#" },
      { name: "Energy Converter", description: "Convert energy units", href: "#" },
    ],
  },
  {
    title: "Time & Date",
    icon: Clock,
    color: "text-purple-500",
    calculators: [
      {
        name: "Working Days Calculator",
        description: "Calculate business days",
        href: "/calculators/time/working-days",
      },
      { name: "Countdown Timer", description: "Count down to any date", href: "/calculators/time/countdown" },
      { name: "Day of the Week Finder", description: "Find day for any date", href: "/calculators/time/day-finder" },
      {
        name: "Time Until X Calculator",
        description: "Time remaining calculator",
        href: "/calculators/time/time-until",
      },
    ],
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Calculator className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-primary font-[var(--font-heading)]">ConvertorHub</h1>
            </div>
            <div className="flex-1 max-w-md mx-8">
              <Input placeholder="Search calculators..." className="w-full" />
            </div>
            <Button variant="outline">
              <Zap className="h-4 w-4 mr-2" />
              All Tools
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-foreground mb-4 font-[var(--font-heading)]">
            30+ Free Calculators & Converters
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Professional tools for health, finance, unit conversion, and more. Fast, accurate, and completely free to
            use.
          </p>
          <div className="flex justify-center space-x-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Browse All Tools
            </Button>
            <Button size="lg" variant="outline">
              Popular Calculators
            </Button>
          </div>
        </div>
      </section>

      {/* Calculator Categories */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          {calculatorCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-16">
              <div className="flex items-center mb-8">
                <category.icon className={`h-8 w-8 mr-3 ${category.color}`} />
                <h3 className="text-3xl font-bold text-foreground font-[var(--font-heading)]">{category.title}</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {category.calculators.map((calculator, index) => (
                  <Link key={index} href={calculator.href || "#"}>
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer group h-full">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors font-[var(--font-heading)]">
                          {calculator.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-muted-foreground">{calculator.description}</CardDescription>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-12 px-4 mt-16">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Calculator className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold text-foreground font-[var(--font-heading)]">ConvertorHub</span>
              </div>
              <p className="text-muted-foreground">Your trusted source for free online calculators and converters.</p>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4 font-[var(--font-heading)]">Popular Tools</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    BMI Calculator
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Loan EMI Calculator
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Temperature Converter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Age Calculator
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4 font-[var(--font-heading)]">Categories</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Health & Fitness
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Financial
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Unit Converters
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Time & Date
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4 font-[var(--font-heading)]">Company</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 ConvertorHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
