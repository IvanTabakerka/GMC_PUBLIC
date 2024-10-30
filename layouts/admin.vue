<template>
  <div class="shell admin">
    <layout-admin-sidebar></layout-admin-sidebar>
    <div class="content">
      <div class="content_wrapper">
        <layout-topline></layout-topline>
        <main>
          <nuxt></nuxt>
        </main>
      </div>
    </div>
  </div>
</template>
<style lang="sass">
  @import '@/assets/sass/admin.sass'
</style>

