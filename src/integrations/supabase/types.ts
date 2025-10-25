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
      chat_messages: {
        Row: {
          attachments: Json | null
          content: string
          created_at: string
          id: string
          reactions: Json | null
          user_id: string
          venture_id: string
        }
        Insert: {
          attachments?: Json | null
          content: string
          created_at?: string
          id?: string
          reactions?: Json | null
          user_id: string
          venture_id: string
        }
        Update: {
          attachments?: Json | null
          content?: string
          created_at?: string
          id?: string
          reactions?: Json | null
          user_id?: string
          venture_id?: string
        }
        Relationships: []
      }
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
      investment_logs: {
        Row: {
          action: string
          created_at: string
          details: Json | null
          id: string
          investment_id: string
        }
        Insert: {
          action: string
          created_at?: string
          details?: Json | null
          id?: string
          investment_id: string
        }
        Update: {
          action?: string
          created_at?: string
          details?: Json | null
          id?: string
          investment_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "investment_logs_investment_id_fkey"
            columns: ["investment_id"]
            isOneToOne: false
            referencedRelation: "investments"
            referencedColumns: ["id"]
          },
        ]
      }
      investments: {
        Row: {
          amount_usdt: number
          completed_at: string | null
          created_at: string
          deal_id: string
          id: string
          investor_id: string
          kyc_verified: boolean
          status: string
          terms_accepted: boolean
          terms_accepted_at: string | null
          token_price: number
          tokens_received: number
          transaction_hash: string | null
          updated_at: string
          venture_id: string
          wallet_address: string
        }
        Insert: {
          amount_usdt: number
          completed_at?: string | null
          created_at?: string
          deal_id: string
          id?: string
          investor_id: string
          kyc_verified?: boolean
          status?: string
          terms_accepted?: boolean
          terms_accepted_at?: string | null
          token_price: number
          tokens_received: number
          transaction_hash?: string | null
          updated_at?: string
          venture_id: string
          wallet_address: string
        }
        Update: {
          amount_usdt?: number
          completed_at?: string | null
          created_at?: string
          deal_id?: string
          id?: string
          investor_id?: string
          kyc_verified?: boolean
          status?: string
          terms_accepted?: boolean
          terms_accepted_at?: string | null
          token_price?: number
          tokens_received?: number
          transaction_hash?: string | null
          updated_at?: string
          venture_id?: string
          wallet_address?: string
        }
        Relationships: []
      }
      notification_preferences: {
        Row: {
          chat_mentions: boolean
          email_notifications: boolean
          id: string
          investment_updates: boolean
          milestone_updates: boolean
          push_notifications: boolean
          updated_at: string
          user_id: string
          venture_updates: boolean
        }
        Insert: {
          chat_mentions?: boolean
          email_notifications?: boolean
          id?: string
          investment_updates?: boolean
          milestone_updates?: boolean
          push_notifications?: boolean
          updated_at?: string
          user_id: string
          venture_updates?: boolean
        }
        Update: {
          chat_mentions?: boolean
          email_notifications?: boolean
          id?: string
          investment_updates?: boolean
          milestone_updates?: boolean
          push_notifications?: boolean
          updated_at?: string
          user_id?: string
          venture_updates?: boolean
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string
          data: Json | null
          id: string
          link: string | null
          message: string
          read: boolean
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          data?: Json | null
          id?: string
          link?: string | null
          message: string
          read?: boolean
          title: string
          type: string
          user_id: string
        }
        Update: {
          created_at?: string
          data?: Json | null
          id?: string
          link?: string | null
          message?: string
          read?: boolean
          title?: string
          type?: string
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
      tasks: {
        Row: {
          assignee_id: string | null
          attachments_count: number
          blocked: boolean
          blocker_reason: string | null
          comments_count: number
          created_at: string
          created_by: string
          description: string | null
          due_date: string | null
          id: string
          priority: string
          status: string
          title: string
          updated_at: string
          venture_id: string
        }
        Insert: {
          assignee_id?: string | null
          attachments_count?: number
          blocked?: boolean
          blocker_reason?: string | null
          comments_count?: number
          created_at?: string
          created_by: string
          description?: string | null
          due_date?: string | null
          id?: string
          priority?: string
          status?: string
          title: string
          updated_at?: string
          venture_id: string
        }
        Update: {
          assignee_id?: string | null
          attachments_count?: number
          blocked?: boolean
          blocker_reason?: string | null
          comments_count?: number
          created_at?: string
          created_by?: string
          description?: string | null
          due_date?: string | null
          id?: string
          priority?: string
          status?: string
          title?: string
          updated_at?: string
          venture_id?: string
        }
        Relationships: []
      }
      token_balances: {
        Row: {
          claimable: number
          claimed: number
          id: string
          token_symbol: string
          total_allocated: number
          updated_at: string
          user_id: string
          venture_id: string
          vested: number
          wallet_address: string | null
        }
        Insert: {
          claimable?: number
          claimed?: number
          id?: string
          token_symbol: string
          total_allocated?: number
          updated_at?: string
          user_id: string
          venture_id: string
          vested?: number
          wallet_address?: string | null
        }
        Update: {
          claimable?: number
          claimed?: number
          id?: string
          token_symbol?: string
          total_allocated?: number
          updated_at?: string
          user_id?: string
          venture_id?: string
          vested?: number
          wallet_address?: string | null
        }
        Relationships: []
      }
      token_transactions: {
        Row: {
          amount: number
          completed_at: string | null
          created_at: string
          gas_fee: number | null
          id: string
          status: string
          token_symbol: string
          transaction_hash: string | null
          transaction_type: string
          user_id: string
          venture_id: string
          wallet_address: string
        }
        Insert: {
          amount: number
          completed_at?: string | null
          created_at?: string
          gas_fee?: number | null
          id?: string
          status?: string
          token_symbol: string
          transaction_hash?: string | null
          transaction_type: string
          user_id: string
          venture_id: string
          wallet_address: string
        }
        Update: {
          amount?: number
          completed_at?: string | null
          created_at?: string
          gas_fee?: number | null
          id?: string
          status?: string
          token_symbol?: string
          transaction_hash?: string | null
          transaction_type?: string
          user_id?: string
          venture_id?: string
          wallet_address?: string
        }
        Relationships: []
      }
      user_presence: {
        Row: {
          id: string
          last_seen: string
          status: string
          updated_at: string
          user_id: string
          venture_id: string
        }
        Insert: {
          id?: string
          last_seen?: string
          status?: string
          updated_at?: string
          user_id: string
          venture_id: string
        }
        Update: {
          id?: string
          last_seen?: string
          status?: string
          updated_at?: string
          user_id?: string
          venture_id?: string
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
