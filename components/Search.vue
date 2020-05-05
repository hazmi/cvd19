<template>
  <header :class="$style.header">
    <div
      :class="{
        [$style.searchWrapper]: true,
        [$style.isFocus]: isFocus
      }"
    >
      <form>
        <label for="keyword" class="hid">
          Cari negara atau provinsi di Indonesia
        </label>
        <input
          id="keyword"
          ref="keyword"
          v-model="searchText"
          type="text"
          placeholder="Cari negara atau provinsi di Indonesia"
          autocomplete="off"
          :class="$style.input"
          @focus="onFocusText"
          @keyup="onKeyupInput"
        />
        <span class="hid" :class="$style.close" @click="isFocus = false">
          Close
        </span>
      </form>
    </div>
    <div
      :class="{
        [$style.list]: true,
        [$style.listActive]: isFocus || persist
      }"
    >
      <h3
        v-if="isProvince && nearestProvince && !searchText"
        :class="$style.listHeader"
      >
        Provinsi yang dekat dengan {{ current }}
      </h3>
      <ul v-if="isProvince && nearestProvince && !searchText">
        <li
          v-for="item in nearestProvince"
          :key="item.link"
          :class="$style.listItem"
        >
          <router-link :to="item.link">
            {{ item.labelWithNoCountry }}
          </router-link>
        </li>
      </ul>
      <h3 v-if="isProvince && !searchText" :class="$style.listHeader">
        Negara asal
      </h3>
      <ul v-if="isProvince && !searchText">
        <li :class="$style.listItem">
          <router-link to="/negara/indonesia/">Indonesia</router-link>
        </li>
      </ul>
      <h3 v-if="isIndonesia && !searchText" :class="$style.listHeader">
        Provinsi dengan kasus COVID-19 terbanyak
      </h3>
      <ol v-if="isIndonesia && !searchText">
        <li v-for="item in provinces" :key="item.link" :class="$style.listItem">
          <router-link :to="item.link">{{
            `${item.labelWithNoCountry}`
          }}</router-link>
        </li>
      </ol>
      <h3
        v-if="
          !isProvince &&
            mostAffectedCountries &&
            !searchText &&
            this.$route.path !== '/'
        "
        :class="$style.listHeader"
      >
        Negara dengan kasus COVID-19 terbanyak
      </h3>
      <ol
        v-if="
          !isProvince &&
            mostAffectedCountries &&
            !searchText &&
            this.$route.path !== '/'
        "
      >
        <li
          v-for="item in mostAffectedCountries"
          :key="item.link"
          :class="$style.listItem"
        >
          <router-link :to="item.link">{{ `${item.label}` }}</router-link>
        </li>
        <li
          :value="indonesiaRank"
          :style="{
            'counter-increment': `list-counter ${indonesiaRank - 10}`
          }"
          :class="$style.listItemIndonesia"
        >
          <router-link to="/negara/indonesia/">{{ `Indonesia` }}</router-link>
        </li>
      </ol>
      <h3
        v-if="!isProvince && nearestCountries && !searchText"
        :class="$style.listHeader"
      >
        Negara yang dekat dengan {{ current }}
      </h3>
      <ul v-if="!isProvince && nearestCountries && !searchText">
        <li
          v-for="item in nearestCountries"
          :key="item.link"
          :class="$style.listItem"
        >
          <router-link :to="item.link">{{ item.label }}</router-link>
        </li>
      </ul>
      <h3
        v-if="
          !searchText &&
            this.$route.path !== '/' &&
            this.$route.path !== '/about/' &&
            this.$route.path !== '/about'
        "
        :class="$style.listHeader"
      >
        Lokasi lainnya
      </h3>
      <h3 v-if="searchText" :class="$style.listHeader">
        Lokasi berdasarkan pencarian "{{ searchText }}"
      </h3>
      <ul>
        <li v-for="item in list" :key="item.link" :class="$style.listItem">
          <router-link :to="item.link">{{ item.label }}</router-link>
        </li>
      </ul>
    </div>
  </header>
</template>
<script>
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-parens */
import Fuse from 'fuse.js';
import haversine from '~/utils/haversine';
import formattedList from '~/utils/formattedList';

