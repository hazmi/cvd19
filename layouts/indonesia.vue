<template>
  <div :class="$style.container">
    <main :class="$style.main">
      <Header>
        <h1 v-if="!$route.params.day" :class="$style.title">
          <router-link to="/negara/indonesia" :class="$style.titleLink">
            <span class="hid">Sebaran data terakhir</span>
            <span :class="$style.textCovid19">COVID-19</span>
            <span class="hid">yang positif, sembuh dan meninggal</span>
            <span :class="$style.textIn">di</span>
            <span :class="$style.textCurrent">Indonesia</span>
          </router-link>
        </h1>
        <h1 v-if="$route.params.day" :class="$style.title">
          <router-link to="/negara/indonesia" :class="$style.titleLink">
            <span class="hid">
              Sebaran data hari ke-{{ $route.params.day }}</span
            >
            <span :class="$style.textCovid19">COVID-19</span>
            <span class="hid">yang positif, sembuh dan meninggal</span>
            <span :class="$style.textIn">di</span>
            <span :class="$style.textCurrent">Indonesia</span>
          </router-link>
        </h1>
        <p :class="$style.population">
          Populasi: {{ (273523621).toLocaleString() }}
        </p>
      </Header>
      <div :class="$style.confirmed">
        <GraphDaily
          v-if="currentData"
          title="Positif"
          color="242, 201, 76"
          :daily="daily"
          :current="currentData"
          baseurl="/negara/indonesia/"
          itemkey="Jumlah_Kasus_Kumulatif"
          itemkeydaily="Jumlah_Kasus_Baru_per_Hari"
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
          baseurl="/negara/indonesia/"
          itemkey="Jumlah_Pasien_Sembuh"
          itemkeydaily="Jumlah_Kasus_Sembuh_per_Hari"
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
          baseurl="/negara/indonesia/"
          itemkey="Jumlah_Pasien_Meninggal"
          itemkeydaily="Jumlah_Kasus_Meninggal_per_Hari"
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
          :day="currentIndex + 1"
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

const cleanupData = data => {
  if (
    data.features[data.features.length - 1].attributes
      .Jumlah_Kasus_Kumulatif !== null
  ) {
    return data.features;
  }
  return data.features.slice(0, -1);
};

const cleanupIndonesiaData = cleanupData(indonesiaData);

export default {
  components: {
    GraphDaily,
    DateWithArrow,
    Search,
    Header,
    Footer
  },
  data() {
    const currentIndex = this.$route.params.day
      ? this.$route.params.day - 1
      : cleanupIndonesiaData.length - 1;

    return {
      currentIndex,
      daily: cleanupIndonesiaData,
      lastIndex: cleanupIndonesiaData.length - 1
    };
  },
  computed: {
    currentData() {
      return cleanupIndonesiaData[this.currentIndex].attributes;
    },
    prevDay() {
      return this.currentIndex > 0
        ? `/negara/indonesia/${this.currentIndex}`
        : null;
    },
    nextDay() {
      if (this.currentIndex > this.lastIndex - 1) {
        return null;
      }
      if (this.currentIndex === this.lastIndex - 1) {
        return '/negara/indonesia';
      }
      return `/negara/indonesia/${this.currentIndex + 2}`;
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.onResize();
    });
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    window.addEventListener('resize', this.onResize);
  },
  created() {
    this.$nuxt.$on('day', currentDay => {
      if (
        (currentDay === 'latest' && this.currentIndex === this.lastIndex) ||
        this.currentIndex === currentDay - 1
      ) {
        return true;
      }
      this.currentIndex = this.$route.params.day
        ? this.$route.params.day - 1
        : this.lastIndex;
    });
  },
  methods: {
    onResize() {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
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
.population {
  font-size: 10px;
  color: #768db1;
}
</style>
