<template>
  <ul
    class="pagination"
    :class="[size && `pagination-${size}`, align && `justify-content-${align}`]"
  >
    <li class="page-item prev-page" :class="{ disabled: value === 1 }">
      <button class="page-link" aria-label="Previous" @click="prevPage">
        <span aria-hidden="true"
          ><i class="fa fa-angle-left" aria-hidden="true"></i
        ></span>
      </button>
    </li>
    <li
      class="page-item"
      :class="{ active: value === item }"
      :key="item"
      v-for="item in range(minPage, maxPage)"
    >
      <button class="page-link" @click="changePage(item)">{{ item }}</button>
    </li>
    <li class="page-item next-page" :class="{ disabled: value === totalPages }">
      <button class="page-link" aria-label="Next" @click="nextPage">
        <span aria-hidden="true"
          ><i class="fa fa-angle-right" aria-hidden="true"></i
        ></span>
      </button>
    </li>
  </ul>
</template>
<script>
export default {
  name: "base-pagination",
  props: {
    pageCount: {
      type: Number,
      default: 0,
      description:
        "Pagination page count. This should be specified in combination with perPage",
    },
    perPage: {
      type: Number,
      default: 10,
      description:
        "Pagination per page. Should be specified with total or pageCount",
    },
    total: {
      type: [String, Number],
      default: 0,
      description:
        "Can be specified instead of pageCount. The page count in this case will be total/perPage",
    },
    value: {
      type: Number,
      default: 1,
      description: "Pagination value",
    },
    size: {
      type: String,
      default: "",
      description: "Pagination size",
    },
    align: {
      type: String,
      default: "",
      description: "Pagination alignment (e.g center|start|end)",
    },
  },
  computed: {
    totalPages() {
      if (this.pageCount > 0) return this.pageCount;
      if (this.total > 0) {
        return Math.ceil(this.total / this.perPage);
      }
      return 1;
    },
    pagesToDisplay() {
      if (this.totalPages > 0 && this.totalPages < this.defaultPagesToDisplay) {
        return this.totalPages;
      }
      return this.defaultPagesToDisplay;
    },
    minPage() {
      if (this.value >= this.pagesToDisplay) {
        const pagesToAdd = Math.floor(this.pagesToDisplay / 2);
        const newMaxPage = pagesToAdd + this.value;
        if (newMaxPage > this.totalPages) {
          return this.totalPages - this.pagesToDisplay + 1;
        }
        return this.value - pagesToAdd;
      } else {
        return 1;
      }
    },
    maxPage() {
      if (this.value >= this.pagesToDisplay) {
        const pagesToAdd = Math.floor(this.pagesToDisplay / 2);
        const newMaxPage = pagesToAdd + this.value;
        if (newMaxPage < this.totalPages) {
          return newMaxPage;
        } else {
          return this.totalPages;
        }
      } else {
        return this.pagesToDisplay;
      }
    },
  },
  data() {
    return {
      defaultPagesToDisplay: 5,
    };
  },
  emits: ["update:value"],
  methods: {
    range(min, max) {
      let arr = [];
      for (let i = min; i <= max; i++) {
        arr.push(i);
      }
      return arr;
    },
    changePage(item) {
      this.$emit("update:value", item);
    },
    nextPage() {
      if (this.value < this.totalPages) {
        this.$emit("update:value", this.value + 1);
      }
    },
    prevPage() {
      if (this.value > 1) {
        this.$emit("update:value", this.value - 1);
      }
    },
  },
  watch: {
    perPage() {
      this.$emit("update:value", 1);
    },
    total() {
      this.$emit("update:value", 1);
    },
  },
};
</script>
<style scoped>
.page-item.active .page-link{
  background-color: #9eeea5;
  border-color: #3ca139;
}
</style>