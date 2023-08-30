require('dotenv').config();

import express from 'express';
import mysql from 'mysql';
import * as player from './requests/api-football/competitions';

const app = express();

// TODO: endpoints will be initialized here
const test = async () => {
  try {
    const response = await player.getCountryNameAndFlags();
    const countries = response.countries;

    // Iterate through each key-value pair in the object
    for (const countryName in countries) {
      if (countries.hasOwnProperty(countryName)) {
        const countryInfo = countries[countryName];
        const { countryURL, countryTag } = countryInfo;

        // Insert the data into the database
        const query = `INSERT INTO countries (countryName, countryURL, countryTag) VALUES (?, ?, ?)`;
        database.query(query, [countryName, countryURL, countryTag], (err, result) => {
          if (err) {
            console.error(`Error inserting data into database: ${err}`);
          } else {
            console.log(`Inserted data into database: ${result.insertId}`);
          }
        });
      }
    }

    return countries;
  } catch (err) {
    console.error("Error with API call");
  }
};

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;
const database = mysql.createConnection({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
});

const PORT = process.env.PORT;
database.connect((err) => {
  if (err) {
    console.error(`Error connecting to database: ${err.code}`);
    process.exit(1);
  }
  console.log('Connected to database');

  app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
  });
});
