<template>
  <div :class="$style.container">
    <div :class="$style.confirmed">
      <Graph
        title="Confirmed"
        total="1528"
        font-size="80"
        color="242, 201, 76"
      />
    </div>
    <div :class="$style.recovered">
      <Graph
        title="Recovered"
        total="81"
        font-size="60"
        color="111, 207, 151"
      />
    </div>
    <div :class="$style.death">
      <Graph title="Death" total="136" font-size="60" color="235, 87, 87" />
    </div>
    <div :class="$style.date">
      <Date ts="1585612800000" />
    </div>
  </div>
</template>

<script>
import Graph from '~/components/Graph.vue';
import Date from '~/components/Date.vue';

export default {
  components: {
    Graph,
    Date
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
  grid-template-rows: 1fr 1fr 1fr;
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
