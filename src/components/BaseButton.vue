<template>
  <component
    :is="tag"
    :type="tag === 'button' ? nativeType : ''"
    class="btn"
    :disabled="loading"
    :class="classes"
  >
    <span
      class="btn-inner--icon"
      v-if="($slots.icon || (icon && $slots.default)) && !loading"
    >
      <slot name="icon">
        <i :class="icon"></i>
      </slot>
    </span>
    <i v-if="!$slots.default && !loading" :class="icon"></i>
    <div v-if="loading" class="lds-facebook"><div class="bg-danger"></div><div></div><div class="bg-info"></div></div>
    <span
      class="btn-inner--text"
      v-if="($slots.icon || (icon && $slots.default)) && !loading"
    >
      <slot>
        {{ text }}
      </slot>
    </span>
    <slot v-if="!$slots.icon && !icon && !loading"></slot>
  </component>
</template>
<script>
export default {
  name: "base-button",
  props: {
    tag: {
      type: String,
      default: "button",
      description: "Button tag (default -> button)",
    },
    type: {
      type: String,
      default: "default",
      description: "Button type (e,g primary, danger etc)",
    },
    size: {
      type: String,
      default: "",
      description: "Button size lg|sm",
    },
    textColor: {
      type: String,
      default: "",
      description: "Button text color (e.g primary, danger etc)",
    },
    nativeType: {
      type: String,
      default: "button",
      description: "Button native type (e.g submit,button etc)",
    },
    icon: {
      type: String,
      default: "",
      description: "Button icon",
    },
    text: {
      type: String,
      default: "",
      description: "Button text in case not provided via default slot",
    },
    loading: {
      type: Boolean,
      default: false,
      description: "Whether is action button that disables when loading",
    },
    outline: {
      type: Boolean,
      default: false,
      description: "Whether button style is outline",
    },
    rounded: {
      type: Boolean,
      default: false,
      description: "Whether button style is rounded",
    },
    iconOnly: {
      type: Boolean,
      default: false,
      description: "Whether button contains only an icon",
    },
    block: {
      type: Boolean,
      default: false,
      description: "Whether button is of block type",
    },
  },
  computed: {
    classes() {
      let btnClasses = [
        { "btn-block": this.block },
        { "rounded-circle": this.rounded },
        { "btn-icon-only": this.iconOnly },
        { [`text-${this.textColor}`]: this.textColor },
        { "btn-icon": this.icon || this.$slots.icon },
        this.type && !this.outline ? `btn-${this.type}` : "",
        this.outline ? `btn-outline-${this.type}` : "",
      ];
      if (this.size) {
        btnClasses.push(`btn-${this.size}`);
      }
      return btnClasses;
    },
  },
  methods: {
    // handleClick(evt) {
    //   this.$emit("click", evt);
    // },
  },
};
</script>
<style>
.lds-facebook {
  text-align: center !important;
  display: inline-block;
  position: relative;
  width: 32px;
  height: 18px;
}
.lds-facebook div {
  display: inline-block;
  position: absolute;
  margin-right: 4px;
  width: 8px;
  background: #fff;
  animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
}
.lds-facebook div:nth-child(1) {
  left: 0px;
  animation-delay: -0.24s;
}
.lds-facebook div:nth-child(2) {
  left: 12px;
  animation-delay: -0.12s;
}
.lds-facebook div:nth-child(3) {
  left: 24px;
  animation-delay: 0;
}
@keyframes lds-facebook {
  0% {
    top: -3px;
    height: 30px;
  }
  50%, 100% {
    top: 4px;
    height: 16px;
  }
}

</style>
