<template>
  <section class="disclaimer" v-if="showModal">
    <section class="disclaimer__content disclaimer__content_center">
      <img src="@/assets/img/logo_color.svg" class="disclaimer__img" alt="">
      <p>Информация на сайте предназначена для врачей.</p>
      <p>Нажимая кнопку “Да”, вы подтверждаете, что являетесь</p>
      <p>действующим специалистом</p>
      <button class="disclaimer__btn" @click="goSite">да</button>
    </section>
  </section>
</template>

<script>
export default {
  name: 'Disclaimer',
  data: () => ({
    showModal: true,
  }),
  methods: {
    goSite() { 
      if ( process.browser ) {
        sessionStorage.setItem('old', true);
        this.closeModalWindow();
      }
    },
    closeModalWindow() {
      if ( process.browser ) {
        document.querySelector('body').classList.remove('blocked')
        document.querySelector('html').classList.remove('blocked')

        this.showModal = false;

        setTimeout(() => {
          const main = document.querySelector('.main');

          if ( main ) {
            main.removeChild(document.querySelector('.disclaimer'));
          }
        })
      }
    }
  },
  mounted() {
    document.querySelector('body').classList.add('blocked')
    document.querySelector('html').classList.add('blocked')
  },

}
</script>

<style lang="scss" scoped>
.disclaimer {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100000;

  width: 100vw;
  height: 100vh;

  top: 0;
  left: 0;

  background: radial-gradient(29.27% 59.49% at 50% 100%, rgba(79, 70, 92, 0.6) 0%, rgba(79, 70, 92, 0) 100%), #0A0B11;

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 24px;
    font-weight: 400;
    line-height: 36px;

    @media screen and ( max-width: 560px ) {
      font-weight: 300;
      font-size: 18px;
      line-height: 27px;

      text-align: center;
    }
  }

  &__img {
    margin-bottom: 70px;
    @media screen and ( max-width: 560px ) {
      width: 113px;
    }
  }
  &__btn {
    border: 1px solid #FFFFFF;
    box-sizing: border-box;
    border-radius: 8px;
    background: none;
    margin-top: 55px;
    text-transform: uppercase;
    color: #fff;
    width: 178px;
    height: 58px;
    cursor: pointer;

    &:focus { outline: none; }

    @media screen and ( max-width: 560px ) {
      width: calc(100% - 60px);
    }
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
