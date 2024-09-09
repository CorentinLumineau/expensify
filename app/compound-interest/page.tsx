import { CompoundInterestCalculator } from './compound-interest-calculator'
import { generateMetadata } from '@/utils/getMetadata'
import { Metadata } from 'next'

export const metadata: Metadata = generateMetadata('/compound-interest')

export default function CompoundInterestPage() {
  return (
    <div className="max-w-4xl mx-auto p-2 md:p-4">
      <CompoundInterestCalculator />
    </div>
  )
}