<template>
  <section class="how-it-works">
    <div class="how-it-works__container">
      <h1 class="title">Как работает Джент</h1>
      <p class="subtitle">
        Джент &mdash; инновационный продукт в формате спрея для приема
        внутрь. Для получения мощной эрекции достаточно двух нажатий, препарат
        действует через 10 минут. В одном флаконе содержится 32 дозы.
      </p>

      <div class="description">
        <div class="description__title">
          В основе спрея Джент &mdash; проверенный и хорошо изученный
          <span class="orange">силденафил</span>.
        </div>
        <div class="description__content">
          <p>
            Силденафил &mdash; это препарат-регулятор потенции. Он действует только при
            сексуальном возбуждении. Попадая в организм, вещество увеличивает
            приток крови к половому органу. По завершении полового акта 
            эрекция прекращается.
          </p>
          <p>
            Максимальная концентрация после приема натощак достигается в период
            от 30 минут до двух часов. Силденафил уже давно зарекомендовал себя
            как средство для лечения эректильной дисфункции и используется 
            врачами по всему миру.
          </p>
        </div>
      </div>

      <div
        v-for="item in items"
        class="description"
        :id="item.id"
        :key="item.id"
      >
        <div class="description__title">
          {{ item.title }}
        </div>
        <div
          class="description__content description__content--spray description__content--with-bg"
        >
          <div class="row">
            <img :src="require(`@/assets/img${item.image}`)" :alt="`${item.id} logo`" class="image" />
            <div v-html="item.text" class="text"></div>
          </div>
        </div>
      </div>
    </div>

    <StaticFooter />
  </section>
</template>

<script>
import StaticFooter from '@/components/StaticFooter'
import pageData from '@/store/HowItWorksData'

export default {
  name: 'HowItWorks',
  head: {
    title: 'Как работает спрей для потенции джент | Jent',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Механизм действия спрея для потенции джент. Для получения мощной эрекции ' +
          'достаточно двух нажатий, препарат действует через 10 минут.'
      }
    ],
  },
  components: { StaticFooter },
  data: () => ({
    items: pageData,
  }),
  mounted() {
    if ( this.$route.hash ) {
      let elem = document.querySelector(this.$route.hash)
      elem.scrollIntoView({ block: 'start', behavior: 'smooth' })
    }
  }
};
</script>

<style lang="scss" scoped>
.row {
  display: flex;
  flex-direction: row;
  align-items: center;

  &_top {
    align-items: flex-start;
  }

  @media screen and (max-width: 560px) {
    flex-direction: column;
  }
}

.image {
  width: 100px;
  height: 130px;

  @media screen and (max-width: 560px) {
    margin: 0 auto 30px 0;
  }
}

.how-it-works {
  &__container {
    max-width: 1040px;
  }

  .title {
    font-weight: 500;
    font-size: 42px;
    line-height: 130%;
    margin-bottom: 60px;

    @media screen and (max-width: 1280px) {
      margin-bottom: 32px;
    }

    @media screen and (max-width: 560px) {
      font-size: 26px;
      line-height: 130%;
      margin-bottom: 24px;
    }
  }

  .subtitle {
    font-weight: 500;
    font-size: 28px;
    line-height: 130%;
    margin-bottom: 78px;

    @media screen and (max-width: 1280px) {
      font-size: 24px;
      line-height: 130%;
      margin-bottom: 60px;
    }

    @media screen and (max-width: 560px) {
      font-size: 16px;
      line-height: 150%;
      margin-bottom: 45px;
    }
  }

  .orange {
    color: #f36d01;
  }

  .description {
    margin-top: 60px;

    &:last-of-type {
      margin-bottom: 125px;

      @media screen and (max-width: 1280px) {
        margin-bottom: 80px;
      }

      @media screen and (max-width: 560px) {
        margin-bottom: 60px;
      }
    }

    &__title {
      font-weight: bold;
      font-size: 21px;
      line-height: 150%;
      margin-bottom: 32px;

      @media screen and (max-width: 1280px) {
        font-size: 18px;
        line-height: 150%;
      }
    }

    &__content {
      font-size: 18px;
      line-height: 150%;

      @media screen and (max-width: 1280px) {
        font-size: 16px;
        line-height: 150%;
      }

      p {
        margin-bottom: 24px;

        &:last-of-type {
          margin-bottom: 0;
        }
      }

      &--spray {
        padding: 25px 52px;
      }

      &--clock {
        padding: 70px 52px 70px 0;
      }

      &--with-bg {
        background: #16171d;
        border-radius: 6px;

        @media screen and (max-width: 560px) {
          padding: 32px 15px;
        }
      }
    }
  }
}

.text {
  max-width: calc(100% - 150px);
  margin-left: auto;

  @media screen and (max-width: 560px) {
    max-width: 100%;
  }

  & ::v-deep p {
    margin-bottom: 24px;

    &:last-of-type {
      margin-bottom: 0;
    }
  }
}

.text:last-child {
  margin-left: 55px;
}

.txt_small {
  font-family: 'Roboto';
  font-weight: 300;
  font-size: 10px;
  line-height: 13px;
  color: #fff;
  margin-bottom: 10px;
  opacity: 0.5;
  max-width: 1040px;
}
</style>
