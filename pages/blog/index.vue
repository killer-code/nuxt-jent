<template>
  <section class="blog">
    <h1 class="title">Блог посвященный Jent&reg;</h1>
    <p class="subtitle">
      Джент — инновационный продукт в формате спрея для приема
      внутрь. Для получения мощной эрекции достаточно двух нажатий, препарат
      действует через 10 минут. В одном флаконе содержится 32 дозы.
    </p>

    <section class="article-list" v-if="articles && articles.length">
      <article v-for="item in articles" :key="item.id" class="article _mb-7">
        <section class="article__body">
          <div v-if="item.picture" class="article__img column">
            <img :src="`https://jent.men/${item.picture}`" alt="">
          </div>
          
          <section class="_w-100 column _space">
            <section>
              <section class="article__header _mb-7">
                <h2 class="article__title">
                  {{ item.name }}
                </h2>

                <small class="article__date">
                  {{ $moment(item.date, 'DD.MM.YYYY HH:mm:ss').format('DD MMM YYYY HH:mm') }}
                </small>
              </section>

              <div class="txt article__preview-txt" v-html="item.text"></div>

            </section>

            <section class="article__footer">
              <button class="article__btn article__btn_more"
                @click="readMore(item.id)">
                  <span>Читать еще</span>
              </button>
            </section>
          </section>
          
        </section>
      </article>
    </section>
    
    <StaticFooter />
  </section>
</template>

<script>
import StaticFooter from '@/components/StaticFooter'

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
  components: { StaticFooter },
  data: () => ({
    page: 0,
  }),
  async asyncData({store, error}) {
    try {
      return await store.dispatch('articles/fetchArticles')
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
  },
  methods: {
    readMore(id) {
      this.$router.push(`/blog/${id}`);
    }
  }
}
</script>

<style lang="scss" scoped>
._w-100 { width: 100%; }
._space {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
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
}
.subtitle {
  font-weight: 500;
  font-size: 28px;
  line-height: 130%;
  margin-bottom: 78px;
}
.article {
  background: #16171d;
  border-radius: 6px;
  padding: 25px 52px;

  @media screen and ( max-width: 780px ) { padding: 15px 10px; }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media screen and ( max-width: 780px ) {
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
    }
  }

  &__title {
    font-weight: bold;
    font-size: 21px;
    line-height: 150%;
  }

  &__date {
    font-size: 12px;
    color: rgba(255,255,255,.8);
    font-weight: 400;
    line-height: 15px;
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
    font-size: 20px;
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

  &__body { 
    display: flex; 
    margin: 0 -15px;

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

.txt {
  font-size: 18px;
  line-height: 150%;
}
.column {
  padding-left: 15px;
  padding-right: 15px;
}
</style>