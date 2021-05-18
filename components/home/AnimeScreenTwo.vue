<template>
  <section class="scene" 
    style="position: fixed;">
      <div class="canvas sequence-2"></div>
  </section>
</template>

<script>
export default {
  name: 'AnimeScreenTwo',
  props: {
    scroll: Number,
    loaded: Boolean,
    scrollpage: Object,
    animationState: Object,
  },
  data: () => ({
    json_zilch:  require('@/assets/img/sprites/scene_02/pshick-2.json'),
    sheet_zilch: '',

    sprite_img: '',
    spriteURL: '/scene_02/pshick-2.png',
  }),
  computed: {
    app: function() {
      return new this.$PIXI.Application({
        antialias: true,
        transparent: true,

        width: this.width,
        height: this.height,
      });
    },
    X: function() { 
      if ( this.width > this.height ) {
        return this.width / 1920;
      } else {
        return .7;
      }
    },
    Y: function() { 
      if ( this.width > this.height ) {
        return this.height / 1080;
      } else {
        return .7;
      }
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
    },
  },
  methods: {
    async createScene() {
      const sequence = document.querySelector('#main-scene');
      const self = this; 

      self.app.view.classList.add('scene-002');
      sequence.appendChild(self.app.view);

      if ( self.app.loader.resources.image_zilch ) {
        self.app.loader
          .load((loader, resources) => {
            const zilch = new this.$PIXI.Texture.from(this.sprite_img);
            self.sheet_zilch  = new this.$PIXI.Spritesheet(zilch, this.json_zilch);
          })
      } else {
        self.app.loader
          .add('image_zilch', this.json_zilch)
          .load((loader, resources) => {
            const zilch = new this.$PIXI.Texture.from(this.sprite_img);
            self.sheet_zilch  = new this.$PIXI.Spritesheet(zilch, this.json_zilch);
          })
      }
    },
    onAssetsLoadedNext() {
      let frames = [];
      for ( let i = 0; i <= 20; i++ ) {
        const val = i;

        frames.push(this.$PIXI.Texture.from(`pshick_${val}-min.png`));
        const anim = new this.$PIXI.AnimatedSprite(frames);

        anim.x = this.app.screen.width / 2;
        anim.y = this.app.screen.height / 2;
        anim.anchor.set(.5);
        anim.animationSpeed = .16;
        anim.scale.set(this.X, this.Y);
        anim.loop = false;
        anim.play();
        anim.onComplete = () => {
          this.$PIXI.utils.clearTextureCache();
          this.app.ticker.stop();
          this.scrollpage.api.setAllowScrolling(true);
          anim.filters = [new this.$PIXI.filters.FXAAFilter()]
        };
        this.app.stage.addChild(anim);
      }
    },
    onAssetsLoadedStatic() {
      let frames = [];
      frames.push(this.$PIXI.Texture.from(`pshick_20-min.png`));
      const anim = new this.$PIXI.AnimatedSprite(frames);
      
      anim.x = this.app.screen.width / 2;
      anim.y = this.app.screen.height / 2;
      anim.anchor.set(.5);
      anim.animationSpeed = .1;
      anim.scale.set(this.X, this.Y);
      anim.loop = false;
      anim.play();
      anim.onComplete = () => {
        this.$PIXI.utils.clearTextureCache();
        this.app.ticker.stop();
        anim.filters = [new this.$PIXI.filters.FXAAFilter()]
      };
      this.app.stage.addChild(anim)
    },

    preload(sprite) {
      this.sprite_img = new Image();
      this.sprite_img.src = require(`~/assets/img/sprites${sprite}`)
    },
  },
  mounted() {
    this.preload(this.spriteURL);
  },
  watch: {
    loaded() {
      if ( this.loaded ) {
        this.createScene();
      }
    },
    async scroll() {
      const childLength = this.app.stage.children.length;
      if ( this.app.stage ) {
        for (let i = childLength - 1; i >= 0; i--) 
          {	this.app.stage.removeChild(this.app.stage.children[i]);
        };
      }
      
      if ( this.scroll === 1 && this.animationState.two === 'down' ) {
        this.createScene();
        this.app.ticker.start();
        setTimeout(() => {
          this.sheet_zilch.parse(() => {
            this.onAssetsLoadedNext();
          })
        }, 1000)

        const treshScene = document.querySelector('.scene-001');
        if ( treshScene ) {
          document.getElementById('main-scene').removeChild(treshScene);
        }

        this.scrollpage.api.setAllowScrolling(false);
      }
      if ( this.scroll === 1 && this.animationState.two === 'start' ) {
        this.createScene()
        this.app.ticker.start();

        const treshScene = document.querySelector('.scene-003');
        if ( treshScene ) {
          document.getElementById('main-scene').removeChild(treshScene);
        }

        this.sheet_zilch.parse(() => {
          this.onAssetsLoadedStatic();
        })
      }
      if ( this.scroll === 0 && this.animationState.two === 'up' ) {
        setTimeout(() => {
          this.app.ticker.stop();
          const treshScene = document.querySelector('.scene-002');
          if ( treshScene ) {
            document.getElementById('main-scene').removeChild(treshScene);
          }
        }, 500)
        setTimeout(() => {
          this.animationState.one = 'start';
        }, 1300)

      }
    }
  }
}
</script>

<style lang="scss">
// .scene-002 {
//   animation: bottom-top 10s ease both;
// }
// @keyframes bottom-top {
//   from { transform: translateY(80%) !important }
//   to { transform: translateY(0%) !important }
// }
</style>