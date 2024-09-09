'use client'
import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { useLanguage } from '@/app/contexts/LanguageContext'
import { translations, Language } from '@/app/translations'

type AssetClassType = 'Cash' | 'RealEstate' | 'Crypto' | 'Stock' | 'Gold'

interface AssetAllocation {
  type: AssetClassType
  percentageWithoutCash: number
  percentageWithCash: number
}

export default function AssetClassAllocation() {
  const [totalAmount, setTotalAmount] = useState<number>(100000)
  const [cashAmount, setCashAmount] = useState<number>(0)
  const [allocations, setAllocations] = useState<AssetAllocation[]>([
    { type: 'Cash', percentageWithoutCash: 0, percentageWithCash: 0 },
    { type: 'RealEstate', percentageWithoutCash: 25, percentageWithCash: 25 },
    { type: 'Crypto', percentageWithoutCash: 30, percentageWithCash: 30 },
    { type: 'Stock', percentageWithoutCash: 40, percentageWithCash: 40 },
    { type: 'Gold', percentageWithoutCash: 5, percentageWithCash: 5 },
  ])

  const { language } = useLanguage()
  const t = translations[language as Language].assetAllocation
  const tcommon = translations[language as Language].common

  useEffect(() => {
    recalculateAllocations()
  }, [cashAmount, totalAmount])

  const recalculateAllocations = () => {
    const cashPercentage = (cashAmount / totalAmount) * 100
    const remainingPercentage = 100 - cashPercentage
    setAllocations(prevAllocations => prevAllocations.map(asset => {
      if (asset.type === 'Cash') {
        return {
          ...asset,
          percentageWithoutCash: 0,
          percentageWithCash: cashPercentage
        }
      } else {
        const newPercentageWithCash = (asset.percentageWithoutCash / 100) * remainingPercentage
        return {
          ...asset,
          percentageWithCash: newPercentageWithCash
        }
      }
    }))
  }

  const handleCashChange = (value: string) => {
    const newCashAmount = parseFloat(value) || 0
    setCashAmount(newCashAmount)
  }

  const handleTotalAmountChange = (value: string) => {
    const newTotalAmount = parseFloat(value) || 0
    setTotalAmount(newTotalAmount)
  }

  const handlePercentageChange = (type: AssetClassType, value: string) => {
    const newPercentage = parseFloat(value) || 0
    const newAllocations = allocations.map(asset => 
      asset.type === type ? { ...asset, percentageWithoutCash: newPercentage } : asset
    )
    setAllocations(newAllocations)
    recalculateAllocations()
  }

  const getRowColor = (type: AssetClassType) => {
    switch(type) {
      case 'Cash': return 'bg-gray-100 dark:bg-gray-800'
      case 'RealEstate': return 'bg-green-100 dark:bg-green-900'
      case 'Crypto': return 'bg-blue-100 dark:bg-blue-900'
      case 'Stock': return 'bg-yellow-100 dark:bg-yellow-900'
      case 'Gold': return 'bg-orange-100 dark:bg-orange-900'
      default: return ''
    }
  }

  const totalPercentageWithoutCash = allocations
    .filter(item => item.type !== 'Cash')
    .reduce((sum, item) => sum + item.percentageWithoutCash, 0)

  const totalPercentageWithCash = allocations.reduce((sum, item) => sum + item.percentageWithCash, 0)

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardHeader>
        <CardTitle>{t.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <Label htmlFor="totalAmount">{t.totalAmount}</Label>
            <Input
              id="totalAmount"
              type="number"
              value={totalAmount}
              onChange={(e) => handleTotalAmountChange(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="cashAmount">{t.cashAmount}</Label>
            <Input
              id="cashAmount"
              type="number"
              value={cashAmount}
              onChange={(e) => handleCashChange(e.target.value)}
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t.type}</TableHead>
                <TableHead>{t.percentageWithoutCash}</TableHead>
                <TableHead>{t.percentageWithCash}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allocations.map((asset) => (
                <TableRow key={asset.type} className={getRowColor(asset.type)}>
                  <TableCell>{t.assetTypes[asset.type]}</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={asset.percentageWithoutCash.toFixed(1)}
                      onChange={(e) => handlePercentageChange(asset.type, e.target.value)}
                      className="w-20"
                      disabled={asset.type === 'Cash'}
                    />
                  </TableCell>
                  <TableCell>{asset.percentageWithCash.toFixed(2)}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardFooter>
        <div className="w-full space-y-2">
          <p className={`font-bold ${Math.abs(totalPercentageWithCash - 100) < 0.01 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {tcommon.total}: {totalPercentageWithCash.toFixed(2)}%
          </p>
          {Math.abs(totalPercentageWithCash - 100) >= 0.01 && (
            <p className="text-red-600 dark:text-red-400 text-sm">{t.totalsShouldEqual}</p>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}