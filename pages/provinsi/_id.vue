<template>
  <div></div>
</template>

<script>
import defaultList from '../../utils/thelist';
const pageTitle = {};
// eslint-disable-next-line arrow-parens
defaultList.map(itemInList => {
  if (itemInList.type === 'province') {
    const arr = itemInList.link.split('/');
    const slug = arr[arr.length - 1];
    pageTitle[slug] = itemInList.label;
  }
});

export default {
  layout: 'province',
  data() {
    return {
      breadcrumbs: [
        {
          url: 'https://sebarancovid19.id',
          text: 'Sebaran data COVID-19 di seluruh dunia.'
        },
        {
          url: `https://sebarancovid19.id/provinsi/${this.$route.params.id}`,
          text: `Sebaran data COVID-19 di ${pageTitle[this.$route.params.id]}`
        }
      ]
    };
  },
  mounted() {
    this.$nuxt.$emit('id', this.$route.params.id);
  },
  head() {
    return {
      title: `Sebaran data COVID-19 di ${pageTitle[this.$route.params.id]}`,
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
          content: `Jumlah sebaran data terbaru Coronavirus Disease 2019 (COVID-19) di ${
            pageTitle[this.$route.params.id]
          }, menampilkan data untuk jumlah positif terinfeksi, sembuh dan meninggal.`
        },
        {
          property: 'og:title',
          content: `Jumlah sebaran data COVID-19 di ${
            pageTitle[this.$route.params.id]
          }`
        },
        {
          property: 'og:description',
          content: `Jumlah sebaran data terbaru Coronavirus Disease 2019 (COVID-19) di ${
            pageTitle[this.$route.params.id]
          }, menampilkan data untuk jumlah positif terinfeksi, sembuh dan meninggal.`
        },
        {
          property: 'og:image',
          content: 'https://sebarancovid19.id/icon.png'
        },
        {
          property: 'og:url',
          content: `https://sebarancovid19.id/provinsi/${this.$route.params.id}`
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
