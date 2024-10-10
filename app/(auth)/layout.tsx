import Header from '../components/Header'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header isAuthenticated={false} />
      <main className="flex-grow flex items-center justify-center p-4">
        {children}
      </main>
    </div>
  )
}