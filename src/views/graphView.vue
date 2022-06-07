<template>
    <networkGraph sheetName="Electronics Track"/>
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
