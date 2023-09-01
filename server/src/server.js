require('dotenv').config();

import express from 'express';
import mysql from 'mysql';
import * as comp from './requests/api-football/competitions';
import * as players from './requests/api-football/players';

// TESTING SOCCERFOOTBALL CALL
import * as testing from './requests/soccerfootball-info/countries';

const app = express();

// TODO: endpoints will be initialized here
const test = async () => {
  try {
    // Test country name, flags and tag
    // const response = await comp.getCountryNameAndFlags();
    // const countries = response.countries;
    // let errorInserting = false;

    // Testing API call with other API
    const experiment = testing.getCountryData("database");

    /* Get country name, flag,tag and add to database
    for (const countryName in countries) {
      if (countries.hasOwnProperty(countryName)) {
        const countryInfo = countries[countryName];
        const { countryFlag: countryFlag, countryTag: countryTag } = countryInfo;

        // Insert the data into the database
        if (!errorInserting) {
          const query = `INSERT INTO test_countries (country_name, country_flag, country_tag) VALUES (?, ?, ?)`;
          database.query(query, [countryName, countryFlag, countryTag], (err, result) => {
            if (err) {
              console.error(`Error inserting data into database: ${err}`);
              errorInserting = true; // Abort further insertions
            } else {
              console.log(`Inserted data into database: ${result.insertId}`);
            }
          });
        }
      }
    } */

    // return countries;
  } catch (err) {
    console.error("Error with API call", err);
  }
};


// test();

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
