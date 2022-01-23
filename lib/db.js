
const mysql = require('mysql');
const dotenv = require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
});

connection.connect();

module.exports = connection;