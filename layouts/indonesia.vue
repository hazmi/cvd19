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
        <GraphDailyIndonesia
          title="Positif"
          color="242, 201, 76"
          :daily="daily"
          :current="currentData"
          :itemkey="CONFIRMED_TOTAL"
          :itemkeydaily="CONFIRMED_DAILY"
          :itempercentkey="CONFIRMED_PERCENT_TOTAL"
          :itempercentkeydaily="CONFIRMED_PERCENT_DAILY"
          :increment="currentData[CONFIRMED_DAILY].toLocaleString()"
        >
          {{ currentData[CONFIRMED_TOTAL].toLocaleString() }}
        </GraphDailyIndonesia>
      </div>
      <div :class="$style.recovered">
        <GraphDailyIndonesia
          title="Sembuh"
          color="111, 207, 151"
          :daily="daily"
          :current="currentData"
          :itemkey="RECOVERED_TOTAL"
          :itemkeydaily="RECOVERED_DAILY"
          :itempercentkey="RECOVERED_PERCENT_TOTAL"
          :itempercentkeydaily="RECOVERED_PERCENT_DAILY"
          :increment="currentData[RECOVERED_DAILY].toLocaleString()"
        >
          {{ currentData[RECOVERED_TOTAL].toLocaleString() }}
        </GraphDailyIndonesia>
      </div>
      <div :class="$style.recovered">
        <GraphDailyIndonesia
          title="Meninggal"
          color="235, 87, 87"
          :daily="daily"
          :current="currentData"
          :itemkey="DEATH_TOTAL"
          :itemkeydaily="DEATH_DAILY"
          :itempercentkey="DEATH_PERCENT_TOTAL"
          :itempercentkeydaily="DEATH_PERCENT_DAILY"
          :increment="currentData[DEATH_DAILY].toLocaleString()"
        >
          {{ currentData[DEATH_TOTAL].toLocaleString() }}
        </GraphDailyIndonesia>
      </div>
      <div :class="$style.search">
        <Search current="Indonesia" />
      </div>
      <div :class="$style.date">
        <DateIndonesia
          v-if="currentData"
          :date="currentData[FORMATTED_DATE]"
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
import GraphDailyIndonesia from '~/components/GraphDailyIndonesia.vue';
import DateIndonesia from '~/components/DateIndonesia.vue';
import indonesiaData from '~/data/indonesia.json';

const CONFIRMED_DAILY = 'a';
const CONFIRMED_TOTAL = 'b';
const RECOVERED_DAILY = 'c';
const RECOVERED_TOTAL = 'd';
const DEATH_DAILY = 'e';
const DEATH_TOTAL = 'f';
const FORMATTED_DATE = 't';
const CONFIRMED_PERCENT_DAILY = 'h';
const CONFIRMED_PERCENT_TOTAL = 'i';
const RECOVERED_PERCENT_DAILY = 'j';
const RECOVERED_PERCENT_TOTAL = 'k';
const DEATH_PERCENT_DAILY = 'l';
const DEATH_PERCENT_TOTAL = 'm';

export default {
  components: {
    GraphDailyIndonesia,
    DateIndonesia,
    Search,
    Header,
    Footer
  },
  data() {
    const currentIndex = this.$route.params.day
      ? this.$route.params.day - 1
      : indonesiaData.length - 1;

    return {
      CONFIRMED_DAILY,
      CONFIRMED_TOTAL,
      CONFIRMED_PERCENT_DAILY,
      CONFIRMED_PERCENT_TOTAL,
      RECOVERED_DAILY,
      RECOVERED_TOTAL,
      RECOVERED_PERCENT_DAILY,
      RECOVERED_PERCENT_TOTAL,
      DEATH_DAILY,
      DEATH_TOTAL,
      DEATH_PERCENT_DAILY,
      DEATH_PERCENT_TOTAL,
      FORMATTED_DATE,
      currentIndex,
      daily: indonesiaData,
      lastIndex: indonesiaData.length - 1
    };
  },
  computed: {
    currentData() {
      return indonesiaData[this.currentIndex];
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
