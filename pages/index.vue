<template>
  <div :class="$style.container">
    <Header>
      <h1 v-if="!$route.params.day" :class="$style.title">
        <span class="hid">Jumlah data terakhir</span>
        <span :class="$style.textCovid19">COVID-19</span>
        <span class="hid">yang positif, sembuh dan meninggal</span>
        <span :class="$style.textIn">di</span>
        <span :class="$style.textCurrent">Seluruh Dunia</span>
      </h1>
    </Header>
    <div :class="$style.search">
      <Search persist="true" />
    </div>
  </div>
</template>
<script>
import Header from '~/components/Header.vue';
import Search from '~/components/Search.vue';
export default {
  components: {
    Header,
    Search
  },
  data() {
    return {
      breadcrumbs: [
        {
          url: 'https://sebarancovid19.id',
          text: 'Sebaran data COVID-19 di seluruh dunia.'
        }
      ]
    };
  },
  head() {
    return {
      title: 'Sebaran data COVID-19 di seluruh dunia.',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Jumlah sebaran data Coronavirus Disease 2019 (COVID-19) di Indonesia, semua provinsi di Indonesia dan negara-negara di seluruh dunia. Menampilkan data harian untuk jumlah positif terinfeksi, sembuh dan meninggal.'
        },
        {
          property: 'og:title',
          content: 'Sebaran data COVID-19 di seluruh dunia.'
        },
        {
          property: 'og:description',
          content:
            'Jumlah sebaran data Coronavirus Disease 2019 (COVID-19) di Indonesia, semua provinsi di Indonesia dan negara-negara di seluruh dunia. Menampilkan data harian untuk jumlah positif terinfeksi, sembuh dan meninggal.'
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
  grid-template-rows: 25px 55px 1fr;
}
.content {
  font-size: 15px;
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
