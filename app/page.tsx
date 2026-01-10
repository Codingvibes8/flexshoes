
import {HeroSection}  from "@/components/hero-section"
import FeaturedProducts  from "@/components/featured-products"
import CategoriesSection from "@/components/categories-section"
import  TestimonialsSection  from "@/components/testimonials-section"


export default function HomePage() {
  return (
    <main className="min-h-screen">

      <HeroSection />
      <FeaturedProducts />
      <CategoriesSection />
      <TestimonialsSection />

    </main>
  )
}
