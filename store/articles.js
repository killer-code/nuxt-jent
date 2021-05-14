export const store = () => ({
  articles: [],
  article: ''
})

export const mutations = {
  updateArticles(state, arr) {
    state.articles = arr.data
  },
  updateArticle(state, article) {
    state.article = article
  }
}

export const actions = {
  async fetchArticles({commit}, page = 0) {
    try {
      const res = await fetch(`https://jent.men/api/articles/?page=${page}`);
      const articleList = await res.json();

      commit('updateArticles', articleList) 
    } catch(e) {
      throw e
    }
  },
  async fetchArticleById({}, article_id) {
    try {
      const res = await fetch(`https://jent.men/api/article/?id=${article_id}`);
      const article = await res.json();

      return article.data
    } catch(e) {
      throw e
    }
  }
}

export const getters = {
  articles: state => state.articles
}