import { generateMetadata } from '@/utils/getMetadata'
import { Metadata } from 'next'

export const metadata: Metadata = generateMetadata('/dashboard')

export default function DashboardPage() {
    return (
        <div className="max-w-4xl mx-auto p-2 md:p-4">
            Hello Dashboard
        </div>
    )
}