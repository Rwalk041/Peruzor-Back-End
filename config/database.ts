import path from "path";

export default ({ env }) => {
  // Set the database client to 'postgres' to use the PostgreSQL database
  const client = "postgres";

  const connections = {
    postgres: {
      connection: {
        // Use DATABASE_URL for connection string if it's provided
        connectionString: env(
          "DATABASE_URL",
          // "postgresql://postgres:lkNTVAiulAKJQgtDGQuhftmvjJAFyaIA@autorack.proxy.rlwy.net:19173/railway"
          "postgresql://postgres:StRCjagLBLHUlbggNXvmLgAUqxPqpKfT@autorack.proxy.rlwy.net:19173/railway"
        ),
        ssl: {
          rejectUnauthorized: env.bool(
            "DATABASE_SSL_REJECT_UNAUTHORIZED",
            false
          ), // Adjust this as needed
        },
        schema: env("DATABASE_SCHEMA", "public"),
      },
      pool: {
        min: env.int("DATABASE_POOL_MIN", 2),
        max: env.int("DATABASE_POOL_MAX", 10),
      },
    },
  };

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: env.int("DATABASE_CONNECTION_TIMEOUT", 60000),
    },
  };
};

// connection: {
//   host: env("DATABASE_HOST", "postgres.railway.internal"), // Replace with your Railway host
//   port: env.int("DATABASE_PORT", 5432), // Default PostgreSQL port
//   database: env("DATABASE_NAME", "your-database-name"), // Replace with your database name
//   user: env("DATABASE_USERNAME", "postgres"), // Replace with your database username
//   password: env("DATABASE_PASSWORD", "BCfubZEjqsNMVCuESfMOohsiPoHbktyC"), // Replace with your password
//   ssl: { rejectUnauthorized: false },
//   schema: env("DATABASE_SCHEMA", "public"),
// },
// import path from 'path';

// export default ({ env }) => {
//   const client = env('DATABASE_CLIENT', 'sqlite');

//   const connections = {
//     mysql: {
//       connection: {
//         host: env('DATABASE_HOST', 'localhost'),
//         port: env.int('DATABASE_PORT', 3306),
//         database: env('DATABASE_NAME', 'strapi'),
//         user: env('DATABASE_USERNAME', 'strapi'),
//         password: env('DATABASE_PASSWORD', 'strapi'),
//         ssl: env.bool('DATABASE_SSL', false) && {
//           key: env('DATABASE_SSL_KEY', undefined),
//           cert: env('DATABASE_SSL_CERT', undefined),
//           ca: env('DATABASE_SSL_CA', undefined),
//           capath: env('DATABASE_SSL_CAPATH', undefined),
//           cipher: env('DATABASE_SSL_CIPHER', undefined),
//           rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', true),
//         },
//       },
//       pool: { min: env.int('DATABASE_POOL_MIN', 2), max: env.int('DATABASE_POOL_MAX', 10) },
//     },
//     postgres: {
//       connection: {
//         connectionString: env('DATABASE_URL'),
//         host: env('DATABASE_HOST', 'localhost'),
//         port: env.int('DATABASE_PORT', 5432),
//         database: env('DATABASE_NAME', 'strapi'),
//         user: env('DATABASE_USERNAME', 'strapi'),
//         password: env('DATABASE_PASSWORD', 'strapi'),
//         ssl: env.bool('DATABASE_SSL', false) && {
//           key: env('DATABASE_SSL_KEY', undefined),
//           cert: env('DATABASE_SSL_CERT', undefined),
//           ca: env('DATABASE_SSL_CA', undefined),
//           capath: env('DATABASE_SSL_CAPATH', undefined),
//           cipher: env('DATABASE_SSL_CIPHER', undefined),
//           rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', true),
//         },
//         schema: env('DATABASE_SCHEMA', 'public'),
//       },
//       pool: { min: env.int('DATABASE_POOL_MIN', 2), max: env.int('DATABASE_POOL_MAX', 10) },
//     },
//     sqlite: {
//       connection: {
//         filename: path.join(__dirname, '..', '..', env('DATABASE_FILENAME', '.tmp/data.db')),
//       },
//       useNullAsDefault: true,
//     },
//   };

//   return {
//     connection: {
//       client,
//       ...connections[client],
//       acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60000),
//     },
//   };
// };
