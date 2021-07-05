export const state = () => ({
  articles: [],
  article_count: 0,
  article: {}
})

export const mutations = {
  updateArticles(state, arr) {
    state.articles = arr.data
    state.article_count = Number(arr.count)
  },
  updateArticle(state, article) {
    state.article = article.data
  }
}

export const actions = {
  async fetchArticles({commit}, page) {
    try {
      const res = await fetch(`https://jent.men/api/articles/?page=${page}`);
      const articleList = await res.json();

      commit('updateArticles', articleList)
    } catch(e) {
      error({
        statusCode: 404,
      })
    }
  },
  async fetchArticleById({commit}, article_code) {
    try {
      const res = await fetch(`https://jent.men/api/article/?code=${article_code}`);
      const article = await res.json();

      if ( article.statusCode === '404' ) {
        return error({ statusCode: 404 })
      }

      commit('updateArticle', article)
    } catch(e) {
      error({
        statusCode: 404,
      })
    }
  }
}

export const getters = {
  articles: s => s.articles,
  article_count: s => s.article_count,
  article: s => s.article,
}