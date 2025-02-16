import { NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  try {
    const { answers } = await req.json()

    if (!answers || !Array.isArray(answers) || answers.length === 0) {
      return NextResponse.json({ error: "Invalid answers provided" }, { status: 400 })
    }

    const formattedAnswers = answers.map((a) => `Q: ${a.question}\nA: ${a.answer}`).join("\n\n")

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a career advisor. Based on the answers provided to a career assessment questionnaire, suggest a suitable profession. Provide a brief explanation for your suggestion.",
        },
        {
          role: "user",
          content: `Based on these answers to a career assessment, what profession would you suggest? Please provide a brief explanation for your suggestion.\n\n${formattedAnswers}`,
        },
      ],
    })

    const suggestedProfession = completion.choices[0].message.content

    if (!suggestedProfession) {
      throw new Error("No profession suggestion received from OpenAI")
    }

    return NextResponse.json({ profession: suggestedProfession })
  } catch (error) {
    console.error("Error processing answers:", error)
    return NextResponse.json({ error: "Failed to process answers" }, { status: 500 })
  }
}

