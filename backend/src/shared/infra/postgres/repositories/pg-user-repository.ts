import { PgConnection } from "..";
import { User } from "../../../../modules/user/models/user";
import { UserRepository } from "../../../../modules/user/repositories/user-repository";

export class PgUserRepository implements UserRepository {
  async create(params: Omit<User, "id">): Promise<unknown> {
    const result = await PgConnection.query(
      'INSERT INTO users (full_name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, full_name, email, role',
      [params.full_name, params.email, params.password, params.role]
    );

    return result.rows[0]
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await PgConnection.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    )

    return result.rows[0] as User
  }

  async getMyProfile(id: string): Promise<unknown> {
    const result = await PgConnection.query(
      'SELECT id, full_name, email, role FROM users WHERE id = $1',
      [id]
    )

    return result.rows[0] as User
  }

  async findById(id: string): Promise<User> {
    const result = await PgConnection.query(
      'SELECT * FROM users WHERE id = $1',
      [id]
    )

    return result.rows[0] as User
  }
}
