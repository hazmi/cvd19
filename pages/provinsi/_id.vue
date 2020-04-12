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
  mounted() {
    this.$nuxt.$emit('id', this.$route.params.id);
  },
  head() {
    return {
      title: `Jumlah data COVID-19 di ${pageTitle[this.$route.params.id]}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `Jumlah data terbaru sebaran Coronavirus Disease 2019 (COVID-19) di ${
            pageTitle[this.$route.params.id]
          }, menampilkan data untuk jumlah positif terinfeksi, sembuh dan meninggal.`
        }
      ]
    };
  }
};
</script>
