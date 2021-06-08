<template>
  <section class="wrapper-page">
    <Header :asideData="asideData" :nav="nav" class="header" />
    <Navigation :nav="nav" @open="open" />

    <main class="app-page">
      <transition name="fade" mode="out-in">
        <Nuxt />
      </transition>

      <client-only>
        <transition name="fade" mode="out-in">
          <Disclaimer v-show="!isOld" />
        </transition>
      </client-only>
    </main>

    <transition name="fade">
      <Widget v-if="isOpenWidget" @close="close" />
    </transition>
  </section>
</template>

<script>
import Header     from '@/components/Header'
import Widget     from '@/components/ModalWidget'
import Navigation from '@/components/Navigation'
import Disclaimer from '@/components/Disclaimer'


export default {
  name: 'default',
  components: { Header, Navigation, Disclaimer, Widget },
  data: () => ({
    asideData: { isOpen: false, },
    nav: { isOpen: false, },
    isOpenWidget: false,
  }),
  computed: {
    isOld: function() {
      if ( process.browser ) {
        return sessionStorage.getItem('old')
      }
    },
  },
  methods: {
    open() {
      document.querySelector('body').classList.add('blocked')
      document.querySelector('html').classList.add('blocked')
      this.isOpenWidget = true;
    },
    close() {
      document.querySelector('body').classList.remove('blocked')
      document.querySelector('html').classList.remove('blocked')
      this.isOpenWidget = false;
    },
  },
  mounted() {
    if ( process.browser ) {
      setTimeout(() => {
        document.querySelector('body').classList.remove('blocked')
        document.querySelector('html').classList.remove('blocked')
      }, 500)
    };
  }
};
</script>

<style lang="scss" scoped>
.header {
  background: #0a0b11;
  margin-right: 15px;
}

.app-page {
  position: relative;
  margin: 200px auto 0;
  background: #0a0b11;
  max-width: 1568px;
  padding: 0 30px 50px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 200px);

  @media screen and (max-width: 560px) {
    margin: 100px auto 0;
    padding: 0 15px 50px;
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
