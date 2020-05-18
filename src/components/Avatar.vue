<template>
  <b-avatar>
    <custom-icon name="custom">
      <country-flag :rounded="true" :country="countryCode" size="big" />
    </custom-icon>
  </b-avatar>
</template>

<script>
export default {
  props: {
    countryCode: String
  }
};
</script>

<style>
</style>