import { createServerSupabaseClient } from "@/lib/supabase/server";

export interface DatabaseResponse<T = any> {
  data?: T;
  error?: string;
  count?: number;
}

export interface QueryOptions {
  page?: number;
  limit?: number;
  orderBy?: string;
  ascending?: boolean;
  filters?: Record<string, any>;
}

// Server-side Database Service
export class ServerDatabaseService {
  static async getAll<T>(
    table: string,
    options: QueryOptions = {}
  ): Promise<DatabaseResponse<T[]>> {
    try {
      const supabase = await createServerSupabaseClient();
      let query = supabase.from(table).select("*", { count: "exact" });

      // Áp dụng filters
      if (options.filters) {
        Object.entries(options.filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            query = query.eq(key, value);
          }
        });
      }

      // Sắp xếp
      if (options.orderBy) {
        query = query.order(options.orderBy, {
          ascending: options.ascending ?? true,
        });
      }

      // Phân trang
      if (options.page && options.limit) {
        const from = (options.page - 1) * options.limit;
        const to = from + options.limit - 1;
        query = query.range(from, to);
      }

      const { data, error, count } = await query;

      if (error) {
        return { error: error.message };
      }

      return { data: data as T[], count: count || 0 };
    } catch (error) {
      return { error: "Có lỗi xảy ra khi lấy dữ liệu" };
    }
  }

  static async getById<T>(
    table: string,
    id: string | number
  ): Promise<DatabaseResponse<T>> {
    try {
      const supabase = await createServerSupabaseClient();
      const { data, error } = await supabase
        .from(table)
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        return { error: error.message };
      }

      return { data: data as T };
    } catch (error) {
      return { error: "Có lỗi xảy ra khi lấy dữ liệu" };
    }
  }
  // Thêm vào đầu function để debug
  static async create<T>(
    table: string,
    data: Partial<T>
  ): Promise<DatabaseResponse<T>> {
    try {
      const supabase = await createServerSupabaseClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        return { error: "User not authenticated" };
      }

      // ✅ Lọc bỏ tất cả undefined/null values
      const cleanData = Object.fromEntries(
        Object.entries(data).filter(
          ([_, value]) => value !== undefined && value !== null && value !== ""
        )
      );

      console.log("Clean insert data:", cleanData);

      const { createClient } = require("@supabase/supabase-js");
      const serviceClient = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      );

      const {
        data: result,
        error,
        status,
      } = await serviceClient.from(table).insert([cleanData]).select();

      if (error) {
        console.error("Database error:", error);
        return {
          error: error.message || "Insert failed",
        };
      }

      if (!result || result.length === 0) {
        return { error: "No data returned from insert" };
      }

      return { data: result[0] as T };
    } catch (error: any) {
      console.error("Create error:", error);
      return { error: error.message || "Database error" };
    }
  }

  static async update<T>(
    table: string,
    id: string | number,
    data: Partial<T>
  ): Promise<DatabaseResponse<T>> {
    try {
      const supabase = await createServerSupabaseClient();
      const { data: result, error } = await supabase
        .from(table)
        .update(data)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        return { error: error.message };
      }

      return { data: result as T };
    } catch (error) {
      return { error: "Có lỗi xảy ra khi cập nhật dữ liệu" };
    }
  }

  static async delete(
    table: string,
    id: string | number
  ): Promise<DatabaseResponse<null>> {
    try {
      const supabase = await createServerSupabaseClient();
      const { error } = await supabase.from(table).delete().eq("id", id);

      if (error) {
        return { error: error.message };
      }

      return { data: null };
    } catch (error) {
      return { error: "Có lỗi xảy ra khi xóa dữ liệu" };
    }
  }

  // Tìm kiếm
  static async search<T>(
    table: string,
    column: string,
    searchTerm: string,
    options: QueryOptions = {}
  ): Promise<DatabaseResponse<T[]>> {
    try {
      const supabase = await createServerSupabaseClient();
      let query = supabase
        .from(table)
        .select("*", { count: "exact" })
        .ilike(column, `%${searchTerm}%`);

      // Sắp xếp
      if (options.orderBy) {
        query = query.order(options.orderBy, {
          ascending: options.ascending ?? true,
        });
      }

      // Phân trang
      if (options.page && options.limit) {
        const from = (options.page - 1) * options.limit;
        const to = from + options.limit - 1;
        query = query.range(from, to);
      }

      const { data, error, count } = await query;

      if (error) {
        return { error: error.message };
      }

      return { data: data as T[], count: count || 0 };
    } catch (error) {
      return { error: "Có lỗi xảy ra khi tìm kiếm" };
    }
  }
}
