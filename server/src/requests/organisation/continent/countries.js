import { continentsAndCountriesDB } from "./countries-continent";

// Fills the country database (MySQL)
// Country Name, Id and Continent Name, ID
export const countriesContinentFill = async (dbConnection) => {
    try {
        // Recieve and organise API and DB response
        const databaseInformation = await continentsAndCountriesDB(dbConnection);
        let errorChecker = false;

        for (let i = 0; i < databaseInformation.length && !errorChecker; i++) {
            // Direct access to each country
            const country = databaseInformation[i];

            const query = 'INSERT INTO countries (country_id, country_name, continent_id, flag) VALUES (?,?,?,?)';
            // Try add to the database
            try {
                await dbConnection.query(query, [
                    country.countryID,
                    country.countryName,
                    country.continentID,
                    country.flag
                ]);
                console.log(`${i}: Inserted ${country.countryName}`);
            } catch (err) {
                console.error('Problem with inserting into the table. (countries.js)');
            }
        }
        

    } catch (err) {
        console.err(`Error with API call -  MySql: (countries.js). ${err}`);
    }
}