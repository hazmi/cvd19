<template>
  <footer>
    <div>Terakhir diperbaharui: {{ time }}</div>
    <div>
      <router-link to="/about/">About</router-link>
    </div>
  </footer>
</template>
<script>
import * as dayjs from 'dayjs';
import 'dayjs/locale/id';
import info from '~/data/built-info.json';
export default {
  name: 'Footer',
  data() {
    return {
      time: dayjs(info.time).format('dddd, MMMM D, YYYY HH:mm:ss')
    };
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
