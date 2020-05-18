<template>
  <b-alert
    :show="error"
    variant="danger"
    style="margin-top: 1.2rem; text-align: center"
  >{{displayError}}</b-alert>
</template>

<script>
import { EventBus } from "../main.js";

export default {
  data() {
    return {
      errors: [
        {
          error: "Currency types cannot be the same"
        }
      ],
      displayError: ""
    };
  },
  props: {
    error: Boolean
  },
  updated() {
    EventBus.$on("currency-same-error", () => {
      this.displayError = this.errors[0].error;
    });
  }
};
</script>

<style>
</style>