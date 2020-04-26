<template>
  <div :class="$style.container">
    <main :class="$style.main">
      <Header>
        <h1 v-if="!$route.params.day" :class="$style.title">
          <router-link :to="baseurl" :class="$style.titleLink">
            <span class="hid">Jumlah data terakhir</span>
            <span :class="$style.textCovid19">COVID-19</span>
            <span class="hid">yang positif, sembuh dan meninggal</span>
            <span :class="$style.textIn">di</span>
            <span :class="$style.textCurrent">{{ name }}</span>
          </router-link>
        </h1>
        <h1 v-if="$route.params.day" :class="$style.title">
          <router-link :to="baseurl" :class="$style.titleLink">
            <span class="hid">Jumlah data hari ke-{{ $route.params.day }}</span>
            <span :class="$style.textCovid19">COVID-19</span>
            <span class="hid">yang positif, sembuh dan meninggal</span>
            <span :class="$style.textIn">di</span>
            <span :class="$style.textCurrent">{{ name }}</span>
          </router-link>
        </h1>
        <p :class="$style.population">
          Population: {{ population.toLocaleString() }}
        </p>
      </Header>
      <div :class="$style.confirmed">
        <GraphDaily
          v-if="currentData"
          title="Positif"
          color="242, 201, 76"
          :daily="daily"
          :current="currentData"
          :baseurl="baseurl"
          :itemkey="itemKeyConfirmedTotal"
          :itemkeydaily="itemKeyConfirmedDaily"
          :increment="currentData.confirmedDaily.toLocaleString()"
        >
          {{ currentData.confirmedTotal.toLocaleString() }}
        </GraphDaily>
      </div>
      <div :class="$style.recovered">
        <GraphDaily
          v-if="currentData"
          title="Sembuh"
          color="111, 207, 151"
          :daily="daily"
          :current="currentData"
          :baseurl="baseurl"
          :itemkey="itemKeyRecoveredTotal"
          :itemkeydaily="itemKeyConfirmedDaily"
          :increment="currentData.recoveredDaily.toLocaleString()"
        >
          {{ currentData.recoveredTotal.toLocaleString() }}
        </GraphDaily>
      </div>
      <div :class="$style.death">
        <GraphDaily
          v-if="currentData"
          title="Meninggal"
          color="235, 87, 87"
          :daily="daily"
          :current="currentData"
          :baseurl="baseurl"
          :itemkey="itemKeyDeathTotal"
          :itemkeydaily="itemKeyDeathDaily"
          :increment="currentData.deathDaily.toLocaleString()"
        >
          {{ currentData.deathTotal.toLocaleString() }}
        </GraphDaily>
      </div>
      <div :class="$style.search">
        <Search :current="name" />
      </div>
      <div :class="$style.date">
        <DateWithArrow
          v-if="currentData"
          :ts="currentData.date * 100000"
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
// import * as dayjs from 'dayjs';
import latestData from '~/data/countries.json';
import Header from '~/components/Header.vue';
import Search from '~/components/Search.vue';
import Footer from '~/components/Footer.vue';
import GraphDaily from '~/components/GraphDaily.vue';
import DateWithArrow from '~/components/DateWithArrow.vue';

const CONFIRMED_DAILY = 'a';
const CONFIRMED_TOTAL = 'b';
const RECOVERED_DAILY = 'c';
const RECOVERED_TOTAL = 'd';
const DEATH_DAILY = 'e';
const DEATH_TOTAL = 'f';
const POPULATION = 'p';

export default {
  components: {
    GraphDaily,
    DateWithArrow,
    Header,
    Footer,
    Search
  },
  data() {
    const { name } = this.$route.params;
    const currentData = latestData[name].data[latestData[name].data.length - 1];
    currentData.confirmedDaily = currentData[CONFIRMED_DAILY];
    currentData.confirmedTotal = currentData[CONFIRMED_TOTAL];
    currentData.recoveredDaily = currentData[RECOVERED_DAILY];
    currentData.recoveredTotal = currentData[RECOVERED_TOTAL];
    currentData.deathDaily = currentData[DEATH_DAILY];
    currentData.deathTotal = currentData[DEATH_TOTAL];

    const theData = {
      itemKeyConfirmedDaily: CONFIRMED_DAILY,
      itemKeyConfirmedTotal: CONFIRMED_TOTAL,
      itemKeyRecoveredDaily: RECOVERED_DAILY,
      itemKeyRecoveredTotal: RECOVERED_TOTAL,
      itemKeyDeathDaily: DEATH_DAILY,
      itemKeyDeathTotal: DEATH_TOTAL,
      baseurl: `/country/${name}/`,
      name: latestData[name].name,
      population: latestData[name][POPULATION],
      currentIndex: latestData[name].data.length - 1,
      currentData,
      daily: latestData[name].data,
      nextDay: null,
      prevDay: `/country/${name}/${latestData[this.$route.params.name].data
        .length - 2}`
    };
    return theData;
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
    this.$nuxt.$on('updatecountry', () => {
      const { name, day } = this.$route.params;
      this.baseurl = `/country/${name}/`;
      this.name = latestData[name].name;
      this.population = latestData[name][POPULATION];
      this.daily = latestData[name].data;
      this.currentIndex = day || latestData[name].data.length;
      if (day) {
        this.currentData = latestData[name].data[day - 1];
      } else {
        this.currentData =
          latestData[name].data[latestData[name].data.length - 1];
      }

      this.currentData.confirmedDaily = this.currentData[CONFIRMED_DAILY];
      this.currentData.confirmedTotal = this.currentData[CONFIRMED_TOTAL];
      this.currentData.recoveredDaily = this.currentData[RECOVERED_DAILY];
      this.currentData.recoveredTotal = this.currentData[RECOVERED_TOTAL];
      this.currentData.deathDaily = this.currentData[DEATH_DAILY];
      this.currentData.deathTotal = this.currentData[DEATH_TOTAL];

      if (day) {
        if (day < latestData[name].data.length - 1) {
          this.nextDay = `/country/${name}/${1 * day + 1}`;
        } else {
          this.nextDay = `/country/${name}`;
        }
        if (day > 1) {
          this.prevDay = `/country/${name}/${1 * day - 1}`;
        } else {
          this.prevDay = null;
        }
      } else {
        this.nextDay = null;
        this.prevDay = `/country/${name}/${latestData[name].data.length - 1}`;
      }
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
