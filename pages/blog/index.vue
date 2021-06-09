<template>
  <section class="blog">
    <h1 class="title">Блог посвященный Jent&reg;</h1>

    <section class="article-list _mb-7" v-if="articles && articles.length">
      <div v-for="item in articles" :key="item.id">
        <ArticleCard :item="item" />
      </div>
    </section>

    <client-only>
      <Paginate 
        v-if="allPages > 1"
        v-model="page"
        hide-prev-next
        prev-text=""
        next-text=""
        container-class="pagination"
        page-class="pagination__item"
        :page-range="3"
        :page-count="allPages"
        :click-handler="pageChangeHandler"  
      />
    </client-only>

    <StaticFooter />
  </section>
</template>

<script>
import paginationMixin from '@/mixins/pagination.mixin'

import StaticFooter from '@/components/StaticFooter'
import ArticleCard from '@/components/ArticleCard'

export default {
  name: 'Blog',
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
  mixins: [paginationMixin],
  components: { StaticFooter, ArticleCard },
  data: () => ({
    page: 0,
  }),
  watchQuery: ['page'],
  async fetch({store, error, query}) {
    try {
      await store.dispatch('articles/fetchArticles', query.page)
    } catch(e) {
      error(e)
    }
  },
  computed: {
    articles: function() {
      return this.$store.getters['articles/articles']
    },
    article_count: function() {
      return this.$store.getters['articles/article_count']
    },
    allPages: function() {
      const pages = Math.ceil(this.article_count / 10);
      return pages;
    }
  },
  mounted() {
    this.setupPagination(this.articles);
  }
}
</script>

<style lang="scss" scoped>
.article-list {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;

  @media screen and ( max-width: 1024px ) { grid-template-columns: 1fr 1fr; }
  @media screen and ( max-width: 560px ) { grid-template-columns: 1fr; }
}
._w-100 { width: 100%; }
.blog {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 250px);
}
.title {
  font-weight: 500;
  font-size: 42px;
  line-height: 130%;
  margin-bottom: 60px;

  @media screen and ( max-width: 560px ) {
    font-size: 28px;
    line-height: 130%;
  }
}
.subtitle {
  font-weight: 500;
  font-size: 28px;
  line-height: 130%;
  margin-bottom: 78px;
}

.txt {
  font-size: 18px;
  line-height: 150%;
}
.column {
  padding-left: 15px;
  padding-right: 15px;
}
</style>