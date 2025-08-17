import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
const categories = [
    {
        name: "Men's Collection",
        description: "Discover premium footwear for the modern man",
        image: "/mens-shoes-collection.png",
        href: "/men",
    },
    {
        name: "Women's Collection",
        description: "Elegant and comfortable shoes for every occasion",
        image: "/placeholder.png",
        href: "/women",
    },
    {
        name: "Kids' Collection",
        description: "Fun and durable shoes for active kids",
        image: "/colorful-kids-footwear.png",
        href: "/kids",
    },
]

export function CategoriesSection() {
    return (
        <section className="py-12 sm:py-16 lg:py-20 xl:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
                <div className="text-center mb-8 sm:mb-12 lg:mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold font-sans text-foreground mb-4">Shop by Category</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Find the perfect shoes for every member of your family
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
                    {categories.map((category) => (
                        <Card
                            key={category.name}
                            className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                        >
                            <div className="relative overflow-hidden">
                                <Image
                                    src={category.image || "/placeholder.svg"}
                                    width={1300} height={900}
                                    alt={category.name}
                                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                <CardContent className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8 text-white">
                                    <h3 className="text-xl font-bold font-sans mb-2">{category.name}</h3>
                                    <p className="text-white/90 text-sm">{category.description}</p>
                                </CardContent>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
