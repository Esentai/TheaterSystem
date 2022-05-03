<template>
    <v-container>
        <v-alert v-if="success" type="success">
            Вы успешно создали постановку
        </v-alert>
        <v-row justify="center" class="mt-5">
            <v-col
            cols="12"
            sm="12"
            md="10"
            lg="7"
            class="form" 
            >
                <h2 class="text-center">Создать постановку</h2>
                <v-text-field v-model="staging.composition_number" class="mt-10"  required label="Composition number"></v-text-field>
                <v-select
                    :items="actors"
                    item-text="name"
                    item-value="value"
                    label="Сhoose an actor"
                    v-model="staging.actor_id"
                    class="mt-3"
                ></v-select>
                <v-select
                    :items="roles"
                    item-text="name"
                    item-value="value"
                    label="Сhoose a role"
                    v-model="staging.role_id"
                    class="mt-3"
                ></v-select>
                <v-text-field v-model="staging.type_of_role" class="mt-3 mb-3"  required label="Type of role"></v-text-field>
                  <v-menu
                        v-model="menu2"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                    >
                        <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="staging.data_of_appoinment"
                            label="Data of appoinment"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                        ></v-text-field>
                        </template>
                        <v-date-picker
                        v-model="staging.data_of_appoinment"
                        @input="menu2 = false"
                        ></v-date-picker>
                    </v-menu>
                    <v-menu
                        v-model="menu"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                    >
                        <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="staging.date_of_removal_from_role"
                            label="Date of removal from role"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                        ></v-text-field>
                        </template>
                        <v-date-picker
                        v-model="staging.date_of_removal_from_role"
                        @input="menu = false"
                        ></v-date-picker>
                    </v-menu>
                    <v-text-field v-model="staging.producer" class="mt-3 mb-3"  required label="Producer"></v-text-field>
                    <v-btn color="primary" @click="create">Create</v-btn>
            </v-col>
        </v-row>      
    </v-container>
</template>

<script>
import axios from 'axios'
export default {
    data: () => ({
        api:'http://localhost:5000/',
        date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        menu: false,
        modal: false,
        menu2: false,
        staging:{
            composition_number: null,
            actor_id: null,
            role_id: null,
            type_of_role: null,
            data_of_appoinment: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            date_of_removal_from_role: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            producer: null
        },

        actors:[],
        roles:[],
        success: false,
    }),
    mounted () {
        this.getData();

    },
    methods:{
        async getData(){
            let actors = await axios.get(this.api+'actors');
            for (let i = 0; i < actors.data.length; i++){
                this.actors.push(
                    {
                     name: actors.data[i].fullname,
                     value: actors.data[i].id
                     }
                )
            }
            let roles = await axios.get(this.api+'roles');
            for (let i = 0; i < roles.data.length; i++){
                this.roles.push(
                    {
                     name: roles.data[i].title,
                     value: roles.data[i].id
                     }
                )
            }
            

        },
        async create(){
                await axios.post(this.api+'staging', {
                    params: {
                        composition_number: this.staging.composition_number,
                        actor_id: this.staging.actor_id,
                        role_id: this.staging.role_id,
                        type_of_role: this.staging.type_of_role,
                        data_of_appoinment: this.staging.data_of_appoinment,
                        date_of_removal_from_role: this.staging.date_of_removal_from_role,
                        producer: this.staging.producer
                    }
                })

                this.staging = {
                    composition_number: null,
                    actor_id: null,
                    role_id: null,
                    type_of_role: null,
                    data_of_appoinment: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
                    date_of_removal_from_role: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
                    producer: null
                }
                this.success  = true

                

              

        
        }
    }
}
</script>

<style>
.form{
    border: 1px #ccc solid;
    border-radius: 10px;
    padding: 25px;
}
</style>