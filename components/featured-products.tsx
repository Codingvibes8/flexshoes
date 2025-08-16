import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Eye } from "lucide-react"
import Link from "next/link"
import { products } from "@/lib/products"
import Image from "next/image"



const featuredProducts = products.slice(0, 4)

export function FeaturedProducts() {
    return (
        <section className="py-12 sm:py-16 lg:py-20 xl:py-24 bg-muted/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
                <div className="text-center mb-8 sm:mb-12 lg:mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold font-sans text-foreground mb-4">Featured Products</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Discover our handpicked selection of premium footwear designed for style and performance
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                    {featuredProducts.map((product) => (
                        <Link key={product.id} href={`/products/${product.id}`}>
                            <Card className="group cursor-pointer overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                                <div className="relative overflow-hidden">
                                    <Image
                                        src={product.image || "/placeholder.svg"}
                                        alt={product.name}
                                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                                    />

                                    {/* Badges */}
                                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                                        {product.isNew && (
                                            <span className="bg-accent text-accent-foreground px-2 py-1 text-xs font-medium rounded">
                                                NEW
                                            </span>
                                        )}
                                        {product.isSale && (
                                            <span className="bg-primary text-primary-foreground px-2 py-1 text-xs font-medium rounded">
                                               SALE
                                           </span>
                                        )}
                                    </div>

                                    {/* Hover Actions */}
                                    <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <Button size="icon" variant="secondary" className="w-8 h-8">
                                            <Heart className="w-4 h-4" />
                                        </Button>
                                        <Button size="icon" variant="secondary" className="w-8 h-8">
                                            <Eye className="w-4 h-4" />
                                        </Button>
                                    </div>

                                    {/* Quick Add Button */}
                                    <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <Button className="w-full bg-primary hover:bg-primary/90">Quick Add</Button>
                                    </div>
                                </div>

                                <CardContent className="p-3 sm:p-4 lg:p-5">
                                    <div className="text-sm text-muted-foreground mb-1">{product.category}</div>
                                    <h3 className="font-semibold text-foreground mb-2">{product.name}</h3>
                                    <div className="flex items-center gap-1 mb-2">
                                        <div className="flex text-yellow-400">
                                            {"★".repeat(Math.floor(product.rating))}
                                            {"☆".repeat(5 - Math.floor(product.rating))}
                                        </div>
                                        <span className="text-sm text-muted-foreground">({product.reviews})</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg font-bold text-primary">{product.price}</span>
                                        {product.originalPrice && (
                                            <span className="text-sm text-muted-foreground line-through">{product.originalPrice}</span>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
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
