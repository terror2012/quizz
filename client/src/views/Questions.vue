<template>
    <v-app id="questions">

        <v-content>

            <v-container align-content-middle>

                <v-layout row>
                        <v-flex xs12>
                        <v-text-field v-model="questions[0].name" label="Question Name"></v-text-field>
                    </v-flex>
                    <v-flex xs3>
                        <v-text-field v-model="questions[0]['answers'][0].answer" label="Answer 1"></v-text-field>
                    </v-flex>
                    <v-flex xs3>
                        <v-select :items="solutions" label="Solution" item-text="name" item-value="_id"  v-model="questions[0]['answers'][0].solution"></v-select>
                    </v-flex>
                                        <v-flex xs3>
                        <v-text-field v-model="questions[0]['answers'][1].answer" label="Answer 2"></v-text-field>
                    </v-flex>
                    <v-flex xs3>
                        <v-select :items="solutions" label="Solution" item-text="name" item-value="_id"  v-model="questions[0]['answers'][1].solution"></v-select>
                    </v-flex>
                                        <v-flex xs3>
                        <v-text-field v-model="questions[0]['answers'][2].answer" label="Answer 3"></v-text-field>
                    </v-flex>
                    <v-flex xs3>
                        <v-select :items="solutions" label="Solution" item-text="name" item-value="_id"  v-model="questions[0]['answers'][2].solution"></v-select>
                    </v-flex>
                                        <v-flex xs3>
                        <v-text-field v-model="questions[0]['answers'][3].answer" label="Answer 4"></v-text-field>
                    </v-flex>
                    <v-flex xs3>
                        <v-select :items="solutions" label="Solution" item-text="name" item-value="_id"  v-model="questions[0]['answers'][3].solution"></v-select>
                    </v-flex>


                                            <v-flex xs12>
                        <v-text-field v-model="questions[1].name" label="Question Name"></v-text-field>
                    </v-flex>
                    <v-flex xs3>
                        <v-text-field v-model="questions[1]['answers'][0].answer" label="Answer 1"></v-text-field>
                    </v-flex>
                    <v-flex xs3>
                        <v-select :items="solutions" label="Solution" item-text="name" item-value="_id"  v-model="questions[1]['answers'][0].solution"></v-select>
                    </v-flex>
                                        <v-flex xs3>
                        <v-text-field v-model="questions[1]['answers'][1].answer" label="Answer 2"></v-text-field>
                    </v-flex>
                    <v-flex xs3>
                        <v-select :items="solutions" label="Solution" item-text="name" item-value="_id"  v-model="questions[1]['answers'][1].solution"></v-select>
                    </v-flex>
                                        <v-flex xs3>
                        <v-text-field v-model="questions[1]['answers'][2].answer" label="Answer 3"></v-text-field>
                    </v-flex>
                    <v-flex xs3>
                        <v-select :items="solutions" label="Solution" item-text="name" item-value="_id"  v-model="questions[1]['answers'][2].solution"></v-select>
                    </v-flex>
                                        <v-flex xs3>
                        <v-text-field v-model="questions[1]['answers'][3].answer" label="Answer 4"></v-text-field>
                    </v-flex>
                    <v-flex xs3>
                        <v-select :items="solutions" label="Solution" item-text="name" item-value="_id"  v-model="questions[1]['answers'][3].solution"></v-select>
                    </v-flex>


                                            <v-flex xs12>
                        <v-text-field v-model="questions[2].name" label="Question Name"></v-text-field>
                    </v-flex>
                    <v-flex xs3>
                        <v-text-field v-model="questions[2]['answers'][0].answer" label="Answer 1"></v-text-field>
                    </v-flex>
                    <v-flex xs3>
                        <v-select :items="solutions" label="Solution" item-text="name" item-value="_id"  v-model="questions[2]['answers'][0].solution"></v-select>
                    </v-flex>
                                        <v-flex xs3>
                        <v-text-field v-model="questions[2]['answers'][1].answer" label="Answer 2"></v-text-field>
                    </v-flex>
                    <v-flex xs3>
                        <v-select :items="solutions" label="Solution" item-text="name" item-value="_id"  v-model="questions[2]['answers'][1].solution"></v-select>
                    </v-flex>
                                        <v-flex xs3>
                        <v-text-field v-model="questions[2]['answers'][2].answer" label="Answer 3"></v-text-field>
                    </v-flex>
                    <v-flex xs3>
                        <v-select :items="solutions" label="Solution" item-text="name" item-value="_id"  v-model="questions[2]['answers'][2].solution"></v-select>
                    </v-flex>
                                        <v-flex xs3>
                        <v-text-field v-model="questions[2]['answers'][3].answer" label="Answer 4"></v-text-field>
                    </v-flex>
                    <v-flex xs3>
                        <v-select :items="solutions" label="Solution" item-text="name" item-value="_id"  v-model="questions[2]['answers'][3].solution"></v-select>
                    </v-flex>


                                            <v-flex xs12>
                        <v-text-field v-model="questions[3].name" label="Question Name"></v-text-field>
                    </v-flex>
                    <v-flex xs3>
                        <v-text-field v-model="questions[3]['answers'][0].answer" label="Answer 1"></v-text-field>
                    </v-flex>
                    <v-flex xs3>
                        <v-select :items="solutions" label="Solution" item-text="name" item-value="_id"  v-model="questions[3]['answers'][0].solution"></v-select>
                    </v-flex>
                                        <v-flex xs3>
                        <v-text-field v-model="questions[3]['answers'][1].answer" label="Answer 2"></v-text-field>
                    </v-flex>
                    <v-flex xs3>
                        <v-select :items="solutions" label="Solution" item-text="name" item-value="_id"  v-model="questions[3]['answers'][1].solution"></v-select>
                    </v-flex>
                                        <v-flex xs3>
                        <v-text-field v-model="questions[3]['answers'][2].answer" label="Answer 3"></v-text-field>
                    </v-flex>
                    <v-flex xs3>
                        <v-select :items="solutions" label="Solution" item-text="name" item-value="_id"  v-model="questions[3]['answers'][2].solution"></v-select>
                    </v-flex>
                                        <v-flex xs3>
                        <v-text-field v-model="questions[3]['answers'][3].answer" label="Answer 4"></v-text-field>
                    </v-flex>
                    <v-flex xs3>
                        <v-select :items="solutions" label="Solution" item-text="name" item-value="_id"  v-model="questions[3]['answers'][3].solution"></v-select>
                    </v-flex>



                                            <v-flex xs12>
                        <v-text-field v-model="questions[4].name" label="Question Name"></v-text-field>
                    </v-flex>
                    <v-flex xs3>
                        <v-text-field v-model="questions[4]['answers'][0].answer" label="Answer 1"></v-text-field>
                    </v-flex>
                    <v-flex xs3>
                        <v-select :items="solutions" label="Solution" item-text="name" item-value="_id"  v-model="questions[4]['answers'][0].solution"></v-select>
                    </v-flex>
                                        <v-flex xs3>
                        <v-text-field v-model="questions[4]['answers'][1].answer" label="Answer 2"></v-text-field>
                    </v-flex>
                    <v-flex xs3>
                        <v-select :items="solutions" label="Solution" item-text="name" item-value="_id"  v-model="questions[4]['answers'][1].solution"></v-select>
                    </v-flex>
                                        <v-flex xs3>
                        <v-text-field v-model="questions[4]['answers'][2].answer" label="Answer 3"></v-text-field>
                    </v-flex>
                    <v-flex xs3>
                        <v-select :items="solutions" label="Solution" item-text="name" item-value="_id"  v-model="questions[4]['answers'][2].solution"></v-select>
                    </v-flex>
                                        <v-flex xs3>
                        <v-text-field v-model="questions[4]['answers'][3].answer" label="Answer 4"></v-text-field>
                    </v-flex>
                    <v-flex xs3>
                        <v-select :items="solutions" label="Solution" item-text="name" item-value="_id"  v-model="questions[4]['answers'][3].solution"></v-select>
                    </v-flex>


                                            <v-flex xs12>
                        <v-text-field v-model="questions[5].name" label="Question Name"></v-text-field>
                    </v-flex>
                    <v-flex xs3>
                        <v-text-field v-model="questions[5]['answers'][0].answer" label="Answer 1"></v-text-field>
                    </v-flex>
                    <v-flex xs3>
                        <v-select :items="solutions" label="Solution" item-text="name" item-value="_id"  v-model="questions[5]['answers'][0].solution"></v-select>
                    </v-flex>
                                        <v-flex xs3>
                        <v-text-field v-model="questions[5]['answers'][1].answer" label="Answer 2"></v-text-field>
                    </v-flex>
                    <v-flex xs3>
                        <v-select :items="solutions" label="Solution" item-text="name" item-value="_id"  v-model="questions[5]['answers'][1].solution"></v-select>
                    </v-flex>
                                        <v-flex xs3>
                        <v-text-field v-model="questions[5]['answers'][2].answer" label="Answer 3"></v-text-field>
                    </v-flex>
                    <v-flex xs3>
                        <v-select :items="solutions" label="Solution" item-text="name" item-value="_id"  v-model="questions[5]['answers'][2].solution"></v-select>
                    </v-flex>
                                        <v-flex xs3>
                        <v-text-field v-model="questions[5]['answers'][3].answer" label="Answer 4"></v-text-field>
                    </v-flex>
                    <v-flex xs3>
                        <v-select :items="solutions" label="Solution" item-text="name" item-value="_id" v-model="questions[5  ]['answers'][3].solution"></v-select>
                    </v-flex>

                    <br><br>
                    <v-btn flat color="green" @click="saveQuestions()">Save Questions</v-btn>
                </v-layout>

            </v-container>

        </v-content>
    <v-menu open-on-hover top offset-y transition="slide-y-transition">
        <template v-slot:activator="{on, attrs}">
            <v-btn fab bottom left color="red" dark fixed v-bind="attrs" v-on="on">
                <v-icon>menu</v-icon>
            </v-btn>
        </template>
        <v-list>
            <v-list-item @click="goTo('/categories')">
                <v-list-item-title>Categories</v-list-item-title>
            </v-list-item>
            <v-list-item @click="goTo('/solutions')">
                <v-list-item-title>Solutions</v-list-item-title>
            </v-list-item>
            <v-list-item @click="logout()">
                <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>

    </v-app>
