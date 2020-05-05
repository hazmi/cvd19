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
          url: 'https://sebarancovid19.id',
          text: 'Sebaran data COVID-19 di seluruh dunia.'
        },
        {
          url: 'https://sebarancovid19.id/negara/indonesia',
          text: 'Sebaran data COVID-19 terbaru di negara Indonesia.'
        }
      ]
    };
  },
  mounted() {
    this.$nuxt.$emit('day', 'latest');
  },
  head() {
    return {
      title: 'Sebaran data COVID-19 terbaru di negara Indonesia.',
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
            'Jumlah sebaran data terbaru Coronavirus Disease 2019 (COVID-19) di negara Indonesia, menampilkan data harian untuk jumlah positif terinfeksi, sembuh dan meninggal.'
        },
        {
          property: 'og:title',
          content: 'Sebaran data COVID-19 terbaru di negara Indonesia.'
        },
        {
          property: 'og:description',
          content:
            'Jumlah sebaran data terbaru Coronavirus Disease 2019 (COVID-19) di negara Indonesia, menampilkan data harian untuk jumlah positif terinfeksi, sembuh dan meninggal.'
        },
        {
          property: 'og:image',
          content: 'https://sebarancovid19.id/icon.png'
        },
        {
          property: 'og:url',
          content: 'https://sebarancovid19.id/negara/indonesia'
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
