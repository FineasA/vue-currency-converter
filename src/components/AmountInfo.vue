<template>
  <b-alert
    :show="!error"
    variant="info"
    style="margin-top: 1.2rem; text-align: center"
  >Amount should be in optional formats of 123.00 or 123</b-alert>
</template>

<script>
export default {
  props: {
    error: Boolean
  }
};
</script>

<style>
</style>