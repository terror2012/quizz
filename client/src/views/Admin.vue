<template>
    
    <v-app id="admin">

        <v-alert :value="alert.value" :type="alert.type" :dismissible="false">{{alert.text}}</v-alert>

    <v-content>

        <v-container align-content-end>

            <v-layout row>

                <v-flex xs3></v-flex>

                <v-flex xs9>
                    <search @search="searchHandler" :criteria="criteria"></search>
                </v-flex>

            </v-layout>

        <v-data-table
        :headers="headers"
        :items="quizzes"
        :loading="load"
        :no-data-text="noData"
        class="elevation-1"
        >

            <template v-slot:item="{item}">
                <tr>
                    <td class="text-center">{{item.name}}</td>
                    <td class="text-center"><img :src="item.image" width="128" height="128"></td>
                    <td class="text-center">{{(item.category) ? item.category.name : "Undefined"}}</td>
                    <td class="text-center">{{item.questCount}}</td>
                    <td class="text-center">
                    <v-btn text color="green" @click="goTo('/questions?id='+item._id)">View Questions</v-btn>
                    <v-btn text color="primary" @click="openEditModal(item)">Edit</v-btn>
                    <v-btn text color="red" @click="delet = true; d_name= item.name; d_id = item._id">Delete</v-btn>
                </td>
                </tr>
            </template>
            
        </v-data-table>
        </v-container>

    </v-content>
    <v-btn fab bottom right color="green" dark fixed @click="create = !create">
        <v-icon>add</v-icon>
    </v-btn>
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

        <v-dialog v-model="create" width="800px">
        <v-card>
            <v-card-title class="grey lighten-4 py-4 title">Create quizz</v-card-title>
            <v-container grid-list-sm class="pa-4">
                <v-layout row wrap>
                    <v-flex xs6>
                        <v-text-field
                        prepend-icon="mdi-form-textbox"
                        placeholder="Name"
                        v-model="name"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs6>
                        <textarea cols="40" v-model="description" placeholder="Description"></textarea>
                    </v-flex>
                    <v-flex xs6>
                        <input type="file" @change="uploadFile">
                    </v-flex>
                    <v-flex xs6>
                        <v-select
                        prepend-icon="category"
                        :items="categories"
                        label="Select category"
                        item-text="name"
                        v-model="category"
                        return-object
                        ></v-select>
                    </v-flex>
                </v-layout>
            </v-container>
            <v-card-actions>
                <v-btn text @click="create = false; reset_create_form()">Cancel</v-btn>
                <v-btn text @click="reset_create_form()">Reset</v-btn>
                <v-spacer></v-spacer>
                <v-btn text @click="create_quizz()">Create quizz</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>


    <v-dialog v-model="edit" width="800px">
        <v-card>
            <v-card-title class="grey lighten-4 py-4 title">Edit quizz</v-card-title>
            <v-container grid-list-sm class="pa-4">
                <v-layout row wrap>
                    <v-flex xs6>
                        <v-text-field
                        prepend-icon="mdi-form-textbox"
                        placeholder="Name"
                        v-model="e_name"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs6>
                        <textarea cols="40" v-model="e_description" placeholder="Description"></textarea>
                    </v-flex>
                    <v-flex xs6>
                        <input type="file" @change="e_uploadFile">
                    </v-flex>
                    <v-flex xs6>
                        <v-select
                        prepend-icon="category"
                        :items="categories"
                        label="Select category"
                        item-text="name"
                        v-model="e_category"
                        return-object
                        ></v-select>
                    </v-flex>
                </v-layout>
            </v-container>
            <v-card-actions>
                <v-btn text @click="edit = false; reset_edit_form()">Cancel</v-btn>
                <v-btn text @click="reset_edit_form()">Reset</v-btn>
                <v-spacer></v-spacer>
                <v-btn text @click="edit_quizz()">Edit quizz</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <v-dialog v-model="delet" width="50%">
      <v-card>
        <v-container>
          <p>Are you sure you want to delete: <b><span style="color: red">{{d_name}}</span></b></p>
        </v-container>
        <v-card-actions>
          <v-btn flat @click="delet = false; d_name=''; d_id = ''">Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-btn flat color="red" @click="delete_quizz()">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    </v-app>

</template>

<script>

import search from '@/components/search.vue'

import AdminServices from '@/services/AdminServices.js'

import UserServices from '@/services/UserServices.js'

