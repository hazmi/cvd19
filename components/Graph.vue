<template>
  <div :class="$style.container" :style="styleContainer">
    <h2 v-if="!$route.params.day" :class="$style.title">
      <span class="hid">Jumlah kasus </span>{{ title
      }}<span class="hid"> terakhir, sebanyak</span>
      <em :class="$style.total" :style="styleTotal"><slot></slot></em
      ><span class="hid">kasus</span>
    </h2>
    <!-- <div :class="$style.title">
      {{ title }}
    </div>
    <div :class="$style.total" :style="styleTotal">
      <slot></slot>
    </div> -->
  </div>
</template>
<script>
export default {
  name: 'Graph',
  props: ['title', 'color'],
  computed: {
    styleContainer() {
      return `background-color: rgba(${this.color}, 0.05)`;
    },
    styleTotal() {
      return `color: rgba(${this.color});`;
    }
  }
};
</script>
<style module>
.container {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.title {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #768db1;
  font-weight: 500;
  font-size: 12px;
}
.total {
  font-weight: 900;
  line-height: 1;
  margin: 0;
  font-size: 50px;
}
</style>
