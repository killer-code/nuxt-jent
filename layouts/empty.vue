<template>
  <section class="wrapper-page">
    <main class="app-page">
      <transition name="fade" mode="out-in">
        <Nuxt />
      </transition>
    </main>

  </section>
</template>

<script>

export default {
  name: 'empty',
  data: () => ({
    asideData: { isOpen: false, },
    nav: { isOpen: false, },
  }),
};
</script>

<style lang="scss" scoped>
.app-page {
  position: relative;
  background: #0a0b11;
  max-width: 1568px;
  padding: 0 30px 50px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 250px);

  @media screen and (max-width: 560px) {
    padding: 0 15px;
    min-height: calc(100vh - 150px);
  }
}
.wrapper-page {
  background: #0a0b11;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
