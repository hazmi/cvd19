<template>
  <div :class="$style.container">
    <main :class="$style.main">
      <Header current="Indonesia" />
      <div :class="$style.confirmed">
        <GraphDaily
          v-if="currentData"
          title="Confirmed"
          color="242, 201, 76"
          :daily="daily"
          :current="currentData"
          itemkey="Jumlah_Kasus_Kumulatif"
          :increment="currentData.Jumlah_Kasus_Baru_per_Hari"
        >
          {{ currentData.Jumlah_Kasus_Kumulatif }}
        </GraphDaily>
      </div>
      <div :class="$style.recovered">
        <GraphDaily
          v-if="currentData"
          title="Recovered"
          color="111, 207, 151"
          :daily="daily"
          :current="currentData"
          itemkey="Jumlah_Pasien_Sembuh"
          :increment="currentData.Jumlah_Kasus_Sembuh_per_Hari"
        >
          {{ currentData.Jumlah_Pasien_Sembuh }}
        </GraphDaily>
      </div>
      <div :class="$style.death">
        <GraphDaily
          v-if="currentData"
          title="Death"
          color="235, 87, 87"
          :daily="daily"
          :current="currentData"
          itemkey="Jumlah_Pasien_Meninggal"
          :increment="currentData.Jumlah_Kasus_Meninggal_per_Hari"
        >
          {{ currentData.Jumlah_Pasien_Meninggal }}
        </GraphDaily>
      </div>
      <div :class="$style.date">
        <DateWithArrow
          v-if="currentData"
          :ts="currentData.Tanggal"
          :prev="prevDay"
          :next="nextDay"
          :day="currentIndex"
        />
        <nuxt />
      </div>
    </main>
    <footer :class="$style.footer">
      <div>
        All data are fetched from
        <a
          href="https://services5.arcgis.com/VS6HdKS0VfIhv8Ct/ArcGIS/rest/services"
        >
          BNPB
        </a>
        .
      </div>
      <div>
        <router-link to="/about">About</router-link>
      </div>
    </footer>
  </div>
</template>
<script>
/* eslint-disable arrow-parens */
import * as dayjs from 'dayjs';
import Header from '~/components/Header.vue';
import GraphDaily from '~/components/GraphDaily.vue';
import DateWithArrow from '~/components/DateWithArrow.vue';

export default {
  components: {
    GraphDaily,
    DateWithArrow,
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
    const today = dayjs().format('YYYY-MM-DD');
    const baseurl =
      'https://services5.arcgis.com/VS6HdKS0VfIhv8Ct/ArcGIS/rest/services/Statistik_Perkembangan_COVID19_Indonesia/FeatureServer/0/query';
    const url = `${baseurl}?where=Tanggal%3C=timestamp%20%27${today}%2016:59:59%27&f=json&outFields=*`;
    this.data = await this.$http.$get(url);
  },
  data() {
    return {
      data: null,
      currentIndex: null,
      currentData: null,
      daily: null,
      nextDay: null,
      prevDay: null
    };
  },
  created() {
    this.$nuxt.$on('day', data => {
      if (
        this.data.features[this.data.features.length - 1].attributes
          .Jumlah_Kasus_Kumulatif !== null
      ) {
        this.daily = this.data.features;
      } else {
        this.daily = this.data.features.slice(0, -1);
      }
      this.lastIndex = this.daily.length - 1;
      this.currentIndex = data === 'latest' ? this.daily.length : data * 1;
      if (this.currentIndex > 1) {
        this.prevDay = `/indonesia/${this.currentIndex - 1}`;
      }
      if (this.currentIndex > this.lastIndex) {
        this.nextDay = null;
      } else if (this.currentIndex > this.lastIndex - 1) {
        this.nextDay = '/indonesia';
      } else {
        this.nextDay = `/indonesia/${this.currentIndex + 1}`;
      }
      this.currentData = this.daily[this.currentIndex - 1].attributes;
    });
  },
  watch: {
    data(newData) {
      if (
        newData.features[newData.features.length - 1].attributes
          .Jumlah_Kasus_Kumulatif !== null
      ) {
        this.daily = newData.features;
      } else {
        this.daily = newData.features.slice(0, -1);
      }
      this.lastIndex = this.daily.length - 1;
      this.currentIndex = this.$route.params.day
        ? this.$route.params.day * 1
        : this.lastIndex + 1;
      if (this.currentIndex > 1) {
        this.prevDay = `/indonesia/${this.currentIndex - 1}`;
      }
      if (this.currentIndex > this.lastIndex) {
        this.nextDay = null;
      } else if (this.currentIndex > this.lastIndex - 1) {
        this.nextDay = '/indonesia';
      } else {
        this.nextDay = `/indonesia/${this.currentIndex + 1}`;
      }
      this.currentData = this.daily[this.currentIndex - 1].attributes;
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
.searchWrapper {
  border-bottom: 5px solid #fff;
}
.input {
  background: rgba(255, 255, 255, 0.1);
  border: 0;
  height: 55px;
  width: 100%;
  font-size: 22px;
  color: #fff;
  font-weight: 900;
  padding: 0 10px;
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
