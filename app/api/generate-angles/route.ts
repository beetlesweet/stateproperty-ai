import { generateText } from "ai"
import { anthropic } from "@ai-sdk/anthropic"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { productInput, productUrl, selectedHook } = await request.json()

    const { text } = await generateText({
      model: anthropic("claude-3-opus"),
      prompt: `You are an expert TikTok content strategist specializing in jewelry marketing.

Product Information:
${productInput ? `Description: ${productInput}` : ""}
${productUrl ? `URL: ${productUrl}` : ""}

Selected Hook: "${selectedHook}"

Generate 5 distinct angle variations for how this hook can be developed into a compelling TikTok video. Each angle should represent a different narrative approach or creative interpretation.

Consider these angle types:
- Emotional storytelling
- Educational/informative
- Behind-the-scenes
- Lifestyle/aspirational
- Problem-solution
- Unboxing/reveal
- Comparison/before-after
- Trend-based

Return your response as a JSON array with this exact format:
[
  {
    "id": "angle_1",
    "title": "Angle Title",
    "description": "Detailed description of how this angle would work with the selected hook"
  }
]

Make each angle unique and tailored to jewelry marketing on TikTok. Only return the JSON array, no additional text.`,
    })

    let angles
    try {
      angles = JSON.parse(text)
    } catch {
      // Fallback angles if parsing fails
      angles = [
        {
          id: "angle_1",
          title: "Emotional Transformation",
          description: "Show how wearing this jewelry transforms confidence and mood",
        },
        {
          id: "angle_2",
          title: "Styling Showcase",
          description: "Demonstrate multiple ways to style the piece for different occasions",
        },
        {
          id: "angle_3",
          title: "Quality Spotlight",
          description: "Highlight the craftsmanship and premium materials up close",
        },
        {
          id: "angle_4",
          title: "Lifestyle Integration",
          description: "Show the jewelry as part of an aspirational daily routine",
        },
        {
          id: "angle_5",
          title: "Unboxing Experience",
          description: "Create anticipation through a satisfying unboxing reveal",
        },
      ]
    }

    return NextResponse.json({ angles })
  } catch (error) {
    console.error("Error generating angles:", error)
    return NextResponse.json({ error: "Failed to generate angles" }, { status: 500 })
  }
}
