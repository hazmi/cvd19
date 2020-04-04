<script>
export default {
  fetch({ params, redirect }) {
    redirect(301, '/indonesia');
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
