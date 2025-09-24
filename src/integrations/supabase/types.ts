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
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      admin_logs: {
        Row: {
          action: string
          created_at: string | null
          details: string | null
          id: string
        }
        Insert: {
          action: string
          created_at?: string | null
          details?: string | null
          id?: string
        }
        Update: {
          action?: string
          created_at?: string | null
          details?: string | null
          id?: string
        }
        Relationships: []
      }
      admin_users: {
        Row: {
          created_at: string
          email: string
          id: string
          is_active: boolean
          last_login: string | null
          password_hash: string
          updated_at: string
          username: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          is_active?: boolean
          last_login?: string | null
          password_hash: string
          updated_at?: string
          username: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          is_active?: boolean
          last_login?: string | null
          password_hash?: string
          updated_at?: string
          username?: string
        }
        Relationships: []
      }
      audio_drafts: {
        Row: {
          auto_saved_at: string | null
          created_at: string | null
          description: string | null
          id: string
          patient_id: string
          recording_state: Json | null
          segment_count: number | null
          session_id: string
          title: string | null
          total_duration_seconds: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          auto_saved_at?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          patient_id: string
          recording_state?: Json | null
          segment_count?: number | null
          session_id: string
          title?: string | null
          total_duration_seconds?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          auto_saved_at?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          patient_id?: string
          recording_state?: Json | null
          segment_count?: number | null
          session_id?: string
          title?: string | null
          total_duration_seconds?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      audit_logs: {
        Row: {
          created_at: string
          event_data: Json | null
          event_type: string
          id: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          event_data?: Json | null
          event_type: string
          id?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          event_data?: Json | null
          event_type?: string
          id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      automated_responses: {
        Row: {
          conditions: Json | null
          created_at: string | null
          created_by: string | null
          id: string
          is_active: boolean | null
          priority: number | null
          response_text: string
          response_type: string
          trigger_keywords: string[]
          updated_at: string | null
          usage_count: number | null
        }
        Insert: {
          conditions?: Json | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_active?: boolean | null
          priority?: number | null
          response_text: string
          response_type?: string
          trigger_keywords: string[]
          updated_at?: string | null
          usage_count?: number | null
        }
        Update: {
          conditions?: Json | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_active?: boolean | null
          priority?: number | null
          response_text?: string
          response_type?: string
          trigger_keywords?: string[]
          updated_at?: string | null
          usage_count?: number | null
        }
        Relationships: []
      }
      availability_slots: {
        Row: {
          created_at: string | null
          day_of_week: number
          end_time: string
          id: string
          interval_between_sessions: number | null
          is_available: boolean | null
          session_duration: number | null
          start_time: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          day_of_week: number
          end_time: string
          id?: string
          interval_between_sessions?: number | null
          is_available?: boolean | null
          session_duration?: number | null
          start_time: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          day_of_week?: number
          end_time?: string
          id?: string
          interval_between_sessions?: number | null
          is_available?: boolean | null
          session_duration?: number | null
          start_time?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      blocked_slots: {
        Row: {
          created_at: string | null
          end_datetime: string
          id: string
          is_recurring: boolean | null
          reason: string | null
          recurrence_pattern: Json | null
          start_datetime: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          end_datetime: string
          id?: string
          is_recurring?: boolean | null
          reason?: string | null
          recurrence_pattern?: Json | null
          start_datetime: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          end_datetime?: string
          id?: string
          is_recurring?: boolean | null
          reason?: string | null
          recurrence_pattern?: Json | null
          start_datetime?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      booking_notifications: {
        Row: {
          created_at: string | null
          expires_at: string | null
          id: string
          message: string | null
          metadata: Json | null
          notification_type: string
          patient_id: string
          session_id: string
          status: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          message?: string | null
          metadata?: Json | null
          notification_type?: string
          patient_id: string
          session_id: string
          status?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          message?: string | null
          metadata?: Json | null
          notification_type?: string
          patient_id?: string
          session_id?: string
          status?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "booking_notifications_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "booking_notifications_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      chatbot_conversations: {
        Row: {
          contact_name: string | null
          contact_phone: string
          context: Json | null
          created_at: string | null
          external_id: string
          id: string
          metadata: Json | null
          platform: string
          psychologist_id: string | null
          status: string
          updated_at: string | null
        }
        Insert: {
          contact_name?: string | null
          contact_phone: string
          context?: Json | null
          created_at?: string | null
          external_id: string
          id?: string
          metadata?: Json | null
          platform?: string
          psychologist_id?: string | null
          status?: string
          updated_at?: string | null
        }
        Update: {
          contact_name?: string | null
          contact_phone?: string
          context?: Json | null
          created_at?: string | null
          external_id?: string
          id?: string
          metadata?: Json | null
          platform?: string
          psychologist_id?: string | null
          status?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      chatbot_messages: {
        Row: {
          content: string | null
          conversation_id: string
          created_at: string | null
          external_message_id: string | null
          id: string
          message_type: string
          metadata: Json | null
          original_content: Json | null
          processed_by: string | null
          processing_time_ms: number | null
          sender_type: string
        }
        Insert: {
          content?: string | null
          conversation_id: string
          created_at?: string | null
          external_message_id?: string | null
          id?: string
          message_type: string
          metadata?: Json | null
          original_content?: Json | null
          processed_by?: string | null
          processing_time_ms?: number | null
          sender_type: string
        }
        Update: {
          content?: string | null
          conversation_id?: string
          created_at?: string | null
          external_message_id?: string | null
          id?: string
          message_type?: string
          metadata?: Json | null
          original_content?: Json | null
          processed_by?: string | null
          processing_time_ms?: number | null
          sender_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "chatbot_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "chatbot_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      chatbot_metrics: {
        Row: {
          aggregation_period: string
          created_at: string | null
          id: string
          metadata: Json | null
          metric_type: string
          metric_value: number
          period_end: string
          period_start: string
        }
        Insert: {
          aggregation_period: string
          created_at?: string | null
          id?: string
          metadata?: Json | null
          metric_type: string
          metric_value: number
          period_end: string
          period_start: string
        }
        Update: {
          aggregation_period?: string
          created_at?: string | null
          id?: string
          metadata?: Json | null
          metric_type?: string
          metric_value?: number
          period_end?: string
          period_start?: string
        }
        Relationships: []
      }
      chatbot_settings: {
        Row: {
          created_at: string | null
          id: string
          psychologist_id: string
          setting_key: string
          setting_value: Json
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          psychologist_id: string
          setting_key: string
          setting_value: Json
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          psychologist_id?: string
          setting_key?: string
          setting_value?: Json
          updated_at?: string | null
        }
        Relationships: []
      }
      compliance_metrics: {
        Row: {
          calculated_at: string | null
          details: Json | null
          id: string
          metric_type: string
          metric_value: number
          period_end: string
          period_start: string
        }
        Insert: {
          calculated_at?: string | null
          details?: Json | null
          id?: string
          metric_type: string
          metric_value: number
          period_end: string
          period_start: string
        }
        Update: {
          calculated_at?: string | null
          details?: Json | null
          id?: string
          metric_type?: string
          metric_value?: number
          period_end?: string
          period_start?: string
        }
        Relationships: []
      }
      coupons: {
        Row: {
          code: string
          created_at: string | null
          created_by: string | null
          current_uses: number | null
          discount_amount: number | null
          discount_percent: number | null
          id: string
          is_active: boolean | null
          max_uses: number | null
          metadata: Json | null
          updated_at: string | null
          valid_from: string | null
          valid_until: string | null
        }
        Insert: {
          code: string
          created_at?: string | null
          created_by?: string | null
          current_uses?: number | null
          discount_amount?: number | null
          discount_percent?: number | null
          id?: string
          is_active?: boolean | null
          max_uses?: number | null
          metadata?: Json | null
          updated_at?: string | null
          valid_from?: string | null
          valid_until?: string | null
        }
        Update: {
          code?: string
          created_at?: string | null
          created_by?: string | null
          current_uses?: number | null
          discount_amount?: number | null
          discount_percent?: number | null
          id?: string
          is_active?: boolean | null
          max_uses?: number | null
          metadata?: Json | null
          updated_at?: string | null
          valid_from?: string | null
          valid_until?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "coupons_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      form_assignments: {
        Row: {
          assigned_at: string | null
          assigned_by: string | null
          completed_at: string | null
          form_id: string | null
          id: string
          is_required: boolean | null
          patient_id: string | null
          required_before_session: boolean | null
        }
        Insert: {
          assigned_at?: string | null
          assigned_by?: string | null
          completed_at?: string | null
          form_id?: string | null
          id?: string
          is_required?: boolean | null
          patient_id?: string | null
          required_before_session?: boolean | null
        }
        Update: {
          assigned_at?: string | null
          assigned_by?: string | null
          completed_at?: string | null
          form_id?: string | null
          id?: string
          is_required?: boolean | null
          patient_id?: string | null
          required_before_session?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "form_assignments_form_id_fkey"
            columns: ["form_id"]
            isOneToOne: false
            referencedRelation: "forms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "form_assignments_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      form_responses: {
        Row: {
          created_at: string
          form_id: string
          id: string
          patient_id: string
          responses: Json
          submitted_at: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          form_id: string
          id?: string
          patient_id: string
          responses?: Json
          submitted_at?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          form_id?: string
          id?: string
          patient_id?: string
          responses?: Json
          submitted_at?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "form_responses_form_id_fkey"
            columns: ["form_id"]
            isOneToOne: false
            referencedRelation: "forms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "form_responses_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      forms: {
        Row: {
          access_token: string | null
          created_at: string
          created_during_trial: boolean
          created_from_template: boolean
          description: string | null
          fields: Json
          id: string
          is_active: boolean
          is_public: boolean
          is_template: boolean
          source_template_id: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          access_token?: string | null
          created_at?: string
          created_during_trial?: boolean
          created_from_template?: boolean
          description?: string | null
          fields?: Json
          id?: string
          is_active?: boolean
          is_public?: boolean
          is_template?: boolean
          source_template_id?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          access_token?: string | null
          created_at?: string
          created_during_trial?: boolean
          created_from_template?: boolean
          description?: string | null
          fields?: Json
          id?: string
          is_active?: boolean
          is_public?: boolean
          is_template?: boolean
          source_template_id?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "forms_source_template_id_fkey"
            columns: ["source_template_id"]
            isOneToOne: false
            referencedRelation: "forms"
            referencedColumns: ["id"]
          },
        ]
      }
      google_calendar_integrations: {
        Row: {
          access_token: string
          calendar_id: string
          created_at: string
          expires_at: string
          google_email: string
          google_user_id: string | null
          id: string
          last_sync: string | null
          refresh_token: string
          sync_enabled: boolean
          updated_at: string
          user_id: string
        }
        Insert: {
          access_token: string
          calendar_id?: string
          created_at?: string
          expires_at: string
          google_email: string
          google_user_id?: string | null
          id?: string
          last_sync?: string | null
          refresh_token: string
          sync_enabled?: boolean
          updated_at?: string
          user_id: string
        }
        Update: {
          access_token?: string
          calendar_id?: string
          created_at?: string
          expires_at?: string
          google_email?: string
          google_user_id?: string | null
          id?: string
          last_sync?: string | null
          refresh_token?: string
          sync_enabled?: boolean
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      insights: {
        Row: {
          analysis_config: Json | null
          content: string
          content_encrypted_at: string | null
          content_encryption_version: number | null
          content_is_encrypted: boolean | null
          created_at: string
          custom_prompt: string | null
          data_sources: Json | null
          encrypted_content: string | null
          id: string
          insight_type: string
          patient_id: string | null
          therapeutic_approach: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          analysis_config?: Json | null
          content: string
          content_encrypted_at?: string | null
          content_encryption_version?: number | null
          content_is_encrypted?: boolean | null
          created_at?: string
          custom_prompt?: string | null
          data_sources?: Json | null
          encrypted_content?: string | null
          id?: string
          insight_type?: string
          patient_id?: string | null
          therapeutic_approach?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          analysis_config?: Json | null
          content?: string
          content_encrypted_at?: string | null
          content_encryption_version?: number | null
          content_is_encrypted?: boolean | null
          created_at?: string
          custom_prompt?: string | null
          data_sources?: Json | null
          encrypted_content?: string | null
          id?: string
          insight_type?: string
          patient_id?: string | null
          therapeutic_approach?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      leads: {
        Row: {
          created_at: string | null
          email: string | null
          id: number
          mensagem: string | null
          nome: string | null
          status: string | null
          telefone: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id?: number
          mensagem?: string | null
          nome?: string | null
          status?: string | null
          telefone?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: number
          mensagem?: string | null
          nome?: string | null
          status?: string | null
          telefone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      legal_documents: {
        Row: {
          content: string
          created_at: string
          id: string
          is_active: boolean
          title: string
          type: string
          updated_at: string
          version: number
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          is_active?: boolean
          title: string
          type: string
          updated_at?: string
          version?: number
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          is_active?: boolean
          title?: string
          type?: string
          updated_at?: string
          version?: number
        }
        Relationships: []
      }
      lgpd_audit_events: {
        Row: {
          action_type: string
          affected_patient_id: string | null
          audit_log_id: string | null
          automated: boolean | null
          compliance_notes: string | null
          compliance_score: number | null
          created_at: string | null
          data_categories: string[] | null
          id: string
          ip_address: unknown | null
          legal_basis: string | null
          remediated: boolean | null
          remediated_at: string | null
          resource_id: string | null
          resource_type: string
          risk_level: string | null
          user_agent: string | null
          user_role: string | null
        }
        Insert: {
          action_type: string
          affected_patient_id?: string | null
          audit_log_id?: string | null
          automated?: boolean | null
          compliance_notes?: string | null
          compliance_score?: number | null
          created_at?: string | null
          data_categories?: string[] | null
          id?: string
          ip_address?: unknown | null
          legal_basis?: string | null
          remediated?: boolean | null
          remediated_at?: string | null
          resource_id?: string | null
          resource_type: string
          risk_level?: string | null
          user_agent?: string | null
          user_role?: string | null
        }
        Update: {
          action_type?: string
          affected_patient_id?: string | null
          audit_log_id?: string | null
          automated?: boolean | null
          compliance_notes?: string | null
          compliance_score?: number | null
          created_at?: string | null
          data_categories?: string[] | null
          id?: string
          ip_address?: unknown | null
          legal_basis?: string | null
          remediated?: boolean | null
          remediated_at?: string | null
          resource_id?: string | null
          resource_type?: string
          risk_level?: string | null
          user_agent?: string | null
          user_role?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lgpd_audit_events_affected_patient_id_fkey"
            columns: ["affected_patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lgpd_audit_events_audit_log_id_fkey"
            columns: ["audit_log_id"]
            isOneToOne: false
            referencedRelation: "audit_logs"
            referencedColumns: ["id"]
          },
        ]
      }
      lgpd_consents: {
        Row: {
          consent_text: string
          consent_type: string
          created_at: string | null
          data_categories: string[] | null
          expiry_date: string
          granted: boolean
          granted_date: string | null
          id: string
          ip_address: unknown | null
          legal_basis: string
          patient_id: string | null
          purpose: string
          renewed_count: number | null
          retention_period: string | null
          revoked_date: string | null
          status: string
          updated_at: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          consent_text: string
          consent_type: string
          created_at?: string | null
          data_categories?: string[] | null
          expiry_date: string
          granted: boolean
          granted_date?: string | null
          id?: string
          ip_address?: unknown | null
          legal_basis: string
          patient_id?: string | null
          purpose: string
          renewed_count?: number | null
          retention_period?: string | null
          revoked_date?: string | null
          status?: string
          updated_at?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          consent_text?: string
          consent_type?: string
          created_at?: string | null
          data_categories?: string[] | null
          expiry_date?: string
          granted?: boolean
          granted_date?: string | null
          id?: string
          ip_address?: unknown | null
          legal_basis?: string
          patient_id?: string | null
          purpose?: string
          renewed_count?: number | null
          retention_period?: string | null
          revoked_date?: string | null
          status?: string
          updated_at?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lgpd_consents_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      n8n_executions: {
        Row: {
          conversation_id: string | null
          created_at: string | null
          error_message: string | null
          event_type: string
          executed_at: string | null
          execution_id: string
          id: string
          processing_time_ms: number | null
          status: string
          workflow_id: string
        }
        Insert: {
          conversation_id?: string | null
          created_at?: string | null
          error_message?: string | null
          event_type: string
          executed_at?: string | null
          execution_id: string
          id?: string
          processing_time_ms?: number | null
          status?: string
          workflow_id: string
        }
        Update: {
          conversation_id?: string | null
          created_at?: string | null
          error_message?: string | null
          event_type?: string
          executed_at?: string | null
          execution_id?: string
          id?: string
          processing_time_ms?: number | null
          status?: string
          workflow_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "n8n_executions_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "chatbot_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      notes: {
        Row: {
          content: string | null
          content_encrypted_at: string | null
          content_encryption_version: number | null
          content_is_encrypted: boolean | null
          created_at: string | null
          encrypted_content: string | null
          id: string
          is_favorite: boolean | null
          patient_id: string | null
          tags: string[] | null
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          content?: string | null
          content_encrypted_at?: string | null
          content_encryption_version?: number | null
          content_is_encrypted?: boolean | null
          created_at?: string | null
          encrypted_content?: string | null
          id?: string
          is_favorite?: boolean | null
          patient_id?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          content?: string | null
          content_encrypted_at?: string | null
          content_encryption_version?: number | null
          content_is_encrypted?: boolean | null
          created_at?: string | null
          encrypted_content?: string | null
          id?: string
          is_favorite?: boolean | null
          patient_id?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_notes_patient"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      notes_encrypted_backup: {
        Row: {
          content: string | null
          content_encrypted_at: string | null
          content_encryption_version: number | null
          content_is_encrypted: boolean | null
          created_at: string | null
          encrypted_content: string | null
          id: string | null
          is_favorite: boolean | null
          patient_id: string | null
          tags: string[] | null
          title: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          content?: string | null
          content_encrypted_at?: string | null
          content_encryption_version?: number | null
          content_is_encrypted?: boolean | null
          created_at?: string | null
          encrypted_content?: string | null
          id?: string | null
          is_favorite?: boolean | null
          patient_id?: string | null
          tags?: string[] | null
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          content?: string | null
          content_encrypted_at?: string | null
          content_encryption_version?: number | null
          content_is_encrypted?: boolean | null
          created_at?: string | null
          encrypted_content?: string | null
          id?: string | null
          is_favorite?: boolean | null
          patient_id?: string | null
          tags?: string[] | null
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      notification_settings: {
        Row: {
          created_at: string
          email_enabled_1h: boolean
          email_enabled_24h: boolean
          email_template_1h: string | null
          email_template_24h: string | null
          form_responses_enabled: boolean | null
          id: string
          pending_notes_enabled: boolean | null
          system_notifications_enabled: boolean | null
          upcoming_sessions_enabled: boolean | null
          updated_at: string
          user_id: string
          whatsapp_enabled_1h: boolean
          whatsapp_enabled_24h: boolean
          whatsapp_template_1h: string | null
          whatsapp_template_24h: string | null
        }
        Insert: {
          created_at?: string
          email_enabled_1h?: boolean
          email_enabled_24h?: boolean
          email_template_1h?: string | null
          email_template_24h?: string | null
          form_responses_enabled?: boolean | null
          id?: string
          pending_notes_enabled?: boolean | null
          system_notifications_enabled?: boolean | null
          upcoming_sessions_enabled?: boolean | null
          updated_at?: string
          user_id: string
          whatsapp_enabled_1h?: boolean
          whatsapp_enabled_24h?: boolean
          whatsapp_template_1h?: string | null
          whatsapp_template_24h?: string | null
        }
        Update: {
          created_at?: string
          email_enabled_1h?: boolean
          email_enabled_24h?: boolean
          email_template_1h?: string | null
          email_template_24h?: string | null
          form_responses_enabled?: boolean | null
          id?: string
          pending_notes_enabled?: boolean | null
          system_notifications_enabled?: boolean | null
          upcoming_sessions_enabled?: boolean | null
          updated_at?: string
          user_id?: string
          whatsapp_enabled_1h?: boolean
          whatsapp_enabled_24h?: boolean
          whatsapp_template_1h?: string | null
          whatsapp_template_24h?: string | null
        }
        Relationships: []
      }
      patient_data_requests: {
        Row: {
          completed_at: string | null
          created_at: string | null
          due_date: string | null
          id: string
          legal_basis: string | null
          patient_id: string | null
          priority: string | null
          request_details: Json | null
          request_type: string
          requested_by: string | null
          response_data: Json | null
          status: string
          updated_at: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          due_date?: string | null
          id?: string
          legal_basis?: string | null
          patient_id?: string | null
          priority?: string | null
          request_details?: Json | null
          request_type: string
          requested_by?: string | null
          response_data?: Json | null
          status?: string
          updated_at?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          due_date?: string | null
          id?: string
          legal_basis?: string | null
          patient_id?: string | null
          priority?: string | null
          request_details?: Json | null
          request_type?: string
          requested_by?: string | null
          response_data?: Json | null
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "patient_data_requests_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      patient_files: {
        Row: {
          assemblyai_transcript_id: string | null
          audio_channels: number | null
          audio_format: string | null
          audio_sample_rate: number | null
          created_at: string
          description: string | null
          duration_seconds: number | null
          encrypted_transcription: string | null
          file_name: string
          file_path: string
          file_size: number
          file_type: string
          id: string
          language_code: string | null
          model: string | null
          patient_id: string
          segment_number: number | null
          session_id: string | null
          transcript_chars: number | null
          transcript_id: string | null
          transcription_completed_at: string | null
          transcription_encrypted_at: string | null
          transcription_encryption_version: number | null
          transcription_error: string | null
          transcription_is_encrypted: boolean | null
          transcription_provider: string | null
          transcription_started_at: string | null
          transcription_status: string | null
          transcription_text: string | null
          updated_at: string
          user_id: string
          webhook_verified: boolean | null
        }
        Insert: {
          assemblyai_transcript_id?: string | null
          audio_channels?: number | null
          audio_format?: string | null
          audio_sample_rate?: number | null
          created_at?: string
          description?: string | null
          duration_seconds?: number | null
          encrypted_transcription?: string | null
          file_name: string
          file_path: string
          file_size: number
          file_type: string
          id?: string
          language_code?: string | null
          model?: string | null
          patient_id: string
          segment_number?: number | null
          session_id?: string | null
          transcript_chars?: number | null
          transcript_id?: string | null
          transcription_completed_at?: string | null
          transcription_encrypted_at?: string | null
          transcription_encryption_version?: number | null
          transcription_error?: string | null
          transcription_is_encrypted?: boolean | null
          transcription_provider?: string | null
          transcription_started_at?: string | null
          transcription_status?: string | null
          transcription_text?: string | null
          updated_at?: string
          user_id: string
          webhook_verified?: boolean | null
        }
        Update: {
          assemblyai_transcript_id?: string | null
          audio_channels?: number | null
          audio_format?: string | null
          audio_sample_rate?: number | null
          created_at?: string
          description?: string | null
          duration_seconds?: number | null
          encrypted_transcription?: string | null
          file_name?: string
          file_path?: string
          file_size?: number
          file_type?: string
          id?: string
          language_code?: string | null
          model?: string | null
          patient_id?: string
          segment_number?: number | null
          session_id?: string | null
          transcript_chars?: number | null
          transcript_id?: string | null
          transcription_completed_at?: string | null
          transcription_encrypted_at?: string | null
          transcription_encryption_version?: number | null
          transcription_error?: string | null
          transcription_is_encrypted?: boolean | null
          transcription_provider?: string | null
          transcription_started_at?: string | null
          transcription_status?: string | null
          transcription_text?: string | null
          updated_at?: string
          user_id?: string
          webhook_verified?: boolean | null
        }
        Relationships: []
      }
      patient_form_links: {
        Row: {
          completed_at: string | null
          created_at: string | null
          expires_at: string | null
          form_id: string
          id: string
          link_sent_at: string | null
          patient_id: string
          psychologist_id: string
          status: string
          unique_id: string
          updated_at: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          expires_at?: string | null
          form_id: string
          id?: string
          link_sent_at?: string | null
          patient_id: string
          psychologist_id: string
          status?: string
          unique_id: string
          updated_at?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          expires_at?: string | null
          form_id?: string
          id?: string
          link_sent_at?: string | null
          patient_id?: string
          psychologist_id?: string
          status?: string
          unique_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "patient_form_links_form_id_fkey"
            columns: ["form_id"]
            isOneToOne: false
            referencedRelation: "forms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "patient_form_links_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      patient_summaries: {
        Row: {
          created_at: string
          encrypted_summary: string | null
          generated_by: string
          id: string
          patient_id: string
          summary_encrypted_at: string | null
          summary_encryption_version: number | null
          summary_is_encrypted: boolean | null
          summary_text: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          encrypted_summary?: string | null
          generated_by?: string
          id?: string
          patient_id: string
          summary_encrypted_at?: string | null
          summary_encryption_version?: number | null
          summary_is_encrypted?: boolean | null
          summary_text: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          encrypted_summary?: string | null
          generated_by?: string
          id?: string
          patient_id?: string
          summary_encrypted_at?: string | null
          summary_encryption_version?: number | null
          summary_is_encrypted?: boolean | null
          summary_text?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      patients: {
        Row: {
          access_code: string
          address_city: string | null
          address_complement: string | null
          address_neighborhood: string | null
          address_number: string | null
          address_state: string | null
          address_street: string | null
          address_zip_code: string | null
          birth_date: string | null
          calendar_preferences: Json | null
          cpf: string | null
          created_at: string
          email: string
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          encrypted_at: string | null
          encrypted_data: string | null
          encryption_algorithm: string | null
          encryption_version: number | null
          gender: string | null
          health_insurance: string | null
          id: string
          is_encrypted: boolean | null
          medications: Json | null
          name: string
          observations: string | null
          phone: string | null
          photo_url: string | null
          profession: string | null
          public_access_settings: Json | null
          session_price: number
          status: string
          treatment_type: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          access_code: string
          address_city?: string | null
          address_complement?: string | null
          address_neighborhood?: string | null
          address_number?: string | null
          address_state?: string | null
          address_street?: string | null
          address_zip_code?: string | null
          birth_date?: string | null
          calendar_preferences?: Json | null
          cpf?: string | null
          created_at?: string
          email: string
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          encrypted_at?: string | null
          encrypted_data?: string | null
          encryption_algorithm?: string | null
          encryption_version?: number | null
          gender?: string | null
          health_insurance?: string | null
          id?: string
          is_encrypted?: boolean | null
          medications?: Json | null
          name: string
          observations?: string | null
          phone?: string | null
          photo_url?: string | null
          profession?: string | null
          public_access_settings?: Json | null
          session_price?: number
          status?: string
          treatment_type?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          access_code?: string
          address_city?: string | null
          address_complement?: string | null
          address_neighborhood?: string | null
          address_number?: string | null
          address_state?: string | null
          address_street?: string | null
          address_zip_code?: string | null
          birth_date?: string | null
          calendar_preferences?: Json | null
          cpf?: string | null
          created_at?: string
          email?: string
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          encrypted_at?: string | null
          encrypted_data?: string | null
          encryption_algorithm?: string | null
          encryption_version?: number | null
          gender?: string | null
          health_insurance?: string | null
          id?: string
          is_encrypted?: boolean | null
          medications?: Json | null
          name?: string
          observations?: string | null
          phone?: string | null
          photo_url?: string | null
          profession?: string | null
          public_access_settings?: Json | null
          session_price?: number
          status?: string
          treatment_type?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      patients_backup_migration: {
        Row: {
          access_code: string | null
          address_city: string | null
          address_complement: string | null
          address_neighborhood: string | null
          address_number: string | null
          address_state: string | null
          address_street: string | null
          address_zip_code: string | null
          birth_date: string | null
          calendar_preferences: Json | null
          cpf: string | null
          created_at: string | null
          email: string | null
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          encrypted_at: string | null
          encrypted_data: string | null
          encryption_algorithm: string | null
          encryption_version: number | null
          gender: string | null
          health_insurance: string | null
          id: string | null
          is_encrypted: boolean | null
          medications: Json | null
          name: string | null
          phone: string | null
          photo_url: string | null
          profession: string | null
          public_access_settings: Json | null
          session_price: number | null
          status: string | null
          treatment_type: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          access_code?: string | null
          address_city?: string | null
          address_complement?: string | null
          address_neighborhood?: string | null
          address_number?: string | null
          address_state?: string | null
          address_street?: string | null
          address_zip_code?: string | null
          birth_date?: string | null
          calendar_preferences?: Json | null
          cpf?: string | null
          created_at?: string | null
          email?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          encrypted_at?: string | null
          encrypted_data?: string | null
          encryption_algorithm?: string | null
          encryption_version?: number | null
          gender?: string | null
          health_insurance?: string | null
          id?: string | null
          is_encrypted?: boolean | null
          medications?: Json | null
          name?: string | null
          phone?: string | null
          photo_url?: string | null
          profession?: string | null
          public_access_settings?: Json | null
          session_price?: number | null
          status?: string | null
          treatment_type?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          access_code?: string | null
          address_city?: string | null
          address_complement?: string | null
          address_neighborhood?: string | null
          address_number?: string | null
          address_state?: string | null
          address_street?: string | null
          address_zip_code?: string | null
          birth_date?: string | null
          calendar_preferences?: Json | null
          cpf?: string | null
          created_at?: string | null
          email?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          encrypted_at?: string | null
          encrypted_data?: string | null
          encryption_algorithm?: string | null
          encryption_version?: number | null
          gender?: string | null
          health_insurance?: string | null
          id?: string | null
          is_encrypted?: boolean | null
          medications?: Json | null
          name?: string | null
          phone?: string | null
          photo_url?: string | null
          profession?: string | null
          public_access_settings?: Json | null
          session_price?: number | null
          status?: string | null
          treatment_type?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      patients_before_cleanup: {
        Row: {
          access_code: string | null
          address_city: string | null
          address_complement: string | null
          address_neighborhood: string | null
          address_number: string | null
          address_state: string | null
          address_street: string | null
          address_zip_code: string | null
          birth_date: string | null
          calendar_preferences: Json | null
          cpf: string | null
          created_at: string | null
          email: string | null
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          encrypted_at: string | null
          encrypted_data: string | null
          encryption_algorithm: string | null
          encryption_version: number | null
          gender: string | null
          health_insurance: string | null
          id: string | null
          is_encrypted: boolean | null
          medications: Json | null
          name: string | null
          phone: string | null
          photo_url: string | null
          profession: string | null
          public_access_settings: Json | null
          session_price: number | null
          status: string | null
          treatment_type: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          access_code?: string | null
          address_city?: string | null
          address_complement?: string | null
          address_neighborhood?: string | null
          address_number?: string | null
          address_state?: string | null
          address_street?: string | null
          address_zip_code?: string | null
          birth_date?: string | null
          calendar_preferences?: Json | null
          cpf?: string | null
          created_at?: string | null
          email?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          encrypted_at?: string | null
          encrypted_data?: string | null
          encryption_algorithm?: string | null
          encryption_version?: number | null
          gender?: string | null
          health_insurance?: string | null
          id?: string | null
          is_encrypted?: boolean | null
          medications?: Json | null
          name?: string | null
          phone?: string | null
          photo_url?: string | null
          profession?: string | null
          public_access_settings?: Json | null
          session_price?: number | null
          status?: string | null
          treatment_type?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          access_code?: string | null
          address_city?: string | null
          address_complement?: string | null
          address_neighborhood?: string | null
          address_number?: string | null
          address_state?: string | null
          address_street?: string | null
          address_zip_code?: string | null
          birth_date?: string | null
          calendar_preferences?: Json | null
          cpf?: string | null
          created_at?: string | null
          email?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          encrypted_at?: string | null
          encrypted_data?: string | null
          encryption_algorithm?: string | null
          encryption_version?: number | null
          gender?: string | null
          health_insurance?: string | null
          id?: string | null
          is_encrypted?: boolean | null
          medications?: Json | null
          name?: string | null
          phone?: string | null
          photo_url?: string | null
          profession?: string | null
          public_access_settings?: Json | null
          session_price?: number | null
          status?: string | null
          treatment_type?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      patients_encrypted_backup: {
        Row: {
          access_code: string | null
          address_city: string | null
          address_complement: string | null
          address_neighborhood: string | null
          address_number: string | null
          address_state: string | null
          address_street: string | null
          address_zip_code: string | null
          birth_date: string | null
          calendar_preferences: Json | null
          cpf: string | null
          created_at: string | null
          email: string | null
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          encrypted_at: string | null
          encrypted_data: string | null
          encryption_algorithm: string | null
          encryption_version: number | null
          gender: string | null
          health_insurance: string | null
          id: string | null
          is_encrypted: boolean | null
          medications: Json | null
          name: string | null
          phone: string | null
          photo_url: string | null
          profession: string | null
          public_access_settings: Json | null
          session_price: number | null
          status: string | null
          treatment_type: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          access_code?: string | null
          address_city?: string | null
          address_complement?: string | null
          address_neighborhood?: string | null
          address_number?: string | null
          address_state?: string | null
          address_street?: string | null
          address_zip_code?: string | null
          birth_date?: string | null
          calendar_preferences?: Json | null
          cpf?: string | null
          created_at?: string | null
          email?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          encrypted_at?: string | null
          encrypted_data?: string | null
          encryption_algorithm?: string | null
          encryption_version?: number | null
          gender?: string | null
          health_insurance?: string | null
          id?: string | null
          is_encrypted?: boolean | null
          medications?: Json | null
          name?: string | null
          phone?: string | null
          photo_url?: string | null
          profession?: string | null
          public_access_settings?: Json | null
          session_price?: number | null
          status?: string | null
          treatment_type?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          access_code?: string | null
          address_city?: string | null
          address_complement?: string | null
          address_neighborhood?: string | null
          address_number?: string | null
          address_state?: string | null
          address_street?: string | null
          address_zip_code?: string | null
          birth_date?: string | null
          calendar_preferences?: Json | null
          cpf?: string | null
          created_at?: string | null
          email?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          encrypted_at?: string | null
          encrypted_data?: string | null
          encryption_algorithm?: string | null
          encryption_version?: number | null
          gender?: string | null
          health_insurance?: string | null
          id?: string | null
          is_encrypted?: boolean | null
          medications?: Json | null
          name?: string | null
          phone?: string | null
          photo_url?: string | null
          profession?: string | null
          public_access_settings?: Json | null
          session_price?: number | null
          status?: string | null
          treatment_type?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          created_at: string
          currency: string
          id: string
          metadata: Json | null
          payment_method: string
          pix_payment_id: string | null
          status: string
          stripe_payment_intent_id: string | null
          subscription_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string
          id?: string
          metadata?: Json | null
          payment_method: string
          pix_payment_id?: string | null
          status?: string
          stripe_payment_intent_id?: string | null
          subscription_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string
          id?: string
          metadata?: Json | null
          payment_method?: string
          pix_payment_id?: string | null
          status?: string
          stripe_payment_intent_id?: string | null
          subscription_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "subscription_monitoring"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "subscriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      professional_public_codes: {
        Row: {
          auto_assign_form_ids: string[] | null
          created_at: string | null
          id: string
          is_active: boolean | null
          public_signup_code: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          auto_assign_form_ids?: string[] | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          public_signup_code: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          auto_assign_form_ids?: string[] | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          public_signup_code?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          city: string | null
          clinic_logo_url: string | null
          clinic_name: string | null
          consultation_info: string | null
          cpf: string | null
          created_at: string | null
          email: string | null
          has_seen_welcome: boolean | null
          id: string
          instagram_url: string | null
          linkedin_url: string | null
          name: string | null
          phone: string | null
          professional_title: string | null
          profile_slug: string | null
          public_email: string | null
          public_phone: string | null
          public_profile: boolean | null
          short_bio: string | null
          show_session_price: boolean | null
          show_whatsapp: boolean | null
          specialties: string[] | null
          state: string | null
          timezone: string | null
          updated_at: string | null
          website_url: string | null
          whatsapp_public: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          city?: string | null
          clinic_logo_url?: string | null
          clinic_name?: string | null
          consultation_info?: string | null
          cpf?: string | null
          created_at?: string | null
          email?: string | null
          has_seen_welcome?: boolean | null
          id: string
          instagram_url?: string | null
          linkedin_url?: string | null
          name?: string | null
          phone?: string | null
          professional_title?: string | null
          profile_slug?: string | null
          public_email?: string | null
          public_phone?: string | null
          public_profile?: boolean | null
          short_bio?: string | null
          show_session_price?: boolean | null
          show_whatsapp?: boolean | null
          specialties?: string[] | null
          state?: string | null
          timezone?: string | null
          updated_at?: string | null
          website_url?: string | null
          whatsapp_public?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          city?: string | null
          clinic_logo_url?: string | null
          clinic_name?: string | null
          consultation_info?: string | null
          cpf?: string | null
          created_at?: string | null
          email?: string | null
          has_seen_welcome?: boolean | null
          id?: string
          instagram_url?: string | null
          linkedin_url?: string | null
          name?: string | null
          phone?: string | null
          professional_title?: string | null
          profile_slug?: string | null
          public_email?: string | null
          public_phone?: string | null
          public_profile?: boolean | null
          short_bio?: string | null
          show_session_price?: boolean | null
          show_whatsapp?: boolean | null
          specialties?: string[] | null
          state?: string | null
          timezone?: string | null
          updated_at?: string | null
          website_url?: string | null
          whatsapp_public?: string | null
        }
        Relationships: []
      }
      psynka_knowledge_base: {
        Row: {
          content: string
          created_at: string | null
          embedding: string | null
          id: number
          metadata: Json | null
          updated_at: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          embedding?: string | null
          id?: never
          metadata?: Json | null
          updated_at?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          embedding?: string | null
          id?: never
          metadata?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      referral_codes: {
        Row: {
          created_at: string | null
          id: string
          referral_code: string
          updated_at: string | null
          user_id: string
          uses_count: number | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          referral_code: string
          updated_at?: string | null
          user_id: string
          uses_count?: number | null
        }
        Update: {
          created_at?: string | null
          id?: string
          referral_code?: string
          updated_at?: string | null
          user_id?: string
          uses_count?: number | null
        }
        Relationships: []
      }
      referral_milestones: {
        Row: {
          created_at: string
          id: string
          last_milestone: number
          total_paid_referrals: number
          updated_at: string
          user_id: string
          vip_months_earned: number
          vip_months_used: number
        }
        Insert: {
          created_at?: string
          id?: string
          last_milestone?: number
          total_paid_referrals?: number
          updated_at?: string
          user_id: string
          vip_months_earned?: number
          vip_months_used?: number
        }
        Update: {
          created_at?: string
          id?: string
          last_milestone?: number
          total_paid_referrals?: number
          updated_at?: string
          user_id?: string
          vip_months_earned?: number
          vip_months_used?: number
        }
        Relationships: []
      }
      referrals: {
        Row: {
          bonus_expires_at: string | null
          bonus_month: string | null
          consumed_at: string | null
          consumed_for_vip: boolean | null
          consumption_batch_id: string | null
          created_at: string
          id: string
          qualifies_for_vip: boolean | null
          referral_code: string
          referred_user_email: string | null
          referred_user_id: string
          referrer_user_id: string
          reward_tokens: number | null
          status: string
          updated_at: string
          vip_milestone_reached: number | null
          vip_reward_applied: boolean | null
        }
        Insert: {
          bonus_expires_at?: string | null
          bonus_month?: string | null
          consumed_at?: string | null
          consumed_for_vip?: boolean | null
          consumption_batch_id?: string | null
          created_at?: string
          id?: string
          qualifies_for_vip?: boolean | null
          referral_code: string
          referred_user_email?: string | null
          referred_user_id: string
          referrer_user_id: string
          reward_tokens?: number | null
          status?: string
          updated_at?: string
          vip_milestone_reached?: number | null
          vip_reward_applied?: boolean | null
        }
        Update: {
          bonus_expires_at?: string | null
          bonus_month?: string | null
          consumed_at?: string | null
          consumed_for_vip?: boolean | null
          consumption_batch_id?: string | null
          created_at?: string
          id?: string
          qualifies_for_vip?: boolean | null
          referral_code?: string
          referred_user_email?: string | null
          referred_user_id?: string
          referrer_user_id?: string
          reward_tokens?: number | null
          status?: string
          updated_at?: string
          vip_milestone_reached?: number | null
          vip_reward_applied?: boolean | null
        }
        Relationships: []
      }
      reminders: {
        Row: {
          channel: string | null
          created_at: string
          error_message: string | null
          id: string
          is_sent: boolean
          message: string | null
          patient_id: string
          reminder_type: string
          scheduled_for: string
          sent_at: string | null
          status: string | null
          template_used: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          channel?: string | null
          created_at?: string
          error_message?: string | null
          id?: string
          is_sent?: boolean
          message?: string | null
          patient_id: string
          reminder_type?: string
          scheduled_for: string
          sent_at?: string | null
          status?: string | null
          template_used?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          channel?: string | null
          created_at?: string
          error_message?: string | null
          id?: string
          is_sent?: boolean
          message?: string | null
          patient_id?: string
          reminder_type?: string
          scheduled_for?: string
          sent_at?: string | null
          status?: string | null
          template_used?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_reminders_patient_id"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      session_payments: {
        Row: {
          amount: number
          created_at: string
          id: string
          notes: string | null
          patient_id: string
          payment_date: string | null
          payment_method: string | null
          receipt_number: string | null
          session_id: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          id?: string
          notes?: string | null
          patient_id: string
          payment_date?: string | null
          payment_method?: string | null
          receipt_number?: string | null
          session_id: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          notes?: string | null
          patient_id?: string
          payment_date?: string | null
          payment_method?: string | null
          receipt_number?: string | null
          session_id?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "session_payments_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "session_payments_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      session_payments_amount_corrections: {
        Row: {
          corrected_at: string | null
          id: string
          new_amount: number
          old_amount: number
          patient_id: string
          patient_name: string | null
          patient_session_price: number | null
          session_payment_id: string
          user_default_price: number | null
        }
        Insert: {
          corrected_at?: string | null
          id?: string
          new_amount: number
          old_amount: number
          patient_id: string
          patient_name?: string | null
          patient_session_price?: number | null
          session_payment_id: string
          user_default_price?: number | null
        }
        Update: {
          corrected_at?: string | null
          id?: string
          new_amount?: number
          old_amount?: number
          patient_id?: string
          patient_name?: string | null
          patient_session_price?: number | null
          session_payment_id?: string
          user_default_price?: number | null
        }
        Relationships: []
      }
      session_payments_backup: {
        Row: {
          amount: number | null
          created_at: string | null
          id: string | null
          notes: string | null
          patient_id: string | null
          payment_date: string | null
          payment_method: string | null
          receipt_number: string | null
          session_id: string | null
          status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          amount?: number | null
          created_at?: string | null
          id?: string | null
          notes?: string | null
          patient_id?: string | null
          payment_date?: string | null
          payment_method?: string | null
          receipt_number?: string | null
          session_id?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number | null
          created_at?: string | null
          id?: string | null
          notes?: string | null
          patient_id?: string | null
          payment_date?: string | null
          payment_method?: string | null
          receipt_number?: string | null
          session_id?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      sessions: {
        Row: {
          actual_duration_minutes: number | null
          cancel_reason: string | null
          canceled_at: string | null
          created_at: string
          duration_minutes: number | null
          encrypted_notes: string | null
          google_event_id: string | null
          id: string
          location: string | null
          meet_link: string | null
          notes: string | null
          notes_encrypted_at: string | null
          notes_encryption_version: number | null
          notes_is_encrypted: boolean | null
          patient_id: string
          rescheduled_from: string | null
          session_date: string
          status: string
          sync_status: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          actual_duration_minutes?: number | null
          cancel_reason?: string | null
          canceled_at?: string | null
          created_at?: string
          duration_minutes?: number | null
          encrypted_notes?: string | null
          google_event_id?: string | null
          id?: string
          location?: string | null
          meet_link?: string | null
          notes?: string | null
          notes_encrypted_at?: string | null
          notes_encryption_version?: number | null
          notes_is_encrypted?: boolean | null
          patient_id: string
          rescheduled_from?: string | null
          session_date: string
          status?: string
          sync_status?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          actual_duration_minutes?: number | null
          cancel_reason?: string | null
          canceled_at?: string | null
          created_at?: string
          duration_minutes?: number | null
          encrypted_notes?: string | null
          google_event_id?: string | null
          id?: string
          location?: string | null
          meet_link?: string | null
          notes?: string | null
          notes_encrypted_at?: string | null
          notes_encryption_version?: number | null
          notes_is_encrypted?: boolean | null
          patient_id?: string
          rescheduled_from?: string | null
          session_date?: string
          status?: string
          sync_status?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sessions_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      sessions_encrypted_backup: {
        Row: {
          actual_duration_minutes: number | null
          cancel_reason: string | null
          canceled_at: string | null
          created_at: string | null
          duration_minutes: number | null
          encrypted_notes: string | null
          google_event_id: string | null
          id: string | null
          location: string | null
          meet_link: string | null
          notes: string | null
          notes_encrypted_at: string | null
          notes_encryption_version: number | null
          notes_is_encrypted: boolean | null
          patient_id: string | null
          rescheduled_from: string | null
          session_date: string | null
          status: string | null
          sync_status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          actual_duration_minutes?: number | null
          cancel_reason?: string | null
          canceled_at?: string | null
          created_at?: string | null
          duration_minutes?: number | null
          encrypted_notes?: string | null
          google_event_id?: string | null
          id?: string | null
          location?: string | null
          meet_link?: string | null
          notes?: string | null
          notes_encrypted_at?: string | null
          notes_encryption_version?: number | null
          notes_is_encrypted?: boolean | null
          patient_id?: string | null
          rescheduled_from?: string | null
          session_date?: string | null
          status?: string | null
          sync_status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          actual_duration_minutes?: number | null
          cancel_reason?: string | null
          canceled_at?: string | null
          created_at?: string | null
          duration_minutes?: number | null
          encrypted_notes?: string | null
          google_event_id?: string | null
          id?: string | null
          location?: string | null
          meet_link?: string | null
          notes?: string | null
          notes_encrypted_at?: string | null
          notes_encryption_version?: number | null
          notes_is_encrypted?: boolean | null
          patient_id?: string | null
          rescheduled_from?: string | null
          session_date?: string | null
          status?: string | null
          sync_status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
          stripe_customer_id: string | null
          subscribed: boolean
          subscription_end: string | null
          subscription_tier: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          created_at: string
          current_patients: number
          expires_at: string | null
          id: string
          monthly_tokens: number | null
          paid_until: string | null
          patient_limit: number
          payment_method: string | null
          pix_payment_id: string | null
          plan: string
          renewal_day: number | null
          status: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          trial_ends_at: string | null
          updated_at: string
          user_id: string
          vip_expires_at: string | null
          vip_months_remaining: number | null
        }
        Insert: {
          created_at?: string
          current_patients?: number
          expires_at?: string | null
          id?: string
          monthly_tokens?: number | null
          paid_until?: string | null
          patient_limit?: number
          payment_method?: string | null
          pix_payment_id?: string | null
          plan?: string
          renewal_day?: number | null
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          trial_ends_at?: string | null
          updated_at?: string
          user_id: string
          vip_expires_at?: string | null
          vip_months_remaining?: number | null
        }
        Update: {
          created_at?: string
          current_patients?: number
          expires_at?: string | null
          id?: string
          monthly_tokens?: number | null
          paid_until?: string | null
          patient_limit?: number
          payment_method?: string | null
          pix_payment_id?: string | null
          plan?: string
          renewal_day?: number | null
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          trial_ends_at?: string | null
          updated_at?: string
          user_id?: string
          vip_expires_at?: string | null
          vip_months_remaining?: number | null
        }
        Relationships: []
      }
      token_ledger: {
        Row: {
          bonus_tokens: number
          created_at: string | null
          id: string
          month_year: string
          monthly_quota: number
          plan_type: string
          renewal_date: string
          updated_at: string | null
          used_tokens: number
          user_id: string
        }
        Insert: {
          bonus_tokens?: number
          created_at?: string | null
          id?: string
          month_year: string
          monthly_quota?: number
          plan_type?: string
          renewal_date: string
          updated_at?: string | null
          used_tokens?: number
          user_id: string
        }
        Update: {
          bonus_tokens?: number
          created_at?: string | null
          id?: string
          month_year?: string
          monthly_quota?: number
          plan_type?: string
          renewal_date?: string
          updated_at?: string | null
          used_tokens?: number
          user_id?: string
        }
        Relationships: []
      }
      token_transactions: {
        Row: {
          amount: number
          created_at: string
          description: string
          id: string
          referral_id: string | null
          type: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          description: string
          id?: string
          referral_id?: string | null
          type: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          description?: string
          id?: string
          referral_id?: string | null
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "token_transactions_referral_id_fkey"
            columns: ["referral_id"]
            isOneToOne: false
            referencedRelation: "referrals"
            referencedColumns: ["id"]
          },
        ]
      }
      user_calendar_events: {
        Row: {
          color: string | null
          created_at: string | null
          description: string | null
          end_time: string
          event_type: string | null
          google_event_id: string | null
          id: string
          is_all_day: boolean | null
          location: string | null
          recurrence_rule: string | null
          start_time: string
          sync_status: string | null
          title: string
          transparency: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          end_time: string
          event_type?: string | null
          google_event_id?: string | null
          id?: string
          is_all_day?: boolean | null
          location?: string | null
          recurrence_rule?: string | null
          start_time: string
          sync_status?: string | null
          title: string
          transparency?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          end_time?: string
          event_type?: string | null
          google_event_id?: string | null
          id?: string
          is_all_day?: boolean | null
          location?: string | null
          recurrence_rule?: string | null
          start_time?: string
          sync_status?: string | null
          title?: string
          transparency?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_consents: {
        Row: {
          consented_at: string
          document_id: string
          document_version: number
          id: string
          ip_address: string | null
          user_id: string
        }
        Insert: {
          consented_at?: string
          document_id: string
          document_version: number
          id?: string
          ip_address?: string | null
          user_id: string
        }
        Update: {
          consented_at?: string
          document_id?: string
          document_version?: number
          id?: string
          ip_address?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_consents_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "legal_documents"
            referencedColumns: ["id"]
          },
        ]
      }
      user_favorite_templates: {
        Row: {
          created_at: string
          id: string
          template_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          template_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          template_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_favorite_templates_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "forms"
            referencedColumns: ["id"]
          },
        ]
      }
      user_settings: {
        Row: {
          consultation_duration: number | null
          created_at: string
          default_session_price: number
          id: string
          in_person_consultation: boolean | null
          online_consultation: boolean | null
          price_display_text: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          consultation_duration?: number | null
          created_at?: string
          default_session_price?: number
          id?: string
          in_person_consultation?: boolean | null
          online_consultation?: boolean | null
          price_display_text?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          consultation_duration?: number | null
          created_at?: string
          default_session_price?: number
          id?: string
          in_person_consultation?: boolean | null
          online_consultation?: boolean | null
          price_display_text?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_tokens: {
        Row: {
          balance: number
          created_at: string
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          balance?: number
          created_at?: string
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          balance?: number
          created_at?: string
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      utm_tracking: {
        Row: {
          created_at: string
          id: string
          referrer: string | null
          user_id: string | null
          utm_campaign: string | null
          utm_content: string | null
          utm_medium: string | null
          utm_source: string | null
          utm_term: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          referrer?: string | null
          user_id?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          referrer?: string | null
          user_id?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Relationships: []
      }
      vip_reward_batches: {
        Row: {
          batch_number: number
          created_at: string | null
          id: string
          referral_count: number
          referral_ids: string[]
          user_id: string
          vip_months_awarded: number
        }
        Insert: {
          batch_number: number
          created_at?: string | null
          id?: string
          referral_count?: number
          referral_ids: string[]
          user_id: string
          vip_months_awarded?: number
        }
        Update: {
          batch_number?: number
          created_at?: string | null
          id?: string
          referral_count?: number
          referral_ids?: string[]
          user_id?: string
          vip_months_awarded?: number
        }
        Relationships: []
      }
      vip_rewards: {
        Row: {
          created_at: string | null
          earned_months: number
          id: string
          reward_type: string
          total_qualifying_referrals: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          earned_months?: number
          id?: string
          reward_type?: string
          total_qualifying_referrals?: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          earned_months?: number
          id?: string
          reward_type?: string
          total_qualifying_referrals?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      cancellation_stats: {
        Row: {
          cancellations_with_paid_period: number | null
          date: string | null
          total_cancellations: number | null
          total_expirations: number | null
        }
        Relationships: []
      }
      psynka_kb_clean: {
        Row: {
          content: string | null
          created_at: string | null
          embedding: string | null
          id: number | null
          metadata: Json | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          embedding?: string | null
          id?: number | null
          metadata?: Json | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          embedding?: string | null
          id?: number | null
          metadata?: Json | null
        }
        Relationships: []
      }
      subscription_monitoring: {
        Row: {
          created_at: string | null
          days_until_expiry: number | null
          effective_status: string | null
          expires_soon: boolean | null
          id: string | null
          monthly_tokens: number | null
          needs_expiration_processing: boolean | null
          paid_until: string | null
          patient_limit: number | null
          plan: string | null
          profile_email: string | null
          status: string | null
          stripe_subscription_id: string | null
          updated_at: string | null
          user_email: string | null
          user_id: string | null
          user_name: string | null
        }
        Relationships: []
      }
      subscription_stats_cache: {
        Row: {
          active_subscriptions: number | null
          basic_plan_count: number | null
          cancelled_but_active: number | null
          expired_subscriptions: number | null
          expiring_in_1_day: number | null
          expiring_in_3_days: number | null
          expiring_in_7_days: number | null
          free_plan_count: number | null
          last_updated: string | null
          pro_plan_count: number | null
          trial_plan_count: number | null
          vip_plan_count: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      add_referral_bonus: {
        Args: { p_bonus_tokens: number; p_source?: string; p_user_id: string }
        Returns: undefined
      }
      apply_vip_subscription_extension: {
        Args: { p_months_to_add: number; p_user_id: string }
        Returns: {
          message: string
          success: boolean
        }[]
      }
      book_patient_session: {
        Args: {
          p_duration_minutes: number
          p_patient_id: string
          p_patient_updates: Json
          p_session_datetime: string
          p_user_id: string
        }
        Returns: string
      }
      calculate_and_apply_vip_months: {
        Args: { p_user_id: string }
        Returns: {
          new_vip_months: number
          qualifying_referrals: number
          total_months: number
        }[]
      }
      calculate_mrr: {
        Args: Record<PropertyKey, never>
        Returns: {
          churned_mrr: number
          month: string
          mrr: number
          net_mrr: number
          new_mrr: number
        }[]
      }
      check_and_renew_user_tokens: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      check_expired_trials: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      check_vip_milestone: {
        Args: { p_user_id: string }
        Returns: Json
      }
      check_vip_milestone_v2: {
        Args: { p_user_id: string }
        Returns: Json
      }
      consume_insight_token: {
        Args: { p_user_id: string }
        Returns: boolean
      }
      ensure_user_has_public_code: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_form_access_token: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_friendly_referral_code: {
        Args: { p_user_id: string }
        Returns: string
      }
      generate_friendly_slug: {
        Args: { input_name: string }
        Returns: string
      }
      generate_patient_access_code: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_professional_signup_code: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_profile_slug: {
        Args: { profile_name: string }
        Returns: string
      }
      generate_referral_code: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_effective_plan_for_tokens: {
        Args: { p_user_id: string }
        Returns: string
      }
      get_effective_subscription_status: {
        Args: {
          subscription_row: Database["public"]["Tables"]["subscriptions"]["Row"]
        }
        Returns: string
      }
      get_public_form_by_token: {
        Args: { form_token: string }
        Returns: {
          description: string
          fields: Json
          id: string
          is_active: boolean
          title: string
          user_id: string
        }[]
      }
      get_subscription_alerts: {
        Args: Record<PropertyKey, never>
        Returns: {
          alert_count: number
          alert_type: string
          details: Json
        }[]
      }
      handle_referral_payment: {
        Args: {
          p_referral_code: string
          p_referred_user_email?: string
          p_referred_user_id: string
        }
        Returns: Json
      }
      handle_stripe_webhook: {
        Args: {
          p_customer_id: string
          p_event_type: string
          p_invoice_id?: string
          p_subscription_id?: string
        }
        Returns: Json
      }
      increment_chatbot_metrics: {
        Args: { metric_type: string; processing_time?: number }
        Returns: undefined
      }
      is_service_role: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_subscription_active: {
        Args: {
          subscription_row: Database["public"]["Tables"]["subscriptions"]["Row"]
        }
        Returns: boolean
      }
      manage_monthly_tokens: {
        Args: { p_plan?: string; p_renewal_date?: string; p_user_id: string }
        Returns: undefined
      }
      match_documents: {
        Args: { filter?: Json; match_count?: number; query_embedding: string }
        Returns: {
          content: string
          embedding: string
          id: number
          metadata: Json
          similarity: number
        }[]
      }
      match_psynka_documents: {
        Args: {
          match_count?: number
          match_threshold?: number
          query_embedding: string
        }
        Returns: {
          content: string
          id: number
          metadata: Json
          similarity: number
        }[]
      }
      process_expired_subscriptions: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      process_expired_subscriptions_batch: {
        Args: { batch_size?: number }
        Returns: Json
      }
      process_expired_subscriptions_v2: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      refresh_subscription_stats_cache: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      safe_subscription_update: {
        Args: {
          p_monthly_tokens?: number
          p_operation_context?: Json
          p_paid_until?: string
          p_patient_limit?: number
          p_plan: string
          p_status: string
          p_stripe_subscription_id?: string
          p_user_id: string
        }
        Returns: Json
      }
      search_kb: {
        Args: { filter?: Json; match_count?: number; query_embedding: string }
        Returns: {
          content: string
          id: number
          metadata: Json
          similarity: number
        }[]
      }
      search_psynka_knowledge: {
        Args: {
          match_count?: number
          match_threshold?: number
          query_text: string
        }
        Returns: {
          content: string
          id: number
          metadata: Json
          similarity: number
        }[]
      }
      sync_all_user_tokens: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      update_token_balance: {
        Args: {
          p_amount: number
          p_description: string
          p_referral_id?: string
          p_type: string
          p_user_id: string
        }
        Returns: boolean
      }
      validate_coupon: {
        Args: { p_coupon_code: string }
        Returns: {
          coupon_id: string
          discount_amount: number
          discount_percent: number
          is_valid: boolean
        }[]
      }
      verify_form_token_for_response: {
        Args: { form_token: string; patient_code: string }
        Returns: boolean
      }
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
