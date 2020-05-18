<template>
  <b-card v-show="!error" tag="article" style="max-width: 30rem;" class="mb-2 custom-card">
    <h2 style="text-align: center;">{{cashAmountInt}} {{selectedCurrencyFrom.toUpperCase()}} =</h2>
    <b-card-text
      class="result-display"
      style="text-align:center;"
    >{{result.toFixed(2)}} {{selectedCurrencyTo.toUpperCase()}}</b-card-text>
  </b-card>
</template>

<script>
export default {
  props: {
    result: Number,
    cashAmountInt: Number,
    selectedCurrencyTo: String,
    selectedCurrencyFrom: String,
    error: Boolean
  }
};
</script>

<style>
</style>