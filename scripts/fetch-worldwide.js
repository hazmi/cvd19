require('es6-promise').polyfill();
const fetch = require('isomorphic-fetch');
const fs = require('fs');
const dayjs = require('dayjs');
require('dayjs/locale/id');
dayjs.locale('id');

const deathUrl =
  'https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases/FeatureServer/1/query?f=json&where=Confirmed%20%3E%200&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&outStatistics=%5B%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22Deaths%22%2C%22outStatisticFieldName%22%3A%22value%22%7D%5D&outSR=102100&resultType=standard&cacheHint=true';
const confirmedUrl =
  'https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases/FeatureServer/1/query?f=json&where=Confirmed%20%3E%200&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&outStatistics=%5B%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22Confirmed%22%2C%22outStatisticFieldName%22%3A%22value%22%7D%5D&outSR=102100&resultType=standard&cacheHint=true';
const recoveredUrl =
  'https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases/FeatureServer/1/query?f=json&where=Confirmed%20%3E%200&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&outStatistics=%5B%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22Recovered%22%2C%22outStatisticFieldName%22%3A%22value%22%7D%5D&outSR=102100&resultType=standard&cacheHint=true';

const infoUrl =
  'https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases/FeatureServer/1/?f=json';

Promise.all([
  fetch(confirmedUrl)
    .then(response => response.json())
    .then(json => json),
  fetch(recoveredUrl)
    .then(response => response.json())
    .then(json => json),
  fetch(deathUrl)
    .then(response => response.json())
    .then(json => json),
  fetch(infoUrl)
    .then(response => response.json())
    .then(json => json)
]).then(function(values) {
  const [confirmedJSON, recoveredJSON, deathJSON, infoJSON] = values;
  const data = {
    confirmed: confirmedJSON.features[0].attributes.value,
    recovered: recoveredJSON.features[0].attributes.value,
    deaths: deathJSON.features[0].attributes.value,
    date: dayjs(infoJSON.editingInfo.lastEditDate).format('dddd, MMMM D, YYYY')
  };

  const basepath = __dirname
    .split('/')
    .slice(0, -1)
    .join('/');
  const path = `${basepath}/data/worldwide.json`;

  return fs.writeFileSync(path, JSON.stringify(data));
});
