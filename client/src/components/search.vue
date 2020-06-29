<template>
    <v-layout row>
        <v-flex xs3>
            <v-select :items="criteria" label="Selecteaza criteria" v-model="search_criteria" item-text="name" return-object></v-select>
        </v-flex>
        <v-flex xs6>
            <v-text-field v-if="search_criteria.type == 'text'" label="Textul cautat" v-model.lazy="search_text"></v-text-field>
            <v-select v-if="search_criteria.type == 'select'" label="Selecteaza textul cautat" v-model.lazy="search_text" :items="search_criteria.items"></v-select>
            <v-menu
                ref="date_start_menu"
                v-model="date_menu"
                :close-on-content-click="true"
                :nudge-right="40"
                :return-value.sync="date"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                <v-text-field
                  v-if="search_criteria.type == 'date'"
                  slot="activator"
                  v-model="search_text"
                  label="Data"
                  prepend-icon="event"
                  readonly
                ></v-text-field>
                <v-date-picker locale="ro" v-model="search_text" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn
                    flat
                    color="primary"
                    @click="date_menu = false"
                  >Terminare</v-btn>
                  <v-btn
                    flat
                    color="primary"
                    @click="$refs.date_menu.save(date)"
                  >Ok</v-btn>
                </v-date-picker>
              </v-menu>
        </v-flex>
    </v-layout>
</template>

<script>
export default {
    data() {
        return {
            search_criteria: '',
            search_text: '',
            date_menu: '',
            date: ''
        }
    },
    props: {
        criteria: {
            required: true,
            validator: prop => typeof prop === 'object' || prop === ""
        }
    },
    watch: {
        search_text: {
            immediate: false,
            handler(val) {
                this.$emit('search', {criteria: this.search_criteria.name, text: val})
            }
        },
        search_criteria: {
            immediate: false,
            handler(val) {
                this.search_text = ''
            }
        }
    }
}
</script>
