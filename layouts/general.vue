<template>
  <section class="main">
    <section class="west">
      <WestSide :asideData="asideData" />
    </section>

    <section>
      <Header :asideData="asideData" :nav="nav" />
    </section>

    <section>
      <Navigation :nav="nav" />
    </section>

    
    <Preloader v-if="!loaded" />

    <client-only>
      <MainScene :screen="scroll" v-if="!isMob" />

      <AnimeScreenOne
        v-if="!isMob"
        :animationState="animationState"
        :scrollpage="$refs.fullpage"
        :loaded="loaded"
        :scroll="scroll" />

      <AnimeScreenTwo
        v-if="!isMob"
        :animationState="animationState"
        :scrollpage="$refs.fullpage"
        :loaded="loaded"
        :scroll="scroll" />
      

      <AnimeScreenThree
        v-if="!isMob"
        :animationState="animationState"
        :scrollpage="$refs.fullpage"
        :scroll="scroll" />

      <AnimeScreenFour
        v-if="!isMob"
        :animationState="animationState"
        :scrollpage="$refs.fullpage"
        :scroll="scroll" />

      <AnimeScreenFive
        v-if="!isMob"
        :animationState="animationState"
        :scrollpage="$refs.fullpage"
        :scroll="scroll" />

      <AnimeScreenSix
        v-if="!isMob"
        :animationState="animationState"
        :scrollpage="$refs.fullpage"
        :scroll="scroll" />

      <full-page ref="fullpage" 
        id="fullpage" 
        :skip-init="true" 
        :options="options">
          <router-view :asideData="asideData" 
            :screen="scroll" 
            :loaded="loaded" />
      </full-page>
    </client-only>

    <client-only>
      <transition name="fade" mode="out-in">
        <Disclaimer v-show="!isOld" />
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

import Preloader from '@/components/Preloader'

import MainScene        from '@/components/home/MainScene'
import AnimeScreenOne   from '@/components/home/AnimeScreenOne'
import AnimeScreenTwo   from '@/components/home/AnimeScreenTwo'
import AnimeScreenThree from '@/components/home/AnimeScreenThree'
import AnimeScreenFour  from '@/components/home/AnimeScreenFour'
import AnimeScreenFive  from '@/components/home/AnimeScreenFive'
import AnimeScreenSix   from '@/components/home/AnimeScreenSix'

import Disclaimer from '@/components/Disclaimer'

export default {
  name: 'general',
  components: { 
    Header, 
    Footer, 
    WestSide, 
    Navigation,

    Preloader,
    MainScene,
    AnimeScreenOne,
    AnimeScreenTwo,
    AnimeScreenThree, 
    AnimeScreenFour,
    AnimeScreenFive,
    AnimeScreenSix,

    Disclaimer,
  },
  data: () => ({
    loaded: false,

    asideData: { 
      isOpen: false,
    },
    nav: { isOpen: false, },
    scroll: 0,
    animationState: {
      one: 'start',
      two: '',
      three: '',
      four: '',
      five: '',
      six: '',
    },
  }),
  computed: {
    isMob: function() {
      if ( process.browser ) {
       return window.innerWidth < 560
      }
    },
    isOld: function() {
      if ( process.browser ) {
        return sessionStorage.getItem('old')
      }
    },
    options: function() {
      return {
        licenseKey: 'BSD-3-Clause',
        onLeave: this.onLeave,
        fitToSectionDelay: 1000,
        scrollingSpeed: 2000,
      }
    },
    isAsideActive: function() {
      return this.asideData.isOpen;
    },
    width: function() {
      if ( process.browser ) {
        return window.innerWidth
      }
    },
    height: function() {
      if ( process.browser ) {
        return window.innerHeight
      }
    }
  },
  methods: {
    onLeave(index, nexIndex, direction) {
      if ( direction === 'down' ) {
        if ( this.scroll === 0 ) {
          this.scroll ++;
          this.animationState.one = '';
          this.animationState.two = 'down';
          return;
        } 
        if ( this.scroll === 1 ) {
          this.scroll ++;
          this.animationState.two = '';
          this.animationState.three = 'start';
          return;
        } 
        if ( this.scroll === 2 ) {
          this.scroll ++;
          this.animationState.three = '';
          this.animationState.four = 'start';
          return;
        } 
        if ( this.scroll === 3 ) {
          this.scroll ++;
          this.animationState.four = '';
          this.animationState.five = 'down';
          return;
        } 
        if ( this.scroll === 4 ) {
          this.scroll ++;
          this.animationState.five = '';
          this.animationState.six = 'down';
          return;
        } 
      } else {
        if ( this.scroll === 1 ) {
          this.scroll --;
          this.animationState.one = '';
          this.animationState.two = 'up';
          return;
        }
        if ( this.scroll === 2 ) {
          this.scroll --;
          this.animationState.two = 'start';
          this.animationState.three = '';
          return;
        } 
        if ( this.scroll === 3 ) {
          this.scroll --;
          this.animationState.five = '';
          this.animationState.three = 'start';
          this.animationState.four = '';
          return;
        } 
        if ( this.scroll === 4 ) {
          this.scroll --;
          this.animationState.five = 'up';
          return;
        }  
        if ( this.scroll === 5 ) {
          this.scroll --;
          this.animationState.six = 'up';
          return;
        }  
      }
    },
    scrollDown() {
      if ( this.$refs.fullpage && this.$refs.fullpage.api ) {
        this.$refs.fullpage.api.moveSectionDown();
      }
    },

    rebuildPage() {
      window.addEventListener('resize', e => {
        if ( Math.abs(e.target.visualViewport.height - this.height) > 100 || 
            Math.abs(e.target.visualViewport.width - this.width) > 200 ) {
              window.location.reload();
        }
        if ( this.width > this.height ) {
          if ( e.target.outerWidth < e.target.outerHeight ) {
            window.location.reload();
          }
        }
        if ( this.width < this.height ) {
          if ( e.target.outerWidth > e.target.outerHeight ) {
            window.location.reload();
          }
        }
      })
      window.addEventListener("orientationchange", () => {
        window.location.reload();
      }, false);
    }
  },
  watch: {
    isAsideActive() {
      if ( !this.isMob ) {
        if ( this.isAsideActive ) {
          this.$refs.fullpage.api.setAllowScrolling(false);
        } else {
          this.$refs.fullpage.api.setAllowScrolling(true);
        }
      }
    }
  },
  created() {
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
    });

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

        setTimeout(() => {
          this.loaded = true;
        }, 1000)
      }, 2000)
    }

    if ( process.browser ) {
      this.rebuildPage()
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

#fullpage {
  z-index: 100;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>