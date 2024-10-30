<template>
  <div class="shell">
      <layout-sidebar></layout-sidebar>
      <div class="content">
        <div class="content_wrapper">
          <layout-topline></layout-topline>
          <main>
            <nuxt></nuxt>
          </main>
          <layout-footer></layout-footer>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      link: [
        {
          rel: 'canonical',
          href: 'https://goodminecraft.com' + this.$route.path
        }
      ]
    }
  }
}
</script>


