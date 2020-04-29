<template>
  <div></div>
</template>

<script>
import latestData from '~/data/countries.json';
export default {
  layout(context) {
    return 'country';
  },
  data() {
    return {
      breadcrumbs: [
        {
          url: 'https://sebarancovid19.iw',
          text: 'Sebaran data COVID-19 di seluruh dunia.'
        },
        {
          url: `https://sebarancovid19.id/negara/${this.$route.params.name}`,
          text: `Sebaran data COVID-19 terbaru di negara ${
            latestData[this.$route.params.name].name
          }.`
        },
        {
          url: `https://sebarancovid19.id/negara/${this.$route.params.name}/${this.$route.params.day}`,
          text: `Sebaran data COVID-19 hari ke-${
            this.$route.params.day
          } di negara ${latestData[this.$route.params.name].name}.`
        }
      ]
    };
  },
  mounted() {
    this.$nuxt.$emit('updatecountry', {
      day: this.$route.params.day,
      name: this.$route.params.name
    });
  },
  head() {
    return {
      title: `Sebaran data COVID-19 hari ke-${
        this.$route.params.day
      } di negara ${latestData[this.$route.params.name].name}.`,
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
          content: `Jumlah sebaran data hari ke-${
            this.$route.params.day
          } Coronavirus Disease 2019 (COVID-19) di negara ${
            latestData[this.$route.params.name].name
          }, menampilkan data harian untuk jumlah positif terinfeksi, sembuh dan meninggal`
        },
        {
          property: 'og:title',
          content: `Jumlah data COVID-19 hari ke-${
            this.$route.params.day
          } di negara ${latestData[this.$route.params.name].name}.`
        },
        {
          property: 'og:description',
          content: `Jumlah sebaran data hari ke-${
            this.$route.params.day
          } Coronavirus Disease 2019 (COVID-19) di negara ${
            latestData[this.$route.params.name].name
          }, menampilkan data harian untuk jumlah positif terinfeksi, sembuh dan meninggal`
        },
        {
          property: 'og:image',
          content: 'https://sebarancovid19.id/icon.png'
        },
        {
          property: 'og:url',
          content: `https://sebarancovid19.id/negara/${this.$route.params.name}/${this.$route.params.day}`
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
