export interface Products {
    id: number
    name: string
    price: string
    originalPrice?: string
    image: string[]
    category: string
    subcategory: string
    rating?: number
    reviews?: number
    isNew?: boolean
    isSale?: boolean
    featured?: boolean
    stock: number
    description: string
    features?: string[]
    sizes: string[]
    colors: string[]
    gallery?: string[]
    created_at: string
    updated_at: string
}

export const products: Products[] = [
     {
    id: 1,
    name: "Nike Air Max 270 Men's",
    description:
      "Iconic sneakers with Max Air cushioning for all-day comfort and modern style.",
    price: "149.99",
    category: "footwear",
    subcategory: "sneakers",
    image: ["/shoes.jpg"],
    sizes: ["8", "9", "10", "11", "12", "13"],
    colors: ["Black/White", "Midnight Navy", "Wolf Grey"],
    stock: 85,
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Adidas Originals Forum Low",
    description: "Classic 80s basketball silhouette reimagined for streetwear.",
    price: "119.99",
    category: "footwear",
    subcategory: "sneakers",
    image: ["/shoes.jpg"],
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: ["Cloud White", "Core Black", "Bold Blue"],
    stock: 60,
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },

  // Running
  {
    id: 3,
    name: "New Balance FuelCell Rebel v4",
    description:
      "Lightweight racing shoes with energy-return FuelCell midsole.",
    price: "159.99",
    category: "footwear",
    subcategory: "running",
    image: ["/shoes.jpg"],
    sizes: ["8", "9", "10", "11", "12"],
    colors: ["Electric Lime", "Blackout", "Deep Ocean"],
    stock: 45,
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },

  // Boots
  {
    id: 4,
    name: "Red Wing Iron Ranger Boot",
    description:
      "Heritage leather boots with Goodyear welt construction. Built to last.",
    price: "349.99",
    category: "footwear",
    subcategory: "boots",
    image: ["/shoes.jpg"],
    sizes: ["8", "9", "10", "11", "12"],
    colors: ["Amber Harness", "Charcoal", "Copper"],
    stock: 30,
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },

  // Formal
  {
    id: 4,
    name: "Johnston & Murphy Melton Oxford",
    description:
      "Premium leather dress shoes with cushioned insole for professional elegance.",
    price: "229.99",
    category: "footwear",
    subcategory: "formal",
    image: ["/shoes.jpg"],
    sizes: ["8", "8.5", "9", "9.5", "10", "10.5"],
    colors: ["Black", "Dark Brown", "Burgundy"],
    stock: 25,
    featured: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },

  // Sandals
  {
    id: 6,
    name: "Teva Hurricane XLT2",
    description:
      "Adventure-ready sandals with quick-dry webbing and rugged traction.",
    price: "79.99",
    category: "footwear",
    subcategory: "sandals",
    image: ["/shoes.jpg"],
    sizes: ["8", "9", "10", "11", "12"],
    colors: ["Earth Tone", "Black", "Navy"],
    stock: 70,
    featured: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },

  // Casual
  {
    id: 7,
    name: "Clarks Desert Trek",
    description:
      "Iconic moccasin-inspired casual shoes with crepe sole comfort.",
    price: "139.99",
    category: "footwear",
    subcategory: "casual",
    image: ["/shoes.jpg"],
    sizes: ["8", "9", "10", "11", "12"],
    colors: ["Beeswax Leather", "Dark Brown", "Black Suede"],
    stock: 50,
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

export function getProductById(id: number): Products | undefined {
    return products.find((product) => product.id === id)
}

export function getProductsByCategory(category: string): Products[] {
    if (category === "All") return products
    return products.filter((product) => product.category === category)
}
