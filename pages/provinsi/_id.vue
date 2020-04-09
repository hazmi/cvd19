<template>
  <div></div>
</template>

<script>
import defaultList from '../../utils/thelist';
const pageTitle = {};
// eslint-disable-next-line arrow-parens
defaultList.map(itemInList => {
  if (itemInList.type === 'province') {
    const arr = itemInList.link.split('/');
    const slug = arr[arr.length - 1];
    pageTitle[slug] = itemInList.label;
  }
});

export default {
  layout: 'province',
  mounted() {
    this.$nuxt.$emit('id', this.$route.params.id);
  },
  head() {
    return {
      title: `Latest Covid19 Cases in ${pageTitle[this.$route.params.id]}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `The latest confirmed, recovered and death Covid19 cases in ${
            pageTitle[this.$route.params.id]
          }`
        }
      ]
    };
  }
};
</script>
