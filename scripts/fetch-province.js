require('es6-promise').polyfill();
const fetch = require('isomorphic-fetch');
const fs = require('fs');

const baseurl =
  'https://services5.arcgis.com/VS6HdKS0VfIhv8Ct/arcgis/rest/services/COVID19_Indonesia_per_Provinsi/FeatureServer/0/query';
const url = `${baseurl}?where=1=1&f=json&outFields=*`;
const urlInfo =
  'https://services5.arcgis.com/VS6HdKS0VfIhv8Ct/ArcGIS/rest/services/COVID19_Indonesia_per_Provinsi/FeatureServer/0?f=pjson';

const basepath = __dirname
  .split('/')
  .slice(0, -1)
  .join('/');

fetch(url)
  .then(response => response.json())
  .then(json => {
    const path = `${basepath}/data/province.json`;
    return fs.writeFileSync(path, JSON.stringify(json));
  });

fetch(urlInfo)
  .then(response => response.json())
  .then(json => {
    const path = `${basepath}/data/province-information.json`;
    return fs.writeFileSync(path, JSON.stringify(json));
  });
