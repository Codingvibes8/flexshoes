export type Database = {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          name: string
          description: string
          price: number
          image_url: string
          category: string
          brand: string
          sizes: string[]
          colors: string[]
          stock: number
          featured: boolean
          sale_price: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          price: number
          image_url: string
          category: string
          brand: string
          sizes: string[]
          colors: string[]
          stock: number
          featured?: boolean
          sale_price?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          price?: number
          image_url?: string
          category?: string
          brand?: string
          sizes?: string[]
          colors?: string[]
          stock?: number
          featured?: boolean
          sale_price?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          image_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          image_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          image_url?: string | null
          created_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string
          total_amount: number
          status: string
          shipping_address: any
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          total_amount: number
          status: string
          shipping_address: any
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          total_amount?: number
          status?: string
          shipping_address?: any
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

export enum ProductCategory {
  Sneakers = "Sneakers",
  Boots = "Boots",
  Sandals = "Sandals",
}

export type ProductFilters = {
  category?: ProductCategory;
  featured?: boolean;
  limit?: number;
  offset?: number;
};
