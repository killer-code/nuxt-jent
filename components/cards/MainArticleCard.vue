<template>
  <article class="article" @click="readMore(item)" :class="{'_pt-30': !item.picture}">
    <section class="article__body_main">
      
      <section class="_w-100 _space">
        <section>
          <div v-show="item.picture" class="article__preview">
            <img :src="`https://jent.men/${item.picture}`" alt="">
          </div>
          
          <section class="article__header _mb-7">
            <h2 class="article__title">
              {{ item.name }}
            </h2>

            <small v-show="item.date" class="article__date">
              {{ $moment(item.date, 'DD.MM.YYYY HH:mm:ss').format('DD MMM YYYY HH:mm') }}
            </small>
          </section>

          <div class="txt article__preview-txt" v-html="item.text"></div>

        </section>

        <section class="article__footer">
          <nuxt-link :to="{
            name: 'blog-code', 
            params: { code: item.code, page: $route.query.page ? $route.query.page : 0 }
          }">
            <button class="article__btn article__btn_more">
                <span>Читать</span>
            </button>
          </nuxt-link>
        </section>
      </section>
      
    </section>
  </article>
</template>

<script>
export default {
  name: 'MainArticleCard',
  props: { item: Object },
  methods: {
    readMore(item) {
      this.$router.push({
        name: 'blog-code',
        params: { code: item.code, page: this.$route.query.page ? this.$route.query.page : 0 } 
      })
    }
  }
}
</script>

<style lang="scss" scoped>
._space {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.article {
  background: #16171d;
  border-color: #16171d;
  border-width: 2px;
  border-style: solid;
  border-radius: 6px;
  cursor: pointer;
  transition: all .5s ease;
  box-sizing: border-box;
  height: 100%;

  &:hover {
    border-color: rgba(255,255,255,.2);
    border-width: 2px;
    border-style: solid;

    & .article__preview > img {
      transform: scale(1.05);
    }

    & .article__title { color: #f36d01; }
    & .article__date { color: #fff; }
    & .article__btn_more { color: #f36d01; }
  }

  & .article__btn_more {
    position: relative;
    &::before {
      content: '';
      position: absolute;
      width: 0;
      height: 1px;
      top: 100%;
      border-radius: 6px;
      background-color: #f36d01;
      transition: all .25s ease;
    }
    &:hover {
      &::before {
        width: 100%;
      }
    }
  }

  &__preview {
    position: relative;
    height: 250px;
    width: 100%;
    margin-bottom: 16px;
    border-radius: 6px 6px 0 0;
    overflow: hidden;

    & > img { 
      position: relative;
      height: 100%; 
      width: 100%;
      border-radius: 6px 6px 0 0;
      object-fit: cover;
      transform: scale(1);
      transition: all .5s ease;
    }
  }
  &__header { padding: 0 24px; }
  &__footer {
    padding: 0 24px 30px;
  }

  @media screen and ( max-width: 780px ) { padding: 15px 10px; }

  &__header {
    display: flex;
    flex-direction: column;

    @media screen and ( max-width: 780px ) {
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
    }
  }

  &__title {
    font-weight: 600;
    font-size: 21px;
    line-height: 150%;
    transition: all .3s ease;
  }

  &__date {
    font-size: 12px;
    color: rgba(255,255,255,.8);
    font-weight: 400;
    line-height: 15px;
    margin-top: 21px;
    transition: all .3s ease;
  }

  &__preview-txt {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -moz-box;
    -moz-box-orient: vertical;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    line-clamp: 5;
    box-orient: vertical;

    @media screen and ( max-width: 780px ) {
      -webkit-line-clamp: 3;
      line-clamp: 3;
    }
  }

  &__btn {
    background: none;
    font-size: 16px;
    font-weight: 500;
    border: 0;
    cursor: pointer;
    color: #fff;
    transition: all .3s ease;

    &_more {
      padding: 0;
      @media screen and ( max-width: 1024px ) {
        color: #f36d01;
      }
      :hover {
        color: #f36d01;
      }
    }
  }

  &__body_main { 
    display: flex;
    height: 100%;

    @media screen and ( max-width: 780px ) { flex-direction: column; }
  }

  &__img {
    width: 280px;
    height: 250px;
    min-width: 250px;

    @media screen and ( max-width: 780px ) { 
      margin-bottom: 16px;
      width: 100%; 
    }

    & > img {
      width: 100%;
      height: 100%;
      border-radius: 6px;
      object-fit: cover;
    }
  }
}

._pt-30 { padding-top: 30px; }
</style>
