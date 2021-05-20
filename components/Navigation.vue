<template>
  <transition name="slide-left2right">
    <section class="menu" v-show="nav.isOpen">
      <div class="menu__header">
        <img class="main-logo" src="@/assets/img/logo.svg" alt="" />

        <button class="app-btn"
          @click="nav.isOpen = false">
            <img src="@/assets/img/icon-close.svg" alt="" />
        </button>
      </div>

      <nav class="menu__body" @click="nav.isOpen = false">
        <NuxtLink v-for="(item, i) in menuItems" :key="i"
          :to="{ name: item.uid, query: item.query }" class="menu__item">
            {{ item.name }}
        </NuxtLink>
  
        <!-- <router-link to="/" class="menu__item">
          Правовая информация
        </router-link> -->

        <NuxtLink to="/how-it-works" class="menu__item mb-d">
          Как работает
        </NuxtLink>
        <a href="https://apteka.ru/product/dzhent-5faa2d1ed20e1c0001219169/" 
          target="_blanck"
          class="menu__item menu__item_btn mb-d">
            Где купить
        </a>
      </nav>

    </section>
  </transition>
</template>

<script>
export default {
  name: 'Navigation',
  props: ['nav'],
  data: () => ({
    menuItems: [
      { uid: 'index', name: 'Главная', link: '/', query: {} },
      // { uid: 'blog', name: 'Блог', link: '/blog', query: {page: 0} },
      { uid: 'instruction', name: 'Инструкция', link: '/instruction', query: {} },
      { uid: 'webar', name: 'WebAR', link: '/webar', query: {} },
    ]
  })
}
</script>

<style lang="scss" scoped>
.app-btn {
  background: none;
  border: none;
  cursor: pointer;
  &:focus { outline: none; }

  @media screen and (max-width: 560px) {
    img {
      width: 24px;
      height: 24px;
    }
  }
}
.main-logo {
  @media screen and (max-width: 560px) {
    height: 16px;
  }
}

.menu {
  position: fixed;
  transition: .5s ease;
  background: rgba(0,0,0,.95);
  left: 0;
  top: 0;
  bottom: 0;
  min-width: 350px;
  max-width: 350px;
  height: 100vh;
  z-index: 1000;

  @media screen and (max-width: 560px) {
    background: #000;
    min-width: 100vw;
    max-width: 100vw;
  }

  &__header {
    padding: 45px 30px 18px;
    background: #000;
    display: flex;
    align-content: center;
    justify-content: space-between;

    @media screen and (max-width: 560px) {
      padding: 25px 20px 10px;
    }
  }

  &__body {
    padding: 18px 30px;
    display: flex;
    flex-direction: column;

    @media screen and (max-width: 560px) {
      padding: 10px 20px 18px;
    }
  }

  &__item {
    color: #fff;
    margin: 10px 0;
    font-size: 21px;
    transition: all .3s ease;

    &:hover {
      font-size: 23px;
      margin: 9px 0;
      color: #f36d01;
    }

    @media screen and (max-width: 560px) {
      margin: 7px 0;
      font-size: 18px;

      &:hover {
        font-size: 19px;
        margin: 6px 0;
        color: #f36d01;
      }
    }

    &_btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      padding: 7px 0;
      border: solid #f36d01 1px;
      border-radius: 6px;
      margin-top: 55px;
      color: #f36d01;
    }
  }
}
.active-link {
  font-size: 23px;
  margin: 9px 0;
  color: #f36d01;
  pointer-events: none;

  @media screen and (max-width: 560px) {
    font-size: 19px;
    margin: 6px 0;
    color: #f36d01;
  }
}

.mb-d {
  opacity: 0;
  pointer-events: none;
  @media screen and (max-width: 560px) {
    opacity: 1;
    pointer-events: inherit;
  }
}

.router-link-exact-active.router-link-active {
  color: #f36d01;
  pointer-events: none;
}

.slide-left2right-enter-active, 
.slide-left2right-leave-active {
  transition: left right .3s ease;
}
.slide-left2right-enter, 
.slide-left2right-leave-to {
  left: -300px;
  right: 100vw;
}
</style>
