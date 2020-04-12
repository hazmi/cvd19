<template>
  <header :class="$style.header">
    <div :class="$style.titleWrapper">
      <div><slot></slot></div>
      <router-link to="/" :class="$style.url">cvd19.pw</router-link>
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
      url: 'https://cvd19.pw',
      logo: 'https://cvd19.pw/icon.png'
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
  font-size: 14px;
}
</style>
