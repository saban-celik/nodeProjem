//C:\webproje\celikoglu_baklava\backend\config\db.js
const mysql = require('mysql2');
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'celikoglu_baklava_db'
});
module.exports = db;
