<template>
  <div
    :class="{
      [$style.container]: true,
      [$style.containeractive]: isSearchFocus
    }"
  >
    <header>
      <h1 :class="$style.sitename">Sebaran<span>COVID19</span>.id</h1>
      <p :class="$style.desc">
        Menampilkan sebaran data Coronavirus Disease 2019 (COVID-19) di
        Indonesia, semua provinsi di Indonesia dan negara-negara di seluruh
        dunia.
      </p>
    </header>
    <main>
      <div :class="$style.main">
        <h2 :class="$style.subheader">
          Total sebaran data di seluruh dunia
        </h2>
        <p :class="$style.notes">
          Sumber: John Hopkins University,
          {{ worldwide.date }}
        </p>
        <ul :class="$style.worldwide">
          <li :class="$style.positif">
            <div>
              <strong>Positif</strong><span class="hid">:</span>
              <span>{{ worldwide.confirmed.toLocaleString() }}</span>
            </div>
          </li>
          <li :class="$style.sembuh">
            <div>
              <strong>Sembuh</strong><span class="hid">:</span>
              <span>{{ worldwide.recovered.toLocaleString() }}</span>
            </div>
          </li>
          <li :class="$style.meninggal">
            <div>
              <strong>Meninggal</strong><span class="hid">:</span>
              <span>{{ worldwide.deaths.toLocaleString() }}</span>
            </div>
          </li>
        </ul>
        <h2 :class="$style.subheader">
          Negara dengan kasus <span>Positif</span> COVID-19 terbanyak
        </h2>
        <ol :class="$style.orderedList">
          <li
            v-for="item in mostAffectedCountries"
            :key="item.link"
            :class="$style.listItem"
          >
            <router-link :to="item.link">{{ `${item.label}` }}</router-link>
          </li>
          <li
            :value="indonesiaRank"
            :style="{
              'counter-increment': `list-counter ${indonesiaRank - 10}`
            }"
            :class="$style.listItemIndonesia"
          >
            <router-link to="/negara/indonesia">{{ `Indonesia` }}</router-link>
          </li>
        </ol>
        <h2 :class="$style.subheader">
          Negara dengan kasus <span>Meninggal</span> COVID-19 terbanyak
        </h2>
        <ol :class="$style.orderedList">
          <li
            v-for="item in mostDeathsCountries"
            :key="item.link"
            :class="$style.listItem"
          >
            <router-link :to="item.link">{{ `${item.label}` }}</router-link>
          </li>
          <li
            :value="indonesiaRankDeaths"
            :style="{
              'counter-increment': `list-counter ${indonesiaRankDeaths - 10}`
            }"
            :class="$style.listItemIndonesia"
          >
            <router-link to="/negara/indonesia">{{ `Indonesia` }}</router-link>
          </li>
        </ol>
        <h2 :class="$style.subheader">
          Provinsi di Indonesia dengan kasus <span>Positif</span> COVID-19
          terbanyak
        </h2>
        <ol :class="$style.orderedList">
          <li
            v-for="item in provinces"
            :key="item.link"
            :class="$style.listItem"
          >
            <router-link :to="item.link">{{
              `${item.labelWithNoCountry}`
            }}</router-link>
          </li>
        </ol>
        <div :class="$style.footerWrapper">
          <Footer />
        </div>
      </div>
    </main>
    <div :class="$style.search">
      <Search
        :onfocuscallback="onfocuscallback"
        :onlostfocuscallback="onlostfocuscallback"
      />
    </div>
  </div>
</template>
<script>
import Search from '~/components/Search.vue';
import Footer from '~/components/Footer.vue';
import worldwide from '~/data/worldwide.json';
import formattedList from '~/utils/formattedList';

let indonesiaRank = 0;
for (let i = 0; i < formattedList.mostAffectedCountries.length; i++) {
  if (formattedList.mostAffectedCountries[i].label === 'Indonesia') {
    indonesiaRank = i + 1;
    break;
  }
}

let indonesiaRankDeaths = 0;
for (let i = 0; i < formattedList.mostDeathsCountries.length; i++) {
  if (formattedList.mostDeathsCountries[i].label === 'Indonesia') {
    indonesiaRankDeaths = i + 1;
    break;
  }
}

