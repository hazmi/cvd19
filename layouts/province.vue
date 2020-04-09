<template>
  <div :class="$style.container">
    <main :class="$style.main">
      <Header v-if="currentData" :current="currentData.Provinsi" />
      <div :class="$style.confirmed">
        <Graph v-if="currentData" title="Confirmed" color="242, 201, 76">
          {{ currentData.Kasus_Posi }}
        </Graph>
      </div>
      <div :class="$style.recovered">
        <Graph v-if="currentData" title="Recovered" color="111, 207, 151">
          {{ currentData.Kasus_Semb }}
        </Graph>
      </div>
      <div :class="$style.death">
        <Graph v-if="currentData" title="Death" color="235, 87, 87">
          {{ currentData.Kasus_Meni }}
        </Graph>
      </div>
      <div :class="$style.date">
        <Date v-if="lastEditDate" :ts="lastEditDate" />
      </div>
      <nuxt />
    </main>
    <footer :class="$style.footer">
      <div>
        All data are fetched from
        <a
          href="https://services5.arcgis.com/VS6HdKS0VfIhv8Ct/ArcGIS/rest/services"
        >
          BNPB
        </a>
        , others are from
        <a href="https://github.com/CSSEGISandData/COVID-19">JHU CSSE</a>.
      </div>
      <div>
        <router-link to="/about">About</router-link>
      </div>
    </footer>
  </div>
</template>

<script>
import Header from '~/components/Header.vue';
import Graph from '~/components/Graph.vue';
import Date from '~/components/Date.vue';

const createSlug = function(str) {
  str = str.replace(/^\s+|\s+$/g, '');
  str = str.toLowerCase();

  str = str
    .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

  return str;
};

export default {
  components: {
    Graph,
    Date,
    Header
  },
  mounted() {
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
  async fetch() {
    const baseurl =
      'https://services5.arcgis.com/VS6HdKS0VfIhv8Ct/arcgis/rest/services/COVID19_Indonesia_per_Provinsi/FeatureServer/0/query';
    const url = `${baseurl}?where=1=1&f=json&outFields=*`;
    this.data = await this.$http.$get(url);
    const urlDate =
      'https://services5.arcgis.com/VS6HdKS0VfIhv8Ct/ArcGIS/rest/services/COVID19_Indonesia_per_Provinsi/FeatureServer/0?f=pjson';
    this.layerInformation = await this.$http.$get(urlDate);
  },
  data() {
    return {
      data: null,
      currentData: null,
      layerInformation: null,
      lastEditDate: null,
      cleanupData: {}
    };
  },
  created() {
    // eslint-disable-next-line arrow-parens
    this.$nuxt.$on('id', data => {
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
  },
  activated() {
    if (this.$fetchState.timestamp <= Date.now() - 30000) {
      this.$fetch();
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
  grid-template-rows: 90px 1fr 1fr 1fr 1fr;
}
.confirmed,
.recovered,
.death,
.date {
  display: flex;
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
footer {
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  font-size: 9px;
  opacity: 0.6;
}
footer a {
  color: #fff;
  margin-left: 3px;
}
</style>
