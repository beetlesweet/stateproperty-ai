"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Copy, MessageSquare, Loader2 } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

type ContentType = "reel" | "post" | "press" | "pack-shot" | "mood-shot" | "lookbook"

export default function SocialMediaGenerator() {
  const [productUrl, setProductUrl] = useState("")
  const [contentType, setContentType] = useState<ContentType>("post")
  const [additionalDetails, setAdditionalDetails] = useState("")
  const [captions, setCaptions] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const contentTypeOptions = [
    { value: "reel", label: "Reel" },
    { value: "post", label: "Post" },
    { value: "press", label: "Press" },
    { value: "pack-shot", label: "Pack Shot" },
    { value: "mood-shot", label: "Mood Shot" },
    { value: "lookbook", label: "Lookbook" },
  ]

  const handleGenerate = async () => {
    if (!productUrl.trim()) {
      toast({
        title: "URL Required",
        description: "Please provide a product URL to generate captions.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch("/api/generate-captions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productUrl,
          contentType,
          additionalDetails,
        }),
      })

      if (!response.ok) throw new Error("Failed to generate captions")

      const data = await response.json()
      setCaptions(data.captions)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate captions. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied!",
      description: "Caption copied to clipboard.",
    })
  }

  const resetGenerator = () => {
    setProductUrl("")
    setContentType("post")
    setAdditionalDetails("")
    setCaptions([])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm" className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <div className="flex items-center">
            <MessageSquare className="h-6 w-6 text-blue-600 mr-2" />
            <h1 className="text-2xl font-bold text-slate-900">Social Media Copy Generator</h1>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          {!captions.length ? (
            <Card>
              <CardHeader>
                <CardTitle>Generate Social Media Captions</CardTitle>
                <CardDescription>Create compelling captions for your social media content in seconds</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="product-url">Product URL *</Label>
                  <Input
                    id="product-url"
                    placeholder="https://example.com/product-page"
                    value={productUrl}
                    onChange={(e) => setProductUrl(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content-type">Content Type</Label>
                  <Select value={contentType} onValueChange={(value: ContentType) => setContentType(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select content type" />
                    </SelectTrigger>
                    <SelectContent>
                      {contentTypeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additional-details">Additional Details (Optional)</Label>
                  <Textarea
                    id="additional-details"
                    placeholder="Add any specific keywords, tone preferences, call-to-actions, or unique selling points..."
                    value={additionalDetails}
                    onChange={(e) => setAdditionalDetails(e.target.value)}
                    rows={4}
                  />
                </div>

                <Button onClick={handleGenerate} className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Generating Captions...
                    </>
                  ) : (
                    "Generate 3 Caption Options"
                  )}
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Social Media Captions</CardTitle>
                  <CardDescription>Choose from these 3 unique caption options</CardDescription>
                </CardHeader>
              </Card>

              {captions.map((caption, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">Option {index + 1}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-slate-50 p-4 rounded-lg mb-4">
                      <p className="whitespace-pre-wrap text-sm leading-relaxed">{caption}</p>
                    </div>
                    <Button variant="outline" onClick={() => copyToClipboard(caption)} className="w-full">
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Caption
                    </Button>
                  </CardContent>
                </Card>
              ))}

              <Button onClick={resetGenerator} className="w-full bg-blue-600 hover:bg-blue-700">
                Generate New Captions
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
