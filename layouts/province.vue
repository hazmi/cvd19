<template>
  <div :class="$style.container">
    <main :class="$style.main">
      <Header>
        <h1 :class="$style.title">
          <router-link to="/indonesia" :class="$style.titleLink">
            <span class="hid">Jumlah data terakhir</span>
            <span :class="$style.textCovid19">COVID-19</span>
            <span class="hid">yang positif, sembuh dan meninggal</span>
            <span :class="$style.textIn">di</span>
            <span :class="$style.textCurrent">{{ currentProvinceData }}</span>
          </router-link>
        </h1>
      </Header>
      <div :class="$style.confirmed">
        <Graph v-if="currentData" title="Positif" color="242, 201, 76">
          {{ currentData.Kasus_Posi.toLocaleString() }}
        </Graph>
      </div>
      <div :class="$style.recovered">
        <Graph v-if="currentData" title="Sembuh" color="111, 207, 151">
          {{ currentData.Kasus_Semb.toLocaleString() }}
        </Graph>
      </div>
      <div :class="$style.death">
        <Graph v-if="currentData" title="Meninggal" color="235, 87, 87">
          {{ currentData.Kasus_Meni.toLocaleString() }}
        </Graph>
      </div>
      <div :class="$style.search">
        <Search :current="currentProvinceData" />
      </div>
      <div :class="$style.date">
        <Date v-if="lastEditDate" :ts="lastEditDate" />
      </div>
      <nuxt />
    </main>
    <Footer />
  </div>
</template>

<script>
import Search from '~/components/Search.vue';
import Header from '~/components/Header.vue';
import Footer from '~/components/Footer.vue';
import Graph from '~/components/Graph.vue';
import Date from '~/components/Date.vue';
import thelist from '~/utils/thelist';
import createSlug from '~/utils/createslug';
import provinceData from '~/data/province.json';
import provinceInfo from '~/data/province-information.json';

const getCurrentProvince = function(link) {
  let theProvince = '';
  for (let i = 0; i < thelist.length; i++) {
    if (thelist[i].link === link) {
      const label = thelist[i].display || thelist[i].label;
      const arrLabel = label.split(',');
      theProvince = arrLabel[arrLabel.length - 1];
      break;
    }
  }
  return theProvince;
};

export default {
  components: {
    Graph,
    Date,
    Search,
    Header,
    Footer
  },
  mounted() {
    this.data = provinceData;
    this.layerInformation = provinceInfo;
    this.$nextTick(function() {
      this.onResize();
    });
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    window.addEventListener('resize', this.onResize);
  },
  methods: {
    onResize() {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
  },
  data() {
    let currentPath = this.$route.path;
    const lastStringInPath = this.$route.path.slice(-1);
    if (lastStringInPath === '/') {
      currentPath = this.$route.path.slice(0, -1);
    }
    return {
      data: null,
      currentData: null,
      layerInformation: null,
      lastEditDate: null,
      cleanupData: {},
      currentProvinceData: getCurrentProvince(currentPath)
    };
  },
  created() {
    // eslint-disable-next-line arrow-parens
    this.$nuxt.$on('id', data => {
      let currentPath = this.$route.path;
      const lastStringInPath = this.$route.path.slice(-1);
      if (lastStringInPath === '/') {
        currentPath = this.$route.path.slice(0, -1);
      }
      this.currentProvinceData = getCurrentProvince(currentPath);
      this.currentData = this.cleanupData[this.$route.params.id];
    });
  },
  watch: {
    data(newData) {
      const cleanupData = {};
      newData.features.map(function(itemData) {
        const slug = createSlug(itemData.attributes.Provinsi);
        cleanupData[slug] = itemData.attributes;
      });
      this.cleanupData = cleanupData;
      this.currentData = cleanupData[this.$route.params.id];
    },
    layerInformation(newData) {
      this.lastEditDate = newData.editingInfo.lastEditDate;
    }
  }
};
</script>
<style module>
.container {
  margin: 0 auto;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  max-width: 410px;
  display: grid;
  grid-template-rows: 1fr 18px;
}
.main {
  flex: 1;
  display: grid;
  padding: 10px;
  grid-gap: 10px;
  grid-template-columns: 1fr;
  grid-template-rows: 25px 55px 1fr 1fr 1fr 1fr;
}
.confirmed,
.recovered,
.death,
.date {
  display: flex;
}
.search {
  grid-row-start: 2;
  display: flex;
}
.title {
  margin: 0;
  font-size: 14px;
  font-weight: 900;
}
.titleLink {
  color: #fff;
  text-decoration: none;
}
.textIn {
  font-weight: 200;
  opacity: 0.5;
}
.textCurrent {
  text-transform: uppercase;
  color: #f2994a;
}
</style>
<style>
html {
  color: #fff;
  font-family: 'Lato', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  background: #222;
}
body {
  overflow: hidden;
}
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
.hid {
  display: none;
}
</style>
