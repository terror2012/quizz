<template>
    
    <v-app id="categories">

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
        :items="categories"
        :loading="load"
        :no-data-text="noData"
        class="elevation-1"
        >

            <template v-slot:item="{item}">
                <tr>
                    <td class="text-center">{{item.name}}</td>
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
            <v-card-title class="grey lighten-4 py-4 title">Create category</v-card-title>
            <v-container grid-list-sm class="pa-4">
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-text-field
                        prepend-icon="mdi-form-textbox"
                        placeholder="Name"
                        v-model="name"
                        ></v-text-field>
                    </v-flex>
                </v-layout>
            </v-container>
            <v-card-actions>
                <v-btn text @click="create = false; reset_create_form()">Cancel</v-btn>
                <v-btn text @click="reset_create_form()">Reset</v-btn>
                <v-spacer></v-spacer>
                <v-btn text @click="create_category()">Create category</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <v-dialog v-model="edit" width="800px">
        <v-card>
            <v-card-title class="grey lighten-4 py-4 title">Edit category</v-card-title>
            <v-container grid-list-sm class="pa-4">
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-text-field
                        prepend-icon="mdi-form-textbox"
                        placeholder="Name"
                        v-model="e_name"
                        ></v-text-field>
                    </v-flex>
                </v-layout>
            </v-container>
            <v-card-actions>
                <v-btn text @click="create = false; reset_edit_form()">Cancel</v-btn>
                <v-btn text @click="reset_edit_form()">Reset</v-btn>
                <v-spacer></v-spacer>
                <v-btn text @click="edit_category()">Edit category</v-btn>
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
          <v-btn flat color="red" @click="delete_category()">Delete</v-btn>
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
            criteria: [
                {name: "Name", type: "text"}
            ],
            categoriesSearch: [],
            headers: [
                {
                    text: "Name",
                    align: "center",
                    sortable: true,
                    value: "name"
                },
                {
                    text: "Actions",
                    align: "center",
                    sortable: false,
                    value: "actions"
                }
            ],
            categories: [],
            load: true,
            noData: "No data available",
            create: false,
            delet: false,
            d_name: "",
            e_name: "",
            e_id: "",
            edit: false,
            delet: false,
            name: "",
            d_id: "",
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
        },
        reset_edit_form() {
            this.e_name = ""
            this.e_id = ""
        },
        openEditModal(item) {
            this.edit = true;
            this.e_name = item.name;
            this.e_id = item._id;
        },
        edit_category() {
            let data = new FormData();

            data.append("name", this.e_name)
            data.append("id", this.e_id)

            AdminServices.edit_category(data).then(result => {
                this.edit = false;
                this.reset_edit_form();
                if(result.data.status === "success")
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
        delete_category() {
          AdminServices.delete_category(this.d_id).then(result => {
              this.delet = false;
              this.d_name = "";
              this.d_id = "";
              if(result.data.status === "success")
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
        create_category() {
            AdminServices.create_category(this.name).then(result => {
                this.create = false;
                this.reset_create_form();
                if(result.data.status === "success")
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
        updateTable() {
            AdminServices.get_categories().then(result => {
                this.categories = [];
                this.load = false;
                if(result.data.status == "success")
                {
                    for (var i = 0; i < result.data.message.length; i++)
                    {
                        let _data = result.data.message[i]
                        this.categories.push({
                            _id: _data._id,
                            name: _data.name
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
                    this.noData = result.data.message
                }
            })
        },
        searchHandler(searchData) {
            if(this.categoriesSearch.length < 1)
            {
                this.categoriesSearch = this.categories
            }
            if(searchData.criteria == "Name")
            {
                this.categories = this.categoriesSearch.filter(
                    e => e.name?.toString().toLowerCase().search(searchData.text.toLowerCase()) >= 0
                )
            }
        }
    },
    components: {
        search
    },
    mounted: function() {
        this.updateTable();
    }
}
</script>