<script>
export default {
  fetch({ params, redirect }) {
    redirect(302, '/indonesia');
  },
  head() {
    return {
      title: 'Visualisasi data sebaran COVID-19 di seluruh dunia.',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Sebuah visualisasi data sebaran Coronavirus Disease 2019 (COVID-19) di seluruh dunia, menampilkan data harian untuk jumlah positif terinfeksi, sembuh dan meninggal.'
        }
      ]
    };
  }
};
</script>
