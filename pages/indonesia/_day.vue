<template>
  <div></div>
</template>

<script>
export default {
  layout: 'indonesia',
  mounted() {
    this.$nuxt.$emit('day', this.$route.params.day);
  },
  head() {
    return {
      title: `Visualisasi data COVID-19 hari ke-${this.$route.params.day} di Indonesia.`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `Visualisasi data hari ke-${this.$route.params.day} sebaran Coronavirus Disease 2019 (COVID-19) di Indonesia, menampilkan data harian untuk jumlah positif terinfeksi, sembuh dan meninggal`
        }
      ]
    };
  }
};
</script>
