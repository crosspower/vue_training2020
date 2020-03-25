<template>
    <div>
        (This is Home Page.)
        <br/><br/>
        <p>counter: {{ count }}</p>
        <p>double counter: {{ doubleCount }}</p>
        <p>tripple counter: {{ trippleCount }}</p>
        <!-- <p>{{ myComponentDoubleCount }}</p> -->
        <br/><br/>
        非推奨：<v-btn @click="increment">+1</v-btn> / <v-btn @click="decrement">-1</v-btn><br/><br/>
        推奨：<v-btn @click="goodIncrement">+1</v-btn> / <v-btn @click="goodDecrement">-1</v-btn>
        <v-btn @click="incrementAsync(10)">+1(ASYNC)</v-btn>
    </div>
</template>

<script>
// import { mapGetters } from 'vuex';
// import { mapMutations } from 'vuex';
import { mapActions } from 'vuex';
export default {
    computed: {
        // ...mapGetters(["count", "doubleCount", "trippleCount"]),  ES6のspread演算子
        // ...mapGetters({myComponentDoubleCount: "doubleCount"}),
        count() {
            return this.$store.state.count;
        },
        doubleCount() {
            return this.$store.getters.doubleCount;
        },
        trippleCount() {
            return this.$store.getters.trippleCount;
        }
    },
    methods: {
        increment() {
            this.$store.state.count++;
        },
        decrement() {
            this.$store.state.count--;
        },
        // ...mapMutations(["increment", "decrement"]),
        goodIncrement() {
            this.$store.commit('increment', 5)
        },
        goodDecrement() {
            this.$store.commit('increment', -5)
        },
        ...mapActions(["incrementAsync"])
    }
}
</script>