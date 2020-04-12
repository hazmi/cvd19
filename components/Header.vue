<template>
  <header :class="$style.header">
    <div :class="$style.titleWrapper">
      <div><slot></slot></div>
      <router-link to="/" :class="$style.url">cvd19.pw</router-link>
    </div>
    <div :class="$style.searchWrapper">
      <input
        ref="keyword"
        v-model="searchText"
        type="text"
        placeholder="Cari negara atau provinsi di Indonesia"
        :class="$style.input"
        @focus="onFocusText"
        @keyup="onKeyupInput"
      />
    </div>
    <div v-if="isFocus" :class="$style.list">
      <h4
        v-if="isProvince && nearestProvince && !searchText"
        :class="$style.listHeader"
      >
        Provinsi yang dekat dengan {{ current }}
      </h4>
      <div v-if="isProvince && nearestProvince && !searchText">
        <router-link
          v-for="item in nearestProvince"
          :key="item.link"
          :to="item.link"
          :class="$style.listItem"
          >{{ item.labelWithNoCountry }}</router-link
        >
      </div>
      <h4 v-if="isProvince && !searchText" :class="$style.listHeader">
        Negara asal
      </h4>
      <div v-if="isProvince && !searchText">
        <router-link
          key="linkToIndonesia"
          to="/indonesia"
          :class="$style.listItem"
          >Indonesia</router-link
        >
      </div>
      <h4 v-if="isIndonesia && !searchText" :class="$style.listHeader">
        Provinsi dengan kasus COVID-19 terbanyak
      </h4>
      <div v-if="isIndonesia && !searchText">
        <router-link
          v-for="item in provinces"
          :key="item.link"
          :to="item.link"
          :class="$style.listItem"
          >{{ item.labelWithNoCountry }}</router-link
        >
      </div>
      <h4
        v-if="!isProvince && nearestCountries && !searchText"
        :class="$style.listHeader"
      >
        Negara dengan kasus COVID-19 terbanyak
      </h4>
      <div v-if="!isProvince && mostAffectedCountries && !searchText">
        <router-link
          v-for="item in mostAffectedCountries"
          :key="item.link"
          :to="item.link"
          :class="$style.listItem"
          >{{ item.label }}</router-link
        >
      </div>
      <h4
        v-if="!isProvince && nearestCountries && !searchText"
        :class="$style.listHeader"
      >
        Negara yang dekat dengan {{ current }}
      </h4>
      <div v-if="!isProvince && nearestCountries && !searchText">
        <router-link
          v-for="item in nearestCountries"
          :key="item.link"
          :to="item.link"
          :class="$style.listItem"
          >{{ item.label }}</router-link
        >
      </div>
      <h4 v-if="!searchText" :class="$style.listHeader">Lokasi lainnya</h4>
      <h4 v-if="searchText" :class="$style.listHeader">
        Lokasi berdasarkan pencarian "{{ searchText }}"
      </h4>
      <router-link
        v-for="item in list"
        :key="item.link"
        :to="item.link"
        :class="$style.listItem"
        >{{ item.label }}</router-link
      >
    </div>
  </header>
</template>
<script>
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-parens */
import Fuse from 'fuse.js';
import defaultList from '~/utils/thelist';
import createSlug from '~/utils/createslug';
import haversine from '~/utils/haversine';
import provincesData from '~/data/province.json';
import countriesLocation from '~/data/countries-location.json';

const mostAffectedCountries = [];
const finalList = defaultList.map(item => {
  item.finalDisplay = item.display || item.label;
  if (item.type === 'country') {
    item.position = countriesLocation[createSlug(item.label)].position;
    item.total = countriesLocation[createSlug(item.label)].total;
    mostAffectedCountries.push(item);
  }
  return item;
});
finalList.sort((a, b) => a.finalDisplay.localeCompare(b.finalDisplay));
mostAffectedCountries.sort((a, b) => b.total - a.total);

const provinces = defaultList
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
provinces.sort((a, b) => b.attributes.Kasus_Posi - a.attributes.Kasus_Posi);

function hasSomeParentTheClass(element, classname) {
  if (!element.parentNode) {
    return false;
  }
  if (element.className.split(' ').includes(classname)) {
    return true;
  }
  return hasSomeParentTheClass(element.parentNode, classname);
}

