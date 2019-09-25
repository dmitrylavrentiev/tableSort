import Vue from 'vue'
import Vuex from 'vuex'
import table from './modules/table/'

Vue.use(Vuex);

const createStore = initialState => {
    return new Vuex.Store({
        state: initialState,
        modules: {
            table,
        },
    })
};

export default createStore
