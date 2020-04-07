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
    <div
      :class="$style.chart"
      :style="{
        'grid-template-columns': `repeat(${daily.length},1fr)`,
        '--backgroundColor': `rgba(${color}, 0.5)`,
        '--backgroundColorActive': `rgba(${color}, 0.8)`
      }"
    >
      <router-link
        v-for="(item, index) in daily"
        :to="'/indonesia/' + (index * 1 + 1)"
        :class="{
          [$style.chartBarActive]: current.FID === item.attributes.FID,
          [$style.chartBar]: true
        }"
        :key="item.FID"
        :style="{
          '--num': (item.attributes[itemkey] / lastItem[itemkey]) * 100
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
      return `color: rgba(${this.color});`;
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
  align-items: flex-start;
  justify-content: center;
}
.title {
  position: relative;
  z-index: 8;
  color: #768db1;
  font-weight: 500;
  font-size: 12px;
  line-height: 1;
  margin: 0 0 0 10px;
  pointer-events: none;
}
.increment {
  color: #fff;
}
.total {
  position: relative;
  z-index: 8;
  font-weight: 900;
  line-height: 1;
  margin: 0 0 0 10px;
  font-size: 50px;
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
  display: grid;
  grid-gap: 1px;
  align-items: flex-end;
}
.chartBar {
  flex: 1;
  position: relative;
  height: 100%;
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
.chartBarActive {
  background: rgba(255, 255, 255, 0.05);
}
.chartBarActive::after {
  background: var(--backgroundColorActive);
}
</style>
