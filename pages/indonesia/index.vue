<template>
  <div></div>
</template>

<script>
export default {
  layout(context) {
    return 'indonesia';
  },
  data() {
    return {
      breadcrumbs: [
        {
          url: 'https://cvd19.pw',
          text: 'Jumlah sebaran data COVID-19 di seluruh dunia.'
        },
        {
          url: 'https://cvd19.pw/indonesia',
          text: 'Jumlah sebaran data COVID-19 terbaru di Indonesia.'
        }
      ]
    };
  },
  mounted() {
    this.$nuxt.$emit('day', 'latest');
  },
  head() {
    return {
      title: 'Jumlah sebaran data COVID-19 terbaru di Indonesia.',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Jumlah sebaran data terbaru Coronavirus Disease 2019 (COVID-19) di Indonesia, menampilkan data harian untuk jumlah positif terinfeksi, sembuh dan meninggal.'
        },
        {
          property: 'og:title',
          content: 'Jumlah sebaran data COVID-19 terbaru di Indonesia.'
        },
        {
          property: 'og:description',
          content:
            'Jumlah sebaran data terbaru Coronavirus Disease 2019 (COVID-19) di Indonesia, menampilkan data harian untuk jumlah positif terinfeksi, sembuh dan meninggal.'
        },
        {
          property: 'og:image',
          content: 'https://cvd19.pw/icon.png'
        },
        {
          property: 'og:url',
          content: 'https://cvd19.pw/indonesia'
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
