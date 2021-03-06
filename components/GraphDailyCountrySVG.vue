<template>
  <div
    :class="{
      [$style.container]: true,
      [$style.containerActive]: isDaily
    }"
    :style="styleContainer"
    @click="isDaily = !isDaily"
  >
    <h2 v-if="!$route.params.day" :class="$style[`title${title}`]">
      <span class="hid">Jumlah kasus </span>{{ title }}
      <span class="hid"> terakhir, {{ lastDate }}, sebanyak</span>
      <em :class="$style.total" :style="styleTotal"><slot></slot></em
      ><span class="hid">kasus, bertambah</span>
      <em :class="$style.increment" :style="styleIncrement">
        <span v-if="increment != 0">+</span>{{ increment.toLocaleString() }}
      </em>
      <span class="hid">kasus</span>
    </h2>
    <h2 v-if="$route.params.day" :class="$style[`title${title}`]">
      <span class="hid">Jumlah kasus </span>{{ title }}
      <span class="hid">
        di hari {{ formattedDaily[$route.params.day - 1].formattedDate }},
        sebanyak</span
      >
      <em :class="$style.total" :style="styleTotal"><slot></slot></em
      ><span class="hid">kasus, bertambah</span>
      <em :class="$style.increment" :style="styleIncrement">
        <span v-if="increment != 0">+</span>{{ increment }}
      </em>
      <span class="hid">kasus</span>
    </h2>
    <h3 class="hid">Jumlah data harian untuk kasus {{ title }}</h3>
    <div :class="$style.chartSVG">
      <svg
        :viewBox="`0 0 ${daily.length * 3} 100`"
        preserveAspectRatio="none"
        :fill="`rgba(${color}, 0.5)`"
      >
        <title>Sebaran data harian kasus {{ title }}</title>
        <rect
          v-for="(item, index) in formattedDaily"
          :key="item.x"
          :x="index * 3 - 0.5"
          :y="isDaily ? 100 - item.graphPercentDaily : 100 - item.graphPercent"
          :fill="current.x === item.x ? `rgba(${color}, 0.8)` : null"
          width="2.5"
          :height="isDaily ? item.graphPercentDaily : item.graphPercent"
        >
          <title>
            {{ isDaily ? 'Penambahan kasus hari ' : 'Total kasus hari ' }}
            {{ item.formattedDate }}:
            {{ item[selectedKey].toLocaleString() }} kasus
          </title>
        </rect>
      </svg>
    </div>
  </div>
</template>
<script>
import * as dayjs from 'dayjs';
import 'dayjs/locale/id';
dayjs.locale('id');

export default {
  name: 'GraphDailyCountrySVG',
  props: [
    'title',
    'color',
    'font-size',
    'daily',
    'current',
    'itemkey',
    'itemkeydaily',
    'increment',
    'baseurl'
  ],
  data() {
    return {
      isDaily: false
    };
  },
  computed: {
    selectedKey() {
      if (this.isDaily) {
        return this.itemkeydaily;
      }
      return this.itemkey;
    },
    formattedDaily() {
      const lastItem = this.lastItem;
      let topDaily = 0;
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
        data.graphPercent = (data[this.itemkey] / lastItem[this.itemkey]) * 100;
        if (topDaily < data[this.itemkeydaily]) {
          topDaily = data[this.itemkeydaily];
        }
        return data;
      });

      // eslint-disable-next-line arrow-parens
      return formattedData.map(itemFormatted => {
        return Object.assign({}, itemFormatted, {
          graphPercentDaily: (itemFormatted[this.itemkeydaily] / topDaily) * 100
        });
      });
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
      return this.isDaily ? 'color: #fff' : `color: rgba(${this.color});`;
    },
    styleIncrement() {
      return this.isDaily ? `color: rgba(${this.color});` : 'color: #fff';
    }
  }
};
</script>
<style module>
.container {
  position: relative;
  flex: 1;
  display: flex;
  cursor: pointer;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}
.titlePositif,
.titleSembuh,
.titleMeninggal {
  position: relative;
  z-index: 8;
  color: #9ebae0;
  font-weight: 500;
  font-size: 12px;
  line-height: 1;
  margin: -50px 0 0 10px;
  display: flex;
  flex-wrap: wrap;
}
.increment {
  position: absolute;
  left: 0;
  top: 0;
  color: #fff;
  margin-left: 5px;
  font-style: normal;
  transform-origin: top left;
  text-shadow: 0 0 1px #000;
  transition: left 200ms ease-in, top 200ms ease-in, transform 200ms ease-in,
    color 200ms ease-in;
}
.total {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 8;
  font-weight: 900;
  line-height: 1;
  margin: 0;
  margin-left: 5px;
  font-style: normal;
  transform-origin: top left;
  text-shadow: 0 0 1px #000;
  transition: left 200ms ease-in, top 200ms ease-in, transform 200ms ease-in,
    color 200ms ease-in;
}
.titlePositif .increment {
  top: 0;
  left: 36px;
}
.titleSembuh .increment {
  top: 0;
  left: 45px;
}
.titleMeninggal .increment {
  top: 0;
  left: 58px;
}
.titlePositif .total,
.titleSembuh .total,
.titleMeninggal .total {
  left: -5px;
  top: 15px;
  transform: scale(4.5);
}
.containerActive .titlePositif .increment,
.containerActive .titleSembuh .increment,
.containerActive .titleMeninggal .increment {
  left: -5px;
  top: 15px;
  transform: scale(4.5);
}
.containerActive .titlePositif .total {
  top: 0;
  left: 36px;
  transform: scale(1);
}
.containerActive .titleSembuh .total {
  top: 0;
  left: 45px;
  transform: scale(1);
}
.containerActive .titleMeninggal .total {
  top: 0;
  left: 58px;
  transform: scale(1);
}
.chartSVG {
  position: absolute;
  overflow: hidden;
  z-index: 1;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: flex;
}
.chartSVG svg {
  flex: 1;
  width: 100%;
  height: 100%;
}
.chartSVG rect {
  transition: height 200ms ease-in, y 200ms ease-in;
}
</style>
