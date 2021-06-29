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
    

    <CanvasBackground v-if="loaded" />

    <client-only>
      <full-page ref="fullpage" id="fullpage" 
        :skip-init="true" :options="options">
          <router-view :asideData="asideData" 
            :screen="scroll" 
            :skip-init="true" 
            :loaded="loaded" 
          />
      </full-page>
    </client-only>

    <client-only>
      <transition name="fade-age" mode="in-out">
        <Disclaimer v-show="!isOld && $refs.fullpage" 
          :scrollpage="$refs.fullpage" />
      </transition>
    </client-only>
    
    <Footer :scroll="scroll" 
      @down="scrollDown" 
      v-if="scroll != 5 && !isMob" />

  </section>
</template>

<script>
import Header     from '@/components/Header'
import Footer     from '@/components/Footer'
import WestSide   from '@/components/WestSide'
import Navigation from '@/components/Navigation'

import CanvasBackground from '@/components/home/CanvasBackground'
import Disclaimer       from '@/components/Disclaimer'

export default {
  name: 'light',
  head: {
    meta: [
      {
        name: 'yandex-verification',
        content: '9dd8058eabe76a44'
      },
      {
        name: 'google-site-verification',
        content: 'KltkO6fyk-kxfrTSfYFC-Xbi94dhfZ_2BrpMcKRR7W8'
      }
    ],
  },
  components: { 
    Header, 
    Footer, 
    WestSide, 
    Navigation,

    Disclaimer,
    CanvasBackground,
  },
  data: () => ({
    process: false,
    loaded: false,

    asideData: { 
      isOpen: false,
    },
    nav: { isOpen: false, },
    scroll: 0,
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
      this.$refs.fullpage.api.moveSectionDown();
    },
    open() {
      this.$router.push('/where-buy/')
    },
  },
  watch: {
    isAsideActive() {
      if ( this.isAsideActive ) {
        this.$refs.fullpage.api.setAllowScrolling(false);
      } else {
        this.$refs.fullpage.api.setAllowScrolling(true);
      }
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
    }, 300);

    if ( process.browser ) {
      setTimeout(() => {
        let refs = this.$refs
        if ( window.innerWidth > 560 ) {
          let fullpageEnabled = document.documentElement.classList.contains('fp-enabled')
          
          if (!fullpageEnabled) {
            refs.fullpage.init()
          } else {
            document.documentElement.classList.remove('fp-enabled')
            refs.fullpage.destroy('all')
            refs.fullpage.init()
          }
        } else {
          const element = document.querySelector('.fp-enabled');
          if ( element ) {
            element.classList.remove('fp-enabled');
            document.querySelector('body').style.overflow = 'auto';
          }
          document.documentElement.classList.remove('fp-enabled')
          refs.fullpage.destroy('all')
        }
      }, 500)
    }
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

.fade-age-enter-active, .fade-leave-active {
  transition: opacity .1s ease;
}
.fade-age-enter, .fade-leave-to {
  opacity: 0;
}
</style>