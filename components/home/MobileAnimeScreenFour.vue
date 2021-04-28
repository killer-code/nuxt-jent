<template>
  <section class="mobile-scene-4">
    <div class="wrapper-img scene_mobile_static">
      <img data-depth=".5"
        class="img_static"
        :src="require('@/assets/img/sprites/scene_04/mobile/flackon_static-min.png')" >
    </div>
  </section>
</template>

<script>
export default {
  name: 'MobileAnimeScreenFour',
  data: () => ({
    height: 400,
    json_lines:   require('@/assets/img/sprites/scene_04/mobile/lines.json'),
    sprite_img_line:    require('@/assets/img/sprites/scene_04/mobile/lines.webp'),

    sheet_lines: '',
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
    width: function() {
      if ( process.browser ) {
        return window.innerWidth
      }
    },
    isMobile: function() {
      if ( process.browser ) {
        return window.innerWidth < 561
      }
    },
  },
  methods: {
    createScene() {
      const sequence = document.querySelector('.mobile-scene-4');
      const self = this; 

      sequence.appendChild(self.app.view);
      if ( self.app.loader.resources.image_lines ) {
        self.app.loader
          .load((loader, resources) => {
            const lines = new this.$PIXI.Texture.from(this.sprite_img_line);
            self.sheet_lines  = new this.$PIXI.Spritesheet(lines, this.json_lines);
          })
      } else {
        self.app.loader
          .add('image_lines', this.json_lines)
          .add('image_flackon', this.json_flackon)
          .load((loader, resources) => {
            const lines = new this.$PIXI.Texture.from(this.sprite_img_line);
            self.sheet_lines  = new this.$PIXI.Spritesheet(lines, this.json_lines);
            
            this.sheet_lines.parse(() => {
              this.onAssetsLoadedNext();
            })
          })
      }
    },
    onAssetsLoadedNext() {
      const blurFilter = new this.$PIXI.filters.BlurFilter();
      blurFilter.blurX = 20;
      blurFilter.blurY = 8;
      blurFilter.repeatEdgePixels = true;

      let frames = [];
      let container = new this.$PIXI.Container();

      for ( let i = 0; i <= 29; i++ ) {
        const val = i;

        frames.push(this.$PIXI.Texture.from(`lines_${val}-min.webp`));
        const anim = new this.$PIXI.AnimatedSprite(frames);
        
        anim.x = this.app.screen.width / 2;
        anim.y = this.app.screen.height / 2;
        anim.anchor.set(.5);
        anim.animationSpeed = .3;
        anim.scale.set(.3, .2);
        anim.loop = true;
        anim.play();

        container.addChild(anim);
      }
      container.filters = [blurFilter];
      this.app.stage.addChild(container);
    },
  },
  mounted() {
    this.createScene();
    if ( this.isMobile ) {
      const scene = document.querySelector('.scene_mobile_static');
      const parallaxInstance = new this.$parallax(scene);
    }
  }
}
</script>

<style lang="scss" scoped>
.mobile-scene-4 {
  margin-left: -15px;
  margin-right: -15px;
}
.wrapper-img {
  position: absolute;
  display: flex;
  width: 100%;
  height: 400px;
  padding: 0;
}
.img_static {
  height: 90%;
}
</style>
