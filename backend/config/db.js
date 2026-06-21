const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'qlhomestay'
});

connection.connect((err) => {
    if (err) {
        console.log("❌ Kết nối thất bại:", err);
    } else {
        console.log("✅ Kết nối MySQL thành công!");
    }
});

module.exports = connection;
