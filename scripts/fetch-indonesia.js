require('es6-promise').polyfill();
const fetch = require('isomorphic-fetch');
const fs = require('fs');
const dayjs = require('dayjs');
require('dayjs/locale/id');
dayjs.locale('id');

const today = dayjs().format('YYYY-MM-DD');
const baseurl =
  'https://services5.arcgis.com/VS6HdKS0VfIhv8Ct/ArcGIS/rest/services/Statistik_Perkembangan_COVID19_Indonesia/FeatureServer/0/query';
const url = `${baseurl}?where=Tanggal%3C=timestamp%20%27${today}%2016:59:59%27&f=json&outFields=*`;

const basepath = __dirname
  .split('/')
  .slice(0, -1)
  .join('/');

fetch(url)
  .then(response => response.json())
  .then(json => {
    const path = `${basepath}/data/indonesia.json`;
    return fs.writeFileSync(path, JSON.stringify(json));
  });

// save built time
const builtTime = dayjs().format('dddd, MMMM D, YYYY HH:mm:ss');
const path = `${basepath}/data/built-info.json`;
fs.writeFileSync(
  path,
  JSON.stringify({
    time: builtTime
  })
);
