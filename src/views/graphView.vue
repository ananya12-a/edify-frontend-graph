<template>
  <div>
      <h1>HELLO</h1>
      <networkGraph sheetName="Electronics Track"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import networkGraph from '../components/networkGraph.vue'
export default defineComponent({
  components: {
    networkGraph
  }
})
</script>
