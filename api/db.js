const mysql = require('mysql')

function dbFn (table = 'blog') {
  const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: table
  })
  return db
}

module.exports = dbFn