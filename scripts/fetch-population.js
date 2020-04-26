require('es6-promise').polyfill();
const fetch = require('isomorphic-fetch');
const Papa = require('papaparse');
const fs = require('fs');
const createSlug = require('../utils/createslug');

const url =
  'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/UID_ISO_FIPS_LookUp_Table.csv';

const basepath = __dirname
  .split('/')
  .slice(0, -1)
  .join('/');

fetch(url)
  .then(response => response.text())
  .then(csv => {
    const path = `${basepath}/data/countries-population.json`;
    const options = {
      header: true
    };
    const dataJSON = Papa.parse(csv, options);
    const countriesPopulation = {};
    // eslint-disable-next-line arrow-parens
    dataJSON.data.map(data => {
      if (data.Combined_Key) {
        const countrySlug = createSlug(data.Combined_Key);
        countriesPopulation[countrySlug] = data.Population * 1;
      }
    });
    return fs.writeFileSync(path, JSON.stringify(countriesPopulation));
  });
