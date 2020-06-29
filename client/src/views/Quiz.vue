<template>
    <div class="quiz">
        <customnav></customnav>
        <v-content>
            <v-container>
                <v-layout row v-if="!finalResult">
                    <v-flex xs3></v-flex>
                <v-flex xs6>
                    <h1 class="text-center">{{quiz.questions[currentQuestion].name}}</h1>
                </v-flex>
                <v-flex xs6>
                        <v-btn @click="advanceQuiz(0)">{{quiz.questions[currentQuestion]["answers"][0].answer}}</v-btn>
                    </v-flex>
                    <v-flex xs6>
                        <v-btn  @click="advanceQuiz(1)">{{quiz.questions[currentQuestion]["answers"][1].answer}}</v-btn>
                    </v-flex>
                    <v-flex xs6>
                        <v-btn  @click="advanceQuiz(2)">{{quiz.questions[currentQuestion]["answers"][2].answer}}</v-btn>
                    </v-flex>
                    <v-flex xs6>
                        <v-btn  @click="advanceQuiz(3)">{{quiz.questions[currentQuestion]["answers"][3].answer}}</v-btn>
                    </v-flex>
                </v-layout>
                <v-layout row v-else>
                    <v-flex xs6></v-flex>
                    <v-flex xs6>
                        <h1>{{finalSolution.name}}</h1><br>
                        <img :src="finalSolution.image" width="128" height="128">
                        <br>
                        <p>{{finalSolution.description}}</p>
                    </v-flex>
                </v-layout>
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
            quiz: {},
            currentQuestion: 0,
            solutions: [],
            finalCount: {},
            finalResult:false,
            finalSolution: {}
        }
    },
    components: {
        customnav
    },
    methods: {
        getQuiz() {
            UserServices.get_quiz(this.$route.query.id).then(result => {
                if(result.data.status == 'success')
                {
                    this.quiz = result.data.message
                }
            })
        },
        advanceQuiz(answer) {
            console.log(this.quiz.questions[5].name)
            if(!this.finalCount[this.quiz.questions[this.currentQuestion]["answers"][answer].solution]) this.finalCount[this.quiz.questions[this.currentQuestion]["answers"][answer].solution] = 0
            this.finalCount[this.quiz.questions[this.currentQuestion]["answers"][answer].solution] += 1
            console.log(this.currentQuestion == this.quiz.questions.length -1)
            if(this.currentQuestion == this.quiz.questions.length - 1)
            {
                this.showFinalResult();
                return;
            }
            else
            {
                this.currentQuestion += 1
            }
        },
        showFinalResult() {
            this.finalResult = true;
            let idCount = Object.values(this.finalCount).sort((a, b) => b-a)
            let id = Object.keys(this.finalCount).find(key => this.finalCount[key] == idCount)
            this.finalSolution = this.solutions.find(s => s._id == id)            
        },
        get_solutions() {
        UserServices.get_solutions().then(result => {
        this.solutions = []
        if(result.data.status == "success")
        {
          this.solutions = result.data.message
        }
      })
    }
    },
    mounted: function() {
        this.getQuiz()
        this.get_solutions()
    }
}
</script>