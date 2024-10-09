'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useLanguage } from '@/app/contexts/LanguageContext'
import { Language, translations } from '@/app/translations'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { language } = useLanguage()
  const t = translations[language as Language].auth

  const supabase = createClientComponentClient()

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) {
      setError(error.message)
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold">{t.signUp}</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSignUp}>
          <div className="space-y-4">
            <Input
              type="email"
              placeholder={t.email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder={t.password}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div>
            <Button type="submit" className="w-full">
              {t.signUp}
            </Button>
          </div>
        </form>
        <div className="text-center mt-4">
          <Link href="/sign-in" className="text-primary hover:underline">
            {t.alreadyHaveAccount} {t.signIn}
          </Link>
        </div>
      </div>
    </div>
  )
}