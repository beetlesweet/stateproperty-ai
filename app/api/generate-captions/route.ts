import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { productUrl, contentType, additionalDetails } = await request.json()

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `You are an expert social media copywriter specializing in jewelry marketing for State Property.

Product URL: ${productUrl}
Content Type: ${contentType}
Additional Details: ${additionalDetails || "None provided"}

Create 3 distinct social media captions for this ${contentType}. Each caption should:

For REEL: Be concise, engaging, with strong hooks and trending language
For POST: Be more descriptive, storytelling-focused with emotional connection
For PRESS: Be professional, informative, and media-ready
For PACK SHOT: Focus on product features, quality, and visual appeal
For MOOD SHOT: Emphasize lifestyle, emotion, and aspirational messaging
For LOOKBOOK: Highlight styling, versatility, and fashion-forward appeal

Brand Voice: State Property - sophisticated yet accessible luxury, authentic storytelling, empowering messaging.

Each caption should:
- Be unique in tone and approach
- Include relevant hashtags
- Have a clear call-to-action
- Be optimized for engagement
- Maintain brand consistency

Return your response as a JSON array with this exact format:
["Caption 1 text here", "Caption 2 text here", "Caption 3 text here"]

Only return the JSON array, no additional text.`,
    })

    let captions
    try {
      captions = JSON.parse(text)
    } catch {
      // Fallback captions if parsing fails
      captions = [
        `✨ Elevate your everyday with pieces that speak to your soul. This ${contentType} captures the essence of modern luxury. #StateProperty #JewelryLover #EverydayLuxury`,
        `When jewelry becomes more than an accessory - it becomes part of your story. Discover the collection that's redefining elegance. #ModernJewelry #LuxuryLifestyle #StateProperty`,
        `The perfect piece doesn't just complete your look, it completes you. Experience the difference quality makes. #JewelryGoals #LuxuryJewelry #StateProperty`,
      ]
    }

    return NextResponse.json({ captions })
  } catch (error) {
    console.error("Error generating captions:", error)
    return NextResponse.json({ error: "Failed to generate captions" }, { status: 500 })
  }
}
