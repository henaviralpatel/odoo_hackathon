"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Package, AlertTriangle, TrendingUp, TrendingDown, Plus, Download } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const inventoryData = [
  {
    category: "Tops",
    total: 1247,
    available: 892,
    reserved: 234,
    lowStock: 121,
    trend: "up",
    trendValue: 12.5,
  },
  {
    category: "Bottoms",
    total: 986,
    available: 743,
    reserved: 156,
    lowStock: 87,
    trend: "up",
    trendValue: 8.3,
  },
  {
    category: "Dresses",
    total: 654,
    available: 498,
    reserved: 98,
    lowStock: 58,
    trend: "down",
    trendValue: -3.2,
  },
  {
    category: "Outerwear",
    total: 432,
    available: 321,
    reserved: 67,
    lowStock: 44,
    trend: "up",
    trendValue: 15.7,
  },
  {
    category: "Accessories",
    total: 789,
    available: 612,
    reserved: 123,
    lowStock: 54,
    trend: "up",
    trendValue: 6.9,
  },
  {
    category: "Footwear",
    total: 345,
    available: 267,
    reserved: 45,
    lowStock: 33,
    trend: "down",
    trendValue: -1.8,
  },
]

const lowStockItems = [
  {
    id: 1,
    name: "Vintage Denim Jackets",
    category: "Outerwear",
    currentStock: 3,
    threshold: 10,
    lastRestocked: "2024-03-15",
    demand: "high",
  },
  {
    id: 2,
    name: "Designer Handbags",
    category: "Accessories",
    currentStock: 2,
    threshold: 8,
    lastRestocked: "2024-03-12",
    demand: "high",
  },
  {
    id: 3,
    name: "Summer Dresses",
    category: "Dresses",
    currentStock: 5,
    threshold: 15,
    lastRestocked: "2024-03-18",
    demand: "medium",
  },
  {
    id: 4,
    name: "Athletic Shoes",
    category: "Footwear",
    currentStock: 4,
    threshold: 12,
    lastRestocked: "2024-03-10",
    demand: "high",
  },
]

const chartData = inventoryData.map((item) => ({
  category: item.category,
  available: item.available,
  reserved: item.reserved,
  lowStock: item.lowStock,
}))

