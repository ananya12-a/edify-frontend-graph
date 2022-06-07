<template>
<div>
  <!--<v-card>
        <v-card-text>
            <v-progress-circular
            color=purple-dark
            bg-color=cream
            size=300
            model-value=40
            width=35
            >
            <img v-bind:src="require('../assets/cardPrev/'+ imageName)" height="250"/>
            </v-progress-circular>
        </v-card-text>
      </v-card>-->
    <v-row justify="center">
    <v-card max-width="60%" class="modal">
        <v-card-text>
          <v-row>
            <v-col cols="4" class="justify-center" align="center">
              <div>
                <v-progress-circular
                color=purple-dark
                bg-color=cream
                size=250
                model-value=40
                width=30 @click="dialog = true"
                >
                    <img v-bind:src="require('../assets/cardPrev/'+ imageName)" height="200" @click="dialog = true"/>
                </v-progress-circular>
              </div>
              <v-btn color="purple-light" style="font-family:Montserrat; color:black" class="text-capitalize font-weight-bold pa-5 ma-4 black--text">Enroll</v-btn>
            </v-col>
            <v-col cols="8" class="justify-right pl-6">
              <v-row>
                <v-spacer></v-spacer>
                <div class="info px-1 ma-7 mt-16" style="width:310px;border-radius:2px">
                  <v-alert
                    color="purple-dark" class="text-capitalize font-weight-bold pa-2 mb-0 text-right" style="font-family: Space Mono, monospace; font-size:18px"
                    >
                    <p style="color:black">
                    {{courseTitle}}
                    </p>
                </v-alert>
                </div>
              </v-row>
              <v-row>
                <h2 class="text-heading1 font-weight-regular" style="font-family:Montserrat">Over 12 modules, you’ll explore the field of electronics by learning and building your own logic gates, circuits, and eventually building your own breadboard computer from scratch</h2>
              </v-row>
              <v-row class="justify-end mt-16 mr-6">
                <h2 style="font-family:Space Mono, monospace">INSTRUCTORS</h2>
              </v-row>
              <v-row class="justify-end ml-16 pr-6 mt-2">
                <v-col v-for="instructor in instructorList" :key="instructor" cols="2">
                  <v-img v-bind:src="require('../assets/instructors/'+ instructor)" max-width="50" style="border-radius:100px" class="ma-0 pa-0"/>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card-text>
        <!--<v-card-actions>
          <v-btn color="accent" style="font-family:Montserrat" class="text-capitalize font-weight-bold pa-5 ml-16">Enroll</v-btn>
        </v-card-actions>-->
      </v-card>
    </v-row>
    <v-dialog
      v-model="dialog"
    >
      <fieldBreakupModal :piecharts="piecharts"/>
    </v-dialog>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import fieldBreakupModal from './fieldBreakupModal.vue'

export default defineComponent({
  components: {
    fieldBreakupModal
  },
  props: {
    imageName: String,
    courseTitle: String,
    instructorList: Array
  },
  data () {
    return {
      dialog: false,
      piecharts: [
        { color: 'piechart-red', value: '50' },
        { color: 'green', value: '62.5' },
        { color: 'piechart-purple', value: '25' },
        { color: 'piechart-blue', value: '75' },
        { color: 'ochar', value: '87.5' }
      ]
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