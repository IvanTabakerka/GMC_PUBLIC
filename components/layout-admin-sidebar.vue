<template>
  <div class="navigate bs admin" :class="{'active animate__animated animate__fadeInLeft':$store.state.nav.navigateOpen, 'animate__animated animate__fadeOutLeft':$store.state.nav.navigateCloseAnimation}">
    <router-link to="/" class="logo">
      Good<span>Minecraft</span>
    </router-link>
    <div class="navigate_wrapper">
      <ul class="navigate_list">
        <li class="category" v-for="cat in $store.state.nav.adminStructure">
          <p>
            <router-link :to="cat.url">{{cat.name}}</router-link>
          </p>
          <ul v-if="cat.child">
            <li class="link" v-for="item in cat.child">
              <router-link :to="item.url">{{item.name}}</router-link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
