require('es6-promise').polyfill();
const fetch = require('isomorphic-fetch');
const fs = require('fs');

const baseurl =
  'https://services5.arcgis.com/VS6HdKS0VfIhv8Ct/arcgis/rest/services/COVID19_Indonesia_per_Provinsi/FeatureServer/0/query';
const url = `${baseurl}?where=1=1&f=json&outFields=*`;

fetch(url)
  .then(response => response.json())
  .then(json => {
    const basepath = __dirname
      .split('/')
      .slice(0, -1)
      .join('/');
    const path = `${basepath}/data/province.json`;
    return fs.writeFileSync(path, JSON.stringify(json));
  });
