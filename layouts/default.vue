<template>
  <div :class="$style.container">
    <main :class="$style.main">
      <nuxt />
    </main>
  </div>
</template>
<script>
export default {
  mounted() {
    this.$nextTick(function() {
      this.onResize();
    });
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    window.addEventListener('resize', this.onResize);
  },
  methods: {
    onResize() {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
  }
};
</script>
<style module>
.container {
  margin: 0 auto;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  max-width: 410px;
  display: grid;
  grid-template-rows: 1fr 18px;
}
.main {
  display: flex;
}
.searchWrapper {
  border-bottom: 5px solid #fff;
}
.input {
  background: rgba(255, 255, 255, 0.1);
  border: 0;
  height: 55px;
  width: 100%;
  font-size: 22px;
  color: #fff;
  font-weight: 900;
  padding: 0 10px;
}
</style>
