<template>
  <div id="app">
    <networkGraph sheetName="Electronics Track" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import networkGraph from "@/components/networkGraph.vue";

export default defineComponent({
  name: 'App',

  components: {
    networkGraph
  },

  data () {
    return {
      //
    }
  },
})
</script>

<style>
body{
  background-color: #212121
}
</style>