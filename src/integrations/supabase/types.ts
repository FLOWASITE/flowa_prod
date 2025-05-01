export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      api_keys: {
        Row: {
          active: boolean
          created_at: string
          expires_at: string | null
          id: string
          key: string
          name: string
          permissions: string[]
          updated_at: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          expires_at?: string | null
          id?: string
          key: string
          name: string
          permissions?: string[]
          updated_at?: string
        }
        Update: {
          active?: boolean
          created_at?: string
          expires_at?: string | null
          id?: string
          key?: string
          name?: string
          permissions?: string[]
          updated_at?: string
        }
        Relationships: []
      }
      api_logs: {
        Row: {
          client_ip: string | null
          created_at: string
          endpoint: string
          id: string
          method: string
          request_body: Json | null
          response_body: Json | null
          status_code: number
          user_id: string | null
        }
        Insert: {
          client_ip?: string | null
          created_at?: string
          endpoint: string
          id?: string
          method: string
          request_body?: Json | null
          response_body?: Json | null
          status_code: number
          user_id?: string | null
        }
        Update: {
          client_ip?: string | null
          created_at?: string
          endpoint?: string
          id?: string
          method?: string
          request_body?: Json | null
          response_body?: Json | null
          status_code?: number
          user_id?: string | null
        }
        Relationships: []
      }
      brand_knowledge: {
        Row: {
          brand_id: string
          created_at: string
          guidelines: string | null
          history: string | null
          id: string
          product_benefits: string | null
          product_pricing: string | null
          target_audience: string | null
          updated_at: string
          values: string | null
        }
        Insert: {
          brand_id: string
          created_at?: string
          guidelines?: string | null
          history?: string | null
          id?: string
          product_benefits?: string | null
          product_pricing?: string | null
          target_audience?: string | null
          updated_at?: string
          values?: string | null
        }
        Update: {
          brand_id?: string
          created_at?: string
          guidelines?: string | null
          history?: string | null
          id?: string
          product_benefits?: string | null
          product_pricing?: string | null
          target_audience?: string | null
          updated_at?: string
          values?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "brand_knowledge_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: true
            referencedRelation: "brands"
            referencedColumns: ["id"]
          },
        ]
      }
      brands: {
        Row: {
          created_at: string
          description: string
          id: string
          logo: string | null
          name: string
          primary_color: string
          secondary_color: string
          themes: string[] | null
          tone: string | null
          updated_at: string
          website: string | null
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          logo?: string | null
          name: string
          primary_color?: string
          secondary_color?: string
          themes?: string[] | null
          tone?: string | null
          updated_at?: string
          website?: string | null
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          logo?: string | null
          name?: string
          primary_color?: string
          secondary_color?: string
          themes?: string[] | null
          tone?: string | null
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      chatbot_integrations: {
        Row: {
          brand_id: string | null
          created_at: string
          id: string
          platform: string
          settings: Json | null
          status: string
          updated_at: string
        }
        Insert: {
          brand_id?: string | null
          created_at?: string
          id?: string
          platform: string
          settings?: Json | null
          status: string
          updated_at?: string
        }
        Update: {
          brand_id?: string | null
          created_at?: string
          id?: string
          platform?: string
          settings?: Json | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "chatbot_integrations_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brands"
            referencedColumns: ["id"]
          },
        ]
      }
      content: {
        Row: {
          approved_at: string | null
          created_at: string
          engagement_comments: number | null
          engagement_likes: number | null
          engagement_shares: number | null
          id: string
          image_url: string | null
          platform: string
          published_at: string | null
          scheduled_at: string | null
          status: string
          text: string
          topic_id: string | null
          topic_title: string | null
          updated_at: string
          video_thumbnail: string | null
          video_url: string | null
        }
        Insert: {
          approved_at?: string | null
          created_at?: string
          engagement_comments?: number | null
          engagement_likes?: number | null
          engagement_shares?: number | null
          id?: string
          image_url?: string | null
          platform: string
          published_at?: string | null
          scheduled_at?: string | null
          status: string
          text: string
          topic_id?: string | null
          topic_title?: string | null
          updated_at?: string
          video_thumbnail?: string | null
          video_url?: string | null
        }
        Update: {
          approved_at?: string | null
          created_at?: string
          engagement_comments?: number | null
          engagement_likes?: number | null
          engagement_shares?: number | null
          id?: string
          image_url?: string | null
          platform?: string
          published_at?: string | null
          scheduled_at?: string | null
          status?: string
          text?: string
          topic_id?: string | null
          topic_title?: string | null
          updated_at?: string
          video_thumbnail?: string | null
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "content_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "content_topics"
            referencedColumns: ["id"]
          },
        ]
      }
      content_topics: {
        Row: {
          brand_id: string
          created_at: string
          created_by: string
          description: string | null
          id: string
          product_type_id: string | null
          status: string
          theme_type_id: string
          title: string
          updated_at: string
        }
        Insert: {
          brand_id: string
          created_at?: string
          created_by: string
          description?: string | null
          id?: string
          product_type_id?: string | null
          status: string
          theme_type_id: string
          title: string
          updated_at?: string
        }
        Update: {
          brand_id?: string
          created_at?: string
          created_by?: string
          description?: string | null
          id?: string
          product_type_id?: string | null
          status?: string
          theme_type_id?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      conversations: {
        Row: {
          brand_id: string | null
          created_at: string | null
          id: string
          title: string
          updated_at: string | null
        }
        Insert: {
          brand_id?: string | null
          created_at?: string | null
          id?: string
          title: string
          updated_at?: string | null
        }
        Update: {
          brand_id?: string | null
          created_at?: string | null
          id?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "conversations_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brands"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_contacts: {
        Row: {
          created_at: string
          customer_id: string | null
          email: string | null
          first_contact: string
          id: string
          last_contact: string
          name: string | null
          notes: string | null
          phone: string | null
          platform: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          customer_id?: string | null
          email?: string | null
          first_contact?: string
          id?: string
          last_contact?: string
          name?: string | null
          notes?: string | null
          phone?: string | null
          platform: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          customer_id?: string | null
          email?: string | null
          first_contact?: string
          id?: string
          last_contact?: string
          name?: string | null
          notes?: string | null
          phone?: string | null
          platform?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      crm_interactions: {
        Row: {
          contact_id: string
          created_at: string
          direction: string
          id: string
          message: string
          platform: string
        }
        Insert: {
          contact_id: string
          created_at?: string
          direction: string
          id?: string
          message: string
          platform: string
        }
        Update: {
          contact_id?: string
          created_at?: string
          direction?: string
          id?: string
          message?: string
          platform?: string
        }
        Relationships: [
          {
            foreignKeyName: "crm_interactions_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "crm_contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      files: {
        Row: {
          content: string | null
          created_at: string
          file_path: string | null
          file_size: number | null
          file_type: string
          id: string
          name: string
          platform_id: string
          tags: string[] | null
          updated_at: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          file_path?: string | null
          file_size?: number | null
          file_type: string
          id?: string
          name: string
          platform_id: string
          tags?: string[] | null
          updated_at?: string
        }
        Update: {
          content?: string | null
          created_at?: string
          file_path?: string | null
          file_size?: number | null
          file_type?: string
          id?: string
          name?: string
          platform_id?: string
          tags?: string[] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "files_platform_id_fkey"
            columns: ["platform_id"]
            isOneToOne: false
            referencedRelation: "platforms"
            referencedColumns: ["id"]
          },
        ]
      }
      platforms: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          platform_type: Database["public"]["Enums"]["platform_type"]
          topic_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          platform_type: Database["public"]["Enums"]["platform_type"]
          topic_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          platform_type?: Database["public"]["Enums"]["platform_type"]
          topic_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "platforms_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "topics"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          brand_id: string
          created_at: string
          description: string
          features: string[] | null
          id: string
          image: string | null
          name: string
          updated_at: string
        }
        Insert: {
          brand_id: string
          created_at?: string
          description: string
          features?: string[] | null
          id?: string
          image?: string | null
          name: string
          updated_at?: string
        }
        Update: {
          brand_id?: string
          created_at?: string
          description?: string
          features?: string[] | null
          id?: string
          image?: string | null
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "products_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brands"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          first_name: string | null
          id: string
          last_name: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          first_name?: string | null
          id: string
          last_name?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      qa_pairs: {
        Row: {
          answer: string
          brand_id: string
          created_at: string
          id: string
          question: string
          updated_at: string
        }
        Insert: {
          answer: string
          brand_id: string
          created_at?: string
          id?: string
          question: string
          updated_at?: string
        }
        Update: {
          answer?: string
          brand_id?: string
          created_at?: string
          id?: string
          question?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "qa_pairs_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brands"
            referencedColumns: ["id"]
          },
        ]
      }
      rate_limits: {
        Row: {
          api_key_id: string | null
          created_at: string
          endpoint: string
          id: string
          requests_per_minute: number
          updated_at: string
        }
        Insert: {
          api_key_id?: string | null
          created_at?: string
          endpoint: string
          id?: string
          requests_per_minute?: number
          updated_at?: string
        }
        Update: {
          api_key_id?: string | null
          created_at?: string
          endpoint?: string
          id?: string
          requests_per_minute?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "rate_limits_api_key_id_fkey"
            columns: ["api_key_id"]
            isOneToOne: false
            referencedRelation: "api_keys"
            referencedColumns: ["id"]
          },
        ]
      }
      scheduling_preferences: {
        Row: {
          best_times: Json | null
          brand_id: string | null
          created_at: string
          default_time_slots: string[] | null
          id: string
          posting_frequency: Json | null
          updated_at: string
        }
        Insert: {
          best_times?: Json | null
          brand_id?: string | null
          created_at?: string
          default_time_slots?: string[] | null
          id?: string
          posting_frequency?: Json | null
          updated_at?: string
        }
        Update: {
          best_times?: Json | null
          brand_id?: string | null
          created_at?: string
          default_time_slots?: string[] | null
          id?: string
          posting_frequency?: Json | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "scheduling_preferences_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brands"
            referencedColumns: ["id"]
          },
        ]
      }
      social_accounts: {
        Row: {
          access_token: string | null
          account_type: string
          brand_id: string | null
          created_at: string
          id: string
          name: string
          platform: string
          refresh_token: string | null
          status: string
          token_expires_at: string | null
          updated_at: string
          username: string | null
        }
        Insert: {
          access_token?: string | null
          account_type: string
          brand_id?: string | null
          created_at?: string
          id?: string
          name: string
          platform: string
          refresh_token?: string | null
          status: string
          token_expires_at?: string | null
          updated_at?: string
          username?: string | null
        }
        Update: {
          access_token?: string | null
          account_type?: string
          brand_id?: string | null
          created_at?: string
          id?: string
          name?: string
          platform?: string
          refresh_token?: string | null
          status?: string
          token_expires_at?: string | null
          updated_at?: string
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "social_accounts_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brands"
            referencedColumns: ["id"]
          },
        ]
      }
      topics: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["user_role"]
        }
        Returns: boolean
      }
    }
    Enums: {
      platform_type:
        | "facebook"
        | "instagram"
        | "tiktok"
        | "threads"
        | "linkedin"
      user_role: "admin" | "manager" | "staff"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      platform_type: ["facebook", "instagram", "tiktok", "threads", "linkedin"],
      user_role: ["admin", "manager", "staff"],
    },
  },
} as const
