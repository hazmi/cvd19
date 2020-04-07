<template>
  <div></div>
</template>

<script>
export default {
  layout: 'indonesia',
  mounted() {
    this.$nuxt.$emit('day', this.$route.params.day);
  },
  head() {
    return {
      title: `Day ${this.$route.params.day} Covid19 in Indonesia`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `Day ${this.$route.params.day} of confirmed, recovered and death cases of Covid19 in Indonesia.`
        }
      ]
    };
  }
};
</script>
