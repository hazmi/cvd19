<template>
  <div></div>
</template>

<script>
import data from '~/scripts/latest.json';
export default {
  layout: 'country',
  mounted() {
    this.$nuxt.$emit('updatecountry', { country: this.$route.params.name });
  },
  head() {
    return {
      title: `Latest Covid19 in ${data[this.$route.params.name].name}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `The latest daily statistics of confirmed, recovered and death cases of Covid19 in ${
            data[this.$route.params.name].name
          }.`
        }
      ]
    };
  }
};
</script>
