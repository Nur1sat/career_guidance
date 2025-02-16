"use client"

import { useState } from "react"

interface EmailConfirmationProps {
  email: string
  onConfirm: (email: string) => void
  onCancel: () => void
}

export function EmailConfirmation({ email, onConfirm, onCancel }: EmailConfirmationProps) {
  const [newEmail, setNewEmail] = useState(email)
  const [isChanging, setIsChanging] = useState(false)

  const handleConfirm = () => {
    onConfirm(newEmail)
  }

  return (
    <div className="w-full max-w-[400px] mx-auto bg-white rounded-[20px] p-6">
      <h2 className="text-[#2D3047] text-xl mb-4">Confirm Email</h2>
      {isChanging ? (
        <div className="mb-4">
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="w-full h-12 px-4 rounded-[10px] bg-[#D9D9D9] text-[#2D3047] focus:outline-none"
          />
        </div>
      ) : (
        <p className="text-[#2D3047] mb-4">Do you want to send the results to {email}?</p>
      )}
      <div className="flex gap-4">
        {isChanging ? (
          <button
            onClick={handleConfirm}
            className="flex-1 h-12 bg-[#93B7BE] text-white rounded-[10px] hover:bg-[#93B7BE]/90 transition-colors"
          >
            Confirm New Email
          </button>
        ) : (
          <>
            <button
              onClick={handleConfirm}
              className="flex-1 h-12 bg-[#93B7BE] text-white rounded-[10px] hover:bg-[#93B7BE]/90 transition-colors"
            >
              Yes, send
            </button>
            <button
              onClick={() => setIsChanging(true)}
              className="flex-1 h-12 bg-[#D9D9D9] text-[#2D3047] rounded-[10px] hover:bg-[#D9D9D9]/90 transition-colors"
            >
              Change Email
            </button>
          </>
        )}
      </div>
      {!isChanging && (
        <button
          onClick={onCancel}
          className="w-full h-12 mt-4 bg-[#D9D9D9] text-[#2D3047] rounded-[10px] hover:bg-[#D9D9D9]/90 transition-colors"
        >
          Cancel
        </button>
      )}
    </div>
  )
}

