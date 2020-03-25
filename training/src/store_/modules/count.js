const state = {
    count: 2,
    message: ""
};


const getters = {
    doubleCount: state => state.count * 2,
    trippleCount: state => state.count * 3,
    message: state => state.message 
};


const mutations = {
    increment(state, number) {
        state.count += number;
    },
    decrement(state, number) {
        state.count -= number;
    },
    updateMessage(state, newMessage){
        state.message = newMessage;
    }
};

const actions = {
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
};

export default {
    state,
    getters,
    mutations,
    actions,
}