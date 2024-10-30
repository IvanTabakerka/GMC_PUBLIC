<template><div>
  <b-pagination-nav
    :link-gen="linkGen"
    :number-of-pages="pages"
    use-router
    align="center"
    @change="updatePage()"
  ></b-pagination-nav>
  </div>
</template>

<script>
  export default {
    methods: {
      updatePage () {
        this.$store.commit(this.setPageCommit, !this.$route.query.page ? 1 : this.$route.query.page);
        this.$store.dispatch(this.getDataAction, this.arguments);
      },
      linkGen(pageNum) {
        return pageNum === 1 ? '?' : `?page=${pageNum}`
      },
    },
    created () {
      this.updatePage();
    },
    props: ['pages', 'setPageCommit', 'getDataAction', 'arguments']
  }
</script>
