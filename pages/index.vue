<script>
export default {
  fetch({ params, redirect }) {
    redirect(301, '/indonesia');
  },
  head() {
    return {
      title:
        'Covid19 Dashboard for Indonesia, Indonesian Province and other countries.',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Another Covid19 dashboard that covered Indonesia, Indonesian provices, and all countries.'
        }
      ]
    };
  }
};
</script>
