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
                Добавить актера
                </v-btn>
            </template>

            <v-card>
                <v-card-title class="text-h5 grey lighten-2">
                Добавить актера
                </v-card-title>
                <v-container>
                    <v-text-field v-model="fullname" autofocus required label="Fullname"></v-text-field>
                    <v-text-field v-model="position"  required label="Position"></v-text-field>
                    <v-text-field v-model="gender"  required label="Gender"></v-text-field>
                    <v-text-field v-model="rank"  required label="Rank"></v-text-field>
                    <v-text-field v-model="age"  required label="Age"></v-text-field>
                    
                </v-container>
                <v-divider></v-divider>

                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="primary"
                    text
                    @click="addActors"
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

        fullname: null,
        position: null,
        gender: null,
        rank: null,
        age: null,

        headers:[
            {
                text:'ID',
                value:'ID',
            },
            {
                text:'Fullname',
                value:'fullname',
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
            {
                text:'Age',
                value: 'age'
            }
        ],
        items:[],
    }),
    mounted () {
        this.getActors();
    },
    methods:{
        async getActors(){
            this.items = []
            let actors = await axios.get(this.api+'actors');
            console.log(actors.data)
            for (let i = 0; i < actors.data.length; i++){
                this.items.push({
                    ID: actors.data[i].id,
                    fullname: actors.data[i].fullname,
                    position: actors.data[i].position,
                    gender: actors.data[i].gender,
                    rank: actors.data[i].rank,
                    age: actors.data[i].age
                })
            }
        },

        async deleteItem(){
            console.log(this.selected);
            for (let i = 0; i < this.selected.length; i++){
            console.log(this.selected[i].ID)
            await axios.delete(this.api + `actors/${this.selected[i].ID}`);
            }
            this.selected = [];
            this.getActors();
        },

        async addActors(){
                await axios.post(this.api+'actors', {
                    params: {
                        fullname: this.fullname,
                        position: this.position,
                        gender: this.gender,
                        rank: this.rank,
                        age: this.age
                    }
                })

                this.fullname = null;
                this.position = null;
                this.gender = null;
                this.rank = null;
                this.age = null;
                

                this.dialog = false
                this.getActors();
            


        }

        
    }
}
</script>

<style>

</style>