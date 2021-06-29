<template>
  <section class="_mb-7 _mt-7">

    <h2 class="_mb-7">{{ title }}</h2>

    <splide :options="options">
      <splide-slide v-for="article in articles" :key="article.id">
        <ArticleCard :item="article" />
      </splide-slide>
    </splide>

  </section>
</template>

<script>
import ArticleCard from '@/components/cards/ArticleCard'

export default {
  name: 'Slider',
  props: { articles: Array, title: String },
  components: { ArticleCard },
  data: () => ({
    
  }),
  computed: {
    width: function() {
      if ( process.browser ) {
        return window.innerWidth;
      }
    },
    isPagination: function() {
      if ( this.width > 768 && this.articles.length > 2 ) {
        return true
      } else if ( this.width < 768 && this.articles.length > 1 ) {
        return true
      } else {
        return false
      }
    },
    options: function() {
      return {
        autoHeight: true,
        arrows: false,
        rewind : true,
        perPage: this.width > 768 ? 2 : 1,
        perMove: 2,
        gap    : '15px',
        pagination: this.isPagination,
      }
    }
  },
  slides: function() {
    let slides = [];
    if ( this.width < 768 ) {
      slides = this.articles
    } else {
      slides = this.articles
    }
    return slides
  }
}
</script>
