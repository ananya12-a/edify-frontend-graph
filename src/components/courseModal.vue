<template>
    <v-dialog
    v-model="dialog"
    >
    <template v-slot:activator="{ props }">
        <v-card color="transparent" class="card ma-3 pb-n12" v-bind="props">
          <v-img
          height="300"
          v-bind:src="require('../assets/cardPrev/'+ imageName)"
          class="text-white previewImage ma-2"
        />
        <div class="justify-center">
            <v-alert
            color="red" class="d-inline-flex text-capitalize font-weight-bold pa-2 mb-7" style="font-family: Space Mono, monospace"
            >
            {{courseTitle}}
            </v-alert>
        </div>
        <!--<img :alt="imageName" :src="require(`@/assets/cardPrev/${imageName}.png`)" id="previewImage">-->
      </v-card>
    </template>
      <courseDetailsModal :imageName="imageName" :courseTitle="courseTitle" :instructorList="instructorList"/>
</v-dialog>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import courseDetailsModal from './courseDetailsModal.vue'

export default defineComponent({
  name: 'courseModal',
  components: {
    courseDetailsModal
  },
  props: {
    courseTitle: String,
    imageName: String,
    instructorList: String
  },
  data () {
    return {
      dialog: false
    }
  }
})
</script>

<style scoped>
.previewImage{
    height:200px;
    border-radius: 50px !important;
}
.modal {
  box-shadow: 0px 0px 35px #4D7EA8 !important;
  border-radius:100px !important;
}
.card{
    border: 1px solid #4d7ea8 !important;
    border-radius: 50px !important;
    box-shadow: 2px 2px 7px #4d7ea8 !important;
}
.v-alert {
  left: 50%;
  transform: translate(-50%, 0);
  box-shadow: 2px 2px 7px #4d7ea8 !important;
}

</style>