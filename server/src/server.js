require('dotenv').config();

// Public Imports
import express from 'express';
import mysql from 'mysql';

// Private Imports
import { countryFill } from './fill-database/competition';


const app = express();

// TODO: endpoints will be initialized here


app.get('/', (req, res) => {
  res.send('Hello World!');
});

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;
const database = mysql.createPool({
  connectionLimit: 10,
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
});

const PORT = process.env.PORT;
database.getConnection((err, connection) => {
  if (err) {
    console.error(`Error connecting to database: ${err.code}`);
    process.exit(1);
  }
  console.log('Connected to database');

  // API and Data integration

  // Fill basic country information
  countryFill(connection);

  connection.release();

  app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
  });
});
