<template>
  <div></div>
</template>

<script>
import data from '~/data/countries.json';
export default {
  layout: 'country',
  mounted() {
    this.$nuxt.$emit('updatecountry', { country: this.$route.params.name });
  },
  head() {
    return {
      title: `Jumlah data COVID-19 terbaru di ${
        data[this.$route.params.name].name
      }.`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `Jumlah data terbaru sebaran Coronavirus Disease 2019 (COVID-19) di ${
            data[this.$route.params.name].name
          }, menampilkan data harian untuk jumlah positif terinfeksi, sembuh dan meninggal.`
        }
      ]
    };
  }
};
</script>
