<template>
  <section v-if="currentArticle"
    class="page_article article_detail"
  >
    <BreadCrumb :parent="'blog'" :query="oldPage" />

    <article v-if="currentArticle" class="detail-article _mb-7">
      <section class="detail-article__banner">
        <div v-if="currentArticle.detail_picture" class="detail-article__img">
            <img :src="`https://jent.men/${currentArticle.detail_picture}`" alt="">
        </div>
      </section>

      <section class="detail-article__header">
        <h1 class="title">{{ currentArticle.name }}</h1>
        <p v-if="currentArticle.date" class="detail-article__date">
          {{ $moment(currentArticle.date, 'DD.MM.YYYY HH:mm:ss').format('DD MMM YYYY HH:mm') }}
        </p>
      </section>
      
      <p v-if="currentArticle.text" 
        class="subtitle _mb-7" 
        v-html="currentArticle.text">
      </p>

      <section class="detail-article__body">
        <div class="txt" v-html="currentArticle.detaiL_text"></div>
      </section>

      <section v-if="currentArticle.recommended_articles && 
        currentArticle.recommended_articles.length" 
        class="recomendation">
          <Slider :articles="currentArticle.recommended_articles" 
            :title="'Читайте также'" />
      </section>
    </article>

    
    <StaticFooter />
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

import BreadCrumb   from '@/components/BreadCrumb'
import Slider       from '@/components/Slider'
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
  components: { BreadCrumb, Slider, StaticFooter },
  async fetch({params, store, error}) {
    try {
      return await store.dispatch(
        'articles/fetchArticleById', 
        params.code
      )
    } catch(e) {
      error({
        statusCode: 404,
      })
    }
  },
  fetchKey() {
    return this.$route.params.code;
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
  methods: {
    addTitleToImages() {
      const imgArr = document.querySelectorAll('img');
      imgArr.forEach(img => {
        const title = img.getAttribute('title');
        let small = document.createElement('small');
        small.className = 'img-txt';
        small.innerText = title;
        img.after(small)
      })
    },
    scrollToBlock(anchorList) {
      if ( anchorList && anchorList.length ) {
        anchorList.forEach(anchor => {
          anchor.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            const blockID = e.target.getAttribute('href').slice(1);
            const block = document.querySelector(`#${blockID}`) || document.querySelector(`[name=${blockID}]`);

            const box = block.getBoundingClientRect();
            const coordY = box.top + pageYOffset;

            window.scrollTo({
              top: coordY - window.innerHeight / 6,
              left: 0,
              behavior: 'smooth'
            });
          })
        })
      }
    }
  },
  mounted() {
    this.addTitleToImages();
    const anchorList = document.querySelectorAll('.js-anchor');
    
    this.scrollToBlock(anchorList);
  }
}
</script>

<style lang="scss" scoped>
.article_detail {
  max-width: 1024px;
  margin: auto;
}
.page_article {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: calc(100vh - 250px);
}
.title {
  font-weight: 600;
  font-size: 42px;
  line-height: 55px;

  @media screen and ( max-width: 560px ) {
    font-size: 28px;
    line-height: 130%;
  }
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
.detail-article {
  &__header {
    display: flex;
    flex-direction: column;
    margin-bottom: 60px;
  }
  &__date {
    font-size: 12px;
    line-height: 16px;
    color: #818181;
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
