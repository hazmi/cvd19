<template>
  <div :class="$style.container" :style="styleContainer">
    <h2 v-if="!$route.params.day" :class="$style.title">
      <span class="hid">Jumlah kasus </span>{{ title
      }}<span class="hid"> terakhir, {{ lastDate }}, sebanyak</span>
      <em :class="$style.total" :style="styleTotal"><slot></slot></em
      ><span class="hid">kasus, bertambah</span>
      <em :class="$style.increment">
        <span v-if="increment != 0">+</span>{{ increment.toLocaleString() }}
      </em>
      <span class="hid">kasus</span>
    </h2>
    <h2 v-if="$route.params.day" :class="$style.title">
      <span class="hid">Jumlah kasus </span>{{ title
      }}<span class="hid">
        di hari {{ formattedDaily[$route.params.day - 1].formattedDate }},
        sebanyak</span
      >
      <em :class="$style.total" :style="styleTotal"><slot></slot></em
      ><span class="hid">kasus, bertambah</span>
      <em :class="$style.increment">
        <span v-if="increment != 0">+</span>{{ increment }}
      </em>
      <span class="hid">kasus</span>
    </h2>
    <h3 class="hid">Jumlah data harian untuk kasus {{ title }}</h3>
    <ul
      :class="$style.chart"
      :style="{
        'grid-template-columns': `repeat(${daily.length},1fr)`,
        '--backgroundColor': `rgba(${color}, 0.5)`,
        '--backgroundColorActive': `rgba(${color}, 0.8)`
      }"
    >
      <li v-for="(item, index) in formattedDaily" :key="item.FID">
        <router-link
          :to="baseurl + (index * 1 + 1)"
          :class="{
            [$style.chartBarActive]: current.FID === item.FID,
            [$style.chartBar]: true
          }"
          :style="{
            '--num': (item[itemkey] / lastItem[itemkey]) * 100
          }"
          :title="
            item.formattedDate +
              ': ' +
              item[itemkey].toLocaleString() +
              ' kasus'
          "
        >
          <span class="hid">
            {{ item.formattedDate }} :
            <strong>{{ item[itemkey].toLocaleString() }}</strong> kasus</span
          ></router-link
        >
      </li>
    </ul>
  </div>
</template>
<script>
import * as dayjs from 'dayjs';
import 'dayjs/locale/id';
dayjs.locale('id');

export default {
  name: 'Graph',
  props: [
    'title',
    'color',
    'font-size',
    'daily',
    'current',
    'itemkey',
    'increment',
    'baseurl'
  ],
  computed: {
    formattedDaily() {
      // eslint-disable-next-line arrow-parens
      const formattedData = this.daily.map(cur => {
        let data = cur.attributes;
        if (cur.attributes) {
          data.formattedDate = dayjs(cur.attributes.Tanggal * 1).format(
            'dddd, MMMM D, YYYY'
          );
        } else {
          data = cur;
          data.formattedDate = dayjs(data.date * 100000).format(
            'dddd, MMMM D, YYYY'
          );
        }
        return data;
      });
      return formattedData;
    },
    lastDate() {
      const lastData = this.daily[this.daily.length - 1];
      const lastItemDate = lastData.attributes
        ? lastData.attributes.Tanggal
        : lastData.date * 100000;
      return dayjs(lastItemDate * 1).format('dddd, MMMM D, YYYY');
    },
    lastItem() {
      const lastData = this.daily[this.daily.length - 1];
      return lastData.attributes ? lastData.attributes : lastData;
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
  display: flex;
  flex-wrap: wrap;
}
.increment {
  color: #fff;
  margin-left: 5px;
  font-style: normal;
}
.total {
  position: relative;
  z-index: 8;
  font-weight: 900;
  line-height: 1;
  margin: 0;
  font-size: 50px;
  pointer-events: none;
  flex-basis: 100%;
  font-style: normal;
  order: 2;
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
  list-style: none;
  margin: 0;
  padding: 0;
}
.chart li {
  flex: 1;
  display: flex;
  position: relative;
  height: 100%;
}
.chartBar {
  flex: 1;
  position: relative;
  height: 100%;
  text-indent: -999em;
  overflow: hidden;
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
