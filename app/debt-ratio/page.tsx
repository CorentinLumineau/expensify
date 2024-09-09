import { DebtRatioCalculator } from './debt-ratio-calculator'

export const metadata = {
  title: 'Debt Ratio',
  description: 'Calculate your debt ratio with our advanced tool',
}

export default function DebtRatioPage() {
  return (
    <div className="max-w-4xl mx-auto p-2 md:p-4">
      <DebtRatioCalculator />
    </div>
  )
}