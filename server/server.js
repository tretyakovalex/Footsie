import express from 'express';
import mysql from 'mysql';
import * as player from '../src/api/requests/api-football/competitions.js';

const app = express();
const database = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: process.env.MYSQL_PASS,
    database: 'continents'
});


database.connect(err => {
    if (err) {
        console.error(`Error connecting to server: ${err}`);
    } else {
        console.log("Connected to database");
        app.listen(5000, () => {console.log("Server Connected")});
    };

});