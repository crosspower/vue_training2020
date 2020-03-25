<template>
    <div>
        (This is Users Page.)
        <v-alert
            border="top"
            color="red lighten-2"
            dark
            style="margin-bottom:30px;"
        >
            User Number is {{id}}
        </v-alert>
        <div class="my-2" >
            <v-btn color="warning" @click="changeuser(1)" dark>
                <h3>NEXT</h3>
            </v-btn>
            /
            <v-btn color="warning" @click="changeuser(-1)" dark>
                <h3>BACK</h3>
            </v-btn>
        </div>
        <router-view/>
    </div>
</template>
<script>
export default {
    props:['id'],
    data(){
        return{
            googlelink:{
                path:'https://www.google.com/search',
                params:{
                    q: 'vuetify',
                    ie: 'UTF-8'
                }
            }
        }
    },
    methods:{
        changeuser(add_number){
            this.$router.push({path:'/users/'+(Number(this.id)+add_number)})
        }
        // changeuser(add_number){
        //     this.$router.push({name: 'users-id-profile', params: { id: 1}})
        // }
    }
}
</script>