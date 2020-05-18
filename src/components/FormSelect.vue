<template>
  <div class="container">
    <b-form @submit.prevent="onSubmit" inline class="justify-content-center" style="margin-top: 5%">
      <label class="mr-sm-2 labels" for="inline-form-input-name">Amount</label>
      <b-input
        size="lg"
        id="inline-form-input-name"
        class="mb-2 mr-sm-2 mb-sm-0"
        v-model="cashAmount"
      ></b-input>

      <b-input
        style="max-width: 5rem"
        size="lg"
        class="cent-input"
        placeholder=".00"
        v-model="centUserInput"
      ></b-input>

      <label
        style="margin-left: 0.4rem"
        for="inline-form-select-from-country"
        class="mr-sm-2 labels"
      >From:</label>

      <b-form-select
        size="lg"
        v-model="selectedCurrencyFrom"
        id="inline-form-select-from-country"
        class="mb-2 mr-sm-2 mb-sm-0"
        :options="options"
      ></b-form-select>

      <avatar countryCode="us"></avatar>

      <label for="inline-form-select-to-country" class="mr-sm-2 labels">To:</label>
      <b-form-select
        size="lg"
        v-model="selectedCurrencyTo"
        id="inline-form-select-to-country"
        class="mb-2 mr-sm-2 mb-sm-0"
        :options="options"
      ></b-form-select>
    </b-form>

    <!-- END OF FORM-->
    <flag-display></flag-display>
    <currency-display
      :result="result"
      :cashAmountInt="cashAmountInt"
      :selectedCurrencyTo="selectedCurrencyTo"
      :selectedCurrencyFrom="selectedCurrencyFrom"
      :error="error"
    ></currency-display>

    <amount-info :error="error"></amount-info>

    <display-error :error="error"></display-error>
  </div>
</template>

<script>
import { config } from "../config.js";
import { EventBus } from "../main.js";
import FlagDisplay from "./FlagDisplay.vue";
import CurrencyDisplay from "./CurrencyDisplay.vue";
import AmountInfo from "./AmountInfo.vue";
import DisplayError from "./DisplayError.vue";

export default {
  components: {
    FlagDisplay,
    CurrencyDisplay,
    AmountInfo,
    DisplayError
  },
  data() {
    return {
      submitted: false,
      key: config.API_KEY,
      baseCurrency: "USD",

      dollarRegexStr: /^[1-9][0-9]*$/,
      centRegexStr: /^.[0-9]{2}$/,
      regexSingleStr: /^[0-9]/,

      cashAmount: "",
      cashAmountInt: 0,

      centUserInput: "",
      centUserInputArr: [],

      selectedCurrencyFrom: "usd",
      selectedCurrencyTo: "eur",
      selectedCountryCodeFrom: "us",
      selectedCountryCodeTo: "eu",

      conversionRate: 0,
      result: 0,

      isAmountCorrect: false,
      error: false,

      options: [
        {
          text: "USD",
          value: "usd",
          code: "us"
        },
        {
          text: "EURO",
          value: "eur",
          code: "eu"
        },
        {
          text: "RON",
          value: "ron",
          code: "ro"
        }
      ]
    };
  },
  methods: {
    getConvertedNum() {
      this.cashAmountInt = Number(this.cashAmount) + Number(this.centUserInput);
      this.result = this.cashAmountInt * this.conversionRate;
    },
    async getConversionData() {
      let tempCountryDataAccess = "";
      this.baseCurrency = this.selectedCurrencyFrom.toUpperCase();
      tempCountryDataAccess = this.selectedCurrencyTo.toUpperCase();

      await this.$http
        .get(`https://api.exchangeratesapi.io/latest?base=${this.baseCurrency}`)
        .then(response => {
          this.conversionRate = response.data.rates[tempCountryDataAccess];
        });
      this.getConvertedNum();
    },
    onSubmit() {
      if (this.submitted === false) {
        this.submitted = true;
      }
      //check if num input is correct
      //check if both inputs are selected as well
      this.getConversionData();
    },

    checkCurrentInputs() {
      if (!this.submitted && !this.dollarRegexStr.test(this.cashAmount)) {
        this.dollarRegexChecker();
      }
      if (!this.submitted && !this.centRegexStr.test(this.centUserInput)) {
        this.centRegexChecker();
      }
      // if (this.submitted) {
      //   this.getConversionData();
      // }
      if (this.selectedCurrencyFrom === this.selectedCurrencyTo) {
        EventBus.$emit("currency-same-error");

        this.error = true;
      } else if (this.selectedCurrencyFrom !== this.selectedCurrencyTo) {
        this.error = false;
      }
    },
    dollarRegexChecker() {
      if (this.submitted) {
        this.cashAmount = this.cashAmount.split("");
        this.cashAmount.pop();
        this.cashAmount = this.cashAmount.join("");
      } else if (!this.submitted) {
        let temp = null;
        temp = this.cashAmount.split("");
        temp.pop();
        this.cashAmount = temp.join("");
      }
    },
    centRegexChecker() {
      if (this.centRegexStr.test(this.centUserInput)) {
        return;
      } else {
        this.centUserInputArr = this.centUserInput.split("");
        if (this.centUserInputArr[0] !== ".") {
          this.centUserInputArr.unshift(".");
        }
        if (!this.regexSingleStr.test(this.centUserInputArr[1])) {
          this.centUserInputArr.pop();
        }
        if (this.centUserInput.length > 2) {
          this.centUserInputArr.pop();
        }
        this.centUserInput = this.centUserInputArr.join("");
      }
    },
    getCountryCodes() {
      for (let i = 0; i < this.options.length; i++) {
        if (this.selectedCurrencyTo === this.options[i].value) {
          this.selectedCountryCodeTo = this.options[i].code;
        }
      }
      for (let i = 0; i < this.options.length; i++) {
        if (this.selectedCurrencyFrom === this.options[i].value) {
          this.selectedCountryCodeFrom = this.options[i].code;
        }
      }
      console.log(
        "From: ",
        this.selectedCountryCodeFrom,
        "To: ",
        this.selectedCountryCodeTo
      );
      EventBus.$emit("country-to-changed", this.selectedCountryCodeTo);
      EventBus.$emit("country-from-changed", this.selectedCountryCodeFrom);
    }
  },
  updated() {
    this.getCountryCodes();
    this.checkCurrentInputs();
    this.getConversionData();
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap");

.labels {
  font-family: "Play", sans-serif;
}

.custom-card {
  margin: 0 auto;
  margin-top: 1.2rem;
}

.result-display {
  font-family: "Poppins", sans-serif;
  font-size: 64px;
}
</style>