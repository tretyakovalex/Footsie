import { CountryNameAndFlags, CupNameAndCountry } from './competitions';

// Test Competition API's
describe("Information on contries and competititons", () => {
    test('Country Names and Logos', async () => {
        const country = await CountryNameAndFlags();
        expect(country).toBe("Albania");
    });

    test('Cup Names and Countries', async () => {
        const cups = await CupNameAndCountry();
        expect(cups).toBe("Euro Championship World")
    })
})


// Test Clubs API;s



// Test Player API's