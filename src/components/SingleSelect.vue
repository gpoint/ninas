<template>
  <div>
    <select class="form-control form-control-alternative" ref="select">
      <slot></slot>
    </select>
  </div>
</template>
<script>
import Choices from "choices.js";
import "choices.js/public/assets/styles/choices.min.css";

export default {
  name: "selects",
  props: ["options", "value"],
  mounted: function () {
    this.choicesInstance = new Choices(this.$refs.select);
    this.$refs.select.addEventListener("addItem", this.handleSelectChange);
    this.setChoices();
  },
  methods: {
    handleSelectChange(e) {
      this.$emit("input", e.target.value);
    },
    setChoices() {
      this.choicesInstance.setChoices(this.options, "id", "text", true);
    },
  },
  unmounted: function () {
    this.choicesInstance.destroy();
  },
};
</script>
<style></style>
