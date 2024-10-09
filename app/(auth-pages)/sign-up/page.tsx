'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import Link from 'next/link'

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    })
    if (error) {
      setError(error.message)
    } else {
      router.push('/dashboard')
      router.refresh()
    }
  }

  return (
    <form onSubmit={handleSignUp} className="flex-1 flex flex-col w-full sm:max-w-md justify-center gap-2">
      <Label htmlFor="email">Email</Label>
      <Input
        name="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        placeholder="you@example.com"
      />
      <Label htmlFor="password">Password</Label>
      <Input
        type="password"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        placeholder="••••••••"
      />
      <Button type="submit">Sign Up</Button>
      {error && <p className="text-red-600">{error}</p>}
      <p className="text-sm text-gray-500">
        Already have an account? <Link href="/sign-in" className="text-blue-600 hover:underline">Sign In</Link>
      </p>
    </form>
  )
}
