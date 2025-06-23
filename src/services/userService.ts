import { ServerDatabaseService, DatabaseResponse } from "./databaseService";

export interface User {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateUserData {
  email: string;
  name: string;
  avatar_url?: string;
}

export interface UpdateUserData {
  name?: string;
  avatar_url?: string;
}

class UserService {
  private readonly tableName = "users";

  // Lấy tất cả users
  async getAllUsers(
    page?: number,
    limit?: number
  ): Promise<DatabaseResponse<User[]>> {
    return ServerDatabaseService.getAll<User>(this.tableName, {
      page,
      limit,
      orderBy: "created_at",
      ascending: false,
    });
  }

  // Lấy user theo ID
  async getUserById(id: string): Promise<DatabaseResponse<User>> {
    return ServerDatabaseService.getById<User>(this.tableName, id);
  }

  // Tạo user mới
  async createUser(userData: CreateUserData): Promise<DatabaseResponse<User>> {
    return ServerDatabaseService.create<User>(this.tableName, userData);
  }

  // Cập nhật user
  async updateUser(
    id: string,
    userData: UpdateUserData
  ): Promise<DatabaseResponse<User>> {
    return ServerDatabaseService.update<User>(this.tableName, id, userData);
  }

  // Xóa user
  async deleteUser(id: string): Promise<DatabaseResponse<null>> {
    return ServerDatabaseService.delete(this.tableName, id);
  }

  // Tìm kiếm user theo email
  async searchUsersByEmail(email: string): Promise<DatabaseResponse<User[]>> {
    return ServerDatabaseService.search<User>(this.tableName, "email", email);
  }

  // Tìm kiếm user theo tên
  async searchUsersByName(name: string): Promise<DatabaseResponse<User[]>> {
    return ServerDatabaseService.search<User>(this.tableName, "name", name);
  }
}

export const userService = new UserService();
