"use client"

import { useState } from "react"

interface QuestionTextProps {
  question: {
    text: string
  }
  onAnswer: (answer: string) => void
  totalQuestions: number
  currentQuestionNumber: number
}

export function QuestionText({ question, onAnswer, totalQuestions, currentQuestionNumber }: QuestionTextProps) {
  const [answer, setAnswer] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = () => {
    if (!answer.trim()) {
      setError("Please provide an answer")
      return
    }
    setError("")
    onAnswer(answer)
    setAnswer("") // Clear the answer for the next question
  }

  return (
    <div className="w-full max-w-[400px] mx-auto">
      <div className="w-full h-2 bg-[#93B7BE]/30 rounded-full mb-6">
        <div
          className="h-full bg-[#93B7BE] rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${(currentQuestionNumber / totalQuestions) * 100}%` }}
        />
      </div>

      <div className="bg-white rounded-[20px] p-6">
        <p className="text-center text-sm text-[#2D3047]/60 mb-4">
          Question {currentQuestionNumber} of {totalQuestions}
        </p>

        <div className="text-center text-[#2D3047] mb-6">{question.text}</div>

        <textarea
          placeholder="Type in your answer..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="w-full h-[150px] p-4 mb-4 bg-[#555B84] text-white placeholder:text-white/70 rounded-[10px] resize-none focus:outline-none"
        />

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <button
          onClick={handleSubmit}
          className="w-full h-12 bg-[#93B7BE] text-white rounded-[10px] hover:bg-[#93B7BE]/90 transition-colors"
        >
          {currentQuestionNumber === totalQuestions ? "Submit" : "Next Question"}
        </button>
      </div>
    </div>
  )
}

