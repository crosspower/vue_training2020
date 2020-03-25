<template>
    <div>
        <br/><br/>
        <h3>Here is UserProfile...</h3>
        <br/><br/>
        <h3>{{ message }}</h3>
        メッセージ：<input type="text" v-model="message"/>
        <br/><br/>
        メッセージ：<input type="text" :value="message" @input="updateMessage"/>
    </div>
</template>
<script>
export default {
    // data(){
    //     return{
    //         message: ""
    //     }
    // },
    computed: {
        // message() {
        //     return this.$store.getters.message;
        // },
        message: {
            get() {
                return this.$store.getters.message;
            },
            set(value) {
                this.$store.dispatch("updateMessage", value);
            }
        }
    },
    methods: {
        updateMessage(e){
            this.$store.dispatch("updateMessage", e.target.value)
        }
    }
}
</script>