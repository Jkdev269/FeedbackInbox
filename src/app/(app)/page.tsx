"use client"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { useRef } from "react"
import messages from "@/messages.json"

const Page = () => {
  const autoplayRef = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  )

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Hero Section */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 sm:px-6 md:px-12 lg:px-24 py-12">
        <section className="text-center mb-12 md:mb-16 max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 pb-2">
            Dive into the world of Anonymous Conversations
          </h1>
          <p className="mt-4 md:mt-6 text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">
            Explore Mystery Message - Where your identity remains a secret and your thoughts roam free
          </p>
          <div className="mt-8 md:mt-10">
            <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-full font-medium shadow-lg transition-all duration-300 mr-4 transform hover:scale-105">
              Get Started
            </button>
            <button className="px-6 py-3 bg-transparent border border-purple-400 hover:bg-purple-900/20 rounded-full font-medium transition-all duration-300 transform hover:scale-105">
              Learn More
            </button>
          </div>
        </section>

        {/* Featured Messages Carousel */}
        <div className="w-full max-w-4xl mb-16">
          <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center">
            <span className="border-b-2 border-purple-500 pb-2">Featured Messages</span>
          </h2>
          <Carousel
            plugins={[autoplayRef.current]}
            className="w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto"
            opts={{
              loop: true,
              align: "center",
            }}
          >
            <CarouselContent>
              {messages.map((message, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card className="border border-purple-500/30 bg-slate-800/50 backdrop-blur-sm shadow-xl hover:shadow-purple-500/20 transition-all duration-300 transform hover:scale-105">
                      <CardHeader className="text-lg md:text-xl font-semibold text-purple-300">
                        {message.titile || "Anonymous Message"}
                      </CardHeader>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <span className="text-base sm:text-lg md:text-xl font-medium text-white">{message.content}</span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="bg-purple-600 hover:bg-purple-700 border-none shadow-lg left-0 sm:-left-4 md:-left-8" />
            <CarouselNext className="bg-purple-600 hover:bg-purple-700 border-none shadow-lg right-0 sm:-right-4 md:-right-8" />
          </Carousel>
        </div>

        {/* Features Section */}
        <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center w-full">
          <span className="border-b-2 border-purple-500 pb-2">Why Mystery Message?</span>
        </h2>
        <section className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
          <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-purple-500/50 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/10 backdrop-blur-sm">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 w-14 h-14 rounded-full flex items-center justify-center mb-5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl md:text-2xl font-semibold mb-3">Anonymous</h3>
            <p className="text-slate-300">Your identity is always protected. Share thoughts freely without revealing who you are.</p>
          </div>
          
          <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-purple-500/50 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/10 backdrop-blur-sm">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 w-14 h-14 rounded-full flex items-center justify-center mb-5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-xl md:text-2xl font-semibold mb-3">Connect</h3>
            <p className="text-slate-300">Engage with others in a space free from judgment and social pressure.</p>
          </div>
          
          <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-purple-500/50 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/10 backdrop-blur-sm">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 w-14 h-14 rounded-full flex items-center justify-center mb-5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="text-xl md:text-2xl font-semibold mb-3">Create</h3>
            <p className="text-slate-300">Express yourself without limits. Start conversations that matter to you.</p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full max-w-4xl bg-gradient-to-r from-purple-900/50 to-pink-900/50 p-8 rounded-2xl border border-purple-500/30 mb-16 backdrop-blur-sm">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to join the conversation?</h2>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">Sign up today and experience a new way of connecting with people around the world.</p>
            <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-full font-medium shadow-lg transition-all duration-300 transform hover:scale-105">
              Create Your Account
            </button>
          </div>
        </section>
      </main>
      
      
    </div>
  )
}

export default Page