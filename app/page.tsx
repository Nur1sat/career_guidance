"use client"

import { useState, useEffect } from "react"
import { SignUpForm } from "@/components/sign-up-form"
import { QuestionText } from "@/components/question-text"
import { Results } from "@/components/results"
import { SuccessMessage } from "@/components/success-message"

interface Question {
  type: "text"
  text: string
}

interface Answer {
  question: string
  answer: string
}

export default function Home() {
  const [currentPage, setCurrentPage] = useState("signup")
  const [email, setEmail] = useState("")
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [profession, setProfession] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch("/api/questions")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch questions")
        }
        return response.json()
      })
      .then((data) => {
        setQuestions(data)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching questions:", error)
        setError("Failed to load questions. Please try again later.")
        setIsLoading(false)
      })
  }, [])

  const handleSignUp = (formData: { email: string }) => {
    setEmail(formData.email)
    setCurrentPage("question")
  }

  const handleAnswer = (answer: string) => {
    setAnswers([...answers, { question: questions[currentQuestionIndex].text, answer }])
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      submitAnswers()
    }
  }

  const submitAnswers = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/submit-answers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answers }),
      })
      if (!response.ok) {
        throw new Error("Failed to submit answers")
      }
      const data = await response.json()
      if (data.error) {
        throw new Error(data.error)
      }
      setProfession(data.profession)
      setCurrentPage("results")
    } catch (error) {
      console.error("Error submitting answers:", error)
      setError("Failed to process your answers. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleEmailResults = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, profession, answers }),
      })
      if (!response.ok) {
        throw new Error("Failed to send email")
      }
      setCurrentPage("successMessage")
    } catch (error) {
      console.error("Error sending email:", error)
      setError("Failed to send email. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <div className="min-h-screen bg-[#2D3047] flex items-center justify-center text-white">Loading...</div>
  }

  if (error) {
    return <div className="min-h-screen bg-[#2D3047] flex items-center justify-center text-white">{error}</div>
  }

  return (
    <main className="min-h-screen bg-[#2D3047] flex items-center justify-center p-4">
      {currentPage === "signup" && <SignUpForm onNext={handleSignUp} />}
      {currentPage === "question" && questions[currentQuestionIndex] && (
        <QuestionText
          question={questions[currentQuestionIndex]}
          onAnswer={handleAnswer}
          totalQuestions={questions.length}
          currentQuestionNumber={currentQuestionIndex + 1}
        />
      )}
      {currentPage === "results" && <Results profession={profession} onEmailResults={handleEmailResults} />}
      {currentPage === "successMessage" && <SuccessMessage />}
    </main>
  )
}

