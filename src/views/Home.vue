<template>
<div>
  <v-card>
    <v-card-title>
      Список постановок
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
        v-model="selected"
      :headers="headers"
      :items="items"
      :search="search"
        show-select
        item-key="id"
    >
    </v-data-table>
    
  </v-card>
           <div>
        <v-btn color="error" class="mt-3" @click="deleteItem">Delete</v-btn>
        </div>
  </div>
</template>

<script>
import axios from 'axios'
  export default {
    data () {
      return {
        api:'http://localhost:5000/',
        search: '',
        headers: [
          {text: 'ID', value: 'id',},
          { text: 'Сomposition Number', value: 'number' },
          { text: 'Actor', value: 'actor' },
          { text: 'Role', value: 'role' },
          { text: 'Type of role', value: 'type' },
          { text: 'Date of appoinment', value: 'date1' },
          { text: 'Date of removal from role', value: 'date2' },
          { text: 'Producer', value: 'producer' }
        ],
        items:[],
        actors:[],
        roles:[],
        selected:[]
      }
    },
    mounted(){
      this.getRoles();
      this.getActors();
      this.getStagings();
    },
    methods:{
      async getStagings(){
            this.items = [];
            let stagings = await axios.get(this.api+'staging');
            for (let i = 0; i < stagings.data.length; i++){
                this.items.push({
                    id: stagings.data[i].id,
                    number: stagings.data[i].composition_number,
                    actor: this.findActerName(stagings.data[i].actor_id),
                    role: this.findRoleName(stagings.data[i].role_id),
                    type: stagings.data[i].type_of_role,
                    date1: stagings.data[i].data_of_appoinment,
                    date2: stagings.data[i].date_of_removal_from_role,
                    producer: stagings.data[i].producer,
                })
            }
        },

        findActerName(id) {
           for (let i = 0; i<this.actors.length; i++){
               if (id == this.actors[i].id){
                   return this.actors[i].name;
               }
           }
        },
        findRoleName(id) {
           for (let i = 0; i<this.roles.length; i++){
               if (id == this.roles[i].id){
                   return this.roles[i].name;
               }
           }
        },
 
   
        async getActors(){
          let actors = await axios.get(this.api+'actors');
          for (let i = 0; i < actors.data.length; i++){
              this.actors.push(
                  {
                  name: actors.data[i].fullname,
                  id: actors.data[i].id
                  }
              )
          }
        },
        async getRoles(){
          let roles = await axios.get(this.api+'roles');
          for (let i = 0; i < roles.data.length; i++){
              this.roles.push(
                  {
                  name: roles.data[i].title,
                  id: roles.data[i].id
                  }
              )
          }
        },
        async deleteItem(){
            console.log(this.selected);
            for (let i = 0; i < this.selected.length; i++){
            console.log(this.selected[i].id)
            await axios.delete(this.api + `staging/${this.selected[i].id}`);
            }
            this.selected = [];
            this.getStagings();
        },

    }
  }
</script>