export default {
  name: 'Header',
  props: ['current', 'baseurl'],
  data() {
    return {
      list: finalList,
      provinces: provinces.slice(0, 10),
      mostAffectedCountries: mostAffectedCountries.slice(0, 10),
      searchText: '',
      isFocus: null,
      isIndonesia: false,
      isProvince: false,
      currentPath: ''
    };
  },
  watch: {
    searchText(newData) {
      if (newData) {
        const options = {
          includeScore: true,
          threshold: 0.5,
          keys: [
            {
              name: 'label',
              weight: 0.3
            },
            {
              name: 'keyword',
              weight: 0.7
            }
          ]
        };
        const fuse = new Fuse(finalList, options);
        const filteredResult = fuse.search(newData);
        this.list = filteredResult.map(filteredItem => filteredItem.item);
      } else {
        this.list = finalList;
      }
    }
  },
  methods: {
    onFocusText() {
      this.isFocus = true;
      window.addEventListener('keyup', this.onFocus);
      window.addEventListener('click', this.onClickOutsideDropdown);
    },
    onKeyupInput(event) {
      if (event.keyCode !== 27) {
        this.isFocus = true;
        window.addEventListener('keyup', this.onFocus);
      }
    },
    updateCountries() {
      let currentCountry = null;
      let currentPath = this.$route.path;
      const lastStringInPath = currentPath.slice(-1);
      if (lastStringInPath === '/') {
        currentPath = currentPath.slice(0, -1);
      }
      const arrPath = currentPath.split('/');

      if (arrPath[1] === 'indonesia') {
        currentPath = '/indonesia';
      } else if (arrPath.length > 3) {
        currentPath = [arrPath[0], arrPath[1], arrPath[2]].join('/');
      }

      for (let x = 0; x < finalList.length; x++) {
        if (finalList[x].link === currentPath) {
          currentCountry = finalList[x];
          break;
        }
      }

      const nearestCountries = [];
      for (let x = 0; x < finalList.length; x++) {
        const theCountry = finalList[x];
        if (theCountry.type === 'country') {
          const distance = haversine(
            currentCountry.position,
            theCountry.position
          );
          theCountry.distance = distance;
          nearestCountries.push(theCountry);
        }
      }
      nearestCountries.sort((a, b) => a.distance - b.distance);
      this.nearestCountries = nearestCountries.slice(1, 10);
    },
    updateProvince() {
      let currentPath = this.$route.path;
      const lastStringInPath = currentPath.slice(-1);
      if (lastStringInPath === '/') {
        currentPath = currentPath.slice(0, -1);
      }
      if (this.currentPath !== currentPath) {
        this.currentPath = currentPath;
        if (this.isProvince) {
          let currentProvince = null;
          for (let x = 0; x < provinces.length; x++) {
            if (provinces[x].link === this.currentPath) {
              currentProvince = provinces[x];
              break;
            }
          }
          const nearestProvince = provinces.map(province => {
            const distance = haversine(
              currentProvince.position,
              province.position
            );
            const data = province;
            data.distance = distance;
            return province;
          });
          nearestProvince.sort((a, b) => a.distance - b.distance);
          this.nearestProvince = nearestProvince.slice(1, 10);
        }
      }
    }
  },
  created() {
    this.$nuxt.$on('id', () => this.updateProvince());
    this.$nuxt.$on('updatecountry', () => this.updateCountries());
  },
  mounted() {
    const { path } = this.$route;
    const arrPath = path.split('/');
    this.isIndonesia = arrPath[1] === 'indonesia';
    this.isProvince = arrPath[1] === 'provinsi';

    if (path !== '/faq') {
      this.updateProvince();
      this.updateCountries();
    }

    // eslint-disable-next-line arrow-parens
    this.onKeyup = event => {
      if (event.keyCode === 191) {
        this.$refs.keyword.focus();
      }
    };
    // eslint-disable-next-line arrow-parens
    this.onClickOutsideDropdown = event => {
      if (!hasSomeParentTheClass(event.target, this.$style.input)) {
        this.isFocus = false;
        window.removeEventListener('click', this.onClickOutsideDropdown);
      }
    };
    // eslint-disable-next-line arrow-parens
    this.onFocus = event => {
      if (event.keyCode === 27) {
        this.isFocus = false;
      }
    };
    window.addEventListener('keyup', this.onKeyup);
  },
  beforeDestroy() {
    window.removeEventListener('keyup', this.onKeyup);
    window.removeEventListener('keyup', this.onFocus);
  }
};
</script>
<style module>
.header {
  position: relative;
  z-index: 9;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-end;
}
.list {
  position: absolute;
  left: 0;
  top: 90px;
  width: 100vw;
  max-width: 410px;
  height: calc(100vh - 100px);
  height: calc((var(--vh, 1vh) * 100) - 100px);
  overflow: auto;
  margin: 0 -10px;
  padding-right: 10px;
  backdrop-filter: blur(8px);
  background-color: rgba(0, 0, 0, 0.7);
}
.listHeader {
  clear: both;
  font-size: 13px;
  padding: 10px 10px 0;
  margin-bottom: 10px;
  color: rgb(242, 153, 74);
}
.listItem {
  float: left;
  display: flex;
  align-items: center;
  height: 30px;
  padding: 0 10px;
  font-size: 13px;
  margin: 0 0 10px 10px;
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 3px;
  text-decoration: none;
  background: rgba(255, 255, 255, 0.1);
}
.list :global(.nuxt-link-exact-active) {
  border: 1px solid rgb(242, 153, 74);
}
.listItem:hover {
  color: rgb(242, 153, 74);
  border: 1px solid rgb(242, 153, 74);
  background: rgba(255, 255, 255, 0.2);
}
.listItem:focus {
  outline: none;
  box-shadow: 0 0 0 3px #56ccf2;
}
.titleWrapper {
  display: flex;
  height: 35px;
  justify-content: space-between;
  align-items: center;
}
.url {
  color: #fff;
  text-decoration: none;
  font-size: 14px;
}
.searchWrapper {
  position: relative;
  flex: 1;
  display: flex;
  border-bottom: 5px solid #fff;
  margin: 0 -10px;
}
.input {
  flex: 1;
  background: rgba(255, 255, 255, 0.1);
  border: 0;
  font-size: 17px;
  color: #fff;
  font-weight: 400;
  padding: 0 10px;
}
.input:focus {
  outline: none;
  box-shadow: 0 0 0 5px #56ccf2;
}
.searchWrapper::before {
  position: absolute;
  content: '/';
  font-size: 16px;
  line-height: 1;
  color: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  right: 10px;
  top: 13px;
  height: 24px;
  width: 24px;
  border-radius: 5px;
  pointer-events: none;
  border: 1px solid rgba(255, 255, 255, 0.3);
}
</style>
