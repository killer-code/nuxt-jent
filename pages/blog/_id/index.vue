<template>
  <section class="page_article">
    <BreadCrumb :parent="'blog'" />

    <article v-if="article" class="article">
      <section class="article__banner">
        <div v-if="article.detail_picture" class="article__img">
            <img :src="`https://jent.men/${article.detail_picture}`" alt="">
        </div>
      </section>

      <section class="article__header">
        <h1 class="title">{{ article.name }}</h1>
        <p class="article__date">{{ $moment(article.date, 'DD.MM.YYYY HH:mm:ss').format('DD MMM YYYY HH:mm') }}</p>
      </section>
      
      <p class="subtitle _mb-7" v-html="article.text"></p>

      <section class="article__body">
        <div class="txt" v-html="article.detaiL_text"></div>
      </section>
    </article>

    <StaticFooter />
  </section>
</template>

<script>
import BreadCrumb   from '@/components/BreadCrumb'
import StaticFooter from '@/components/StaticFooter'

export default {
  name: 'Article',
  head: {
    title: 'Блог компании | Jent',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Следите за новостями в сфере борьбы с импотенцией.'
      }
    ],
  },
  components: { BreadCrumb, StaticFooter },
  async asyncData({params, store, error}) {
    try {
      return await store.dispatch('articles/fetchArticleById', params.id)
    } catch(e) {
      error(e)
    }
  },
  computed: {
    article: function() {
      return this.$store.getters['articles/article']
    }
  },
}
</script>

<style lang="scss" scoped>
.page_article {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 250px);
}
.title {
  font-weight: 500;
  font-size: 42px;
  line-height: 130%;
}
.subtitle {
  font-weight: 500;
  font-size: 28px;
  line-height: 130%;
}
.txt {
  font-size: 18px;
  line-height: 150%;
}
.article {
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 60px;
  }
  &__img {
    height: 400px;
    width: 100%;
    border-radius: 14px;
    margin-bottom: 60px;

    & > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 14px;
    }
  }
}
</style>