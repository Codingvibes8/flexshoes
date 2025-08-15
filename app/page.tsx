import  Navigation from "@/components/navigation"
import  HeroSection  from "@/components/hero-section"
import  FeaturedProducts  from "@/components/featured-products"
import  CategoriesSection  from "@/components/categories-section"
import  TestimonialsSection  from "@/components/testimonials-section"
import  Footer  from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <FeaturedProducts />
      <CategoriesSection />
      <TestimonialsSection />
      <Footer />
    </main>
  )
}
