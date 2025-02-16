"use client"

import { useState } from "react"

interface QuestionMultipleProps {
  question: {
    text: string
    options: string[]
  }
  onAnswer: (answer: string) => void
}

export function QuestionMultiple({ question, onAnswer }: QuestionMultipleProps) {
  const [selectedOption, setSelectedOption] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = () => {
    if (!selectedOption) {
      setError("Please select an option")
      return
    }
    setError("")
    onAnswer(selectedOption)
  }

  return (
    <div className="w-full max-w-[400px] mx-auto">
      <div className="w-full h-2 bg-[#93B7BE]/30 rounded-full mb-6">
        <div className="w-1/3 h-full bg-[#93B7BE] rounded-full" />
      </div>

      <div className="bg-white rounded-[20px] p-6">
        <p className="text-center text-sm text-[#2D3047]/60 mb-4">Question</p>

        <div className="text-center text-[#2D3047] mb-6">{question.text}</div>

        <div className="space-y-2">
          {question.options.map((option) => (
            <button
              key={option}
              onClick={() => setSelectedOption(option)}
              className={`w-full h-12 ${
                selectedOption === option
                  ? "bg-[#555B84] text-white"
                  : "bg-[#93B7BE] text-white hover:bg-[#555B84] hover:text-white"
              } rounded-[10px] transition-colors duration-200 ease-in-out`}
            >
              {option}
            </button>
          ))}
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <button
          onClick={handleSubmit}
          className="w-full h-12 bg-[#93B7BE] text-white rounded-[10px] hover:bg-[#93B7BE]/90 transition-colors mt-4"
        >
          Next Question
        </button>
      </div>
    </div>
  )
}

