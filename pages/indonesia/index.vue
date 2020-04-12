<template>
  <div></div>
</template>

<script>
export default {
  layout(context) {
    return 'indonesia';
  },
  mounted() {
    this.$nuxt.$emit('day', 'latest');
  },
  head() {
    return {
      title: 'Jumlah data COVID-19 terbaru di Indonesia.',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Jumlah data terbaru sebaran Coronavirus Disease 2019 (COVID-19) di Indonesia, menampilkan data harian untuk jumlah positif terinfeksi, sembuh dan meninggal.'
        }
      ]
    };
  }
};
</script>
