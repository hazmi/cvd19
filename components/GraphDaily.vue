<template>
  <div :class="$style.container" :style="styleContainer">
    <div :class="$style.title">
      {{ title }}
      <span :class="$style.increment">
        (
        <span v-if="increment > 0">+</span>{{ increment }}
        )
      </span>
    </div>
    <div :class="$style.total" :style="styleTotal">
      <slot></slot>
    </div>
    <div :class="$style.chart">
      <router-link
        v-for="(item, index) in daily"
        :to="'/indonesia/' + index"
        :class="{
          [$style.chartBarActive]:
            current.FID === item.attributes.FID && current.FID !== lastItem.FID,
          [$style.chartBar]: true
        }"
        :key="item.FID"
        :style="{
          '--num': (item.attributes[itemkey] / lastItem[itemkey]) * 100,
          '--backgroundColor': `rgba(${color}, 0.20)`
        }"
      ></router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Graph',
  props: [
    'title',
    'color',
    'font-size',
    'daily',
    'current',
    'itemkey',
    'increment'
  ],
  computed: {
    lastItem() {
      return this.daily[this.daily.length - 1].attributes;
    },
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
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.title {
  position: relative;
  z-index: 8;
  color: #768db1;
  font-weight: 500;
  pointer-events: none;
}
.increment {
  color: #fff;
}
.total {
  position: relative;
  z-index: 8;
  font-weight: 900;
  pointer-events: none;
}
.chart {
  position: absolute;
  overflow: hidden;
  z-index: 1;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
}
.chartBar {
  flex: 1;
  position: relative;
  height: 100%;
}
.chartBarActive {
  background: #444;
}
.chartBar::after {
  position: absolute;
  content: '';
  width: 100%;
  bottom: 0;
  left: 0;
  height: calc(var(--num) * 1%);
  background: var(--backgroundColor);
}
</style>
