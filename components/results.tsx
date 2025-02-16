"use client"

interface ResultsProps {
  onEmailResults: () => void
  profession: string
}

export function Results({ onEmailResults, profession }: ResultsProps) {
  return (
    <div className="w-full max-w-[400px] mx-auto space-y-4">
      <div className="bg-white rounded-[20px] p-6">
        <h2 className="text-center text-[#2D3047] text-2xl font-bold mb-4">Your Career Assessment Results</h2>
        <p className="text-center text-[#2D3047] text-lg mb-6">Based on your answers, your suggested profession is:</p>
        <p className="text-center text-[#2D3047] text-2xl font-bold mb-6">{profession}</p>
      </div>

      <div className="bg-[#D9D9D9] rounded-[20px] p-4 flex items-center justify-between">
        <span className="text-[#2D3047]">Send results to your email</span>
        <button
          onClick={onEmailResults}
          className="px-4 h-10 bg-[#93B7BE] text-white rounded-[10px] hover:bg-[#93B7BE]/90 transition-colors"
        >
          Send Email
        </button>
      </div>
    </div>
  )
}

