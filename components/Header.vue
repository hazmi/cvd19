<template>
  <header :class="$style.header">
    <div :class="$style.titleWrapper">
      <div><slot></slot></div>
      <router-link to="/" :class="$style.url">SebaranCOVID19.id</router-link>
    </div>
  </header>
</template>
<script>
export default {
  name: 'Header',
  jsonld() {
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      url: 'https://sebarancovid19.id',
      logo: 'https://sebarancovid19.id/icon.png'
    };
  }
};
</script>
<style module>
.header {
  position: relative;
  z-index: 9;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-end;
}
.titleWrapper {
  display: flex;
  height: 25px;
  justify-content: space-between;
  align-items: center;
}
.url {
  color: #fff;
  text-decoration: none;
  font-size: 11px;
}
</style>
