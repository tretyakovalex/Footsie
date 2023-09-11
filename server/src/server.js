require('dotenv').config();

// Public Imports
import express from 'express';
import mysql from 'mysql';

// Private Imports
import { countryFill } from './fill-database/continents/base-countries';
import { continent_countries } from './requests/organisation/continent/countries-continent';
import { printJSON } from './requests/api-football/global-functions';

// Temporary Imports
/*
Player Information: getCulbPlayerStatistics
Competition Information: getCountryNameAndFlags, getCompetitionNameandCountries, getLeagueStandings
Clubs: getBasicTeamDetails, getCoachHistory, getClubStanding, getSquadPlayers
*/

import * as player from './requests/api-football/players';
import * as club from './requests/api-football/clubs';
import * as comp from './requests/api-football/competitions';
import * as countries from './requests/organisation/continent/countries-continent';
import { countriesContinentFill } from './requests/organisation/continent/countries';

/*
async function test() {
  const a = await club.getSquadPlayers();
  printJSON(a.dbEntry, 5000);
} 
*/

const app = express();

// ChatGPT TODO:
//    you can create a separate module (e.g., routes.js) to handle all your endpoint definitions.
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
  // countryFill(connection);
  // Fill countries with ID and names. Connection continent and countries
  // countriesContinentFill(connection);

  connection.release();

  app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
  });
});
