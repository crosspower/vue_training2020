import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        count: 2,
        message: ""
    },
    getters: {
        doubleCount: state => state.count * 2,
        trippleCount: state => state.count * 3,
        message: state => state.message 
    },
    mutations: {
        increment(state, number) {
            state.count += number;
        },
        decrement(state, number) {
            state.count -= number;
        },
        updateMessage(state, newMessage){
            state.message = newMessage;
        }
    },// 追跡性・視認性を高めるために必ずmutationを使う
    // mutationsには同期的な処理しか書かない。理由は上記の通り。
    actions: {
        increment(context, number) {
            context.commit("increment", number)
        },// contextにはcommitやgetters、dispatchなどが入っている
        // increment({ commit },number){
        //     commit("increment", number)
        // }, //こちらの方がより明確でわかりやすい
        incrementAsync(context, number){
            setTimeout(()=>{context.commit("increment",number)},3000)
        },
        updateMessage({ commit }, newMessage){
            commit("updateMessage", newMessage)
        }
    },
    modules: {
        
    }
});