require('es6-promise').polyfill();
const fetch = require('isomorphic-fetch');
const fs = require('fs');
const dayjs = require('dayjs');
const Calendar = require('dayjs/plugin/calendar');
require('dayjs/locale/id');
dayjs.locale('id');
dayjs.extend(Calendar);

const FID = 'x';
const CONFIRMED_DAILY = 'a';
const CONFIRMED_TOTAL = 'b';
const RECOVERED_DAILY = 'c';
const RECOVERED_TOTAL = 'd';
const DEATH_DAILY = 'e';
const DEATH_TOTAL = 'f';
const FORMATTED_DATE = 't';
const RELATIVE_DATE = 'r';
const CONFIRMED_PERCENT_DAILY = 'h';
const CONFIRMED_PERCENT_TOTAL = 'i';
const RECOVERED_PERCENT_DAILY = 'j';
const RECOVERED_PERCENT_TOTAL = 'k';
const DEATH_PERCENT_DAILY = 'l';
const DEATH_PERCENT_TOTAL = 'm';

const today = dayjs().format('YYYY-MM-DD');
const baseurl =
  'https://services5.arcgis.com/VS6HdKS0VfIhv8Ct/ArcGIS/rest/services/Statistik_Perkembangan_COVID19_Indonesia/FeatureServer/0/query';
const url = `${baseurl}?where=Tanggal%3C=timestamp%20%27${today}%2016:59:59%27&f=json&outFields=*`;

const basepath = __dirname
  .split('/')
  .slice(0, -1)
  .join('/');

const cleanupJSONsource = data => {
  const result = [];
  data.map(item => {
    if (item.attributes.Jumlah_Kasus_Kumulatif !== null) {
      result.push(item);
    }
  });
  result.sort((a, b) => a.attributes.Hari_ke - b.attributes.Hari_ke);
  return result;
};

fetch(url)
  .then(response => response.json())
  .then(json => {
    const path = `${basepath}/data/indonesia.json`;
    // let jsonToParseNotSorted = json.features;
    // let lastItem =
    //   jsonToParseNotSorted[jsonToParseNotSorted.length - 1].attributes;
    // if (lastItem.Jumlah_Kasus_Kumulatif === null) {
    //   lastItem =
    //     jsonToParseNotSorted[jsonToParseNotSorted.length - 2].attributes;
    //   jsonToParseNotSorted = json.features.slice(0, -1);
    // }
    const jsonToParse = cleanupJSONsource(json.features);
    const lastItem = jsonToParse[jsonToParse.length - 1].attributes;

    const topDaily = {
      confirmed: 0,
      recovered: 0,
      death: 0
    };

    const cleanupData = jsonToParse.map(rawData => {
      if (topDaily.confirmed < rawData.attributes.Jumlah_Kasus_Baru_per_Hari) {
        topDaily.confirmed = rawData.attributes.Jumlah_Kasus_Baru_per_Hari;
      }
      if (
        topDaily.recovered < rawData.attributes.Jumlah_Kasus_Sembuh_per_Hari
      ) {
        topDaily.recovered = rawData.attributes.Jumlah_Kasus_Sembuh_per_Hari;
      }
      if (topDaily.death < rawData.attributes.Jumlah_Kasus_Meninggal_per_Hari) {
        topDaily.death = rawData.attributes.Jumlah_Kasus_Meninggal_per_Hari;
      }

      let relativeDate = dayjs(rawData.attributes.Tanggal * 1).calendar(null, {
        sameDay: '[Hari ini]', // The same day ( Today at 2:30 AM )
        lastDay: '[Kemarin]' // The day before ( Yesterday at 2:30
      });
      if (relativeDate !== 'Hari ini' && relativeDate !== 'Kemarin') {
        relativeDate = null;
      }
      return {
        [FID]: rawData.attributes.Hari_ke,
        [CONFIRMED_DAILY]: rawData.attributes.Jumlah_Kasus_Baru_per_Hari,
        [CONFIRMED_TOTAL]: rawData.attributes.Jumlah_Kasus_Kumulatif,
        [RECOVERED_DAILY]: rawData.attributes.Jumlah_Kasus_Sembuh_per_Hari,
        [RECOVERED_TOTAL]: rawData.attributes.Jumlah_Pasien_Sembuh,
        [DEATH_DAILY]: rawData.attributes.Jumlah_Kasus_Meninggal_per_Hari,
        [DEATH_TOTAL]: rawData.attributes.Jumlah_Pasien_Meninggal,
        [RELATIVE_DATE]: relativeDate,
        [FORMATTED_DATE]: dayjs(rawData.attributes.Tanggal * 1).format(
          'dddd, MMMM D, YYYY'
        ),
        [CONFIRMED_PERCENT_TOTAL]:
          (
            (rawData.attributes.Jumlah_Kasus_Kumulatif /
              lastItem.Jumlah_Kasus_Kumulatif) *
            100
          ).toFixed(3) * 1,
        [RECOVERED_PERCENT_TOTAL]:
          (
            (rawData.attributes.Jumlah_Pasien_Sembuh /
              lastItem.Jumlah_Pasien_Sembuh) *
            100
          ).toFixed(3) * 1,
        [DEATH_PERCENT_TOTAL]:
          (
            (rawData.attributes.Jumlah_Pasien_Meninggal /
              lastItem.Jumlah_Pasien_Meninggal) *
            100
          ).toFixed(3) * 1
      };
    });
    const newCleanupData = cleanupData.map(item => {
      return Object.assign({}, item, {
        [CONFIRMED_PERCENT_DAILY]:
          ((item[CONFIRMED_DAILY] / topDaily.confirmed) * 100).toFixed(3) * 1,
        [RECOVERED_PERCENT_DAILY]:
          ((item[RECOVERED_DAILY] / topDaily.recovered) * 100).toFixed(3) * 1,
        [DEATH_PERCENT_DAILY]:
          ((item[DEATH_DAILY] / topDaily.death) * 100).toFixed(3) * 1
      });
    });

    return fs.writeFileSync(path, JSON.stringify(newCleanupData));
  });

// save built time
const builtTime = dayjs().valueOf();
const path = `${basepath}/data/built-info.json`;
fs.writeFileSync(
  path,
  JSON.stringify({
    time: builtTime
  })
);
