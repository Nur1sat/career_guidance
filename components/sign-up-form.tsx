"use client"

import { useState } from "react"

interface SignUpFormProps {
  onNext: (formData: { email: string }) => void
}

export function SignUpForm({ onNext }: SignUpFormProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !phone) {
      setError("Please fill in all fields")
      return
    }
    // Basic email validation
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address")
      return
    }
    setError("")
    onNext({ email })
  }

  return (
    <div className="w-full max-w-[400px]">
      <div className="flex flex-col items-center mb-8">
        <div className="w-[120px] h-[120px] rounded-full bg-[#93B7BE]" />
        <h1 className="text-[32px] text-white mt-4 font-medium">Flareer</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-[#93B7BE]/80 rounded-[20px] p-8">
        <h2 className="text-white text-2xl mb-6">Sign up</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter your name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full h-12 px-4 rounded-[10px] bg-white text-[#2D3047] placeholder:text-[#2D3047]/60 focus:outline-none"
            required
          />
          <input
            type="email"
            placeholder="Enter your email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-12 px-4 rounded-[10px] bg-white text-[#2D3047] placeholder:text-[#2D3047]/60 focus:outline-none"
            required
          />
          <input
            type="tel"
            placeholder="Enter your phone number..."
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full h-12 px-4 rounded-[10px] bg-white text-[#2D3047] placeholder:text-[#2D3047]/60 focus:outline-none"
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full h-12 bg-white rounded-[10px] text-[#2D3047] font-medium hover:bg-white/90 transition-colors"
          >
            Begin the Test
          </button>
        </div>
      </form>
    </div>
  )
}

