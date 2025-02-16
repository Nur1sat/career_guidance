import { NextResponse } from "next/server"

async function fetchQuestionsFromGoogleSheets() {
  // This is where you'd normally fetch from Google Sheets
  // For now, we'll return the hardcoded questions
  return [
    { type: "text", text: "Write down the types of Sphere (sphere) that you are interested in." },
    { type: "text", text: "Write down the types of industries in which you are not interested at all." },
    { type: "text", text: "Write down your hobbies." },
    { type: "text", text: "Write down what you often do." },
    { type: "text", text: "Write down the qualities and abilities you like in yourself." },
    { type: "text", text: "Write down the intentions and abilities in yourself that you do not like." },
    { type: "text", text: "What business would you do for free?" },
    { type: "text", text: "What would you do if you had $100,000,000?" },
    {
      type: "text",
      text: "If you knew you were going to die in a year, what would you devote the rest of your time to doing?",
    },
    {
      type: "text",
      text: "If you knew that you would become the #1 professional in any profession you choose, which profession would you choose?",
    },
  ]
}

export async function GET() {
  try {
    const questions = await fetchQuestionsFromGoogleSheets()
    return NextResponse.json(questions)
  } catch (error) {
    console.error("Error fetching questions:", error)
    return NextResponse.json({ error: "Failed to fetch questions" }, { status: 500 })
  }
}

