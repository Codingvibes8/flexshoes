import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Heart, Share2, Star, ShoppingCart, Truck, Shield, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getProductById } from "@/lib/products"

interface ProductPageProps {
    params: {
        id: string
    }
}

export default function ProductPage({ params }: ProductPageProps) {
    const product = getProductById(Number.parseInt(params.id))

    if (!product) {
        notFound()
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Navigation */}
            <div className="border-b">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-4">
                    <Link
                        href="/products"
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Products
                    </Link>
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8 lg:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Product Images */}
                    <div className="space-y-4">
                        <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-50">
                            <Image
                                src={product.image || "/placeholder.svg"}
                                alt={product.name}
                                fill
                                className="object-cover"
                                priority
                            />
                            {product.isNew && <Badge className="absolute top-4 left-4 bg-green-500 hover:bg-green-600">NEW</Badge>}
                            {product.isSale && <Badge className="absolute top-4 left-4 bg-red-500 hover:bg-red-600">SALE</Badge>}
                        </div>

                        {/* Gallery Thumbnails */}
                        <div className="grid grid-cols-4 gap-2">
                            {product.gallery.map((image, index) => (
                                <div
                                    key={index}
                                    className="aspect-square relative overflow-hidden rounded-md bg-gray-50 cursor-pointer hover:opacity-75 transition-opacity"
                                >
                                    <Image
                                        src={image || "/placeholder.svg"}
                                        alt={`${product.name} view ${index + 1}`}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="space-y-6">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Badge variant="secondary">{product.category}</Badge>
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`h-4 w-4 ${
                                                i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                            }`}
                                        />
                                    ))}
                                    <span className="text-sm text-muted-foreground ml-1">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                                </div>
                            </div>

                            <h1 className="text-3xl lg:text-4xl font-bold font-sans mb-4">{product.name}</h1>

                            <div className="flex items-center gap-3 mb-6">
                                <span className="text-3xl font-bold text-primary">{product.price}</span>
                                {product.originalPrice && (
                                    <span className="text-xl text-muted-foreground line-through">{product.originalPrice}</span>
                                )}
                            </div>
                        </div>

                        <p className="text-muted-foreground leading-relaxed">{product.description}</p>

                        {/* Size Selection */}
                        <div>
                            <h3 className="font-semibold mb-3">Size</h3>
                            <div className="grid grid-cols-6 gap-2">
                                {product.sizes.map((size) => (
                                    <Button
                                        key={size}
                                        variant="outline"
                                        className="aspect-square p-0 hover:bg-primary hover:text-primary-foreground bg-transparent"
                                    >
                                        {size}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        {/* Color Selection */}
                        <div>
                            <h3 className="font-semibold mb-3">Color</h3>
                            <div className="flex flex-wrap gap-2">
                                {product.colors.map((color) => (
                                    <Button
                                        key={color}
                                        variant="outline"
                                        className="hover:bg-primary hover:text-primary-foreground bg-transparent"
                                    >
                                        {color}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 pt-4">
                            <Button size="lg" className="flex-1">
                                <ShoppingCart className="h-5 w-5 mr-2" />
                                Add to Cart
                            </Button>
                            <Button size="lg" variant="outline">
                                <Heart className="h-5 w-5" />
                            </Button>
                            <Button size="lg" variant="outline">
                                <Share2 className="h-5 w-5" />
                            </Button>
                        </div>

                        {/* Features */}
                        <div className="border-t pt-6">
                            <h3 className="font-semibold mb-4">Key Features</h3>
                            <ul className="space-y-2">
                                {product.features.map((feature, index) => (
                                    <li key={index} className="flex items-center gap-2 text-muted-foreground">
                                        <div className="h-1.5 w-1.5 bg-primary rounded-full" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Shipping & Returns */}
                        <div className="border-t pt-6 space-y-4">
                            <div className="flex items-center gap-3">
                                <Truck className="h-5 w-5 text-primary" />
                                <div>
                                    <p className="font-medium">Free Shipping</p>
                                    <p className="text-sm text-muted-foreground">On orders over $75</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <RotateCcw className="h-5 w-5 text-primary" />
                                <div>
                                    <p className="font-medium">30-Day Returns</p>
                                    <p className="text-sm text-muted-foreground">Easy returns & exchanges</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Shield className="h-5 w-5 text-primary" />
                                <div>
                                    <p className="font-medium">Quality Guarantee</p>
                                    <p className="text-sm text-muted-foreground">Premium materials & craftsmanship</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
