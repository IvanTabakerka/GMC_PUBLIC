<template>
    <div class="navigate bs" :class="{'active animate__animated animate__fadeInLeft':$store.state.nav.navigateOpen, 'animate__animated animate__fadeOutLeft':$store.state.nav.navigateCloseAnimation}">
      <router-link to="/" class="logo">
        Good<span>Minecraft</span>
      </router-link>
      <div class="navigate_wrapper">
        <nav itemscope="" itemtype="http://schema.org/SiteNavigationElement">
            <ul class="navigate_parent" itemprop="about" itemscope="" itemtype="http://schema.org/ItemList">
                <li v-for="parent in getStructure" :key="parent.name" itemprop="itemListElement" itemscope="" itemtype="http://schema.org/ItemList">
                    <meta itemprop="name" :content="parent.name"/>
                    <router-link :to="parent.url" itemprop="url" class="navigate_parent_item" v-if="!parent.targetBlank">{{parent.name}}</router-link>
                    <a :href="parent.url" itemprop="url" target="_blank" class="navigate_parent_item" v-if="parent.targetBlank">{{parent.name}}</a>
                    <ul v-if="parent.child" :key="parent.name + '2'" class="navigate_child" itemprop="itemListElement" itemscope="" itemtype="http://schema.org/ItemList">
                        <li v-for="child in parent.child" :key="child.name" itemprop="itemListElement" itemscope="" itemtype="http://schema.org/ItemList">
                            <router-link :to="child.url" itemprop="url" class="navigate_child_item" v-if="!child.targetBlank">{{child.name}}</router-link>
                            <a :href="child.url" itemprop="url" target="_blank" class="navigate_child_item" v-if="child.targetBlank">{{child.name}}</a>
                            <meta itemprop="name" :content="child.name"/>
                        </li>
                    </ul>
                </li>
                <router-link to="/admin/" itemprop="url" class="navigate_parent_item" v-if="$auth.loggedIn && $store.getters['perm/checkPerm']('adminpanel', $auth.user)">Админпанель</router-link>
            </ul>
        </nav>
      </div>
      <div class="navigate_foot">
        <div class="navigate_soc">
          <a href="https://discord.com/invite/h5VuaW5" class="discord" target="_blank">
            <img src="@/static/icons/discord.svg">
          </a>
          <a href="https://vk.com/good_minecaft" class="vk" target="_blank">
            <img src="@/static/icons/vk.svg">
          </a>
        </div>
        <p class="navigate_devel">
          <router-link to="/gymmc/">
            <span>GYM<span class="bold">MC</span></span>
          </router-link>
          <span>2015-{{yearNow}}</span>
        </p>
        <p class="navigate_devel text_small">
          <span>Версия сайта</span>
          <span>v.{{$store.state.core.version}}</span>
        </p>
      </div>
    </div>
</template>

<script>
export default {
    computed: {
        getStructure () {
            return this.$store.state.nav.structure.filter (parent => {
                if (parent.auth) {
                    if (this.$auth.loggedIn) {
                        return parent;
                    } else {
                        return null;
                    }
                } else {
                    return parent;
                }
            })
        },
        yearNow () {
          const date = new Date();
          return date.getFullYear();
        }
    },
};
</script>
