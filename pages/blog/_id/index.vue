<template>
  <section class="page_article">
    <BreadCrumb :parent="'blog'" :query="oldPage" />

    <article v-if="currentArticle" class="article _mb-7">
      <section class="article__banner">
        <div v-if="currentArticle.detail_picture" class="article__img">
            <img :src="`https://jent.men/${currentArticle.detail_picture}`" alt="">
        </div>
      </section>

      <section class="article__header">
        <h1 class="title">{{ currentArticle.name }}</h1>
        <p v-if="currentArticle.date" class="article__date">
          {{ $moment(currentArticle.date, 'DD.MM.YYYY HH:mm:ss').format('DD MMM YYYY HH:mm') }}
        </p>
      </section>
      
      <p v-if="currentArticle.text" 
        class="subtitle _mb-7" 
        v-html="currentArticle.text">
      </p>

      <section class="article__body">
        <div class="txt" v-html="currentArticle.detaiL_text"></div>
      </section>
    </article>

    
    <StaticFooter />
  </section>
</template>

<script>
import { mapGetters } from "vuex";

import BreadCrumb   from '@/components/BreadCrumb'
import StaticFooter from '@/components/StaticFooter'

export default {
  name: 'Article',
  head() {
    return {
      title: `${this.currentArticle.seo.title} | Jent`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.currentArticle.seo.description
        }
      ],
    }
  },
  components: { BreadCrumb, StaticFooter },
  async fetch({params, store, error}) {
    try {
      return await store.dispatch('articles/fetchArticleById', params.id)
    } catch(e) {
      error(e)
    }
  },
  fetchKey() {
    return this.$route.params.id;
  },
  computed: {
    ...mapGetters('articles', ['article']),
    oldPage: function() {
      const obj = {
        page: this.$route.params.page || 1
      }
      return obj
    },
    currentArticle: function() {
      return this.$store.state.articles.article
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
    flex-direction: column-reverse;
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

<style lang="scss">
.article__body {
  & h2 {
    margin-bottom: 16px;
    font-weight: 500;
    font-size: 24px;
    line-height: 24px;
    color: #f36d01;
  }
  & h3, h4 {
    margin-bottom: 16px;
    font-weight: 700;
    font-size: 18px;
    line-height: 21px;
    color: #f36d01;
  }
  & p { margin-bottom: 16px; }
  & ul li { 
    color: #fff; 
    &::marker { color: #f36d01; }
  }
  & ol {
    counter-reset: myCounter;
    & li {
      list-style: none;
      display: flex;
      align-items: center;
      &::before {
        counter-increment: myCounter;
        content:counter(myCounter);
        color: white;
        background: #f36d01;
        border-radius: 50%;
        text-align: center;
        margin: 5px 10px 5px -35px;
        width: 25px;
        height: 25px;
        min-width: 25px;
        min-height: 25px;
      }
    }
  }
}
</style>