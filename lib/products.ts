export interface Products {
    id: number
    name: string
    price: string
    originalPrice?: string
    image: string
    category: string
    rating: number
    reviews: number
    isNew?: boolean
    isSale?: boolean
    description: string
    features: string[]
    sizes: string[]
    colors: string[]
    gallery: string[]
}

export const products: Products[] = [
    {
        id: 1,
        name: "FlexRun Pro",
        price: "$129.99",
        originalPrice: "$159.99",
        image: "/flex-trainers.jpg",
        category: "Running",
        rating: 4.8,
        reviews: 124,
        isSale: true,
        description:
            "Experience ultimate comfort and performance with our FlexRun Pro running shoes. Engineered with advanced cushioning technology and breathable mesh upper for your longest runs.",
        features: [
            "Advanced cushioning technology",
            "Breathable mesh upper",
            "Lightweight design",
            "Durable rubber outsole",
            "Moisture-wicking lining",
        ],
        sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"],
        colors: ["Black/White", "Navy/Blue", "Gray/Orange"],
        gallery: [
            "/running-shoes-modern.png",
            "/running-shoe-side-view.png",
            "/running-shoe-sole.png",
            "/running-shoe-back.png",
        ],
    },
    {
        id: 2,
        name: "Urban Walker",
        price: "$89.99",
        image: "/white-trainers.jpg",
        category: "Casual",
        rating: 4.6,
        reviews: 89,
        isNew: true,
        description:
            "Step into style with our Urban Walker casual sneakers. Perfect for everyday wear with premium materials and modern design that complements any outfit.",
        features: [
            "Premium leather upper",
            "Comfortable foam insole",
            "Flexible rubber sole",
            "Classic design",
            "Easy slip-on style",
        ],
        sizes: ["6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11"],
        colors: ["White", "Black", "Gray", "Navy"],
        gallery: [
            "/casual-sneakers-white.png",
            "/white-casual-sneaker-side.png",
            "/white-casual-sneaker-top.png",
            "/white-casual-sneaker-back.png",
        ],
    },
    {
        id: 3,
        name: "Court Master",
        price: "$149.99",
        image: "/basketball.jpg",
        category: "Basketball",
        rating: 4.9,
        reviews: 156,
        description:
            "Dominate the court with Court Master basketball shoes. High-top design provides ankle support while responsive cushioning delivers explosive performance.",
        features: [
            "High-top ankle support",
            "Responsive cushioning",
            "Durable leather construction",
            "Non-slip rubber outsole",
            "Padded collar and tongue",
        ],
        sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12", "13"],
        colors: ["Black/Red", "White/Blue", "Gray/Yellow"],
        gallery: [
            "/athletic-basketball-shoes.png",
            "/basketball-shoe-profile.png",
            "/basketball-shoe-sole.png",
            "/basketball-shoe-detail.png",
        ],
    },
    {
        id: 4,
        name: "Trail Explorer",
        price: "$119.99",
        image: "/trail-running.jpg",
        category: "Running",
        rating: 4.7,
        reviews: 92,
        description:
            "Conquer any terrain with Trail Explorer shoes. Built for outdoor adventures with rugged construction and superior grip on all surfaces.",
        features: [
            "All-terrain grip",
            "Waterproof construction",
            "Reinforced toe protection",
            "Breathable mesh panels",
            "Shock-absorbing midsole",
        ],
        sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"],
        colors: ["Brown/Orange", "Black/Green", "Gray/Blue"],
        gallery: [
            "/trail-running-shoes.png",
            "/trail-running-shoe-side.png",
            "/placeholder.svg?height=400&width=400",
            "/placeholder.svg?height=400&width=400",
        ],
    },
    {
        id: 5,
        name: "Street Style",
        price: "$79.99",
        originalPrice: "$99.99",
        image: "/street-style-sneakers.jpg",
        category: "Casual",
        rating: 4.5,
        reviews: 67,
        isSale: true,
        description:
            "Make a statement with Street Style sneakers. Contemporary design meets comfort in these versatile shoes perfect for urban adventures.",
        features: [
            "Contemporary design",
            "Comfortable fit",
            "Versatile styling",
            "Quality materials",
            "Durable construction",
        ],
        sizes: ["6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11"],
        colors: ["Black", "White", "Red", "Blue"],
        gallery: [
            "/street-style-sneakers.png",
            "/placeholder.svg?height=400&width=400",
            "/placeholder.svg?height=400&width=400",
            "/placeholder.svg?height=400&width=400",
        ],
    },
    {
        id: 6,
        name: "Comfort Walk",
        price: "$69.99",
        image: "/comfort-walk.jpg?height=300&width=300",
        category: "Walking",
        rating: 4.4,
        reviews: 78,
        description:
            "Experience all-day comfort with Comfort Walk shoes. Designed for extended wear with superior cushioning and support.",
        features: ["All-day comfort", "Superior cushioning", "Arch support", "Breathable materials", "Lightweight design"],
        sizes: ["6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5"],
        colors: ["Black", "Brown", "Navy", "Gray"],
        gallery: [
            "/placeholder.svg?height=400&width=400",
            "/placeholder.svg?height=400&width=400",
            "/placeholder.svg?height=400&width=400",
            "/placeholder.svg?height=400&width=400",
        ],
    },
    {
        id: 7,
        name: "Business Elite",
        price: "$199.99",
        image: "/formal-brown-shoes.jpg?height=300&width=300",
        category: "Formal",
        rating: 4.8,
        reviews: 45,
        isNew: true,
        description:
            "Elevate your professional wardrobe with Business Elite formal shoes. Crafted from premium leather with classic styling for the modern professional.",
        features: [
            "Premium leather construction",
            "Classic formal styling",
            "Comfortable insole",
            "Professional appearance",
            "Durable leather sole",
        ],
        sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"],
        colors: ["Black", "Brown", "Burgundy"],
        gallery: [
            "/placeholder.svg?height=400&width=400",
            "/placeholder.svg?height=400&width=400",
            "/placeholder.svg?height=400&width=400",
            "/placeholder.svg?height=400&width=400",
        ],
    },
    {
        id: 8,
        name: "Flex Trainer",
        price: "$109.99",
        image: "/flex-trainers.jpg?height=300&width=300",
        category: "Running",
        rating: 4.6,
        reviews: 103,
        description:
            "Versatile Flex Trainer shoes perfect for cross-training and gym workouts. Designed for multi-directional movement and stability.",
        features: [
            "Multi-directional support",
            "Stable platform",
            "Flexible design",
            "Breathable upper",
            "Non-marking sole",
        ],
        sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"],
        colors: ["Black/White", "Gray/Blue", "Navy/Orange"],
        gallery: [
            "/placeholder.svg?height=400&width=400",
            "/placeholder.svg?height=400&width=400",
            "/placeholder.svg?height=400&width=400",
            "/placeholder.svg?height=400&width=400",
        ],
    },
]

export function getProductById(id: number): Products | undefined {
    return products.find((product) => product.id === id)
}

export function getProductsByCategory(category: string): Products[] {
    if (category === "All") return products
    return products.filter((product) => product.category === category)
}
