<template>
  <div :class="$style.container">
    <main :class="$style.main">
      <nuxt />
    </main>
    <footer :class="$style.footer">
      Dashboard by
      <a href="https://codepen.com/hazmi">Hazmi</a>. Built for personal use.
    </footer>
  </div>
</template>
<script>
export default {};
</script>
<style module>
.container {
  margin: 0 auto;
  min-height: 100vh;
  max-width: 410px;
  display: grid;
  grid-template-rows: 1fr 20px;
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

<style>
html {
  color: #fff;
  font-family: 'Lato', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  background: #222;
}
body {
  overflow: hidden;
}
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
footer {
  display: flex;
  padding: 0 10px;
  font-size: 10px;
  opacity: 0.6;
}
footer a {
  color: #fff;
  margin-left: 3px;
}
</style>
