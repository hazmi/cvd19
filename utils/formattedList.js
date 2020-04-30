/* eslint-disable arrow-parens */
import countriesLocation from '~/data/countries-location.json';
import provincesData from '~/data/province.json';
import createSlug from '~/utils/createslug';
import defaultList from '~/utils/thelist';

const mostAffectedCountries = [];
const finalList = defaultList.map(item => {
  item.finalDisplay = item.display || item.label;
  if (item.type === 'country') {
    item.position = countriesLocation[createSlug(item.label)].pos;
    item.total = countriesLocation[createSlug(item.label)].c;
    item.deaths = countriesLocation[createSlug(item.label)].d;
    mostAffectedCountries.push(item);
  }
  return item;
});
finalList.sort((a, b) => a.finalDisplay.localeCompare(b.finalDisplay));
mostAffectedCountries.sort((a, b) => b.total - a.total);
const mostDeathsCountries = [...mostAffectedCountries];
mostDeathsCountries.sort((a, b) => b.deaths - a.deaths);

const mostAffectedProvinces = defaultList
  .filter(list => list.type === 'province')
  .map(province => {
    const currentData = province;
    currentData.labelWithNoCountry = province.label.split(',')[1];
    for (let x = 0; x < provincesData.features.length; x++) {
      const currentSlug = createSlug(
        provincesData.features[x].attributes.Provinsi
      );
      if (`/provinsi/${currentSlug}` === province.link) {
        currentData.attributes = provincesData.features[x].attributes;
        currentData.geometry = provincesData.features[x].geometry;
        break;
      }
    }
    return currentData;
  });

mostAffectedProvinces.sort(
  (a, b) => b.attributes.Kasus_Posi - a.attributes.Kasus_Posi
);

export default {
  finalList,
  mostAffectedCountries,
  mostDeathsCountries,
  mostAffectedProvinces
};
