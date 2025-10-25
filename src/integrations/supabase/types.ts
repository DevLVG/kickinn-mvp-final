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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      executor_profiles: {
        Row: {
          active_projects_count: number
          average_delivery_speed: number | null
          bio: string | null
          completed_projects: number
          created_at: string
          id: string
          portfolio_url: string | null
          reputation_score: number | null
          skills: string[]
          specializations: string[] | null
          total_projects: number
          updated_at: string
          user_id: string
        }
        Insert: {
          active_projects_count?: number
          average_delivery_speed?: number | null
          bio?: string | null
          completed_projects?: number
          created_at?: string
          id?: string
          portfolio_url?: string | null
          reputation_score?: number | null
          skills?: string[]
          specializations?: string[] | null
          total_projects?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          active_projects_count?: number
          average_delivery_speed?: number | null
          bio?: string | null
          completed_projects?: number
          created_at?: string
          id?: string
          portfolio_url?: string | null
          reputation_score?: number | null
          skills?: string[]
          specializations?: string[] | null
          total_projects?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      idea_clarifications: {
        Row: {
          answers: Json | null
          created_at: string
          expires_at: string
          id: string
          idea_id: string
          questions: Json
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          answers?: Json | null
          created_at?: string
          expires_at?: string
          id?: string
          idea_id: string
          questions: Json
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          answers?: Json | null
          created_at?: string
          expires_at?: string
          id?: string
          idea_id?: string
          questions?: Json
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      opportunity_fit_scores: {
        Row: {
          created_at: string
          delivery_speed_explanation: string | null
          delivery_speed_score: number
          delivery_speed_weight: number
          executor_id: string
          experience_explanation: string | null
          experience_score: number
          experience_weight: number
          id: string
          opportunity_id: string
          overall_score: number
          skills_match_explanation: string | null
          skills_match_score: number
          skills_match_weight: number
          success_rate_explanation: string | null
          success_rate_score: number
          success_rate_weight: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          delivery_speed_explanation?: string | null
          delivery_speed_score: number
          delivery_speed_weight?: number
          executor_id: string
          experience_explanation?: string | null
          experience_score: number
          experience_weight?: number
          id?: string
          opportunity_id: string
          overall_score: number
          skills_match_explanation?: string | null
          skills_match_score: number
          skills_match_weight?: number
          success_rate_explanation?: string | null
          success_rate_score: number
          success_rate_weight?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          delivery_speed_explanation?: string | null
          delivery_speed_score?: number
          delivery_speed_weight?: number
          executor_id?: string
          experience_explanation?: string | null
          experience_score?: number
          experience_weight?: number
          id?: string
          opportunity_id?: string
          overall_score?: number
          skills_match_explanation?: string | null
          skills_match_score?: number
          skills_match_weight?: number
          success_rate_explanation?: string | null
          success_rate_score?: number
          success_rate_weight?: number
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      wallet_connection_logs: {
        Row: {
          action: string
          created_at: string
          error_message: string | null
          id: string
          ip_address: string | null
          user_agent: string | null
          user_id: string
          wallet_address: string
          wallet_type: string
        }
        Insert: {
          action: string
          created_at?: string
          error_message?: string | null
          id?: string
          ip_address?: string | null
          user_agent?: string | null
          user_id: string
          wallet_address: string
          wallet_type: string
        }
        Update: {
          action?: string
          created_at?: string
          error_message?: string | null
          id?: string
          ip_address?: string | null
          user_agent?: string | null
          user_id?: string
          wallet_address?: string
          wallet_type?: string
        }
        Relationships: []
      }
      wallets: {
        Row: {
          connected_at: string
          id: string
          user_id: string
          wallet_address: string
          wallet_type: string
        }
        Insert: {
          connected_at?: string
          id?: string
          user_id: string
          wallet_address: string
          wallet_type: string
        }
        Update: {
          connected_at?: string
          id?: string
          user_id?: string
          wallet_address?: string
          wallet_type?: string
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
      app_role: "ideator" | "executor" | "investor" | "buyer"
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
    Enums: {
      app_role: ["ideator", "executor", "investor", "buyer"],
    },
  },
} as const
