<template>
  <div></div>
</template>

<script>
export default {
  fetch({ params, redirect }) {
    redirect(302, `https://sebarancovid19.id/provinsi/${params.id}`);
  }
};
</script>
