import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Eye, Filter, Grid, List } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { products } from "@/lib/products"
import Link from "next/link"
import Image from "next/image"

const allProducts = products

const categories = ["All", "Running", "Casual", "Basketball", "Walking", "Formal"]

export default function ProductsPage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="bg-muted/30 py-12 sm:py-16 lg:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
                    <h1 className="text-4xl md:text-5xl font-bold font-sans text-foreground mb-4">All Products</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl">
                        Explore our complete collection of premium footwear for every occasion
                    </p>
                </div>
            </div>

            {/* Filters and Controls */}
            <div className="py-6 sm:py-8 border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        {/* Categories */}
                        <div className="flex flex-wrap gap-2">
                            {categories.map((category) => (
                                <Badge
                                    key={category}
                                    variant={category === "All" ? "default" : "outline"}
                                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                                >
                                    {category}
                                </Badge>
                            ))}
                        </div>

                        {/* View Controls */}
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="icon">
                                <Filter className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="icon">
                                <Grid className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="icon">
                                <List className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Products Grid */}
            <div className="py-8 sm:py-12 lg:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                        {allProducts.map((product) => (
                            <Link key={product.id} href={`/products/${product.id}`}>
                                <Card className="group cursor-pointer overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                                    <div className="relative overflow-hidden">
                                        <Image
                                            src={product.image || "/placeholder.svg"}
                                            width={300}
                                            height={300}
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

                                        {/* Rating */}
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

                    {/* Load More */}
                    <div className="text-center mt-8 sm:mt-12">
                        <Button size="lg" variant="outline">
                            Load More Products
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
