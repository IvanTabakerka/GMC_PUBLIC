<template>
    <main class="clear_main">
      <nuxt></nuxt>
    </main>
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