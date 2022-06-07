<template>
  <!--make frame 9-->
  <v-row justify="center">
  <v-card max-width="60%" class="modal">
    <v-card-text>
        <v-row class="justify-center">
        <v-col cols="4" v-for="piechart in piecharts" :key="piechart.color">
          <v-progress-circular
                :color='piechart.color'
                bg-color=cream
                size=250
                :model-value='piechart.value'
                width=30
            >
            <h4 style="color:white; font-family:Montserrat" class="font-weight-bold text-center">{{piechart.value}}% <br> Computer Architecture</h4>
          </v-progress-circular>
        </v-col>
      </v-row>
    </v-card-text>
    </v-card>
  </v-row>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'fieldBreakupModal',
  props: {
    piecharts: Array
  },
  data () {
    return {
    }
  }
})
</script>

<style scoped>
.modal{
  box-shadow: 0px 0px 35px #4D7EA8 !important;
  border-radius:100px !important;
}
</style>
