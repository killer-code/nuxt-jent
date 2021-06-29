<template>
  <section class="widget">
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
            </div>
          </div>
        </div>

        <iframe allow="geolocation"></iframe>
      </div>
    </div>

    <StaticFooter />

  </section>
</template>

<script>
import StaticFooter from '@/components/StaticFooter'

export default {
  name: 'Uteka',
  components: { StaticFooter },
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

<style lang="scss" scoped></style>
