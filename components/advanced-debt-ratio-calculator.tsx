'use client'

import { useDispatch, useSelector } from 'react-redux'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Info, PlusCircle, Trash2 } from 'lucide-react'
import { addTransaction, removeTransaction } from '@/app/store/debtRatioSlice'
import { RootState } from '@/app/store/store'
import { Transaction } from '@/app/store/debtRatioSlice'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount)
}

export function AdvancedDebtRatioCalculator() {
  const dispatch = useDispatch()
  const expenses = useSelector((state: RootState) => state.debtRatio.expenses)
  const incomes = useSelector((state: RootState) => state.debtRatio.incomes)

  const addTransactionHandler = (type: 'expense' | 'income') => {
    const nameInput = document.getElementById(`${type}Name`) as HTMLInputElement
    const amountInput = document.getElementById(`${type}Amount`) as HTMLInputElement
    const percentageInput = document.getElementById(`${type}Percentage`) as HTMLInputElement

    const name = nameInput.value.trim()
    const amount = parseFloat(amountInput.value)
    const percentage = parseFloat(percentageInput.value) || 100 // Default to 100% if empty

    if (!name) {
      alert('Please enter a name for the transaction.')
      return
    }

    if (isNaN(amount) || amount <= 0 || percentage < 0 || percentage > 100) {
      alert('Please enter valid numbers. Amount should be positive and percentage between 0 and 100.')
      return
    }

    const newTransaction: Transaction = { name, amount, percentage }
    dispatch(addTransaction({ type, transaction: newTransaction }))

    // Clear input fields
    nameInput.value = ''
    amountInput.value = ''
    percentageInput.value = '100' // Reset to 100%
  }

  const removeTransactionHandler = (type: 'expense' | 'income', index: number) => {
    dispatch(removeTransaction({ type, index }))
  }

  const calculateTotals = () => {
    const totalExpenses = expenses.reduce((sum, exp) => sum + (exp.amount * exp.percentage / 100), 0)
    const totalIncomes = incomes.reduce((sum, inc) => sum + (inc.amount * inc.percentage / 100), 0)
    const debtRatio = totalIncomes > 0 ? totalExpenses / totalIncomes : 0
    return { totalExpenses, totalIncomes, debtRatio }
  }

  const { totalExpenses, totalIncomes, debtRatio } = calculateTotals()

  const TransactionList = ({ transactions, type }: { transactions: Transaction[], type: 'expense' | 'income' }) => (
    <div className="mt-4 space-y-2">
      {transactions.map((t, index) => (
        <div key={index} className="flex justify-between items-center bg-gray-50 dark:bg-gray-800 p-3 rounded-lg shadow-sm">
          <span className="font-medium dark:text-gray-200">{t.name}</span>
          <span className="dark:text-gray-300">{formatCurrency(t.amount)} ({t.percentage}%)</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => removeTransactionHandler(type, index)}
            className="text-red-500 hover:text-red-700 hover:bg-red-100 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900"
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Remove {type}</span>
          </Button>
        </div>
      ))}
    </div>
  )

  const TransactionForm = ({ type }: { type: 'expense' | 'income' }) => (
    <div className="space-y-4">
      <div>
        <Label htmlFor={`${type}Name`}>Name</Label>
        <Input
          id={`${type}Name`}
          placeholder={`${type.charAt(0).toUpperCase() + type.slice(1)} name`}
        />
      </div>
      <div className="flex space-x-2">
        <div className="flex-1">
          <Label htmlFor={`${type}Amount`}>Amount (€)</Label>
          <Input
            id={`${type}Amount`}
            type="number"
            placeholder="Amount"
          />
        </div>
        <div className="flex-1 space-y-2">
          <div className="flex items-center space-x-2">
            <Label htmlFor={`${type}Percentage`}>Consideration %</Label>
            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                    <Info className="h-4 w-4" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-sm">
                    Adjust this percentage to consider only a portion of the {type} in your debt ratio calculation.
                    This is useful for variable or uncertain {type}s.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input
            id={`${type}Percentage`}
            type="number"
            placeholder="Percentage"
            defaultValue="100"
          />
        </div>
      </div>
      <Button onClick={() => addTransactionHandler(type)} className="w-full bg-green-600 hover:bg-green-700 text-white">
        <PlusCircle className="mr-2 h-4 w-4" /> Add {type.charAt(0).toUpperCase() + type.slice(1)}
      </Button>
    </div>
  )

  return (
    <Card>
      <CardContent className="grid md:grid-cols-2 gap-6 pt-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Expenses</h3>
          <TransactionForm type="expense" />
          <TransactionList transactions={expenses} type="expense" />
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Incomes</h3>
          <TransactionForm type="income" />
          <TransactionList transactions={incomes} type="income" />
        </div>
      </CardContent>
      <Separator className="my-4" />
      <CardContent>
        <div className="text-center space-y-2">
          <p className="text-lg">Total Expenses: <span className="font-semibold text-orange-500">{formatCurrency(totalExpenses)}</span></p>
          <p className="text-lg">Total Incomes: <span className="font-semibold text-green-500">{formatCurrency(totalIncomes)}</span></p>
          <p className="text-xl font-bold mt-4">Debt Ratio:
            <span className={totalIncomes > 0 ? (debtRatio < 0.35 ? "text-green-500" : "text-orange-500") : ""}>
              {totalIncomes > 0 ? ` ${(debtRatio * 100).toFixed(2)}%` : 'N/A'}
            </span>
          </p>
          {totalIncomes > 0 && (
            <p className="text-sm text-gray-600">
              {debtRatio > 1
                ? "Your considered expenses exceed your considered incomes. You may want to review your financial situation."
                : "Your considered incomes exceed your considered expenses. This is generally a good financial position."}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}