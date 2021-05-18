<template>
  <section class="bread-crumb">
    <button class="btn_crumb" @click="goToBack">
      <span></span>
      <span>Назад</span>
    </button>
  </section>
</template>

<script>
export default {
  name: 'BreadCrumb',
  props: { parent: String, params: String },
  methods: {
    goToBack() {
      this.$router.push({ name: this.parent, params: this.params })
    }
  }
}
</script>

<style lang="scss" scoped>
.bread-crumb {
  margin-bottom: 16px;
}
.btn_crumb {
  background: none;
  border: 0;
  color: #fff;
  cursor: pointer;
  transition: all .3s ease;

  :hover {
    color: #f36d01;
  }
}
</style>