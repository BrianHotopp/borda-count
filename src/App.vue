<template>
  <div id="app">
    <router-view></router-view>
    
  </div>
</template>

<script lang="ts">
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

import { firestorePlugin } from 'vuefire'

Vue.use(firestorePlugin)

import { Component, Vue } from "vue-property-decorator";


export default class App extends Vue {
  
    
  
}

</script>
<style>

</style>

