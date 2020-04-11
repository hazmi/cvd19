<template>
  <div :class="$style.container">
    <main :class="$style.main">
      <Header v-if="currentData" :current="currentProvinceData" baseurl="/" />
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
      <div :class="$style.date">
        <Date v-if="lastEditDate" :ts="lastEditDate" />
      </div>
      <nuxt />
    </main>
    <Footer />
  </div>
</template>

<script>
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
    return {
      data: null,
      currentData: null,
      layerInformation: null,
      lastEditDate: null,
      cleanupData: {},
      currentProvinceData: getCurrentProvince(this.$route.path)
    };
  },
  created() {
    // eslint-disable-next-line arrow-parens
    this.$nuxt.$on('id', data => {
      this.currentProvinceData = getCurrentProvince(this.$route.path);
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
</style>
