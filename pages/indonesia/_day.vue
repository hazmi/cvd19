<template>
  <div></div>
</template>

<script>
export default {
  layout: 'indonesia',
  data() {
    return {
      breadcrumbs: [
        {
          url: 'https://sebarancovid19.id',
          text: 'Sebaran data COVID-19 di seluruh dunia.'
        },
        {
          url: 'https://sebarancovid19.id/indonesia',
          text: 'Sebaran data COVID-19 terbaru di Indonesia.'
        },
        {
          url: `https://sebarancovid19.id/indonesia/${this.$route.params.day}`,
          text: `Sebaran data COVID-19 hari ke-${this.$route.params.day} di Indonesia.`
        }
      ]
    };
  },
  mounted() {
    this.$nuxt.$emit('day', this.$route.params.day);
  },
  head() {
    return {
      title: `Sebaran data COVID-19 hari ke-${this.$route.params.day} di Indonesia.`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `Jumlah sebaran data hari ke-${this.$route.params.day} Coronavirus Disease 2019 (COVID-19) di Indonesia, menampilkan data harian untuk jumlah positif terinfeksi, sembuh dan meninggal`
        },
        {
          property: 'og:title',
          content: `Jumlah sebaran data COVID-19 hari ke-${this.$route.params.day} di Indonesia.`
        },
        {
          property: 'og:description',
          content: `Jumlah sebaran data hari ke-${this.$route.params.day} Coronavirus Disease 2019 (COVID-19) di Indonesia, menampilkan data harian untuk jumlah positif terinfeksi, sembuh dan meninggal`
        },
        {
          property: 'og:image',
          content: 'https://sebarancovid19.id/icon.png'
        },
        {
          property: 'og:url',
          content: `https://sebarancovid19.id/indonesia/${this.$route.params.day}`
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
