<template>
  <div :class="$style.container">
    <main :class="$style.main">
      <Header>
        <h1 v-if="!$route.params.day" :class="$style.title">
          <router-link to="/indonesia" :class="$style.titleLink">
            <span class="hid">Jumlah data terakhir</span>
            <span :class="$style.textCovid19">COVID-19</span>
            <span class="hid">yang positif, sembuh dan meninggal</span>
            <span :class="$style.textIn">di</span>
            <span :class="$style.textCurrent">Indonesia</span>
          </router-link>
        </h1>
        <h1 v-if="$route.params.day" :class="$style.title">
          <router-link to="/indonesia" :class="$style.titleLink">
            <span class="hid">Jumlah data hari ke-{{ $route.params.day }}</span>
            <span :class="$style.textCovid19">COVID-19</span>
            <span class="hid">yang positif, sembuh dan meninggal</span>
            <span :class="$style.textIn">di</span>
            <span :class="$style.textCurrent">Indonesia</span>
          </router-link>
        </h1>
      </Header>
      <div :class="$style.confirmed">
        <GraphDaily
          v-if="currentData"
          title="Positif"
          color="242, 201, 76"
          :daily="daily"
          :current="currentData"
          baseurl="/indonesia/"
          itemkey="Jumlah_Kasus_Kumulatif"
          :increment="currentData.Jumlah_Kasus_Baru_per_Hari.toLocaleString()"
        >
          {{ currentData.Jumlah_Kasus_Kumulatif.toLocaleString() }}
        </GraphDaily>
      </div>
      <div :class="$style.recovered">
        <GraphDaily
          v-if="currentData"
          title="Sembuh"
          color="111, 207, 151"
          :daily="daily"
          :current="currentData"
          baseurl="/indonesia/"
          itemkey="Jumlah_Pasien_Sembuh"
          :increment="currentData.Jumlah_Kasus_Sembuh_per_Hari.toLocaleString()"
        >
          {{ currentData.Jumlah_Pasien_Sembuh.toLocaleString() }}
        </GraphDaily>
      </div>
      <div :class="$style.death">
        <GraphDaily
          v-if="currentData"
          title="Meninggal"
          color="235, 87, 87"
          :daily="daily"
          :current="currentData"
          baseurl="/indonesia/"
          itemkey="Jumlah_Pasien_Meninggal"
          :increment="
            currentData.Jumlah_Kasus_Meninggal_per_Hari.toLocaleString()
          "
        >
          {{ currentData.Jumlah_Pasien_Meninggal.toLocaleString() }}
        </GraphDaily>
      </div>
      <div :class="$style.search">
        <Search current="Indonesia" />
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
    <Footer />
  </div>
</template>
<script>
/* eslint-disable arrow-parens */
import Search from '~/components/Search.vue';
import Header from '~/components/Header.vue';
import Footer from '~/components/Footer.vue';
import GraphDaily from '~/components/GraphDaily.vue';
import DateWithArrow from '~/components/DateWithArrow.vue';
import indonesiaData from '~/data/indonesia.json';

export default {
  components: {
    GraphDaily,
    DateWithArrow,
    Search,
    Header,
    Footer
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
  data() {
    return {
      data: indonesiaData,
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
.search {
  grid-row-start: 2;
  display: flex;
}
.confirmed,
.recovered,
.death,
.date {
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
