<template>
  <div v-if="currentData" :class="$style.container">
    <div :class="$style.headerWrapper">
      <Header :current="currentData.Provinsi" />
    </div>
    <div :class="$style.confirmed">
      <Graph
        v-if="currentData"
        title="Confirmed"
        font-size="80"
        color="242, 201, 76"
      >
        {{ currentData.Kasus_Posi }}
      </Graph>
    </div>
    <div :class="$style.recovered">
      <Graph
        v-if="currentData"
        title="Recovered"
        font-size="60"
        color="111, 207, 151"
      >
        {{ currentData.Kasus_Semb }}
      </Graph>
    </div>
    <div :class="$style.death">
      <Graph
        v-if="currentData"
        title="Death"
        font-size="60"
        color="235, 87, 87"
      >
        {{ currentData.Kasus_Meni }}
      </Graph>
    </div>
    <div :class="$style.date">
      <Date v-if="lastEditDate" :ts="lastEditDate" />
    </div>
  </div>
</template>

<script>
import Header from '~/components/Header.vue';
import Graph from '~/components/Graph.vue';
import Date from '~/components/Date.vue';

const createSlug = function(str) {
  str = str.replace(/^\s+|\s+$/g, '');
  str = str.toLowerCase();

  str = str
    .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

  return str;
};

export default {
  components: {
    Graph,
    Date,
    Header
  },
  async fetch() {
    const baseurl =
      'https://services5.arcgis.com/VS6HdKS0VfIhv8Ct/arcgis/rest/services/COVID19_Indonesia_per_Provinsi/FeatureServer/0/query';
    const url = `${baseurl}?where=1=1&f=json&outFields=*`;
    this.data = await this.$http.$get(url);
    const urlDate =
      'https://services5.arcgis.com/VS6HdKS0VfIhv8Ct/ArcGIS/rest/services/COVID19_Indonesia_per_Provinsi/FeatureServer/0?f=pjson';
    this.layerInformation = await this.$http.$get(urlDate);
  },
  data() {
    return {
      data: null,
      currentData: null,
      layerInformation: null,
      lastEditDate: null
    };
  },
  computed: {
    title() {
      if (!this.currentData) {
        return 'Covid19 in';
      }
      return `Covid19 in ${this.currentData.Provinsi}, Indonesia`;
    }
  },
  watch: {
    data(newData) {
      const cleanupData = {};
      newData.features.map(function(itemData) {
        const slug = createSlug(itemData.attributes.Provinsi);
        cleanupData[slug] = itemData.attributes;
      });
      this.currentData = cleanupData[this.$route.params.id];
    },
    layerInformation(newData) {
      this.lastEditDate = newData.editingInfo.lastEditDate;
    }
  },
  activated() {
    if (this.$fetchState.timestamp <= Date.now() - 30000) {
      this.$fetch();
    }
  },
  head() {
    return {
      title: this.title,
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
  grid-template-rows: 100px 1fr 1fr 1fr;
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
