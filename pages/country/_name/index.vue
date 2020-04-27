<template>
  <div></div>
</template>

<script>
export default {
  fetch({ params, redirect }) {
    redirect(302, `/negara/${params.name}`);
  }
};
</script>
