"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { TrendingUp, TrendingDown, Users, Package, Recycle, Leaf, Download, RefreshCw } from "lucide-react"

const monthlyData = [
  { month: "Jan", swaps: 245, users: 89, co2Saved: 156 },
  { month: "Feb", swaps: 312, users: 124, co2Saved: 203 },
  { month: "Mar", swaps: 428, users: 167, co2Saved: 278 },
  { month: "Apr", swaps: 389, users: 145, co2Saved: 251 },
  { month: "May", swaps: 467, users: 198, co2Saved: 312 },
  { month: "Jun", swaps: 523, users: 234, co2Saved: 389 },
]

const categoryData = [
  { name: "Tops", value: 35, color: "#22c55e" },
  { name: "Bottoms", value: 28, color: "#16a34a" },
  { name: "Dresses", value: 20, color: "#15803d" },
  { name: "Accessories", value: 17, color: "#166534" },
]

const topContributors = [
  { name: "Sarah Chen", swaps: 47, points: 2340, avatar: "SC" },
  { name: "Mike Johnson", swaps: 42, points: 2180, avatar: "MJ" },
  { name: "Emma Davis", swaps: 38, points: 1950, avatar: "ED" },
  { name: "Alex Kim", swaps: 35, points: 1820, avatar: "AK" },
  { name: "Lisa Wang", swaps: 33, points: 1690, avatar: "LW" },
]

export function DashboardOverview() {
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 2000)
  }

  const handleExport = () => {
    // Simulate export functionality
    const data = JSON.stringify(monthlyData, null, 2)
    const blob = new Blob([data], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "rewear-analytics.json"
    a.click()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-green-800 dark:text-green-200">Analytics Dashboard</h1>
          <p className="text-green-600 dark:text-green-400">
            Monitor ReWear's environmental impact and community growth
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={handleRefresh}
            disabled={isRefreshing}
            variant="outline"
            className="border-green-200 hover:bg-green-50 bg-transparent"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button onClick={handleExport} className="bg-green-600 hover:bg-green-700">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-green-200 dark:border-green-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">Total Swaps</CardTitle>
            <Recycle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800 dark:text-green-200">2,364</div>
            <p className="text-xs text-green-600 dark:text-green-400 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12.5% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-green-200 dark:border-green-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">Active Users</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800 dark:text-green-200">1,257</div>
            <p className="text-xs text-green-600 dark:text-green-400 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +8.2% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-green-200 dark:border-green-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">Items Listed</CardTitle>
            <Package className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800 dark:text-green-200">4,892</div>
            <p className="text-xs text-red-600 dark:text-red-400 flex items-center">
              <TrendingDown className="h-3 w-3 mr-1" />
              -2.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-green-200 dark:border-green-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">CO₂ Saved</CardTitle>
            <Leaf className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800 dark:text-green-200">1,589 kg</div>
            <p className="text-xs text-green-600 dark:text-green-400 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +15.3% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="trends" className="space-y-4">
        <TabsList className="bg-green-50 dark:bg-green-900/20">
          <TabsTrigger value="trends" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
            Monthly Trends
          </TabsTrigger>
          <TabsTrigger value="categories" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
            Categories
          </TabsTrigger>
          <TabsTrigger value="contributors" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
            Top Contributors
          </TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-green-200 dark:border-green-800">
              <CardHeader>
                <CardTitle className="text-green-800 dark:text-green-200">Swap Activity</CardTitle>
                <CardDescription className="text-green-600 dark:text-green-400">
                  Monthly swap transactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#22c55e20" />
                    <XAxis dataKey="month" stroke="#16a34a" />
                    <YAxis stroke="#16a34a" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#f0fdf4",
                        border: "1px solid #22c55e",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="swaps" fill="#22c55e" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-green-200 dark:border-green-800">
              <CardHeader>
                <CardTitle className="text-green-800 dark:text-green-200">Environmental Impact</CardTitle>
                <CardDescription className="text-green-600 dark:text-green-400">CO₂ savings over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#22c55e20" />
                    <XAxis dataKey="month" stroke="#16a34a" />
                    <YAxis stroke="#16a34a" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#f0fdf4",
                        border: "1px solid #22c55e",
                        borderRadius: "8px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="co2Saved"
                      stroke="#16a34a"
                      strokeWidth={3}
                      dot={{ fill: "#16a34a", strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <Card className="border-green-200 dark:border-green-800">
            <CardHeader>
              <CardTitle className="text-green-800 dark:text-green-200">Item Categories Distribution</CardTitle>
              <CardDescription className="text-green-600 dark:text-green-400">
                Most popular item categories
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-3">
                  {categoryData.map((category) => (
                    <div key={category.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} />
                        <span className="text-sm font-medium text-green-800 dark:text-green-200">{category.name}</span>
                      </div>
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      >
                        {category.value}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contributors" className="space-y-4">
          <Card className="border-green-200 dark:border-green-800">
            <CardHeader>
              <CardTitle className="text-green-800 dark:text-green-200">Top Contributors</CardTitle>
              <CardDescription className="text-green-600 dark:text-green-400">
                Most active community members
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topContributors.map((contributor, index) => (
                  <div
                    key={contributor.name}
                    className="flex items-center justify-between p-3 rounded-lg bg-green-50 dark:bg-green-900/20"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-white font-medium">
                        {contributor.avatar}
                      </div>
                      <div>
                        <p className="font-medium text-green-800 dark:text-green-200">{contributor.name}</p>
                        <p className="text-sm text-green-600 dark:text-green-400">
                          {contributor.swaps} swaps completed
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-green-800 dark:text-green-200">{contributor.points} points</p>
                      <Badge className="bg-green-600 hover:bg-green-700">#{index + 1}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
