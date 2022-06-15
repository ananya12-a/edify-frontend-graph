<template>
  <v-app>
    <h1>HEllo</h1>
    <v-card>
      <v-layout>
        <v-navigation-drawer
          v-model="drawer"
          :rail="rail"
          permanent
          @click="rail = false"
        >
          <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
            title="Beta User"
          >
            <template v-slot:append>
              <v-btn
                variant="text"
                icon="mdi-chevron-left"
                @click.stop="rail = !rail"
              ></v-btn>
            </template>
          </v-list-item>

          <v-divider></v-divider>

          <v-list density="compact" nav>
            <v-list-item v-for="item in items" v-bind:key="item.title" :prepend-icon="item.icon" :title="item.title" :value="item.value"></v-list-item>
          </v-list>
        </v-navigation-drawer>
        <v-main>
          <router-view/>
        </v-main>
      </v-layout>
    </v-card>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',

  components: {
  },

  data () {
    return {
      //
    }
  },
})
</script>