export default {
    data() {
        return {
            alert: {},
            headers: [
                {
                    text: "Name",
                    align: "center",
                    sortable: true,
                    value: "name"
                },
                {
                    text: "Image",
                    align: "center",
                    sortable: false,
                    value: "image"
                },
                {
                    text: "Category",
                    align: "center",
                    sortable: true,
                    value: "category"
                },
                {
                    text: "Question Count",
                    align: "center",
                    sortable: true,
                    value: "questCount"
                },
                {
                    text: "Actions",
                    align: "center",
                    sortable: false,
                    value: "actions"
                }
            ],
            quizzes: [],
            load: true,
            noData: "No data available",
            create: false,
            delet: false,
            d_name: "",
            d_id: "",
            criteria: [
                {name: "Name", type: "text"},
                {name: "Category", type: "select", items: []}
            ],
            categories: [],
            quizzSearch: [],
            name: "",
            description: "",
            category: "",
            image: "",
            edit: false,
            e_id: "",
            e_name: "",
            e_description: "",
            e_image: "",
            e_category: ""
        }
    },
    methods: {
        goTo(path) {
            this.$router.push(path);
        },
        logout() {
            UserServices.logout().then(() => {
                this.$session.remove("user")
                this.$router.push("/login")
            })
        },
        reset_create_form() {
            this.name = ""
            this.description = ""
            this.image = ""
            this.category = ""
        },
        reset_edit_form() {
            this.e_name = ""
            this.e_description = ""
            this.e_image = ""
            this.e_category = ""  
        },
        uploadFile(event) {
            this.image = event.target.files[0];
        },
        e_uploadFile(event) {
            this.e_image = event.target.files[0];
        },
        openEditModal(item)
        {
            this.e_id = item._id
            this.e_name = item.name
            this.e_description = item.description
            this.e_category = item.category
            this.edit = true;
        },
        edit_quizz()
        {
            let data = new FormData();
            data.append("id", this.e_id)
            data.append("name", this.e_name);
            data.append("description", this.e_description);
            data.append("category", JSON.stringify(this.e_category))
            if(this.e_image) data.append("image", JSON.stringify(this.e_image))

            AdminServices.edit_quizz(data).then(result => {
                this.edit = false;
                this.reset_edit_form()
                if(result.data.status == "success")
                {
                    this.updateTable();
                    this.alert = {
                        value: true,
                        type: "success",
                        text: result.data.message
                    }
                }
                else
                {
                    this.alert = {
                        value: true,
                        type: "error",
                        text: result.data.message
                    }
                }
            })

        },
        create_quizz()
        {
            let data = new FormData();

            data.append("name", this.name)
            data.append("description", this.description)
            data.append("category", JSON.stringify(this.category))
            data.append("image", this.image)

            AdminServices.add_new_quiz(data).then(result => {
                this.create = false;
                this.reset_create_form();
                if(result.data.status == "success")
                {
                    this.updateTable();
                    this.alert = {
                        value: true,
                        type: "success",
                        text: result.data.message
                    }
                }
                else
                {
                    this.alert = {
                        value: true,
                        type: "error",
                        text: result.data.message
                    }
                }
            })
        },
        delete_quizz()
        {
            AdminServices.delete_quiz(this.d_id).then(result => {
                
                this.delet = false;
                this.d_id = "";
                this.d_name = "";
                
                if(result.data.status == "success")
                {
                    this.updateTable();
                    this.alert = {
                        value: true,
                        type: "success",
                        text: result.data.message
                    }
                }
                else
                {
                    this.alert = {
                        value: true,
                        type: "error",
                        text: result.data.message
                    }
                }
            })
        },
        get_categories(){
            AdminServices.get_categories().then(result => {
                if(result.data.status == "success")
                {
                    this.categories = [];
                    for (var i = 0; i < result.data.message.length; i++)
                    {
                        let _data = result.data.message[i]
                        this.categories.push({
                            _id: _data._id,
                            name: _data.name
                        })
                    }
                }
            })
        },
        updateTable()
        {
            AdminServices.get_all_quizzes().then(result => {
                this.load = false;
                if(result.data.status === "success")
                {
                    this.quizzes = []
                    for (var i = 0; i < result.data.message.length; i++)
                    {
                        let _data = result.data.message[i]
                        this.quizzes.push({
                            _id: _data._id,
                            name: _data.name,
                            description: _data.description,
                            category: _data.category,
                            image: _data.image,
                            questions: _data.questions,
                            questCount: _data.questions.length,
                        })
                        this.criteria.find(e => e.name == "Category").items = Array.from(new Set(this.quizzes.map(q => q.category.name)))
                    }
                }
                else if(result.data.status == "redirect")
                {
                    this.$session.remove("user")
                    this.$router.push(result.data.message) 
                }
                else
                {
                    this.quizzes = [];
                    this.noData = result.data.message
                }
            })

        },
        searchHandler(searchData) {
            if(this.quizzSearch.length < 1)
            {
                this.quizzSearch = this.quizzes
            }
            if(searchData.criteria == "Name")
            {
                this.quizzes = this.quizzSearch.filter(
                    e => e.name?.toString().search(searchData.text) >= 0
                )
            }
            if(searchData.criteria == "Category")
            {
                this.quizzes = this.quizzSearch.filter(
                    e => e.category?.name.toString().search(searchData.text) >= 0
                )
            }
        },
    },
    components: {
        search
    },
    mounted: function() {
        this.updateTable();
        this.get_categories();
    }
}
</script>