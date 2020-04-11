<template>
  <footer>
    <div>Last update: {{ time }}</div>
    <div>
      <router-link to="/faq">FAQ</router-link>
    </div>
  </footer>
</template>
<script>
import info from '~/data/built-info.json';
export default {
  name: 'Footer',
  data() {
    return info;
  }
};
</script>
<style>
footer {
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  font-size: 9px;
  opacity: 0.6;
}
footer a {
  color: #fff;
  margin-left: 3px;
}
</style>
