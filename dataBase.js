const { connect } = require('http2');
const mysql = require('mysql2');

const conection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Admn1234',
    database: 'sesi'
});

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar com o database:', err);
        return;
    } console.log('Connectado ao database!');
});

module.exports = connection;