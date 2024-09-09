import { DebtRatioCalculator } from './debt-ratio-calculator'
import { generateMetadata } from '@/utils/getMetadata'
import { Metadata } from 'next'

export const metadata: Metadata = generateMetadata('/debt-ratio')

export default function DebtRatioPage() {
  return (
    <div className="max-w-4xl mx-auto p-2 md:p-4">
      <DebtRatioCalculator />
    </div>
  )
}