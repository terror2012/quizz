<template>
  <div class="home">
      <customnav></customnav>
      <v-content>
        <v-container>
          <layout row>
            <v-list>
              <v-list-item v-for="qui in quizzes" :key="qui._id" @click="goTo('/quiz?id='+qui._id)">
                <v-list-avatar><img :src="qui.image" width="64" height="64"></v-list-avatar>
                <v-list-title><h1>{{qui.name}}</h1></v-list-title>
              </v-list-item>
            </v-list>
          </layout>
        </v-container>
      </v-content>
  </div>
</template>

<script>

import customnav from '../components/navComp.vue'

import UserServices from '../services/UserServices.js'

export default {
  data() {
    return {
      quizzes: [],
    }
  },
  components: {
    customnav
  },
  methods: {
    goTo(path){
      this.$router.push(path)
    },
    getQuizzes() {
      UserServices.get_quizzes().then(result => {
        if(result.data.status == "success")
        {
          this.quizzes = result.data.message;
          console.log(this.quizzes)
        }
      }).catch(err=>{console.log(err)})
    },

  },
  mounted: function() {
    this.getQuizzes();
  }
}
</script>
