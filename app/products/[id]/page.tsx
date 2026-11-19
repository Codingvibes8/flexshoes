import { dbHelpers } from "@/lib/db/helpers"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link";
import { ProductPurchase } from "@/components/product-purchase"

type ProductPageProps = {
  params: Promise<{
    id: string
  }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params
  const { data: product, error } = await dbHelpers.getProductById(id)

  if (error || !product) {
    console.error("Error fetching product:", error)
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-40">
      <Link href={'/'} className={'text-gray-900 text-lg font-bold mb-16 rounded-lg hover:bg-gray-100 hover:text-gray-900'}>Back Home</Link>
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">

        <div className="flex justify-center">
          <Image
            alt={product.name}
            className="rounded-lg object-cover w-full max-w-md shadow-lg"
            height={600}
            src={product.imageUrl}
            style={{
              aspectRatio: "600/600",
              objectFit: "cover",
            }}
            width={600}
          />
        </div>
        <div className="flex flex-col justify-center space-y-4">
          <h1 className="text-4xl font-bold">{product.name}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">{product.brand}</p>
          <p className="text-xl">{product.description}</p>
          <div className="flex items-center space-x-4">
            <span className="text-3xl font-bold">
              ${product.salePrice ? product.salePrice.toFixed(2) : product.price.toFixed(2)}
            </span>
            {product.salePrice && (
              <span className="text-xl text-gray-500 line-through">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
          <ProductPurchase
            productId={product.id}
            sizes={product.sizes}
            colors={product.colors}
            inStock={product.stock > 0}
          />
        </div>
      </div>
    </div>
  )
}