import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
export function HeroSection() {
    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src=""
                    width={1300}
                    height={900}
                    alt="FlexShoes Hero"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
                <h1 className="text-5xl md:text-7xl font-bold font-sans mb-6 animate-fade-in-up">
                    Step Into
                    <span className="block text-accent">Excellence</span>
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-white/90 animate-fade-in-up animation-delay-200">
                    Discover premium footwear that combines style, comfort, and performance
                </p>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center animate-fade-in-up animation-delay-400 px-2 sm:px-0">
                    <Link href="/products">
                        <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                            Shop Now
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </Link>
                    <Link href="/products">
                        <Button
                            size="lg"
                            variant="outline"
                            className="border-white text-white hover:bg-white hover:text-foreground bg-transparent"
                        >
                            View Collection
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
                    <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
                </div>
            </div>
        </section>
    )
}
