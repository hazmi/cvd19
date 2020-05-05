/* eslint-disable arrow-parens */
import dataIndonesia from '../data/indonesia.json';
import dataCountry from '../data/countries.json';
import defaultList from './thelist';

const dailyRoutes = [];
const routes = defaultList.map(item => {
  const linkPaths = item.link.split('/');
  if (linkPaths[1] === 'negara') {
    if (item.link === '/negara/indonesia/') {
      dataIndonesia.map(itemIndonesia => {
        dailyRoutes.push(`/negara/indonesia/${itemIndonesia.x}/`);
      });
    } else {
      // eslint-disable-next-line no-lonely-if
      // dataCountry[linkPaths[2]].data.map(itemCountry => {
      //   dailyRoutes.push(`/negara/${linkPaths[2]}/${itemCountry.FID}/`);
      // });
    }
  }

  return item.link;
});

export default [...routes, ...dailyRoutes];