export function InventoryOverview() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const filteredData = inventoryData.filter((item) => {
    const matchesSearch = item.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const handleRestockSuggestion = (itemId: number) => {
    console.log(`Generating restock suggestion for item ${itemId}`)
    // Simulate restock suggestion
  }

  const handleExportInventory = () => {
    const data = JSON.stringify(inventoryData, null, 2)
    const blob = new Blob([data], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "inventory-report.json"
    a.click()
  }

  const getDemandBadge = (demand: string) => {
    switch (demand) {
      case "high":
        return <Badge variant="destructive">High Demand</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Medium Demand</Badge>
      case "low":
        return <Badge className="bg-gray-100 text-gray-800">Low Demand</Badge>
      default:
        return <Badge variant="outline">{demand}</Badge>
    }
  }

  const totalItems = inventoryData.reduce((sum, item) => sum + item.total, 0)
  const totalAvailable = inventoryData.reduce((sum, item) => sum + item.available, 0)
  const totalReserved = inventoryData.reduce((sum, item) => sum + item.reserved, 0)
  const totalLowStock = inventoryData.reduce((sum, item) => sum + item.lowStock, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-green-800 dark:text-green-200">Inventory Overview</h1>
          <p className="text-green-600 dark:text-green-400">Monitor stock levels and manage inventory alerts</p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={handleExportInventory}
            variant="outline"
            className="border-green-200 hover:bg-green-50 bg-transparent"
          >
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button className="bg-green-600 hover:bg-green-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Category
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-green-200 dark:border-green-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">Total Items</CardTitle>
            <Package className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800 dark:text-green-200">{totalItems.toLocaleString()}</div>
            <p className="text-xs text-green-600 dark:text-green-400">Across all categories</p>
          </CardContent>
        </Card>

        <Card className="border-green-200 dark:border-green-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">Available</CardTitle>
            <Package className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800 dark:text-green-200">
              {totalAvailable.toLocaleString()}
            </div>
            <p className="text-xs text-green-600 dark:text-green-400">Ready for swap</p>
          </CardContent>
        </Card>

        <Card className="border-green-200 dark:border-green-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">Reserved</CardTitle>
            <Package className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800 dark:text-green-200">
              {totalReserved.toLocaleString()}
            </div>
            <p className="text-xs text-green-600 dark:text-green-400">Pending swaps</p>
          </CardContent>
        </Card>

        <Card className="border-green-200 dark:border-green-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">Low Stock</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{totalLowStock}</div>
            <p className="text-xs text-red-500">Need attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-green-200 dark:border-green-800">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-green-500" />
              <Input
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 border-green-200 focus:border-green-400"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[180px] border-green-200">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {inventoryData.map((item) => (
                  <SelectItem key={item.category} value={item.category}>
                    {item.category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Inventory Chart */}
        <Card className="border-green-200 dark:border-green-800">
          <CardHeader>
            <CardTitle className="text-green-800 dark:text-green-200">Inventory Distribution</CardTitle>
            <CardDescription className="text-green-600 dark:text-green-400">Stock levels by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#22c55e20" />
                <XAxis dataKey="category" stroke="#16a34a" />
                <YAxis stroke="#16a34a" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#f0fdf4",
                    border: "1px solid #22c55e",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="available" stackId="a" fill="#22c55e" name="Available" />
                <Bar dataKey="reserved" stackId="a" fill="#eab308" name="Reserved" />
                <Bar dataKey="lowStock" stackId="a" fill="#ef4444" name="Low Stock" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Low Stock Alerts */}
        <Card className="border-green-200 dark:border-green-800">
          <CardHeader>
            <CardTitle className="text-green-800 dark:text-green-200 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              Low Stock Alerts
            </CardTitle>
            <CardDescription className="text-green-600 dark:text-green-400">
              Items requiring immediate attention
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {lowStockItems.map((item) => (
              <div
                key={item.id}
                className="p-3 border border-red-200 dark:border-red-800 rounded-lg bg-red-50 dark:bg-red-900/20"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-red-800 dark:text-red-200">{item.name}</h4>
                    <p className="text-sm text-red-600 dark:text-red-400">{item.category}</p>
                  </div>
                  {getDemandBadge(item.demand)}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-red-600 dark:text-red-400">Stock Level</span>
                    <span className="font-medium text-red-800 dark:text-red-200">
                      {item.currentStock} / {item.threshold}
                    </span>
                  </div>
                  <Progress value={(item.currentStock / item.threshold) * 100} className="h-2" />
                  <div className="flex justify-between text-xs text-red-600 dark:text-red-400">
                    <span>Last restocked: {item.lastRestocked}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleRestockSuggestion(item.id)}
                      className="h-6 px-2 text-xs border-red-200 hover:bg-red-100"
                    >
                      Suggest Restock
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Category Details */}
      <Card className="border-green-200 dark:border-green-800">
        <CardHeader>
          <CardTitle className="text-green-800 dark:text-green-200">Category Details</CardTitle>
          <CardDescription className="text-green-600 dark:text-green-400">Detailed inventory breakdown</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredData.map((item) => (
              <div key={item.category} className="p-4 border border-green-200 dark:border-green-800 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-green-800 dark:text-green-200">{item.category}</h3>
                    <div className="flex items-center gap-1">
                      {item.trend === "up" ? (
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-600" />
                      )}
                      <span
                        className={`text-sm font-medium ${item.trend === "up" ? "text-green-600" : "text-red-600"}`}
                      >
                        {item.trend === "up" ? "+" : ""}
                        {item.trendValue}%
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-800 dark:text-green-200">{item.total}</div>
                    <div className="text-sm text-green-600 dark:text-green-400">Total Items</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="text-center p-2 bg-green-50 dark:bg-green-900/20 rounded">
                    <div className="font-semibold text-green-800 dark:text-green-200">{item.available}</div>
                    <div className="text-green-600 dark:text-green-400">Available</div>
                  </div>
                  <div className="text-center p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded">
                    <div className="font-semibold text-yellow-800 dark:text-yellow-200">{item.reserved}</div>
                    <div className="text-yellow-600 dark:text-yellow-400">Reserved</div>
                  </div>
                  <div className="text-center p-2 bg-red-50 dark:bg-red-900/20 rounded">
                    <div className="font-semibold text-red-800 dark:text-red-200">{item.lowStock}</div>
                    <div className="text-red-600 dark:text-red-400">Low Stock</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
