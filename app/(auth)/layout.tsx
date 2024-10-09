import AuthHeader from '../components/AuthHeader'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <AuthHeader />
      <main className="flex-grow flex items-center justify-center">
        {children}
      </main>
    </div>
  )
}