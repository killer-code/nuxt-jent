<template>
  <section>
    <transition name="fade" mode="out-in">
      <Nuxt />
    </transition>
  </section>
</template>

<script>
export default {
  name: 'empty',
}
</script>

<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
