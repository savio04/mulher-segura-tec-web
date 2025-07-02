import { User } from "../models/user";

export abstract class UserRepository {
  abstract create(params: Omit<User, "id">): Promise<unknown>
  abstract findByEmail(email: string): Promise<User | null>
  abstract getMyProfile(id: string): Promise<unknown>
  abstract findById(id: string): Promise<User>
}
