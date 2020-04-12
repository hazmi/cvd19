<template>
  <div :class="$style.container">
    <Header>
      <h2 :class="$style.header">FAQ-<em>ish</em></h2>
    </Header>
    <div :class="$style.content">
      <dl>
        <dt>Keyboard Support:</dt>
        <dd>
          "<strong>/</strong>" untuk fokus ke pencarian.<br />
          "<strong>esc</strong>" untuk menutup ke dropdown area.<br />
          "<strong>←</strong>" untuk navigasi ke hari sebelumnya.<br />
          "<strong>→</strong>" untuk navigasi ke hari berikutnya.<br />
        </dd>
        <dt>Sumber data:</dt>
        <dd>
          <a
            :class="$style.link"
            href="https://services5.arcgis.com/VS6HdKS0VfIhv8Ct/ArcGIS/rest/services"
            >BNPB</a
          >
          dan
          <a
            :class="$style.link"
            href="https://github.com/CSSEGISandData/COVID-19/tree/master/csse_covid_19_data/csse_covid_19_time_series"
            >JHU CSSE</a
          >.
        </dd>
        <dt>Teknologi:</dt>
        <dd>
          <a href="https://nuxtjs.org/">NuxtJS</a>, sebuah Javascript framework
          menggunakan library <a href="https://vuejs.org/">VueJS</a>.
        </dd>
        <dt>Sumber kode:</dt>
        <dd>
          Semua sumber kode ada di
          <a href="https://github.com/hazmi/cvd19">Github</a>
        </dd>
        <dt>Server:</dt>
        <dd>
          Di <em>generate</em> dan di <em>deploy</em> di
          <a href="https://www.netlify.com/">Netlify</a>.
        </dd>
      </dl>
    </div>
    <div :class="$style.search">
      <Search />
    </div>
  </div>
</template>

<script>
import Header from '~/components/Header.vue';
import Search from '~/components/Search.vue';
export default {
  components: {
    Header,
    Search
  },
  head() {
    return {
      title: 'FAQ-ish cvd19.pw',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Informasi seputar situs cvd19.pw, situs yang menampilkan visualisasi sebaran virus COVID-19 di seluruh dunia dan di provinsi-provinsi di Indonesia.'
        }
      ]
    };
  }
};
</script>
<style module>
.container {
  flex: 1;
  display: grid;
  padding: 10px;
  grid-gap: 10px;
  grid-template-rows: 25px 55px 1fr;
}
.content {
  font-size: 15px;
}
.search {
  grid-row-start: 2;
  display: flex;
}
.header {
  font-size: 18px;
  margin: 10px 0 15px;
  color: #f2994a;
}
.paragraph {
  opacity: 0.8;
  font-family: sans-serif;
  line-height: 1.5;
  margin-bottom: 10px;
}
.link {
  color: #fff;
}
.content a {
  color: #f2994a;
}
.content dt {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.9);
}
.content dd {
  display: block;
  font-size: 12px;
  padding: 3px 0 10px 10px;
  color: rgba(255, 255, 255, 0.7);
}
.content strong {
  color: #f2994a;
}
</style>
