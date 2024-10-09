'use client'

import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SmtpMessage } from "../smtp-message";
import { useState } from "react";
import { useSupabase } from "@/app/utils/supabase";

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<Message | null>(null);
  const { supabase } = useSupabase();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      setMessage({ type: 'error', content: error.message });
    } else {
      setMessage({ type: 'success', content: 'Check your email for the password reset link.' });
    }
  };

  return (
    <>
      <form onSubmit={handleResetPassword} className="flex-1 flex flex-col w-full gap-2 text-foreground [&>input]:mb-6 min-w-64 max-w-64 mx-auto">
        <div>
          <h1 className="text-2xl font-medium">Reset Password</h1>
          <p className="text-sm text-secondary-foreground">
            Already have an account?{" "}
            <Link className="text-primary underline" href="/sign-in">
              Sign in
            </Link>
          </p>
        </div>
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="email">Email</Label>
          <Input
            name="email"
            placeholder="you@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <SubmitButton>
            Reset Password
          </SubmitButton>
          {message && <FormMessage message={message} />}
        </div>
      </form>
      <SmtpMessage />
    </>
  );
}
