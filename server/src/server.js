require('dotenv').config();

// Public Imports
import express from 'express';
import mysql from 'mysql';

// Private Imports
// Continent Fill Section
import { countryFill } from './fill-database/continents/base-countries';
import { countriesContinentFill } from './fill-database/continents/countries';
import { competitionFill } from './fill-database/continents/fillCompetitions';

// League Fill Section
import { fillTeamsDatabase } from './fill-database/league/fill-teams';
import { fillLeagueRankingsDatabase } from './fill-database/league/fill-league-rankings';

import { printJSON } from './requests/api-football/global-functions';
import { getTeamID, gatherPlayerInformation, organisePlayerStatistics, getPlayerKitNumber } from './requests/api-football/organisePlayers';

import { getPlayerDetails } from './requests/organisation/players/players';

// TODO:
//    Look to globalise the SELECT .... from Database
//    Only the [query, connection, error_message, formatResponse] changes

const app = express();

// ChatGPT TODO:
//    you can create a separate module (e.g., routes.js) to handle all your endpoint definitions.
// TODO: endpoints will be initialized here


app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Continents Databse Configuartions
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD } = process.env;
// Return a connection pool based on database name
const databaseConnection = databaseName => {
  return mysql.createPool({
    connectionLimit: 10,
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    database: databaseName,
  })
}

// Connect to continents database
const continentsDatabase = databaseConnection('continents');
// Connect to leagues database
const leaguesDatabase = databaseConnection('leagues');
// Connect to players database
const playersDatabase = databaseConnection('players');
// Connect to teams database
const teamsDatabase = databaseConnection('teams');


const PORT = process.env.PORT;

// Connect to the database and execute nessercary queries
async function executeConnection(database, dbName, executeQueries) {
  return new Promise((resolve, reject) => {
    database.getConnection((err, connection) => {
      if (err) {
        // Error with conencting to the database
        console.error(`Error: Problem with connecting to the ${dbName} database.`);
        return reject(err);
      }

      // Going to use a function to execute my queries
      executeQueries(connection)

      // Release connection
      connection.release();

      // For future use
      app.listen(PORT, () => {
        console.log(`LISTENING ON http://localhost:${PORT}`);
      });

      // Display completion of database calls
      resolve(`${dbName} has served it's purpose`);
    });
  });
};

// Execute all queries relating to the continents database
async function continentQueries(dbConnection) {
   // Fill basic country information
  await countryFill(dbConnection);
  
  // Fill countries with ID and names. Connection continent and countries
  await countriesContinentFill(dbConnection);

  // Fill competitions with cups and leagues
  await competitionFill(dbConnection)
}
// Execute continent database queries
// executeConnection(continentsDatabase, "continents", continentQueries);


// Execute all queries relating to the league database
async function leaguesQueries(dbConnection) {
  // Add all teams available to the teams Table
  // Takes 22 Mins To Complete
  // fillTeamsDatabase(dbConnection, continentsDatabase);

  // Connect League and Teams. + Get each team ranking.
  // fillLeagueRankingsDatabase(dbConnection, continentsDatabase)

  // await getPlayerDetails();
}
// Execute leagues database queries
executeConnection(leaguesDatabase, 'leagues', leaguesQueries);

async function playerQueries(dbConnection) {

}

async function teamsQueries(dbConnection) {
  
}


// TODO:
//    Create a big bunch of data
//    Organise it for the database
//    Set Into Database