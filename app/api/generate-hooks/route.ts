import { generateText } from "ai"
import { anthropic } from "@ai-sdk/anthropic"
import { NextResponse } from "next/server"

const HOOK_LIBRARY = [
  {
    id: "1",
    text: "POV: You're about to see the jewelry piece that changes everything",
    description: "Creates anticipation and positions the product as transformative",
  },
  {
    id: "2",
    text: "This is why everyone's obsessed with [product type]",
    description: "Leverages social proof and trending appeal",
  },
  {
    id: "3",
    text: "I wasn't going to buy it, but then I saw this detail...",
    description: "Creates curiosity and highlights unique features",
  },
  {
    id: "4",
    text: "The jewelry piece that made me feel like main character",
    description: "Appeals to self-empowerment and confidence",
  },
  {
    id: "5",
    text: "When you find jewelry that matches your energy",
    description: "Focuses on personal connection and vibe matching",
  },
]

export async function POST(request: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: "ANTHROPIC_API_KEY is not set" },
      { status: 500 }
    )
  }
  try {
    const { productInput, productUrl } = await request.json()

    const { text } = await generateText({
      model: anthropic("claude-3-opus"),
      prompt: `You are an expert TikTok content strategist specializing in jewelry marketing. 

Product Information:
${productInput ? `Description: ${productInput}` : ""}
${productUrl ? `URL: ${productUrl}` : ""}

Available Hook Library:
${HOOK_LIBRARY.map((hook) => `- "${hook.text}" (${hook.description})`).join("\n")}

Based on the product information provided, select the 5 most relevant and effective hooks from the library above. Consider:
- Product type and features
- Target audience appeal
- Viral potential on TikTok
- Emotional connection

Return your response as a JSON array with this exact format:
[
  {
    "id": "hook_id",
    "text": "hook text",
    "description": "why this hook works for this product"
  }
]

Only return the JSON array, no additional text.`,
    })

    let hooks
    try {
      hooks = JSON.parse(text)
    } catch {
      // Fallback to default hooks if parsing fails
      hooks = HOOK_LIBRARY.slice(0, 5)
    }

    return NextResponse.json({ hooks })
  } catch (error) {
    console.error("Error generating hooks:", error)
    return NextResponse.json({ error: "Failed to generate hooks" }, { status: 500 })
  }
}
