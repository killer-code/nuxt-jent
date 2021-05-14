<template>
  <section class="blog" v-if="articles && articles.length">
    <h1 class="title">Блог посвященный Jent&reg;</h1>
    <p class="subtitle">
      Джент — инновационный продукт в формате спрея для приема
      внутрь. Для получения мощной эрекции достаточно двух нажатий, препарат
      действует через 10 минут. В одном флаконе содержится 32 дозы.
    </p>

    <article v-for="item in articles" :key="item.id" class="article _mb-7">
      <section class="article__header _mb-7">
        <h2 class="article__title">
          {{ item.name }}
        </h2>
        <p class="article__date">{{ item.date }}</p>
      </section>

      <section class="article__body">
        <div v-if="item.picture" class="article__img column">
          <img :src="`https://jent.men/${item.picture}`" alt="">
        </div>
        
        <div class="txt column" v-html="item.text"></div>
      </section>

      <section class="article__footer">
        <button class="article__btn article__btn_more"
          @click="readMore(item.id)">
            <span>Читать еще</span>
        </button>
      </section>
    </article>
  </section>
</template>

<script>
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
  async asyncData({store, error}) {
    try {
      await store.dispatch('articles/fetchArticles')
      return {}
    } catch(e) {
      error(e)
    }
  },
  computed: {
    articles: function() {
      return this.$store.getters['articles/articles']
    }
  },
  methods: {
    readMore(id) {
      this.$router.push(`/blog/${id}`);
    }
  }
}
</script>

<style lang="scss" scoped>
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

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__title {
    font-weight: bold;
    font-size: 21px;
    line-height: 150%;
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
      :hover {
        color: #f36d01;
      }
    }
  }

  &__body { 
    display: flex; 
    margin: 0 -15px;
  }

  &__img {
    width: 280px;
    height: 250px;

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