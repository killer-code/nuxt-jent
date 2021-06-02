<template>
  <section class="widget" :style="mode === 'absolute' ? 'position: absolute' : ''">
    <div class="container">
      <div class="uteka-widget">
        <!-- Шапка виджета -->
        <div class="uteka-widget-header">
          <div class="uteka-widget__container">
            <div class="uteka-widget-header__inner">
              <!-- Логотип -->
              <a
                class="uteka-widget-header__logo"
                href="https://uteka.ru/"
                target="_blank"
              >
                <img
                  src="https://widget.uteka.ru/static/img/widgets/logo-light.svg"
                  alt="Заказать в Ютеке"
                  title="поиск в аптеках"
                />
              </a>

              <!-- Заголовок -->
              <div class="uteka-widget-header__title"></div>

              <!-- Крестик -->
              <a href="#" @click="$emit('close')" 
                class="uteka-widget-header__close">
              </a>
            </div>
          </div>
        </div>

        <iframe allow="geolocation"></iframe>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Widget',
  props: { mode: String },
  mounted() {
    if ( process.browser ) {
      window.uteka = window.uteka || {}
      window.uteka._host = 'widget.uteka.ru',
      window.uteka._queue = []
      window.uteka._loaded = false
      window.uteka.onReady = function (callback) {
        if (window.uteka._loaded) {
          return callback()
        }

        window.uteka._queue.push(callback)
      }

      var script = document.createElement('script')
      var widget = document.querySelector('.uteka-widget')
      
      script.src = 'https://' + window.uteka._host + '/static/widgets/widget.compiled.js?l=' + Date.now()
      script.async = true
      script.addEventListener('load', function () {
        window.uteka._loaded = true
        window.uteka._queue.forEach(function (callback) {
          callback()
        })
      })

      document.head.appendChild(script)

      setTimeout(() => {
        window.uteka.loadWidget(widget, {
          productId: '368503'
        })
      }, 300)
    }
  }
}
</script>

<style lang="scss">
.widget {
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0,0,0,.9);
  z-index: 1000000000000000;
}
.uteka-widget {
  /* Минимально поддерживаемые размеры виджета: 320x520. */
  width: 100%;
  height: 100vh;
  max-height: 568px;
  outline: 1px solid #e0e0e0;
}

.uteka-widget iframe {
  border: none;
  width: 100%;
  height: calc(100% - 57px);
}

.uteka-widget__container {
  margin: 0 auto;
  padding: 0 16px;
}

@media (min-width: 600px) {
  .uteka-widget__container {
    padding: 0 20px;
  }
}

@media (min-width: 768px) {
  .uteka-widget__container {
    padding: 0 40px;
  }
}

@media (min-width: 1024px) {
  .uteka-widget__container {
    padding: 0 44px;
  }
}

@media (min-width: 1440px) {
  .uteka-widget__container {
    padding: 0 60px;
    max-width: 1440px;
  }
}

.uteka-widget-header {
  background: #fff;
  border-bottom: 1px solid #e0e0e0;
}

.uteka-widget-header__inner {
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 56px;
}

.uteka-widget-header__title {
  background: url('https://widget.uteka.ru/static/img/widgets/title_2@mobile.svg') no-repeat;
  background-position: center;
  width: 230px;
  height: 24px;
}

.uteka-widget-header__logo {
  height: 16px;
}

.uteka-widget-header__logo img {
  height: 100%;
}

.uteka-widget-header__close {
  position: absolute;
  top: 0;
  right: -8px;
  bottom: 0;
  z-index: 5;
  margin: auto;
  width: 32px;
  height: 32px;
  background: url('https://widget.uteka.ru/static/img/widgets/close_2.svg') no-repeat center;
}

@media (min-width: 1024px) {
  .uteka-widget-header__inner {
    flex-direction: row;
  }

  .uteka-widget-header__title {
    background-image: url('https://widget.uteka.ru/static/img/widgets/title_2.svg');
    width: 264px;
    height: 24px;
  }

  .uteka-widget-header__logo {
    position: absolute;
    left: 0;
    bottom: 0;
    top: 0;
    margin: auto;
    height: 32px;
  }
}
</style>