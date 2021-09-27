<template>
  <div class="label-text-input">
    <div class="label">
        <span v-if="label">{{ label }}</span>
    </div>
    <div>
        <input class="input" :type="type" :placeholder="placeholder" v-model="inputText" />
    </div>
  </div>
</template>

<script>
import "@/styles/label-text-input.scss";

export default {
  name: "SearchTextInput",
  data() {
    return {
      inputText: this.value,
    };
  },
  watch: {
    inputText: function (val) {
      this.$emit("input-changed", { id: this.id, value: val});
    },
  },
  props: {
    id: {
      type: String,
      default() {
        return "";
      },
    },
    label: {
      type: String,
      default() {
        return "";
      },
    },
    placeholder: {
      type: String,
      default() {
        return "Input text (default)";
      },
    },
    type: {
      type: String,
      default() {
        return "text";
      },
    },
    value: {
      type: String,
      default() {
        return "";
      },
    },
  }
};
</script>
