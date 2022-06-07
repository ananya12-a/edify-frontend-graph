<template>
  <v-container class="ma-0">
    <v-row class="ma-2">
      <v-icon size="x-large" class="ma-1 my-2">mdi-flash</v-icon>
      <h1 class="font-weight-bold white--text">Electronics</h1>
    </v-row>
    <v-row height="30px">
      <v-col sm="6" xs="12" md="3" lg="3" xl="2" v-for="course in electronicsCourseList" v-bind:key="course.title">
        <courseModal :courseTitle="course.title" :imageName="course.image" :instructorList="course.instructors"/>
      </v-col>
    </v-row>
    <v-row class="ma-0 ml-2">
      <v-icon size="x-large" class="ma-1 my-2">mdi-cog</v-icon>
      <h1 class="font-weight-bold white--text">Hardware</h1>
    </v-row>
    <v-row height="30px">
      <v-col sm="6" xs="12" md="3" lg="3" xl="2" v-for="course in hardwareCourseList" :key="course.title">
        <courseModal :courseTitle="course.title" :imageName="course.image" :instructorList="course.instructors"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

// Components
import courseModal from '../components/courseModal.vue'

export default defineComponent({
  name: 'HomeView',

  components: {
    courseModal
  },
  data () {
    return {
      electronicsCourseList: [
        { title: 'Breadboard PC', image: 'computer.png', instructors: ['A.png', 'B.png', 'C.png', 'D.png'] },
        { title: 'Car Battery spot welder', image: 'spotwelder.png', instructors: ['A.png', 'B.png', 'C.png', 'D.png'] }
      ],
      hardwareCourseList: [
        { title: 'Homemade forge', image: 'forging.png', instructors: ['A.png', 'B.png', 'C.png', 'D.png'] },
        { title: 'DIY toolbox', image: 'toolbox.png', instructors: ['A.png', 'B.png', 'C.png', 'D.png'] }
      ]
    }
  }
})
</script>
