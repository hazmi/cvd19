<script>
export default {
  fetch({ params, redirect }) {
    redirect(302, '/indonesia');
  },
  head() {
    return {
      title: 'Jumlah sebaran data COVID-19 di seluruh dunia.',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Jumlah sebaran data Coronavirus Disease 2019 (COVID-19) di Indonesia, semua provinsi di Indonesia dan negara-negara di seluruh dunia. Menampilkan data harian untuk jumlah positif terinfeksi, sembuh dan meninggal.'
        }
      ]
    };
  }
};
</script>