</template>

<script>

import AdminServices from '@/services/AdminServices.js'

export default {
    data() {
        return {
            quiz: {},
            questions: [],
            solutions: []
        }
    },
    methods: {
        getQuiz() {
            console.log(this.$route.query.id)
            AdminServices.get_questions(this.$route.query.id).then(result => {
                if(result.data.status == 'success')
                {
                    this.quiz = result.data.message
                }
                else
                {
                    this.$router.push('/admin')
                }
            })
        },
        saveQuestions() {
            AdminServices.update_questions(this.$route.query.id, JSON.stringify(this.questions)).then(result => {
                this.$router.push('/admin')
            })
        },     
        getSolutions() {
            AdminServices.get_solutions().then(result => {
                this.solutions = []
                if(result.data.status == "success")
                {
                    this.solutions = result.data.message
                }
            })
        },
        goTo(path) {
            this.$router.push(path);
        },
        staticContentInjection() {
            for (var i = 0; i < 6; i++)
            {
                this.questions[i] = {}
                this.questions[i]["answers"] = []
                for (var j = 0; j < 4; j++)
                {
                    this.questions[i]["answers"][j] = {}
                }
            }
        },
        logout() {
            UserServices.logout().then(() => {
                this.$session.remove("user")
                this.$router.push("/login")
            })
        },
    },
    created: function() {
        this.getQuiz()
        this.getSolutions()
        this.staticContentInjection()
    }
}
</script>