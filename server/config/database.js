import pg from 'pg';
import './dotenv.js';

const config = {
    connectionString: process.env.DATABASE_URL,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE
}

const pool = new pg.Pool(config)

export default pool