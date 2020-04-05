<template>
  <div :class="$style.container">
    <div :class="$style.headerWrapper">
      <Header />
    </div>
    <div :class="$style.content">
      <h2 :class="$style.header">
        About <strong :class="$style.siteName">cvd19.pw</strong>
      </h2>
      <p :class="$style.paragraph">
        This site is merely a visualization of an existing Covid19 public data.
      </p>
      <p :class="$style.paragraph">
        All Indonesian and Indonesian Province data are being fetched from
        <a
          :class="$style.link"
          href="https://services5.arcgis.com/VS6HdKS0VfIhv8Ct/ArcGIS/rest/services"
          >BNPB ArcGIS</a
        >
        dashboard.
      </p>
      <p :class="$style.paragraph">
        This site initialy started as a
        <a :class="$style.link" href="https://codepen.io/hazmi/pen/WNvgJZp">
          Pen in Codepen </a
        >, then evolve bit by bit and became a full site. Currently, its built
        with <a :class="$style.link" href="https://nuxtjs.org/">NuxtJS</a> and
        hosted in
        <a :class="$style.link" href="https://www.netlify.com/">Netlify</a>.
      </p>
      <p :class="$style.paragraph">
        All source code are available in
        <a :class="$style.link" href="https://github.com/hazmi/cvd19">Github</a>
      </p>
    </div>
  </div>
</template>

<script>
import Header from '~/components/Header.vue';
export default {
  components: {
    Header
  },
  head() {
    return {
      title: 'About cvd19.pw',
      meta: [
        {
          hid: 'About cvd19.pw, a Covid19 Dashboard',
          name: 'About cvd19.pw, a Covid19 Dashboard',
          content: 'About cvd19.pw, a Covid19 Dashboard'
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
  grid-template-rows: 90px 1fr;
}
.headerWrapper {
  display: flex;
}
.content {
  font-size: 14px;
}
.header {
  font-size: 18px;
  margin: 10px 0 15px;
  color: #f2994a;
}
.paragraph {
  opacity: 0.7;
  margin-bottom: 10px;
}
.link {
  color: #fff;
}
</style>
