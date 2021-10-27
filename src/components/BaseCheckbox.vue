<template>
  <div
    class="custom-control custom-checkbox"
    :class="{ disabled: disabled, 'form-check-inline': inline }"
  >
    <input
      :id="cbId"
      @input="$emit('update:checked', $event.target.checked)"
      :checked="checked"
      :required="required ? true : null"
      class="custom-control-input"
      type="checkbox"
      :disabled="disabled"
    />
    <label :for="cbId" class="custom-control-label">
      <slot>
        <span v-if="inline">&nbsp;</span>
      </slot>
    </label>
  </div>
</template>
<script>
import { randomString } from "./stringUtils";

export default {
  name: "base-checkbox",
  model: {
    prop: "checked",
  },
  props: {
    checked: {
      type: [Array, Boolean],
      description: "Whether checkbox is checked",
    },
    disabled: {
      type: Boolean,
      description: "Whether checkbox is disabled",
    },
    inline: {
      type: Boolean,
      description: "Whether checkbox is inline",
    },
    required: {
      type: Boolean,
      description: "Whether checkbox is required",
    },
  },
  data() {
    return {
      cbId: "",
      touched: false,
    };
  },
  emits: ["update:checked"],
  mounted() {
    this.cbId = randomString();
  },
};
</script>
