"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft, ArrowRight, Copy, Video, Loader2 } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

type Step = 1 | 2 | 3
type Hook = {
  id: string
  text: string
  description: string
}
type Angle = {
  id: string
  title: string
  description: string
}

export default function TikTokGenerator() {
  const [currentStep, setCurrentStep] = useState<Step>(1)
  const [productInput, setProductInput] = useState("")
  const [productUrl, setProductUrl] = useState("")
  const [inputType, setInputType] = useState<"description" | "url">("description")
  const [hooks, setHooks] = useState<Hook[]>([])
  const [selectedHook, setSelectedHook] = useState<string>("")
  const [angles, setAngles] = useState<Angle[]>([])
  const [selectedAngle, setSelectedAngle] = useState<string>("")
  const [finalScript, setFinalScript] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleStep1Submit = async () => {
    if (!productInput.trim() && !productUrl.trim()) {
      toast({
        title: "Input Required",
        description: "Please provide either a product description or URL.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch("/api/generate-hooks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productInput: inputType === "description" ? productInput : "",
          productUrl: inputType === "url" ? productUrl : "",
        }),
      })

      if (!response.ok) throw new Error("Failed to generate hooks")

      const data = await response.json()
      setHooks(data.hooks)
      setCurrentStep(2)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate hooks. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleStep2Submit = async () => {
    if (!selectedHook) {
      toast({
        title: "Selection Required",
        description: "Please select a hook to continue.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch("/api/generate-angles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productInput: inputType === "description" ? productInput : "",
          productUrl: inputType === "url" ? productUrl : "",
          selectedHook,
        }),
      })

      if (!response.ok) throw new Error("Failed to generate angles")

      const data = await response.json()
      setAngles(data.angles)
      setCurrentStep(3)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate angles. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleStep3Submit = async () => {
    if (!selectedAngle) {
      toast({
        title: "Selection Required",
        description: "Please select an angle to generate the final script.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch("/api/generate-script", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productInput: inputType === "description" ? productInput : "",
          productUrl: inputType === "url" ? productUrl : "",
          selectedHook,
          selectedAngle,
        }),
      })

      if (!response.ok) throw new Error("Failed to generate script")

      const data = await response.json()
      setFinalScript(data.script)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate script. Please try again.",
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
      description: "Script copied to clipboard.",
    })
  }

  const resetGenerator = () => {
    setCurrentStep(1)
    setProductInput("")
    setProductUrl("")
    setHooks([])
    setSelectedHook("")
    setAngles([])
    setSelectedAngle("")
    setFinalScript("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-slate-50">
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
            <Video className="h-6 w-6 text-pink-600 mr-2" />
            <h1 className="text-2xl font-bold text-slate-900">TikTok Script Generator</h1>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    currentStep >= step ? "bg-pink-600 text-white" : "bg-slate-200 text-slate-600"
                  }`}
                >
                  {step}
                </div>
                {step < 3 && <div className={`w-12 h-1 mx-2 ${currentStep > step ? "bg-pink-600" : "bg-slate-200"}`} />}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="max-w-2xl mx-auto">
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Step 1: Product Details</CardTitle>
                <CardDescription>Provide information about your jewelry product to get started</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <RadioGroup
                  value={inputType}
                  onValueChange={(value: "description" | "url") => setInputType(value)}
                  className="flex space-x-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="description" id="description" />
                    <Label htmlFor="description">Product Description</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="url" id="url" />
                    <Label htmlFor="url">Product URL</Label>
                  </div>
                </RadioGroup>

                {inputType === "description" ? (
                  <div className="space-y-2">
                    <Label htmlFor="product-description">Product Description</Label>
                    <Textarea
                      id="product-description"
                      placeholder="Describe your jewelry product in detail (materials, style, target audience, unique features, etc.)"
                      value={productInput}
                      onChange={(e) => setProductInput(e.target.value)}
                      rows={6}
                    />
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label htmlFor="product-url">Product URL</Label>
                    <Input
                      id="product-url"
                      placeholder="https://example.com/product-page"
                      value={productUrl}
                      onChange={(e) => setProductUrl(e.target.value)}
                    />
                  </div>
                )}

                <Button
                  onClick={handleStep1Submit}
                  className="w-full bg-pink-600 hover:bg-pink-700"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Generating Hooks...
                    </>
                  ) : (
                    <>
                      Generate Hooks
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          )}

          {currentStep === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Step 2: Select Your Hook</CardTitle>
                <CardDescription>Choose the hook that best fits your content strategy</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup value={selectedHook} onValueChange={setSelectedHook}>
                  {hooks.map((hook) => (
                    <div key={hook.id} className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-slate-50">
                      <RadioGroupItem value={hook.id} id={hook.id} className="mt-1" />
                      <div className="flex-1">
                        <Label htmlFor={hook.id} className="font-medium cursor-pointer">
                          {hook.text}
                        </Label>
                        <p className="text-sm text-slate-600 mt-1">{hook.description}</p>
                      </div>
                    </div>
                  ))}
                </RadioGroup>

                <div className="flex space-x-3">
                  <Button variant="outline" onClick={() => setCurrentStep(1)} className="flex-1">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                  <Button
                    onClick={handleStep2Submit}
                    className="flex-1 bg-pink-600 hover:bg-pink-700"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Generating Angles...
                      </>
                    ) : (
                      <>
                        Generate Angles
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 3 && !finalScript && (
            <Card>
              <CardHeader>
                <CardTitle>Step 3: Choose Your Angle</CardTitle>
                <CardDescription>Select the narrative approach for your TikTok script</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup value={selectedAngle} onValueChange={setSelectedAngle}>
                  {angles.map((angle) => (
                    <div key={angle.id} className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-slate-50">
                      <RadioGroupItem value={angle.id} id={angle.id} className="mt-1" />
                      <div className="flex-1">
                        <Label htmlFor={angle.id} className="font-medium cursor-pointer">
                          {angle.title}
                        </Label>
                        <p className="text-sm text-slate-600 mt-1">{angle.description}</p>
                      </div>
                    </div>
                  ))}
                </RadioGroup>

                <div className="flex space-x-3">
                  <Button variant="outline" onClick={() => setCurrentStep(2)} className="flex-1">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                  <Button
                    onClick={handleStep3Submit}
                    className="flex-1 bg-pink-600 hover:bg-pink-700"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Generating Script...
                      </>
                    ) : (
                      "Generate Final Script"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 3 && finalScript && (
            <Card>
              <CardHeader>
                <CardTitle>Your TikTok Script is Ready!</CardTitle>
                <CardDescription>Copy your script and start creating your TikTok video</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-slate-50 p-6 rounded-lg">
                  <pre className="whitespace-pre-wrap text-sm leading-relaxed">{finalScript}</pre>
                </div>

                <div className="flex space-x-3">
                  <Button variant="outline" onClick={() => copyToClipboard(finalScript)} className="flex-1">
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Script
                  </Button>
                  <Button onClick={resetGenerator} className="flex-1 bg-pink-600 hover:bg-pink-700">
                    Create Another Script
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
