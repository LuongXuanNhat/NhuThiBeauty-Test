import { createClient } from '@/lib/supabase/client'
import { User, Session } from '@supabase/supabase-js'

export interface AuthResponse {
  user?: User | null
  session?: Session | null
  error?: string
}

export interface SignUpData {
  email: string
  password: string
  metadata?: Record<string, any>
}

export interface SignInData {
  email: string
  password: string
}

class AuthService {
  private supabase = createClient()

  // Đăng ký
  async signUp(data: SignUpData): Promise<AuthResponse> {
    try {
      const { data: authData, error } = await this.supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: data.metadata || {}
        }
      })

      if (error) {
        return { error: error.message }
      }

      return {
        user: authData.user,
        session: authData.session
      }
    } catch (error) {
      return { error: 'Có lỗi xảy ra khi đăng ký' }
    }
  }

  // Đăng nhập
  async signIn(data: SignInData): Promise<AuthResponse> {
    try {
      const { data: authData, error } = await this.supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password
      })

      if (error) {
        return { error: error.message }
      }

      return {
        user: authData.user,
        session: authData.session
      }
    } catch (error) {
      return { error: 'Có lỗi xảy ra khi đăng nhập' }
    }
  }

  // Đăng xuất
  async signOut(): Promise<{ error?: string }> {
    try {
      const { error } = await this.supabase.auth.signOut()
      if (error) {
        return { error: error.message }
      }
      return {}
    } catch (error) {
      return { error: 'Có lỗi xảy ra khi đăng xuất' }
    }
  }

  // Lấy user hiện tại
  async getCurrentUser(): Promise<AuthResponse> {
    try {
      const { data: { user }, error } = await this.supabase.auth.getUser()
      if (error) {
        return { error: error.message }
      }
      return { user }
    } catch (error) {
      return { error: 'Không thể lấy thông tin user' }
    }
  }

  // Lấy session hiện tại
  async getCurrentSession(): Promise<AuthResponse> {
    try {
      const { data: { session }, error } = await this.supabase.auth.getSession()
      if (error) {
        return { error: error.message }
      }
      return { session }
    } catch (error) {
      return { error: 'Không thể lấy session' }
    }
  }

  // Đổi mật khẩu
  async updatePassword(newPassword: string): Promise<{ error?: string }> {
    try {
      const { error } = await this.supabase.auth.updateUser({
        password: newPassword
      })
      if (error) {
        return { error: error.message }
      }
      return {}
    } catch (error) {
      return { error: 'Có lỗi xảy ra khi đổi mật khẩu' }
    }
  }

  // Reset mật khẩu - GỬI EMAIL
  async resetPassword(email: string, redirectUrl?: string): Promise<{ error?: string }> {
    try {
      const { error } = await this.supabase.auth.resetPasswordForEmail(email, {
        redirectTo: redirectUrl + `/reset-password`
      })
      if (error) {
        return { error: error.message }
      }
      return {}
    } catch (error) {
      return { error: 'Có lỗi xảy ra khi reset mật khẩu' }
    }
  }

  // SET SESSION từ URL hash (cho reset password)
  async setSessionFromUrl(): Promise<AuthResponse> {
    try {
      const hashParams = new URLSearchParams(window.location.hash.substring(1))
      const accessToken = hashParams.get('access_token')
      const refreshToken = hashParams.get('refresh_token')
      
      if (!accessToken || !refreshToken) {
        return { error: 'Token không hợp lệ' }
      }

      const { data, error } = await this.supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      })

      if (error) {
        return { error: error.message }
      }

      return {
        user: data.user,
        session: data.session
      }
    } catch (error) {
      return { error: 'Không thể xác thực session' }
    }
  }

  
}

export const authService = new AuthService()

// Server-side Auth Service
export class ServerAuthService {
  static async getCurrentUser() {
    try {
      const supabase = await createClient()
      const { data: { user }, error } = await supabase.auth.getUser()
      
      if (error) {
        return { error: error.message }
      }
      
      return { user }
    } catch (error) {
      return { error: 'Không thể lấy thông tin user' }
    }
  }

  static async getCurrentSession() {
    try {
      const supabase = await createClient()
      const { data: { session }, error } = await supabase.auth.getSession()
      
      if (error) {
        return { error: error.message }
      }
      
      return { session }
    } catch (error) {
      return { error: 'Không thể lấy session' }
    }
  }
}