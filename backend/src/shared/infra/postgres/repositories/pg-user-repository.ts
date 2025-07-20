import { PgConnection } from "..";
import { User } from "../../../../modules/user/models/user";
import { UpdateParams, UserRepository } from "../../../../modules/user/repositories/user-repository";

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

    const user = result.rows[0] as User

    if (!user) return null

    const device = await PgConnection.query(
      'SELECT * FROM devices WHERE user_id = $1',
      [user.id]
    )

    return {
      ...user,
      device: device.rows[0]
    }
  }

  async findById(id: string): Promise<User> {
    const result = await PgConnection.query(
      'SELECT * FROM users WHERE id = $1',
      [id]
    )

    return result.rows[0] as User
  }

  async update(id: string, params: UpdateParams): Promise<void> {
    if (Object.keys(params).length === 0) {
      return
    }

    const setClauses = Object.keys(params)
      .map((key, index) => `${key} = $${index + 2}`)
      .join(", ")

    const values = [id, ...Object.values(params)]

    const query = `UPDATE users SET ${setClauses} WHERE id = $1`

    await PgConnection.query(query, values)

  }
}
