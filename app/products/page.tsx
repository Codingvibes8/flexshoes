import { Card, CardContent } from "@/components/ui/card"
import { dbHelpers } from "@/lib/db/helpers"
import Image from "next/image"
import Link from "next/link"
import {Button} from "@/components/ui/button";

export default async function ProductsPage() {
  const { data: products, error } = await dbHelpers.getProducts()

  if (error) {
    console.error("Error fetching products:", error)
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-8">All Products</h1>
        <p className="text-center">Could not load products. Please try again later.</p>
      </div>
    )
  }

  if (!products || products.length === 0) {
    return (
      <div className="container mx-auto px-4 py-40">
        <h1 className="text-4xl font-bold text-center mb-8">All Products</h1>
        <p className="text-center">No products available at the moment.</p>
      </div>
    )
  }
    console.log("--- Product Image URLs ---");
    products.forEach(product => {
        console.log(`Product: ${product.name}, URL: ${product.image_url}`);
    });
    console.log("---------------------------------");
  return (
    <div className="container mx-auto px-4 py-40">
        <Link href={'/'} className={'text-gray-900 text-lg font-bold mb-8'}>Back Home</Link>
      <h1 className="text-4xl font-bold text-center mb-8">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <Link href={`/products/${product.id}`} key={product.id} className="group">
            <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-0 relative">
                <Image
                  alt={product.name}
                  className="object-cover w-full h-64 transition-transform duration-300 group-hover:scale-105"
                  height="400"
                  src={product.image_url}
                  style={{
                    aspectRatio: "400/400",
                    objectFit: "cover",
                  }}
                  width="400"
                />
                  {/* Quick Add Button */}
                  <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button className="w-full bg-primary hover:bg-primary/90">Quick Add</Button>
                  </div>
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
        ))}
      </div>
        {/* Load More */}
        <div className="text-center mt-8 sm:mt-12">
            <Button size="lg" variant="outline">
                Load More Products
            </Button>
        </div>
    </div>
  )
}