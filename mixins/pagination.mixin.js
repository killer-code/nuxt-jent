import _ from 'lodash'

export default {
  data() { 
    return {
      page: this.$route.query.page || 1,
      pageCount: 0,
      allItems: [],
      items: [],
      pageSize: 10,
    } 
  },
  methods: {
    setupPagination(allItems) {
      this.allItems = _.chunk(allItems, this.pageSize);
      this.pageCount = _.size(this.allItems);
      this.items = this.allItems[this.page] || this.allItems[0];
    },
    pageChangeHandler(page) {
      this.$router.push(`${this.$route.path}?page=${page}`);
      this.items = this.allItems[page] || this.allItems[0];
    }
  },
  mounted() {
    this.page = Number(this.$route.query.page) || 1
  }
}