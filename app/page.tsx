import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Video, MessageSquare, Sparkles } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="h-8 w-8 text-blue-600 mr-2" />
            <h1 className="text-4xl font-bold text-slate-900">State Property AI Apps</h1>
          </div>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Streamline your content creation with our suite of AI-powered tools designed for modern marketing
          </p>
        </div>

        {/* App Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* TikTok Script Generator */}
          <Card className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
            <CardHeader className="pb-4">
              <div className="flex items-center mb-2">
                <Video className="h-6 w-6 text-pink-600 mr-2" />
                <CardTitle className="text-xl">TikTok Script Generator</CardTitle>
              </div>
              <CardDescription className="text-base">
                Generate engaging TikTok scripts with our 3-step AI-powered workflow. From product input to final script
                in minutes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm text-slate-600">
                  <div className="w-6 h-6 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center text-xs font-semibold mr-3">
                    1
                  </div>
                  Input product details or URL
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <div className="w-6 h-6 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center text-xs font-semibold mr-3">
                    2
                  </div>
                  Select from AI-suggested hooks
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <div className="w-6 h-6 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center text-xs font-semibold mr-3">
                    3
                  </div>
                  Choose angle and generate script
                </div>
              </div>
              <Link href="/tiktok-generator">
                <Button className="w-full bg-pink-600 hover:bg-pink-700">Start Creating Scripts</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Social Media Copy Generator */}
          <Card className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
            <CardHeader className="pb-4">
              <div className="flex items-center mb-2">
                <MessageSquare className="h-6 w-6 text-blue-600 mr-2" />
                <CardTitle className="text-xl">Social Media Copy Generator</CardTitle>
              </div>
              <CardDescription className="text-base">
                Create compelling social media captions for various content types. Get 3 unique options instantly.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm text-slate-600">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  Paste product URL
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  Select content type (Reel, Post, Press, etc.)
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  Get 3 distinct caption options
                </div>
              </div>
              <Link href="/social-media-generator">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Generate Captions</Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold text-slate-900 mb-8">Why Choose State Property AI Apps?</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">AI-Powered</h3>
              <p className="text-sm text-slate-600">
                Advanced AI algorithms ensure high-quality, engaging content every time
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Video className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Brand Consistent</h3>
              <p className="text-sm text-slate-600">
                Maintains your brand voice and style across all generated content
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <MessageSquare className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Time Saving</h3>
              <p className="text-sm text-slate-600">Generate professional content in minutes, not hours</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
