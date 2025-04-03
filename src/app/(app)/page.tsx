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
import messages from "@/messages.json"

const Page = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12">
        <section className="text-center mb-8 md:mb-16 max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Dive into the world of Anonymous Conversations
          </h1>
          <p className="mt-3 md:mt-6 text-base md:text-xl text-slate-300">
            Explore Mystery Message - Where your identity remains a secret
          </p>
          {/* <div className="mt-6 md:mt-8">
            <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-full font-medium shadow-lg transition-all duration-300 mr-4">
              Get Started
            </button>
            <button className="px-6 py-3 bg-transparent border border-purple-400 hover:bg-purple-900/20 rounded-full font-medium transition-all duration-300">
              Learn More
            </button>
          </div> */}
        </section>

        <div className="w-full max-w-4xl mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center">Featured Messages</h2>
          <Carousel
            plugins={[Autoplay({ delay: 3000 })]}
            className="w-full max-w-md mx-auto"
            opts={{
              loop: true,
            }}
          >
            <CarouselContent>
              {messages.map((message, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card className="border border-purple-500/30 bg-slate-800/50 backdrop-blur-sm shadow-xl hover:shadow-purple-500/10 transition-all duration-300">
                      <CardHeader className="text-lg font-semibold text-purple-300">
                        {message.titile || "Anonymous Message"}
                      </CardHeader>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <span className="text-lg font-medium text-white">{message.content}</span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="bg-purple-600 hover:bg-purple-700 border-none" />
            <CarouselNext className="bg-purple-600 hover:bg-purple-700 border-none" />
          </Carousel>
        </div>

        <section className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 hover:border-purple-500/50 transition-all duration-300">
            <div className="bg-purple-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Anonymous</h3>
            <p className="text-slate-300">Your identity is always protected. Share thoughts freely without revealing who you are.</p>
          </div>
          
          <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 hover:border-purple-500/50 transition-all duration-300">
            <div className="bg-purple-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Connect</h3>
            <p className="text-slate-300">Engage with others in a space free from judgment and social pressure.</p>
          </div>
          
          <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 hover:border-purple-500/50 transition-all duration-300">
            <div className="bg-purple-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Create</h3>
            <p className="text-slate-300">Express yourself without limits. Start conversations that matter to you.</p>
          </div>
        </section>
      </main>
      
      {/* <footer className="bg-slate-900 text-center p-6 border-t border-slate-800">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-purple-400 font-semibold">Mystery Message</p>
            <p className="text-sm text-slate-400">© 2025 All rights reserved</p>
          </div>
          
          <div className="flex space-x-4">
            <a href="#" className="text-slate-400 hover:text-purple-400 transition-colors">Privacy</a>
            <a href="#" className="text-slate-400 hover:text-purple-400 transition-colors">Terms</a>
            <a href="#" className="text-slate-400 hover:text-purple-400 transition-colors">Contact</a>
          </div>
        </div>
      </footer> */}
    </div>
  )
}

export default Page