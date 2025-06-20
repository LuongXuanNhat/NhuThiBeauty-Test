import { createClient } from '@/lib/supabase/client'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export interface DatabaseResponse<T = any> {
  data?: T
  error?: string
  count?: number
}

export interface QueryOptions {
  page?: number
  limit?: number
  orderBy?: string
  ascending?: boolean
  filters?: Record<string, any>
}

class DatabaseService {
  private supabase = createClient()

  // Lấy tất cả records từ table
  async getAll<T>(
    table: string, 
    options: QueryOptions = {}
  ): Promise<DatabaseResponse<T[]>> {
    try {
      let query = this.supabase.from(table).select('*', { count: 'exact' })

      // Áp dụng filters
      if (options.filters) {
        Object.entries(options.filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            query = query.eq(key, value)
          }
        })
      }

      // Sắp xếp
      if (options.orderBy) {
        query = query.order(options.orderBy, { 
          ascending: options.ascending ?? true 
        })
      }

      // Phân trang
      if (options.page && options.limit) {
        const from = (options.page - 1) * options.limit
        const to = from + options.limit - 1
        query = query.range(from, to)
      }

      const { data, error, count } = await query

      if (error) {
        return { error: error.message }
      }

      return { data: data as T[], count: count || 0 }
    } catch (error) {
      return { error: 'Có lỗi xảy ra khi lấy dữ liệu' }
    }
  }

  // Lấy 1 record theo ID
  async getById<T>(table: string, id: string | number): Promise<DatabaseResponse<T>> {
    try {
      const { data, error } = await this.supabase
        .from(table)
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        return { error: error.message }
      }

      return { data: data as T }
    } catch (error) {
      return { error: 'Có lỗi xảy ra khi lấy dữ liệu' }
    }
  }

  // Tạo mới record
  async create<T>(table: string, data: Partial<T>): Promise<DatabaseResponse<T>> {
    try {
      const { data: result, error } = await this.supabase
        .from(table)
        .insert([data])
        .select()
        .single()

      if (error) {
        return { error: error.message }
      }

      return { data: result as T }
    } catch (error) {
      return { error: 'Có lỗi xảy ra khi tạo dữ liệu' }
    }
  }

  // Cập nhật record
  async update<T>(
    table: string, 
    id: string | number, 
    data: Partial<T>
  ): Promise<DatabaseResponse<T>> {
    try {
      const { data: result, error } = await this.supabase
        .from(table)
        .update(data)
        .eq('id', id)
        .select()
        .single()

      if (error) {
        return { error: error.message }
      }

      return { data: result as T }
    } catch (error) {
      return { error: 'Có lỗi xảy ra khi cập nhật dữ liệu' }
    }
  }

  // Xóa record
  async delete(table: string, id: string | number): Promise<DatabaseResponse<null>> {
    try {
      const { error } = await this.supabase
        .from(table)
        .delete()
        .eq('id', id)

      if (error) {
        return { error: error.message }
      }

      return { data: null }
    } catch (error) {
      return { error: 'Có lỗi xảy ra khi xóa dữ liệu' }
    }
  }

  // Tìm kiếm
  async search<T>(
    table: string, 
    column: string, 
    searchTerm: string,
    options: QueryOptions = {}
  ): Promise<DatabaseResponse<T[]>> {
    try {
      let query = this.supabase
        .from(table)
        .select('*', { count: 'exact' })
        .ilike(column, `%${searchTerm}%`)

      // Sắp xếp
      if (options.orderBy) {
        query = query.order(options.orderBy, { 
          ascending: options.ascending ?? true 
        })
      }

      // Phân trang
      if (options.page && options.limit) {
        const from = (options.page - 1) * options.limit
        const to = from + options.limit - 1
        query = query.range(from, to)
      }

      const { data, error, count } = await query

      if (error) {
        return { error: error.message }
      }

      return { data: data as T[], count: count || 0 }
    } catch (error) {
      return { error: 'Có lỗi xảy ra khi tìm kiếm' }
    }
  }
}

export const databaseService = new DatabaseService()

// Server-side Database Service
export class ServerDatabaseService {
  static async getAll<T>(
    table: string, 
    options: QueryOptions = {}
  ): Promise<DatabaseResponse<T[]>> {
    try {
      const supabase = await createServerSupabaseClient()
      let query = supabase.from(table).select('*', { count: 'exact' })

      // Áp dụng filters
      if (options.filters) {
        Object.entries(options.filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            query = query.eq(key, value)
          }
        })
      }

      // Sắp xếp
      if (options.orderBy) {
        query = query.order(options.orderBy, { 
          ascending: options.ascending ?? true 
        })
      }

      // Phân trang
      if (options.page && options.limit) {
        const from = (options.page - 1) * options.limit
        const to = from + options.limit - 1
        query = query.range(from, to)
      }

      const { data, error, count } = await query

      if (error) {
        return { error: error.message }
      }

      return { data: data as T[], count: count || 0 }
    } catch (error) {
      return { error: 'Có lỗi xảy ra khi lấy dữ liệu' }
    }
  }

  static async getById<T>(table: string, id: string | number): Promise<DatabaseResponse<T>> {
    try {
      const supabase = await createServerSupabaseClient()
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        return { error: error.message }
      }

      return { data: data as T }
    } catch (error) {
      return { error: 'Có lỗi xảy ra khi lấy dữ liệu' }
    }
  }
}