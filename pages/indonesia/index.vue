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
      title: 'The Latest Covid19 Cases in Indonesia.',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Providing daily statistics of confirmed, recovered and death cases of Covid19 in Indonesia.'
        }
      ]
    };
  }
};
</script>
