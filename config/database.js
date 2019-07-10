console.table({
  host:     process.env.DB_HOST,
  user:     process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port:     process.env.DB_PORT
});

const knex = require('knex')(
    {
        client: 'postgresql',
        connection: {
          host:     process.env.DB_HOST,
          user:     process.env.DB_USER,
          password: process.env.DB_PASS,
          database: process.env.DB_NAME,
          port:     process.env.DB_PORT
        },
        searchPath: [process.env.DB_SEARCHPATH],
        pool: {
          min: 2,
          max: 10
        },
        acquireConnectionTimeout: parseInt(process.env.DB_TIMEOUT) || 5000,
        requestTimeout: parseInt(process.env.DB_TIMEOUT) || 5000,
        connectionTimeout: parseInt(process.env.DB_TIMEOUT) || 5000,
        migrations: {
            tableName: 'knex_migrations',
            directory: `../db/migrations`
        },
        seeds: {
            directory: `../db/seeds`
        }
    }
)

if(process.env.ENV === "development"){
  knex.on('query', (q) => {console.log("QUERY_LOG: "+q.sql)});
}

module.exports = knex
