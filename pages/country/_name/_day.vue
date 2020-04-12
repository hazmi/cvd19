<template>
  <div></div>
</template>

<script>
import latestData from '~/data/countries.json';
export default {
  layout(context) {
    return 'country';
  },
  mounted() {
    this.$nuxt.$emit('updatecountry', {
      day: this.$route.params.day,
      name: this.$route.params.name
    });
  },
  head() {
    return {
      title: `Jumlah data COVID-19 hari ke-${this.$route.params.day} di ${
        latestData[this.$route.params.name].name
      }.`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `Jumlah data hari ke-${
            this.$route.params.day
          } sebaran Coronavirus Disease 2019 (COVID-19) di ${
            latestData[this.$route.params.name].name
          }, menampilkan data harian untuk jumlah positif terinfeksi, sembuh dan meninggal`
        }
      ]
    };
  }
};
</script>
