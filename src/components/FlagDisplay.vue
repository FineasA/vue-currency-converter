<template>
  <div class="flag-container">
    <avatar :countryCode="countryCodeFrom"></avatar>

    <font-awesome-icon
      :icon="['fa', 'arrow-right']"
      size="2x"
      style="margin-right: 50px; margin-left: 50px; margin-top: 20px"
    />

    <avatar :countryCode="countryCodeTo"></avatar>
  </div>
</template>

<script>
import Avatar from "./Avatar.vue";
import { EventBus } from "../main.js";

export default {
  data() {
    return {
      countryCodeFrom: "us",
      countryCodeTo: "eu"
    };
  },
  components: {
    Avatar
  },
  created() {
    EventBus.$on("country-to-changed", data => {
      this.countryCodeTo = data;
    });
    EventBus.$on("country-from-changed", data => {
      this.countryCodeFrom = data;
    });
  }
};
</script>

<style>
.flag-container {
  text-align: center;
}
</style>