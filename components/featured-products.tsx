import { Card, CardContent } from "@/components/ui/card"
import { dbHelpers } from "@/lib/db/helpers"
import Image from "next/image"
import Link from "next/link"
import {Button} from "@/components/ui/button";

export default async function FeaturedProducts() {
  const { data: products, error } = await dbHelpers.getFeaturedProducts(8)

  if (error) {
    console.error("Error fetching featured products:", error)
    return <p>Could not load featured products.</p>
  }

  if (!products || products.length === 0) {
    return <p>No featured products available.</p>
  }

  const placeholderImage = "/placeholder.jpg";

  console.log("--- Featured Product Image URLs ---");
  products.forEach(product => {
    console.log(`Product: ${product.name}, URL: ${product.image_url}`);
  });
  console.log("---------------------------------");


  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => {
            const imageUrl = product.image_url || placeholderImage;

            return (
                <Link href={`/products/${product.id}`} key={product.id} className="group">
                  <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
                    <CardContent className="p-0">
                      <Image
                          alt={product.name}
                          className="object-cover w-full h-64 transition-transform duration-300 group-hover:scale-105"
                          height="400"
                          src={imageUrl}
                          style={{
                            aspectRatio: "400/400",
                            objectFit: "cover",
                          }}
                          width="400"
                      />

                      <div className="p-4">
                        <h3 className="text-lg font-semibold">{product.name}</h3>
                        <p className="text-sm text-gray-500">{product.brand}</p>
                        <div className="flex items-center justify-between mt-2">
                        <span className="text-lg font-bold">
                          ${product.sale_price ? product.sale_price.toFixed(2) : product.price.toFixed(2)}
                        </span>
                          {product.sale_price && (
                              <span className="text-sm text-gray-500 line-through">
                            ${product.price.toFixed(2)}
                          </span>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
            )
          })}
        </div>
        <div className="text-center mt-8 sm:mt-12 lg:mt-16">
          <Link href="/products">
            <Button size="lg" variant="outline">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}