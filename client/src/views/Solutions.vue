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
        :items="solutions"
        :loading="load"
        :no-data-text="noData"
        class="elevation-1"
        >

            <template v-slot:item="{item}">
                <tr>
                    <td class="text-center">{{item.name}}</td>
                    <td class="text-center"><img :src="item.image" width="128" height="128"></td>
                    <td class="text-center">{{item.description}}</td>
                    <td class="text-center">
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
            <v-list-item @click="goTo('/admin')">
                <v-list-item-title>Quizzes</v-list-item-title>
            </v-list-item>
            <v-list-item @click="goTo('/categories')">
                <v-list-item-title>Categories</v-list-item-title>
            </v-list-item>
            <v-list-item @click="logout()">
                <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>

        <v-dialog v-model="create" width="800px">
        <v-card>
            <v-card-title class="grey lighten-4 py-4 title">Create solution</v-card-title>
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
                        <input type="file" @change="uploadFile">
                    </v-flex>
                    <v-flex xs12>
                        <textarea cols="70" v-model="description" placeholder="Description"></textarea>
                    </v-flex>
                </v-layout>
            </v-container>
            <v-card-actions>
                <v-btn text @click="create = false; reset_create_form()">Cancel</v-btn>
                <v-btn text @click="reset_create_form()">Reset</v-btn>
                <v-spacer></v-spacer>
                <v-btn text @click="create_solution()">Create solution</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>


    <v-dialog v-model="edit" width="800px">
        <v-card>
            <v-card-title class="grey lighten-4 py-4 title">Edit solution</v-card-title>
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
                        <input type="file" @change="e_uploadFile">
                    </v-flex>
                    <v-flex xs12>
                        <textarea cols="70" v-model="e_description" placeholder="Description"></textarea>
                    </v-flex>
                </v-layout>
            </v-container>
            <v-card-actions>
                <v-btn text @click="edit = false; reset_edit_form()">Cancel</v-btn>
                <v-btn text @click="reset_edit_form()">Reset</v-btn>
                <v-spacer></v-spacer>
                <v-btn text @click="edit_solution()">Edit solution</v-btn>
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
          <v-btn flat color="red" @click="delete_solution()">Delete</v-btn>
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
                    text: "Description",
                    align: "center",
                    sortable: false,
                    value: "description"
                },
            ],
            solutions: [],
            load: true,
            noData: "No data available",
            create: false,
            delet: false,
            d_name: "",
            d_id: "",
            criteria: [
                {name: "Name", type: "text"},
            ],
            solutionSearch: [],
            name: "",
            description: "",
            image: "",
            edit: false,
            e_id: "",
            e_name: "",
            e_description: "",
            e_image: "",
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
        },
        reset_edit_form() {
            this.e_name = ""
            this.e_description = ""
            this.e_image = ""
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
            this.edit = true;
        },
        edit_solution()
        {
            let data = new FormData();
            data.append("id", this.e_id)
            data.append("name", this.e_name);
            data.append("description", this.e_description);
            if(this.e_image) data.append("image", JSON.stringify(this.e_image))

            AdminServices.edit_solution(data).then(result => {
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
        create_solution()
        {
            let data = new FormData();

            data.append("name", this.name)
            data.append("description", this.description)
            data.append("image", this.image)

            AdminServices.create_solution(data).then(result => {
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
        delete_solution()
        {
            AdminServices.delete_solution(this.d_id).then(result => {
                
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
        updateTable()
        {
            AdminServices.get_solutions().then(result => {
                this.load = false;
                if(result.data.status === "success")
                {
                    this.solutions = []
                    for (var i = 0; i < result.data.message.length; i++)
                    {
                        let _data = result.data.message[i]
                        this.solutions.push({
                            _id: _data._id,
                            name: _data.name,
                            description: _data.description,
                            image: _data.image,
                        })
                    }
                }
                else if(result.data.status == "redirect")
                {
                    this.$session.remove("user")
                    this.$router.push(result.data.message) 
                }
                else
                {
                    this.solutions = [];
                    this.noData = result.data.message
                }
            })

        },
        searchHandler(searchData) {
            if(this.solutionSearch.length < 1)
            {
                this.solutionSearch = this.solutions
            }
            if(searchData.criteria == "Name")
            {
                this.solutions = this.solutionSearch.filter(
                    e => e.name?.toString().search(searchData.text) >= 0
                )
            }
        },
    },
    components: {
        search
    },
    mounted: function() {
        this.updateTable();
    }
}
</script>