import { Pool } from 'pg'

export class PgConnection {
  private static pool: Pool

  static async connect() {
    if (!PgConnection.pool) {
      PgConnection.pool = new Pool({
        max: 10,
        min: 5,
        user: process.env.POSTGRES_USER,
        host: process.env.POSTGRES_HOST,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        ssl: {
          rejectUnauthorized: false,
        },
      });
    }

    const client = await PgConnection.pool.connect();

    console.log('Conexão com o PostgreSQL estabelecida com sucesso');

    client.release();

    return PgConnection.pool
  }

  static getPool(): Pool {
    if (!PgConnection.pool) {
      throw new Error('Pool não inicializada. Chame PgConnection.connect() primeiro.')
    }

    return PgConnection.pool
  }

  static async query(text: string, params?: any[]): Promise<{ rows: unknown[] }> {
    const pool = PgConnection.getPool()

    return pool.query(text, params)
  }
}
