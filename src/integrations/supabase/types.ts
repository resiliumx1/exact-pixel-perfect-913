export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      bookings: {
        Row: {
          admin_notes: string | null
          amount: number | null
          created_at: string | null
          customer_email: string
          customer_name: string
          customer_phone: string
          customer_whatsapp: string | null
          dropoff_location: string | null
          id: string
          num_guests: number | null
          pickup_location: string | null
          referral_source: string | null
          service_date: string
          service_time: string | null
          service_type: string
          special_requests: string | null
          status: string | null
          tour_id: string | null
          updated_at: string | null
        }
        Insert: {
          admin_notes?: string | null
          amount?: number | null
          created_at?: string | null
          customer_email: string
          customer_name: string
          customer_phone: string
          customer_whatsapp?: string | null
          dropoff_location?: string | null
          id?: string
          num_guests?: number | null
          pickup_location?: string | null
          referral_source?: string | null
          service_date: string
          service_time?: string | null
          service_type: string
          special_requests?: string | null
          status?: string | null
          tour_id?: string | null
          updated_at?: string | null
        }
        Update: {
          admin_notes?: string | null
          amount?: number | null
          created_at?: string | null
          customer_email?: string
          customer_name?: string
          customer_phone?: string
          customer_whatsapp?: string | null
          dropoff_location?: string | null
          id?: string
          num_guests?: number | null
          pickup_location?: string | null
          referral_source?: string | null
          service_date?: string
          service_time?: string | null
          service_type?: string
          special_requests?: string | null
          status?: string | null
          tour_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_tour_id_fkey"
            columns: ["tour_id"]
            isOneToOne: false
            referencedRelation: "tours"
            referencedColumns: ["id"]
          },
        ]
      }
      gallery_images: {
        Row: {
          alt_text: string | null
          caption: string | null
          category: string | null
          created_at: string | null
          display_order: number | null
          id: string
          image_url: string
          is_visible: boolean | null
        }
        Insert: {
          alt_text?: string | null
          caption?: string | null
          category?: string | null
          created_at?: string | null
          display_order?: number | null
          id?: string
          image_url: string
          is_visible?: boolean | null
        }
        Update: {
          alt_text?: string | null
          caption?: string | null
          category?: string | null
          created_at?: string | null
          display_order?: number | null
          id?: string
          image_url?: string
          is_visible?: boolean | null
        }
        Relationships: []
      }
      inquiries: {
        Row: {
          admin_notes: string | null
          created_at: string | null
          email: string
          id: string
          message: string
          name: string
          phone: string | null
          status: string | null
        }
        Insert: {
          admin_notes?: string | null
          created_at?: string | null
          email: string
          id?: string
          message: string
          name: string
          phone?: string | null
          status?: string | null
        }
        Update: {
          admin_notes?: string | null
          created_at?: string | null
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
          status?: string | null
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          id: string
          key: string
          updated_at: string | null
          value: string
        }
        Insert: {
          id?: string
          key: string
          updated_at?: string | null
          value: string
        }
        Update: {
          id?: string
          key?: string
          updated_at?: string | null
          value?: string
        }
        Relationships: []
      }
      taxi_routes: {
        Row: {
          created_at: string | null
          currency: string | null
          from_location: string
          id: string
          is_active: boolean | null
          price: number
          to_location: string
          vehicle_type: string
        }
        Insert: {
          created_at?: string | null
          currency?: string | null
          from_location: string
          id?: string
          is_active?: boolean | null
          price: number
          to_location: string
          vehicle_type: string
        }
        Update: {
          created_at?: string | null
          currency?: string | null
          from_location?: string
          id?: string
          is_active?: boolean | null
          price?: number
          to_location?: string
          vehicle_type?: string
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          country: string | null
          created_at: string | null
          customer_name: string
          display_order: number | null
          id: string
          is_visible: boolean | null
          quote: string
          rating: number | null
          tour_taken: string | null
        }
        Insert: {
          country?: string | null
          created_at?: string | null
          customer_name: string
          display_order?: number | null
          id?: string
          is_visible?: boolean | null
          quote: string
          rating?: number | null
          tour_taken?: string | null
        }
        Update: {
          country?: string | null
          created_at?: string | null
          customer_name?: string
          display_order?: number | null
          id?: string
          is_visible?: boolean | null
          quote?: string
          rating?: number | null
          tour_taken?: string | null
        }
        Relationships: []
      }
      tours: {
        Row: {
          category: string | null
          created_at: string | null
          currency: string | null
          description: string | null
          difficulty: string | null
          display_order: number | null
          duration_hours: number | null
          hero_image: string | null
          id: string
          images: string[] | null
          included: string[] | null
          is_featured: boolean | null
          is_published: boolean | null
          max_guests: number | null
          price: number | null
          rating: number | null
          review_count: number | null
          short_description: string | null
          slug: string
          title: string
          updated_at: string | null
          what_to_bring: string[] | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          currency?: string | null
          description?: string | null
          difficulty?: string | null
          display_order?: number | null
          duration_hours?: number | null
          hero_image?: string | null
          id?: string
          images?: string[] | null
          included?: string[] | null
          is_featured?: boolean | null
          is_published?: boolean | null
          max_guests?: number | null
          price?: number | null
          rating?: number | null
          review_count?: number | null
          short_description?: string | null
          slug: string
          title: string
          updated_at?: string | null
          what_to_bring?: string[] | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          currency?: string | null
          description?: string | null
          difficulty?: string | null
          display_order?: number | null
          duration_hours?: number | null
          hero_image?: string | null
          id?: string
          images?: string[] | null
          included?: string[] | null
          is_featured?: boolean | null
          is_published?: boolean | null
          max_guests?: number | null
          price?: number | null
          rating?: number | null
          review_count?: number | null
          short_description?: string | null
          slug?: string
          title?: string
          updated_at?: string | null
          what_to_bring?: string[] | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
