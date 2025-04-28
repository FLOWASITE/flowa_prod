
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      brands: {
        Row: {
          id: string
          name: string
          description: string
          logo: string | null
          website: string | null
          primary_color: string
          secondary_color: string
          tone: string | null
          themes: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          logo?: string | null
          website?: string | null
          primary_color: string
          secondary_color: string
          tone?: string | null
          themes?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          logo?: string | null
          website?: string | null
          primary_color?: string
          secondary_color?: string
          tone?: string | null
          themes?: string[] | null
          created_at?: string
          updated_at?: string
        }
      }
      brand_knowledge: {
        Row: {
          id: string
          brand_id: string
          history: string | null
          values: string | null
          target_audience: string | null
          guidelines: string | null
          product_pricing: string | null
          product_benefits: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          brand_id: string
          history?: string | null
          values?: string | null
          target_audience?: string | null
          guidelines?: string | null
          product_pricing?: string | null
          product_benefits?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          brand_id?: string
          history?: string | null
          values?: string | null
          target_audience?: string | null
          guidelines?: string | null
          product_pricing?: string | null
          product_benefits?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: string
          brand_id: string
          name: string
          description: string
          features: string[] | null
          image: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          brand_id: string
          name: string
          description: string
          features?: string[] | null
          image?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          brand_id?: string
          name?: string
          description?: string
          features?: string[] | null
          image?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      qa_pairs: {
        Row: {
          id: string
          brand_id: string
          question: string
          answer: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          brand_id: string
          question: string
          answer: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          brand_id?: string
          question?: string
          answer?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
