import { Card, CardContent } from "@/components/ui/card"
import { dbHelpers } from "@/lib/db/helpers"
import Image from "next/image"
import Link from "next/link"

export { CategoriesSection }

export default async function CategoriesSection() {
  const { data: categories, error } = await dbHelpers.getCategories()

  if (error) {
    console.error("Error fetching categories:", error)
    return <p>Could not load categories.</p>
  }

  if (!categories || categories.length === 0) {
    return <p>No categories available.</p>
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20 xl:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-sans text-foreground mb-4">Shop by Category</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find the perfect shoes for every style and occasion
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 sm:gap-8 lg:gap-6">
          {categories.map((category) => (
            <Link key={category.id} href={`/products?category=${category.slug}`}>
              <Card className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative overflow-hidden">
                  <Image
                    src={category.imageUrl || "/placeholder.svg"}
                    alt={category.name}
                    width={400}
                    height={300}
                    className="w-full h-48 sm:h-56 lg:h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  <CardContent className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                    <h3 className="text-lg font-bold font-sans mb-2">{category.name}</h3>
                    <p className="text-white/90 text-sm">{category.description}</p>
                  </CardContent>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
