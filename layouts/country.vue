<template>
  <div :class="$style.container">
    <main :class="$style.main">
      <Header :current="name" :baseurl="baseurl" />
      <div :class="$style.confirmed">
        <GraphDaily
          v-if="currentData"
          title="Confirmed"
          color="242, 201, 76"
          :daily="daily"
          :current="currentData"
          :baseurl="baseurl"
          itemkey="confirmedTotal"
          :increment="currentData.confirmedDaily.toLocaleString()"
        >
          {{ currentData.confirmedTotal.toLocaleString() }}
        </GraphDaily>
      </div>
      <div :class="$style.recovered">
        <GraphDaily
          v-if="currentData"
          title="Recovered"
          color="111, 207, 151"
          :daily="daily"
          :current="currentData"
          :baseurl="baseurl"
          itemkey="recoveredTotal"
          :increment="currentData.recoveredDaily.toLocaleString()"
        >
          {{ currentData.recoveredTotal.toLocaleString() }}
        </GraphDaily>
      </div>
      <div :class="$style.death">
        <GraphDaily
          v-if="currentData"
          title="Death"
          color="235, 87, 87"
          :daily="daily"
          :current="currentData"
          :baseurl="baseurl"
          itemkey="deathTotal"
          :increment="currentData.deathDaily.toLocaleString()"
        >
          {{ currentData.deathTotal.toLocaleString() }}
        </GraphDaily>
      </div>
      <div :class="$style.date">
        <DateWithArrow
          v-if="currentData"
          :ts="currentData.date"
          :prev="prevDay"
          :next="nextDay"
          :day="currentIndex"
        />
        <nuxt />
      </div>
    </main>
    <footer :class="$style.footer">
      <div>
        Indonesian data are from
        <a
          href="https://services5.arcgis.com/VS6HdKS0VfIhv8Ct/ArcGIS/rest/services"
        >
          BNPB
        </a>
        , others are from
        <a href="https://github.com/CSSEGISandData/COVID-19">JHU CSSE</a>.
      </div>
      <div>
        <router-link to="/about">
          About
        </router-link>
      </div>
    </footer>
  </div>
</template>
<script>
/* eslint-disable arrow-parens */
// import * as dayjs from 'dayjs';
import latestData from '~/scripts/latest.json';
import Header from '~/components/Header.vue';
import GraphDaily from '~/components/GraphDaily.vue';
import DateWithArrow from '~/components/DateWithArrow.vue';

export default {
  components: {
    GraphDaily,
    DateWithArrow,
    Header
  },
  data() {
    const { name } = this.$route.params;
    console.log('name', latestData[name]);
    const theData = {
      baseurl: `/country/${name}/`,
      name: latestData[name].name,
      currentIndex: latestData[name].data.length - 1,
      currentData:
        latestData[name].data[latestData[name].data.length - 1].attributes,
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
      this.daily = latestData[name].data;
      this.currentIndex = day || latestData[name].data.length;
      if (day) {
        this.currentData = latestData[name].data[day - 1].attributes;
      } else {
        this.currentData =
          latestData[name].data[latestData[name].data.length - 1].attributes;
      }

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
