<template>
  <div>
    <div class="header--banner">
      <font-awesome-icon
        icon="balance-scale"
        size="9x"
        style="position: absolute; left: 50%; transform: translateX(-50%); margin-top: 50px"
      />
    </div>
    <div class="container">
      <h1 class="title--text">Currency Converter</h1>
      <form-select></form-select>
    </div>
  </div>
</template>

<script>
import FormSelect from "./components/FormSelect.vue";

export default {
  components: {
    FormSelect
  }
};
</script>

<style>
.header--banner {
  width: 100%;
  height: 250px;
  background-color: rgb(53, 168, 168);
}
@import url("https://fonts.googleapis.com/css2?family=Play:wght@700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Cuprum:wght@700&display=swap");

.title--text {
  margin-top: 1.2rem;
  text-align: center;
  font-family: "Play", sans-serif;
  font-size: 64px;
}
.jumbotron {
  margin-top: 1.2rem;
}
.input-group {
  margin-top: 1.2rem;
}

.label-tag {
  color: black;
  border: none;
  font-family: "Play", sans-serif;
}

.display-3 {
  margin-top: -2.2rem;
  text-align: center;
}

.container {
  width: 100%;
}

.country-name {
  font-family: "Cuprum", sans-serif;
  font-size: 20px;
  margin-left: 15px;
}
</style>