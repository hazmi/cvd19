<template>
  <header :class="$style.header">
    <div :class="$style.titleWrapper">
      <h1 :class="$style.title">
        <span :class="$style.textCovid19">COVID19</span>
        <span :class="$style.textIn">in</span>
        <span :class="$style.textCurrent">{{ current }}</span>
      </h1>
      <div :class="$style.url">cvd19.pw</div>
    </div>
    <div :class="$style.searchWrapper">
      <input
        v-model="searchText"
        type="text"
        placeholder="Find a country or Indonesian province"
        :class="$style.input"
        @focus="onFocusText"
        @blur="onBlurText"
      />
    </div>
    <div v-if="isFocus" :class="$style.list">
      <router-link
        :to="item.link"
        :class="$style.listItem"
        v-for="item in list"
        :key="item.link"
        >{{ item.label }}
      </router-link>
    </div>
  </header>
</template>
<script>
import Fuse from 'fuse.js';
const defaultList = [
  {
    label: 'Indonesia',
    link: '/indonesia'
  },
  {
    label: 'Aceh, Indonesia',
    link: '/provinsi/aceh'
  },
  {
    label: 'Sumatera Utara, Indonesia',
    link: '/provinsi/sumatera-utara'
  },
  {
    label: 'Sumatera Barat, Indonesia',
    link: '/provinsi/sumatera-barat'
  },
  {
    label: 'Riau, Indonesia',
    link: '/provinsi/riau'
  },
  {
    label: 'Jambi, Indonesia',
    link: '/provinsi/jambi'
  },
  {
    label: 'Sumatera Selatan, Indonesia',
    link: '/provinsi/sumatera-selatan'
  },
  {
    label: 'Bengkulu, Indonesia',
    link: '/provinsi/bengkulu'
  },
  {
    label: 'Kepulauan Bangka Belitung, Indonesia',
    link: '/provinsi/kepulauan-bangka-belitung'
  },
  {
    label: 'Lampung, Indonesia',
    link: '/provinsi/lampung'
  },
  {
    label: 'Kepulauan Riau, Indonesia',
    link: '/provinsi/kepulauan-riau'
  },
  {
    label: 'DKI Jakarta, Indonesia',
    link: '/provinsi/dki-jakarta'
  },
  {
    label: 'Jawa Barat, Indonesia',
    link: '/provinsi/jawa-barat'
  },
  {
    label: 'Jawa Tengah, Indonesia',
    link: '/provinsi/jawa-tengah'
  },
  {
    label: 'Daerah Istimewa Yogyakarta, Indonesia',
    link: '/provinsi/daerah-istimewa-yogyakarta'
  },
  {
    label: 'Jawa Timur, Indonesia',
    link: '/provinsi/jawa-timur'
  },
  {
    label: 'Banten, Indonesia',
    link: '/provinsi/banten'
  },
  {
    label: 'Bali, Indonesia',
    link: '/provinsi/bali'
  },
  {
    label: 'Nusa Tenggara Barat, Indonesia',
    link: '/provinsi/nusa-tenggara-barat'
  },
  {
    label: 'Nusa Tenggara Timur, Indonesia',
    link: '/provinsi/nusa-tenggara-timur'
  },
  {
    label: 'Kalimantan Tengah, Indonesia',
    link: '/provinsi/kalimantan-tengah'
  },
  {
    label: 'Kalimantan Barat, Indonesia',
    link: '/provinsi/kalimantan-barat'
  },
  {
    label: 'Kalimantan Selatan, Indonesia',
    link: '/provinsi/kalimantan-selatan'
  },
  {
    label: 'Kalimantan Timur, Indonesia',
    link: '/provinsi/kalimantan-timur'
  },
  {
    label: 'Kalimantan Utara, Indonesia',
    link: '/provinsi/kalimantan-utara'
  },
  {
    label: 'Sulawesi Utara, Indonesia',
    link: '/provinsi/sulawesi-utara'
  },
  {
    label: 'Sulawesi Tengah, Indonesia',
    link: '/provinsi/sulawesi-tengah'
  },
  {
    label: 'Sulawesi Selatan, Indonesia',
    link: '/provinsi/sulawesi-selatan'
  },
  {
    label: 'Sulawesi Tenggara, Indonesia',
    link: '/provinsi/sulawesi-tenggara'
  },
  {
    label: 'Sulawesi Barat, Indonesia',
    link: '/provinsi/sulawesi-barat'
  },
  {
    label: 'Gorontalo, Indonesia',
    link: '/provinsi/gorontalo'
  },
  {
    label: 'Maluku, Indonesia',
    link: '/provinsi/maluku'
  },
  {
    label: 'Maluku Utara, Indonesia',
    link: '/provinsi/maluku-utara'
  },
  {
    label: 'Papua, Indonesia',
    link: '/provinsi/papua'
  },
  {
    label: 'Papua Barat, Indonesia',
    link: '/provinsi/papua-barat'
  }
];
export default {
  name: 'Header',
  props: ['current'],
  data() {
    return {
      list: defaultList,
      searchText: '',
      isFocus: null
    };
  },
  watch: {
    searchText(newData) {
      if (newData) {
        const options = {
          includeScore: true,
          threshold: 0.5,
          keys: ['label']
        };
        const fuse = new Fuse(defaultList, options);
        const filteredResult = fuse.search(newData);
        console.log('filteredResult', filteredResult);
        this.list = filteredResult.map(filteredItem => filteredItem.item);
      } else {
        this.list = defaultList;
      }
    }
  },
  methods: {
    onFocusText() {
      this.isFocus = true;
    },
    onBlurText() {
      setTimeout(() => {
        this.isFocus = false;
      }, 100);
    }
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
  top: 100px;
  width: 100vw;
  max-width: 410px;
  max-height: 350px;
  overflow: auto;
  margin: 0 -10px;
  background: rgba(0, 0, 0, 0.8);
}
.listItem {
  display: flex;
  align-items: center;
  height: 50px;
  padding: 0 10px;
  color: #fff;
  border-bottom: 1px solid rgba(255, 255, 255, 0.6);
  text-decoration: none;
}
.listItem:hover {
  background: rgba(255, 255, 255, 0.1);
}
.titleWrapper {
  display: flex;
  height: 35px;
  justify-content: space-between;
  align-items: center;
}
.title {
  margin: 0;
  font-size: 14px;
  font-weight: 900;
  color: #fff;
}
.textIn {
  font-weight: 200;
  opacity: 0.5;
}
.textCurrent {
  text-transform: uppercase;
  color: #f2994a;
}
.searchWrapper {
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
</style>
