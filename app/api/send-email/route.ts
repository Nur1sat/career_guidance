import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(req: Request) {
  try {
    const { email, profession, answers } = await req.json()

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: process.env.EMAIL_SECURE === "true",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    // Prepare the email content
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Your Career Assessment Results",
      text: `
        Based on your answers, your suggested profession is: ${profession}

        Your answers:
        ${answers.map((a) => `Q: ${a.question}\nA: ${a.answer}`).join("\n\n")}
      `,
      html: `
        <h1>Your Career Assessment Results</h1>
        <p>Based on your answers, your suggested profession is: <strong>${profession}</strong></p>
        <h2>Your answers:</h2>
        ${answers.map((a) => `<p><strong>Q: ${a.question}</strong><br>A: ${a.answer}</p>`).join("")}
      `,
    }

    // Send the email
    await transporter.sendMail(mailOptions)

    return NextResponse.json({ message: "Email sent successfully" })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}

