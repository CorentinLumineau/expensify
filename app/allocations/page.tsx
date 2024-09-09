
import { generateMetadata } from '@/utils/getMetadata'
import { Metadata } from 'next'

export const metadata: Metadata = generateMetadata('/allocations')

export default function AllocationsPage() {
  return (
    <div className="max-w-4xl mx-auto p-2 md:p-4">
      Hello Allocations
    </div>
  )
}