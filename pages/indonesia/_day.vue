<template>
  <div :class="$style.container">
    <div :class="$style.headerWrapper">
      <Header current="Indonesia" />
    </div>
    <div :class="$style.confirmed">
      <GraphDaily
        v-if="currentData"
        title="Confirmed"
        font-size="80"
        color="242, 201, 76"
        :daily="daily"
        :current="currentData"
        itemkey="Jumlah_Kasus_Kumulatif"
        :increment="currentData.Jumlah_Kasus_Baru_per_Hari"
      >
        {{ currentData.Jumlah_Kasus_Kumulatif }}
      </GraphDaily>
    </div>
    <div :class="$style.recovered">
      <GraphDaily
        v-if="currentData"
        title="Recovered"
        font-size="60"
        color="111, 207, 151"
        :daily="daily"
        :current="currentData"
        itemkey="Jumlah_Pasien_Sembuh"
        :increment="currentData.Jumlah_Kasus_Sembuh_per_Hari"
      >
        {{ currentData.Jumlah_Pasien_Sembuh }}
      </GraphDaily>
    </div>
    <div :class="$style.death">
      <GraphDaily
        v-if="currentData"
        title="Death"
        font-size="60"
        color="235, 87, 87"
        :daily="daily"
        :current="currentData"
        itemkey="Jumlah_Pasien_Meninggal"
        :increment="currentData.Jumlah_Kasus_Meninggal_per_Hari"
      >
        {{ currentData.Jumlah_Pasien_Meninggal }}
      </GraphDaily>
    </div>
    <div :class="$style.date">
      <DateWithArrow
        v-if="currentData"
        :ts="currentData.Tanggal"
        :prev="prevDay"
        :next="nextDay"
        :day="currentIndex"
      />
    </div>
  </div>
</template>

<script>
import * as dayjs from 'dayjs';
import Header from '~/components/Header.vue';
import GraphDaily from '~/components/GraphDaily.vue';
import DateWithArrow from '~/components/DateWithArrow.vue';

export default {
  components: {
    GraphDaily,
    DateWithArrow,
    Header
  },
  async fetch() {
    const today = dayjs().format('YYYY-MM-DD');
    const baseurl =
      'https://services5.arcgis.com/VS6HdKS0VfIhv8Ct/ArcGIS/rest/services/Statistik_Perkembangan_COVID19_Indonesia/FeatureServer/0/query';
    const url = `${baseurl}?where=Tanggal%3C=timestamp%20%27${today}%2016:59:59%27&f=json&outFields=*`;
    this.data = await this.$http.$get(url);
  },
  data() {
    return {
      data: null,
      currentIndex: null,
      currentData: null,
      daily: null,
      nextDay: null,
      prevDay: null
    };
  },
  watch: {
    data(newData) {
      if (
        newData.features[newData.features.length - 1].attributes
          .Jumlah_Kasus_Kumulatif !== null
      ) {
        this.daily = newData.features;
      } else {
        this.daily = newData.features.slice(0, -1);
      }
      this.lastIndex = this.daily.length - 1;
      this.currentIndex = this.$route.params.day * 1;
      if (this.currentIndex > 1) {
        this.prevDay = `/indonesia/${this.currentIndex - 1}`;
      }
      if (this.currentIndex + 1 === this.lastIndex) {
        this.nextDay = '/indonesia';
      } else {
        this.nextDay = `/indonesia/${this.currentIndex + 1}`;
      }
      this.currentData = this.daily[this.currentIndex - 1].attributes;
    }
  },
  activated() {
    if (this.$fetchState.timestamp <= Date.now() - 30000) {
      this.$fetch();
    }
  },
  head() {
    return {
      title: 'Covid19 in Indonesia',
      meta: [
        {
          hid: 'Covid19 in Indonesia',
          name: 'Covid19 in Indonesia',
          content: 'Covid19 in Indonesia'
        }
      ]
    };
  }
};
</script>
<style module>
.container {
  flex: 1;
  display: grid;
  padding: 10px;
  grid-gap: 10px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 90px 1fr 1fr 1fr;
}
.headerWrapper {
  display: flex;
  grid-column: 1/3;
}
.confirmed {
  display: flex;
  grid-column: 1/3;
}
.recovered {
  display: flex;
}
.death {
  display: flex;
}
.date {
  display: flex;
  grid-column: 1/3;
}
</style>
