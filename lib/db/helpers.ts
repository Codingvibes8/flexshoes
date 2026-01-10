import { supabase } from '../supabase'
import { ProductCategory, ProductFilters } from './types'

export const dbHelpers = {
  // Products
  async getProducts(filters?: ProductFilters) {
    let query = supabase.from('products').select('*')
    
    if (filters?.category) {
      query = query.eq('category', filters.category)
    }
    
    if (filters?.featured !== undefined) {
      query = query.eq('featured', filters.featured)
    }
    
    if (filters?.limit) {
      query = query.limit(filters.limit)
    }
    
    if (filters?.offset) {
      query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1)
    }
    
    return query
  },

  async getProductById(id: string) {
    return supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single()
  },

  async getFeaturedProducts(limit = 8) {
    return supabase
      .from('products')
      .select('*')
      .eq('featured', true)
      .limit(limit)
  },

  async getProductsByCategory(category: ProductCategory, limit?: number) {
    let query = supabase
      .from('products')
      .select('*')
      .eq('category', category)
    
    if (limit) {
      query = query.limit(limit)
    }
    
    return query
  },

  async getSaleProducts(limit?: number) {
    let query = supabase
      .from('products')
      .select('*')
      .not('sale_price', 'is', null)
    
    if (limit) {
      query = query.limit(limit)
    }
    
    return query
  },

  // Categories
  async getCategories() {
    return supabase
      .from('categories')
      .select('*')
      .order('name')
  },

  async getCategoryBySlug(slug: string) {
    return supabase
      .from('categories')
      .select('*')
      .eq('slug', slug)
      .single()
  },

  // Search
  async searchProducts(searchTerm: string, limit = 20) {
    return supabase
      .from('products')
      .select('*')
      .or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,brand.ilike.%${searchTerm}%`)
      .limit(limit)
  }
}
