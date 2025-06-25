import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { productInput, productUrl, selectedHook, selectedAngle } = await request.json()

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `You are an expert TikTok script writer specializing in jewelry marketing. Create a compelling 60-second TikTok script.

Product Information:
${productInput ? `Description: ${productInput}` : ""}
${productUrl ? `URL: ${productUrl}` : ""}

Selected Hook: "${selectedHook}"
Selected Angle: "${selectedAngle}"

Create a complete 60-second TikTok script that:
- Opens with the selected hook
- Develops the narrative using the selected angle
- Maintains fast pacing suitable for TikTok
- Uses natural, conversational language (avoid forced transitions like "but then")
- Includes visual cues and on-screen text suggestions
- Has a strong call-to-action
- Stays authentic and relatable
- Optimizes for viewer retention

Format the script with:
- Timestamps (0-5s, 5-15s, etc.)
- Voiceover text
- Visual cues in [brackets]
- On-screen text suggestions in {curly braces}

Brand Voice: State Property - sophisticated, accessible luxury with authentic storytelling.

Write the complete script now:`,
    })

    return NextResponse.json({ script: text })
  } catch (error) {
    console.error("Error generating script:", error)
    return NextResponse.json({ error: "Failed to generate script" }, { status: 500 })
  }
}
