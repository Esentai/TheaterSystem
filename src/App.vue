<template>

<v-app>
  <v-navigation-drawer app>
    <Navigation/>
  </v-navigation-drawer>
  <v-app-bar app>
    <AppBar/>
  </v-app-bar>
  
  <v-main>
    <v-container fluid>
      <router-view></router-view>
    </v-container>
  </v-main>
</v-app>
</template>

<script>

import AppBar from './components/AppBar.vue';
import Navigation from './components/Navigation.vue';

export default {
  name: 'App',
  components:{
    Navigation,
    AppBar
  },
  data: () => ({
    //
  }),
};
</script>
