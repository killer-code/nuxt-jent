<template>
  <section class="main">
    <section class="west">
      <WestSide :asideData="asideData" />
    </section>

    <section>
      <Header :asideData="asideData" :nav="nav" />
    </section>

    <section>
      <Navigation :nav="nav" @open="open" />
    </section>
    

    <CanvasBackground :loaded="loaded" />

    <full-page ref="static_fullpage" id="static-fullpage" 
      :skip-init="true" :options="options">
        <router-view :asideData="asideData" 
          :screen="scroll" 
          :skip-init="true" 
          :loaded="loaded" 
        />
    </full-page>

    <client-only>
      <transition name="fade" mode="out-in">
        <Disclaimer v-show="!isOld && $refs.static_fullpage" 
          :scrollpage="$refs.static_fullpage" />
      </transition>
    </client-only>
    
    <Footer :scroll="scroll" 
      @down="scrollDown" 
      v-if="scroll != 5 && !isMob" />

    <transition name="fade">
      <Widget v-if="isOpenWidget" @close="close" />
    </transition>
  </section>
</template>

<script>
import Header     from '@/components/Header'
import Footer     from '@/components/Footer'
import Widget     from '@/components/ModalWidget'
import WestSide   from '@/components/WestSide'
import Navigation from '@/components/Navigation'

import CanvasBackground from '@/components/home/CanvasBackground'
import Disclaimer       from '@/components/Disclaimer'

export default {
  name: 'light',
  components: { 
    Header, 
    Footer, 
    Widget,
    WestSide, 
    Navigation,

    Disclaimer,
    CanvasBackground
  },
  data: () => ({
    process: false,
    loaded: false,

    asideData: { 
      isOpen: false,
    },
    nav: { isOpen: false, },
    scroll: 0,
    isOpenWidget: false,
  }),
  computed: {
    options: function() {
      return {
        licenseKey: 'BSD-3-Clause',
        onLeave: this.onLeave,
        fitToSectionDelay: 1500,
        scrollingSpeed: 500,
      }
    },
    isMob: function() {
      if (process.browser){
        return window.innerWidth < 560;
      }
    },
    isOld: function() {
      if ( process.browser ) {
        return sessionStorage.getItem('old')
      }
    },
    isAsideActive: function() {
      return this.asideData.isOpen;
    },
    isClient: function() {
      return process.browser
    }
  },
  methods: {
    onLeave(index, nexIndex, direction) {
      if ( direction === 'down' )
        this.scroll ++;
      else {
        this.scroll --;
      }
    },
    changeLoad() {
      setTimeout(() => { this.loaded = true; }, 2000)
    },
    changeProcess() {
      setTimeout(() => { this.process = true; }, 100)
    },
    scrollDown() {
      this.$refs.static_fullpage.api.moveSectionDown();
    },
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
  watch: {
    isAsideActive() {
      if ( this.isAsideActive ) {
        this.$refs.static_fullpage.api.setAllowScrolling(false);
      } else {
        this.$refs.static_fullpage.api.setAllowScrolling(true);
      }
    }
  },
  created() {
    if ( process.browser ) {
      window.addEventListener('load', e => {
        let refs = this.$refs
        if ( window.innerWidth > 560 ) {
          let fullpageEnabled = document.documentElement.classList.contains('fp-enabled')
          
          if (!fullpageEnabled) {
            refs.static_fullpage.init()
          } else {
            document.documentElement.classList.remove('fp-enabled')
            refs.static_fullpage.destroy('all')
            refs.static_fullpage.init()
          }
        } else {
          const element = document.querySelector('.fp-enabled');
          if ( element ) {
            element.classList.remove('fp-enabled');
            document.querySelector('body').style.overflow = 'auto';
          }
          document.documentElement.classList.remove('fp-enabled')
          refs.static_fullpage.destroy('all')
        }

        setTimeout(() => {
          this.loaded = true;
        }, 1000)
      })
    }

    if ( !this.loaded ) {
      setTimeout(() => {
        this.loaded = true;
      }, 7000)
    }
  },
  mounted() {
    const west = document.querySelector('.west');
    west.addEventListener('wheel', e => {
      const el = e.target.closest('.aside_wrap');
      el.scrollTop += e.deltaY;
    })
    setTimeout(() => {
      this.loaded = true;
    }, 500);
  }
}
</script>

<style lang="scss" scoped>
.main {
  display: flex;
}
</style>

<style lang="scss">
.canvas {
  position: fixed;
  left: 0;
  top: 0;
  z-index: -1;
}
.opacity {
  opacity: 0;
}
.footer {
  @media screen and (max-width: 560px) {
    display: none;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>