require('es6-promise').polyfill();
const fetch = require('isomorphic-fetch');
const Papa = require('papaparse');
const fs = require('fs');
const dayjs = require('dayjs');
const thelist = require('../utils/thelist');
const createSlug = require('../utils/createslug');

const allowableCountry = [];
const countryDisplayName = {};
thelist.map(listItem => {
  if (listItem.type === 'country') {
    countryDisplayName[listItem.label] = listItem.display || listItem.label;
    allowableCountry.push(listItem.label);
  }
});

const deathUrl =
  'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv';
const confirmedUrl =
  'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv';
const recoveredUrl =
  'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv';

const cleanupData = raw => {
  const newData = {};
  raw.data.map(itemRaw => {
    const newFormatted = itemRaw;
    const currentCountry = newFormatted['Country/Region'];
    if (newData[currentCountry]) {
      Object.keys(newData[currentCountry]).map(function(key) {
        if (key === 'Province/State') return null;
        if (key === 'Country/Region') return null;
        if (key === 'Lat') return null;
        if (key === 'Long') return null;
        newData[currentCountry][key] =
          newData[currentCountry][key] * 1 + newFormatted[key] * 1;
      });
    } else {
      newData[currentCountry] = newFormatted;
    }
  });
  const arrayData = Object.keys(newData).map(key => {
    return newData[key];
  });
  raw.data = arrayData;
  return raw;
};

Promise.all([
  fetch(confirmedUrl)
    .then(response => response.text())
    .then(csv => csv),
  fetch(recoveredUrl)
    .then(response => response.text())
    .then(csv => csv),
  fetch(deathUrl)
    .then(response => response.text())
    .then(csv => csv)
]).then(function(values) {
  const [confirmedCSV, recoveredCSV, deathCSV] = values;
  const options = {
    header: true
  };
  const rawConfirmedJSON = Papa.parse(confirmedCSV, options);
  const rawRecoveredJSON = Papa.parse(recoveredCSV, options);
  const rawDeathJSON = Papa.parse(deathCSV, options);

  const confirmedJSON = cleanupData(rawConfirmedJSON);
  const recoveredJSON = cleanupData(rawRecoveredJSON);
  const deathJSON = cleanupData(rawDeathJSON);

  const countriesLocation = {};
  const finalData = {};
  confirmedJSON.data.map(function(country) {
    if (allowableCountry.includes(country['Country/Region'])) {
      const total = 0;
      const countrySlug = createSlug(country['Country/Region']);
      finalData[countrySlug] = {
        name: countryDisplayName[country['Country/Region']],
        data: {}
      };
      let previousDay = 0;
      countriesLocation[countrySlug] = [country.Lat * 1, country.Long * 1];
      Object.keys(country).map(function(key) {
        if (key === 'Province/State') return null;
        if (key === 'Country/Region') return null;
        if (key === 'Lat') return null;
        if (key === 'Long') return null;
        if (total === 0 && country[key] === '0') return null;

        let newTotal;
        if (Object.keys(finalData[countrySlug].data).length < 0) {
          newTotal =
            country[key] * 1 + finalData[countrySlug].data[key].confirmedTotal;
        } else {
          newTotal = country[key] * 1;
        }
        finalData[countrySlug].data[key] = {
          FID: key,
          date: dayjs(key, 'M/D/YY').valueOf(),
          confirmedDaily: newTotal - previousDay,
          confirmedTotal: newTotal,
          recoveredDaily: 0,
          recoveredTotal: 0,
          deathDaily: 0,
          deathTotal: 0
        };
        previousDay = newTotal;
      });
    }
  });
  recoveredJSON.data.map(function(country) {
    if (allowableCountry.includes(country['Country/Region'])) {
      const total = 0;
      const countrySlug = createSlug(country['Country/Region']);
      let previousDay = 0;
      Object.keys(country).map(function(key) {
        if (key === 'Province/State') return null;
        if (key === 'Country/Region') return null;
        if (key === 'Lat') return null;
        if (key === 'Long') return null;
        if (total === 0 && country[key] === '0') return null;
        let newTotal;
        if (Object.keys(finalData[countrySlug].data).length < 0) {
          newTotal =
            country[key] * 1 + finalData[countrySlug].data[key].recoveredTotal;
        } else {
          newTotal = country[key] * 1;
        }
        if (finalData[countrySlug].data[key]) {
          finalData[countrySlug].data[key].recoveredDaily =
            newTotal - previousDay;
          finalData[countrySlug].data[key].recoveredTotal = newTotal;
          previousDay = newTotal;
        }
      });
    }
  });
  deathJSON.data.map(function(country) {
    if (allowableCountry.includes(country['Country/Region'])) {
      const total = 0;
      const countrySlug = createSlug(country['Country/Region']);
      let previousDay = 0;
      Object.keys(country).map(function(key) {
        if (key === 'Province/State') return null;
        if (key === 'Country/Region') return null;
        if (key === 'Lat') return null;
        if (key === 'Long') return null;
        if (total === 0 && country[key] === '0') return null;
        let newTotal;
        if (Object.keys(finalData[countrySlug].data).length < 0) {
          newTotal =
            country[key] * 1 + finalData[countrySlug].data[key].deathTotal;
        } else {
          newTotal = country[key] * 1;
        }
        finalData[countrySlug].data[key].deathDaily = newTotal - previousDay;
        finalData[countrySlug].data[key].deathTotal = newTotal;
        previousDay = newTotal;
      });
    }
  });
  const dataWithArray = {};
  Object.keys(finalData).map(keyItem => {
    dataWithArray[keyItem] = {
      name: finalData[keyItem].name,
      data: Object.keys(finalData[keyItem].data).map(dateKey => {
        return {
          attributes: finalData[keyItem].data[dateKey]
        };
      })
    };
  });
  const basepath = __dirname
    .split('/')
    .slice(0, -1)
    .join('/');
  const path = `${basepath}/data/countries.json`;
  const pathLocation = `${basepath}/data/countries-location.json`;

  fs.writeFileSync(pathLocation, JSON.stringify(countriesLocation));
  return fs.writeFileSync(path, JSON.stringify(dataWithArray));
});
