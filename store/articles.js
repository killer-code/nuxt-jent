export const store = () => ({
  articles: [],
  article_count: 0,
  article: ''
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
  async fetchArticles({commit}, page = 0) {
    try {
      const res = await fetch(`https://jent.men/api/articles/?page=${page}`);
      const articleList = await res.json();
      
      commit('updateArticles', articleList) 
    } catch(e) {
      throw e
    }
  },
  async fetchArticleById({commit}, article_id) {
    try {
      const res = await fetch(`https://jent.men/api/article/?id=${article_id}`);
      let article = await res.json();
      
      commit('updateArticle', article)
    } catch(e) {
      throw e
    }
  }
}

export const getters = {
  articles: s => s.articles,
  article_count: s => s.article_count,
  article: s => s.article,
}