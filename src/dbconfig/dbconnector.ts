// import { Pool } from 'pg';

// const pool = new Pool ({
//     max: 20,
//     //connectionString: 'postgres://root:newPassword@localhost:port/dbname',
//     connectionString: 'postgres://postgres:test123@localhost:5432/assignment-db',
//     idleTimeoutMillis: 30000
// });

// export default pool;

// const dotenv = require('dotenv');
// dotenv.config();
// const env = process.env;

export default {
    db_host: process.env.PSQL_HOST || "localhost",
    db_user_name: process.env.POSTGRES_USER || 'postgres',
    db_password: 'test123',
    db_name: process.env.POSTGRES_DB || 'assignment-db',
    db_dialect: 'postgres',
    db_pool: {
        max: 5,
        min: 0,
        acquire: 0,
        idle: 0,
    },
    db_port: 5432,
};