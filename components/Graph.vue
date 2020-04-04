<template>
  <div :class="$style.container" :style="styleContainer">
    <div :class="$style.title">
      {{ title }}
    </div>
    <div :class="$style.total" :style="styleTotal">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Graph',
  props: ['title', 'color', 'font-size'],
  computed: {
    styleContainer() {
      return `background-color: rgba(${this.color}, 0.05)`;
    },
    styleTotal() {
      return `color: rgba(${this.color}); font-size: ${this.fontSize}px`;
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
  color: #768db1;
  font-weight: 500;
}
.total {
  font-weight: 900;
}
</style>
