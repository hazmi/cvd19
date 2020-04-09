<template>
  <div></div>
</template>

<script>
import latestData from '~/scripts/latest.json';
export default {
  layout(context) {
    return 'country';
  },
  mounted() {
    this.$nuxt.$emit('updatecountry', {
      day: this.$route.params.day,
      name: this.$route.params.name
    });
  },
  head() {
    return {
      title: `Day ${this.$route.params.day} of Covid19 in ${
        latestData[this.$route.params.name].name
      }`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `Day ${
            this.$route.params.day
          } of confirmed, recovered and death cases of Covid19 in ${
            latestData[this.$route.params.name].name
          }.`
        }
      ]
    };
  }
};
</script>
