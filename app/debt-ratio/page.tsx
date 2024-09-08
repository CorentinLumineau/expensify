import { AdvancedDebtRatioCalculator } from '@/components/advanced-debt-ratio-calculator'

export const metadata = {
  title: 'Advanced Debt Ratio Calculator',
  description: 'Calculate your debt ratio with our advanced tool',
}

export default function DebtRatioPage() {
  return (
    <div className="max-w-4xl mx-auto p-2 md:p-4">
      <AdvancedDebtRatioCalculator />
    </div>
  )
}