export default {
  components: {
    Search,
    Footer
  },
  data() {
    return {
      isSearchFocus: false,
      worldwide,
      provinces: formattedList.mostAffectedProvinces.slice(0, 10),
      mostAffectedCountries: formattedList.mostAffectedCountries.slice(0, 10),
      mostDeathsCountries: formattedList.mostDeathsCountries.slice(0, 10),
      indonesiaRank,
      indonesiaRankDeaths,
      breadcrumbs: [
        {
          url: 'https://sebarancovid19.id',
          text: 'Sebaran data COVID-19 di seluruh dunia.'
        }
      ]
    };
  },
  mounted() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    window.addEventListener('resize', this.onResize);
  },
  methods: {
    onfocuscallback() {
      this.isSearchFocus = true;
    },
    onlostfocuscallback() {
      this.isSearchFocus = false;
    }
  },
  head() {
    return {
      title: 'Sebaran data COVID-19 di seluruh dunia.',
      link: [
        {
          rel: 'canonical',
          href: `https://sebarancovid19.id${this.$route.path}`
        }
      ],
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Menampilkan sebaran data Coronavirus Disease 2019 (COVID-19) di Indonesia, semua provinsi di Indonesia dan negara-negara di seluruh dunia. Menyajikan data harian untuk jumlah positif terinfeksi, sembuh dan meninggal.'
        },
        {
          property: 'og:title',
          content: 'Sebaran data COVID-19 di seluruh dunia.'
        },
        {
          property: 'og:description',
          content:
            'Menampilkan sebaran data Coronavirus Disease 2019 (COVID-19) di Indonesia, semua provinsi di Indonesia dan negara-negara di seluruh dunia. Menyajikan data harian untuk jumlah positif terinfeksi, sembuh dan meninggal.'
        },
        {
          property: 'og:image',
          content: 'https://sebarancovid19.id/icon.png'
        },
        {
          property: 'og:url',
          content: 'https://sebarancovid19.id/'
        },
        {
          property: 'og:locale',
          content: 'id'
        },
        {
          property: 'og:type',
          content: 'website'
        }
      ]
    };
  },
  jsonld() {
    const items = this.breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.text,
      item: item.url
    }));
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items
    };
  }
};
</script>
<style module>
.container {
  flex: 1;
  display: grid;
  padding: 10px;
  grid-gap: 10px;
  grid-template-rows: 110px 55px 1fr;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  overflow: auto;
}
.containeractive {
  overflow: hidden;
}
.container .footerWrapper {
  margin: 0 -10px;
}
.container .main {
  margin: -10px -10px 0;
  padding: 10px;
}
.sitename {
  padding: 20px 0 10px;
  font-size: 20px;
}
.sitename span {
  color: #f2994a;
}
.desc {
  font-size: 12px;
  line-height: 1.4;
  font-weight: normal;
  color: rgba(255, 255, 255, 0.8);
}
.desc strong {
  color: #f2994a;
}
.content {
  font-size: 15px;
}

.subheader {
  color: #f2994a;
  font-size: 13px;
  margin: 10px 0 3px;
}
.subheader span {
  color: #9ebae0;
}
.notes {
  font-size: 10px;
  color: #c6c6c6;
}

.worldwide {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
  margin: 15px 0 30px;
  padding: 0;
  list-style: none;
}
.worldwide div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
}
.worldwide strong {
  font-size: 12px;
  margin-bottom: 3px;
  color: #9ebae0;
}
.worldwide span {
  font-size: 18px;
}
.worldwide .positif div {
  background: #2c2a25;
}
.worldwide .positif span {
  color: #f2c94c;
}
.worldwide .sembuh div {
  background: #272a28;
}
.worldwide .sembuh span {
  color: #87cc9c;
}
.worldwide .meninggal div {
  background: #2c2525;
}
.worldwide .meninggal span {
  color: #c85956;
}

.orderedList {
  overflow: hidden;
  padding: 0;
  margin: 15px -10px;
  list-style: none;
  counter-reset: list-counter;
}
.orderedList > li {
  counter-increment: list-counter;
}
.orderedList > li a::before {
  content: counter(list-counter) '. ';
  color: rgb(242, 153, 74);
  padding-right: 4px;
}
.listItem {
  float: left;
  list-style: none;
  display: flex;
  margin: 0 0 10px 10px;
}
.listItemIndonesia {
  float: left;
  position: relative;
  list-style: none;
  display: flex;
  margin: 0 0 10px 30px;
}
.listItemIndonesia::before {
  position: absolute;
  content: '...';
  left: -20px;
  top: 0;
}
.orderedList a {
  display: flex;
  height: 30px;
  padding: 0 10px;
  font-size: 13px;
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 3px;
  text-decoration: none;
  align-items: center;
  background: rgba(255, 255, 255, 0.05);
}
.orderedList a:hover {
  color: rgb(242, 153, 74);
  border: 1px solid rgb(242, 153, 74);
  background: rgba(255, 255, 255, 0.1);
}
.orderedList a:focus {
  outline: none;
  box-shadow: 0 0 0 3px #56ccf2;
}

.search {
  grid-row-start: 2;
  display: flex;
}
.header {
  font-size: 18px;
  margin: 10px 0 15px;
  color: #f2994a;
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
  color: #f2994a;
}
</style>
