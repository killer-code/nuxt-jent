<template>
  <header class="app-header" :class="{ 'app-header_min': asideData.isOpen }">
    <div class="west-side">
      <button class="app-btn" @click="openCloseMenu">
        <img src="@/assets/img/burger.svg" alt="" />
      </button>

      <NuxtLink to="/" class="main-logo">
        <img src="@/assets/img/logo.svg" alt="" />
      </NuxtLink>

      <nav class="nav tb_d-none nav_how">
        <NuxtLink to="/how-it-works/" class="nav__link">
          Как работает
        </NuxtLink>

        <NuxtLink to="/blog/?page=1" class="nav__link">
          Блог
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  props: ['asideData', 'nav'],
  data: () => ({
    menu: false,
  }),
  methods: {
    openCloseMenu() {
      this.nav.isOpen = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.app-header {
  display: flex;
  position: fixed;
  justify-content: space-between;
  align-items: center;
  padding: 60px 96px;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  transition: all 0.7s ease;

  &_min {
    left: 400px;
    @media screen and ( max-width: 560px ) { left: 0; }
  }

  @media screen and (max-width: 1280px) {
    padding: 40px 30px;
  }
  @media screen and (max-width: 560px) {
    padding: 20px 15px;
    background: linear-gradient(180deg, #0A0B11 53%, rgba(10, 11, 17, 0) 107%);
  }
}
.app-btn {
  border: 0;
  background: none;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  @media screen and (max-width: 560px) {
    margin-right: -24px;

    img {
      width: 24px;
      height: 24px;
    }
  }
}
.discription {
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;

  opacity: 0.7;
}
.west-side {
  display: flex;
  align-items: center;

  @media screen and (max-width: 560px) {
    width: 100%;
  }
}
.main-logo {
  margin-left: 34px;

  @media screen and (max-width: 560px) {
    margin-left: auto;
    margin-right: auto;

    img {
      height: 16px;
    }
  }
}
.app-btn__how-by {
  background: none;
  color: #f36d01;
  border: 1px solid #f36d01;
  box-sizing: border-box;
  border-radius: 5px;
  margin-left: 35px;

  transition: 0.3 all ease;
  cursor: pointer;

  &:hover {
    color: #fff;
    border-color: #fff;
  }
}
.nav {
  display: flex;
  transition: color .3s ease;

  &__link {
    color: #fff;
    margin-left: 40px;
  }
  &_how {
    :hover {
      color: #f36d01;
    }
  }
}
.tb_d-none {
  @media screen and (max-width: 1280px) {
    display: none;
  }
}
.mb_d-none {
  @media screen and (max-width: 560px) {
    display: none;
  }
}
.small {
  font-size: 10px;
}

.active-link {
  color: #f36d01;
  pointer-events: none;

  @media screen and (max-width: 560px) {
    color: #f36d01;
  }
}
</style>
