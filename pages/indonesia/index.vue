<template>
  <div></div>
</template>

<script>
export default {
  layout(context) {
    return 'indonesia';
  },
  mounted() {
    this.$nuxt.$emit('day', 'latest');
  },
  head() {
    return {
      title: 'Latest Covid19 Cases in Indonesia.',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'The latest daily statistics of confirmed, recovered and death cases of Covid19 in Indonesia.'
        }
      ]
    };
  }
};
</script>