let indonesiaRank = 0;
for (let i = 0; i < formattedList.mostAffectedCountries.length; i++) {
  if (formattedList.mostAffectedCountries[i].label === 'Indonesia') {
    indonesiaRank = i + 1;
    break;
  }
}

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
  props: ['current', 'persist', 'onfocuscallback', 'onlostfocuscallback'],
  data() {
    return {
      list: formattedList.finalList,
      provinces: formattedList.mostAffectedProvinces.slice(0, 10),
      mostAffectedCountries: formattedList.mostAffectedCountries.slice(0, 10),
      indonesiaRank,
      searchText: '',
      isFocus: null,
      isIndonesia: false,
      isProvince: false,
      currentPath: '',
      nearestCountries: null,
      nearestProvince: null
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
        const fuse = new Fuse(formattedList.finalList, options);
        const filteredResult = fuse.search(newData);
        this.list = filteredResult.map(filteredItem => filteredItem.item);
      } else {
        this.list = formattedList.finalList;
      }
    }
  },
  methods: {
    onFocusText() {
      this.isFocus = true;
      window.addEventListener('keyup', this.onFocus);
      window.addEventListener('click', this.onClickOutsideDropdown);
      if (this.onfocuscallback) {
        this.onfocuscallback();
      }
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
        currentPath = currentPath + '/';
      }
      const arrPath = currentPath.split('/');

      if (arrPath[1] === 'indonesia') {
        currentPath = '/negara/indonesia/';
      } else if (arrPath.length > 3) {
        currentPath = [arrPath[0], arrPath[1], arrPath[2]].join('/');
      }

      for (let x = 0; x < formattedList.finalList.length; x++) {
        if (formattedList.finalList[x].link === currentPath + '/') {
          currentCountry = formattedList.finalList[x];
          break;
        }
      }
      const nearestCountries = [];
      for (let x = 0; x < formattedList.finalList.length; x++) {
        const theCountry = formattedList.finalList[x];
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
      if (lastStringInPath !== '/') {
        currentPath = currentPath + '/';
      }
      if (this.currentPath !== currentPath) {
        this.currentPath = currentPath;
        if (this.isProvince) {
          let currentProvince = null;
          for (let x = 0; x < formattedList.mostAffectedProvinces.length; x++) {
            if (
              formattedList.mostAffectedProvinces[x].link === this.currentPath
            ) {
              currentProvince = formattedList.mostAffectedProvinces[x];
              break;
            }
          }
          const nearestProvince = formattedList.mostAffectedProvinces.map(
            province => {
              const distance = haversine(
                currentProvince.position,
                province.position
              );
              const data = province;
              data.distance = distance;
              return province;
            }
          );
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
    this.isIndonesia = arrPath[2] === 'indonesia';
    this.isProvince = arrPath[1] === 'provinsi';

    if (arrPath[1] !== 'about' && path !== '/' && arrPath[1] !== 'daftar') {
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
        if (this.onlostfocuscallback) {
          this.onlostfocuscallback();
        }
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
  left: -999em;
  top: 55px;
  width: 100vw;
  max-width: 410px;
  height: calc(100vh - 100px);
  height: calc((var(--vh, 1vh) * 100) - 100px);
  overflow: auto;
  margin: 0 -10px;
  padding-right: 10px;
  backdrop-filter: blur(8px);
  background-color: rgba(0, 0, 0, 0.8);
}
.listActive {
  left: 0;
}
.list ol,
.list ul {
  padding: 0;
  margin: 10px 0 0;
  list-style: none;
}
.list ol {
  counter-reset: list-counter;
}
.list ol > li {
  counter-increment: list-counter;
}
.list ol > li a::before {
  content: counter(list-counter) '. ';
  color: rgb(242, 153, 74);
  padding-right: 4px;
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
  list-style: none;
  display: flex;
  margin: 0 0 10px 10px;
}
.listItemIndonesia {
  float: left;
  position: relative;
  list-style: none;
  display: flex;
  margin: 0 0 10px 30px;
}
.listItemIndonesia::before {
  position: absolute;
  content: '...';
  left: -20px;
  top: 0;
}
.list a {
  display: flex;
  height: 30px;
  padding: 0 10px;
  font-size: 13px;
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 3px;
  text-decoration: none;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
}
.list :global(.nuxt-link-exact-active) {
  border: 1px solid rgb(242, 153, 74);
}
.list a:hover {
  color: rgb(242, 153, 74);
  border: 1px solid rgb(242, 153, 74);
  background: rgba(255, 255, 255, 0.2);
}
.list a:focus {
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
.searchWrapper form {
  flex: 1;
  display: flex;
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
.isFocus.searchWrapper::before {
  display: none;
}
.close {
  display: none;
  position: absolute;
  content: 'Close';
  font-size: 16px;
  line-height: 1;
  color: rgba(255, 255, 255, 0.9);
  justify-content: center;
  align-items: center;
  right: 10px;
  top: 10px;
  height: 30px;
  width: 60px;
  border-radius: 5px;
  border: 1px solid rgba(255, 255, 255, 0.9);
}
.isFocus .close {
  display: flex;
}
</style>
