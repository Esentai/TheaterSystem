<template>
    <div>
        <div >
            <v-dialog
            v-model="dialog"
            width="500"
            >
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                color="primary"
                dark
                class="mt-5 mb-5"
                v-bind="attrs"
                v-on="on"
                >
                Добавить роль
                </v-btn>
            </template>

            <v-card>
                <v-card-title class="text-h5 grey lighten-2">
                Добавить роль
                </v-card-title>
                <v-container>
                    <v-text-field v-model="title" autofocus required label="Title"></v-text-field>
                    <v-text-field v-model="position"  required label="Position"></v-text-field>
                    <v-text-field v-model="gender"  required label="Gender"></v-text-field>
                    <v-text-field v-model="rank"  required label="Rank"></v-text-field>
                    
                </v-container>
                <v-divider></v-divider>

                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="primary"
                    text
                    @click="addRoles"
                >
                    Добавить
                </v-btn>
                </v-card-actions>
            </v-card>
            </v-dialog>
        </div>
        
        <v-data-table
        v-model="selected"
        :headers="headers"
        :items="items"
        :items-per-page="10"
        show-select
        item-key="ID"
        class="elevation-1"
        >
        </v-data-table>
         <div>
        <v-btn color="error" class="mt-3" @click="deleteItem">Delete</v-btn>
        </div>
        
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data: () => ({
        api:'http://localhost:5000/',
        dialog: false,

        selected:[],

        title: null,
        position: null,
        gender: null,
        rank: null,

        headers:[
            {
                text:'ID',
                value:'ID',
            },
            {
                text:'Title',
                value:'title',
            },
            {
                text:'Position',
                value:'position',
            },
            {
                text:'Gender',
                value:'gender',
            },
            {
                text:'Rank',
                value:'rank',
            },
        ],
        items:[],
    }),
    mounted () {
        this.getRoles();
    },
    methods:{
        async getRoles(){
            this.items = [];
            let roles = await axios.get(this.api+'roles');
            console.log(roles.data)
            for (let i = 0; i < roles.data.length; i++){
                this.items.push({
                    ID: roles.data[i].id,
                    title: roles.data[i].title,
                    position: roles.data[i].position,
                    gender: roles.data[i].gender,
                    rank: roles.data[i].rank,
                })
            }
        },

        async deleteItem(){
            console.log(this.selected);
            for (let i = 0; i < this.selected.length; i++){
            console.log(this.selected[i].ID)
            await axios.delete(this.api + `roles/${this.selected[i].ID}`);
            }
            this.selected = [];
            this.getRoles();
        },

        async addRoles(){
                await axios.post(this.api+'roles', {
                    params: {
                        title: this.title,
                        position: this.position,
                        gender: this.gender,
                        rank: this.rank,
                    }
                })

                this.title = null;
                this.position = null;
                this.gender = null;
                this.rank = null;
                

                this.dialog = false
                this.getRoles();
            


        }

        
    }
}
</script>

<style>

</style>