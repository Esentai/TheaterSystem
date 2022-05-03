<template>
<v-card
    height="100vh"
    width="256"
    class="mx-auto"
  >
    <v-navigation-drawer permanent>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Admin panel
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="item.route"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>

export default {
    
    data: () => ({
        items:[
            {
                title: "Постановки",
                icon:'mdi-theater',
                route:'/'
            },
            {
                title: "Создать постановку",
                icon:'mdi-drama-masks',
                route: '/staging'
            },
            {
                title:'Актеры',
                icon:'mdi-account-box-multiple',
                route:'/actors'
            },
            {
                title:'Роли',
                icon: 'mdi-card-account-details',
                route:'/roles'
            },
        ]
    })
}
</script>

<style>

</style>