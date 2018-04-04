const mysql = require('mysql');
const db = mysql.createConnection({
  host    : 'localhost',
  user    : 'site_admin',
  password: '123456',
  database: 'blogging_schema'
});

db.connect((err) => {
  if(err){
     throw err;
  }
  console.log('MySql Connected...');
});

module.exports = db;