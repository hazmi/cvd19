<template>
  <div></div>
</template>

<script>
import data from '~/data/countries.json';
export default {
  layout: 'country',
  data() {
    return {
      breadcrumbs: [
        {
          url: 'https://sebarancovid19.id',
          text: 'Sebaran data COVID-19 di seluruh dunia.'
        },
        {
          url: `https://sebarancovid19.id/negara/${this.$route.params.name}`,
          text: `Sebaran data COVID-19 terbaru di negara ${
            data[this.$route.params.name].name
          }.`
        }
      ]
    };
  },
  mounted() {
    this.$nuxt.$emit('updatecountry', { country: this.$route.params.name });
  },
  head() {
    return {
      title: `Sebaran data COVID-19 terbaru di negara ${
        data[this.$route.params.name].name
      }.`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `Jumlah sebaran data terbaru Coronavirus Disease 2019 (COVID-19) di ${
            data[this.$route.params.name].name
          }, menampilkan data harian untuk jumlah positif terinfeksi, sembuh dan meninggal.`
        },
        {
          property: 'og:title',
          content: `Jumlah sebaran data COVID-19 terbaru di ${
            data[this.$route.params.name].name
          }.`
        },
        {
          property: 'og:description',
          content: `Jumlah sebaran data terbaru Coronavirus Disease 2019 (COVID-19) di ${
            data[this.$route.params.name].name
          }, menampilkan data harian untuk jumlah positif terinfeksi, sembuh dan meninggal.`
        },
        {
          property: 'og:image',
          content: 'https://sebarancovid19.id/icon.png'
        },
        {
          property: 'og:url',
          content: `https://sebarancovid19.id/negara/${this.$route.params.name}`
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
