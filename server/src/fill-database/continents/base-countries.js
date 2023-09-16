import * as validation from '../../requests/organisation/continent/validate-countries';

// getCountryNameAndFlags
// Fill MySQL DB with countries, IDs and flags
export const countryFill = async (dbConnection) => {
  try {
    const result = await validation.validateCountries();

    const countries = result.validData;
    console.log("QUESTIONABLE RESULTS:", result.questionableData);

    let errorChecker = false;

    if (countries.length > 0) {
      for (let i = 0; i < countries.length && !errorChecker; i++) {
        const country = countries[i];
        const countryName = Object.keys(country)[0];
        const { countryFlag: flag, countryTag: tag } = country[countryName];

        const query =
          'INSERT INTO base_countries (country_name, country_flag, country_tag) VALUES (?,?,?)';

        try {
          await dbConnection.query(query, [countryName, flag, tag]);
          console.log(`${i}: Inserted ${countryName}`);
        } catch (err) {
          console.error(`Problem inserting data into database: Error: ${err}`);
          errorChecker = true;
        }
      }
    }
  } catch (err) {
    console.error("Error with API call - MySQL: (base-countries.js)", err);
  }
};
