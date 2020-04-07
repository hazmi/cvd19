<template>
  <div></div>
</template>

<script>
const pageTitle = {
  aceh: 'Aceh, Indonesia',
  'sumatera-utara': 'Sumatera Utara, Indonesia',
  'sumatera-barat': 'Sumatera Barat, Indonesia',
  riau: 'Riau, Indonesia',
  jambi: 'Jambi, Indonesia',
  'sumatera-selatan': 'Sumatera Selatan, Indonesia',
  bengkulu: 'Bengkulu, Indonesia',
  'kepulauan-bangka-belitung': 'Kepulauan Bangka Belitung, Indonesia',
  lampung: 'Lampung, Indonesia',
  'kepulauan-riau': 'Kepulauan Riau, Indonesia',
  'dki-jakarta': 'DKI Jakarta, Indonesia',
  'jawa-barat': 'Jawa Barat, Indonesia',
  'jawa-tengah': 'Jawa Tengah, Indonesia',
  'daerah-istimewa-yogyakarta': 'Daerah Istimewa Yogyakarta, Indonesia',
  'jawa-timur': 'Jawa Timur, Indonesia',
  banten: 'Banten, Indonesia',
  bali: 'Bali, Indonesia',
  'nusa-tenggara-barat': 'Nusa Tenggara Barat, Indonesia',
  'nusa-tenggara-timur': 'Nusa Tenggara Timur, Indonesia',
  'kalimantan-tengah': 'Kalimantan Tengah, Indonesia',
  'kalimantan-barat': 'Kalimantan Barat, Indonesia',
  'kalimantan-selatan': 'Kalimantan Selatan, Indonesia',
  'kalimantan-timur': 'Kalimantan Timur, Indonesia',
  'kalimantan-utara': 'Kalimantan Utara, Indonesia',
  'sulawesi-utara': 'Sulawesi Utara, Indonesia',
  'sulawesi-tengah': 'Sulawesi Tengah, Indonesia',
  'sulawesi-selatan': 'Sulawesi Selatan, Indonesia',
  'sulawesi-tenggara': 'Sulawesi Tenggara, Indonesia',
  'sulawesi-barat': 'Sulawesi Barat, Indonesia',
  gorontalo: 'Gorontalo, Indonesia',
  maluku: 'Maluku, Indonesia',
  'maluku-utara': 'Maluku Utara, Indonesia',
  papua: 'Papua, Indonesia',
  'papua-barat': 'Papua Barat, Indonesia'
};
export default {
  layout: 'province',
  mounted() {
    this.$nuxt.$emit('id', this.$route.params.id);
  },
  head() {
    return {
      title: `The Latest Covid19 Cases in ${
        pageTitle[this.$route.params.id]
      }, Indonesia`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `The latest confirmed, recovered and death Covid19 cases in ${
            pageTitle[this.$route.params.id]
          }`
        }
      ]
    };
  }
};
</script>
