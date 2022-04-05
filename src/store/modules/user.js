import {
    ADD_TOKEN,
    REMOVE_TOKEN,
    ADD_PHONE,
    REMOVE_PHONE,
    ADD_ID,
    REMOVE_ID,
    ADD_NAME,
    REMOVE_NAME
} from '../types'

export default {
    state: {
        phone: null,
        id: null,
        token: null,
        name: null,
    },
    mutations: {
        [ADD_TOKEN](state, token) {
            state.token = token
            localStorage.setItem("token", token);
        },
        [REMOVE_TOKEN](state) {
            state.token = null
            localStorage.removeItem("token");
        },
        [ADD_PHONE](state, phone) {
            state.phone = phone
            localStorage.setItem("phone", phone);
        },
        [REMOVE_PHONE](state) {
            state.phone = null
            localStorage.removeItem("phone");
        },
        [ADD_ID](state, id) {
            state.id = id
            localStorage.setItem("id", id);
        },
        [REMOVE_ID](state) {
            state.id = null
            localStorage.removeItem("id");
        },
        [ADD_NAME](state, name) {
            state.name = name
            localStorage.setItem("name", name);
        },
        [REMOVE_NAME](state) {
            state.name = null
            localStorage.removeItem("name");
        },
    },
    actions: {

    },
    modules: {},
    getters: {
        getToken(state) {
            console.log(state)
            const token = localStorage.getItem('token')
            console.log(token)
            if (!state.token) {
                state.token = token
            }
            return state.token
        },
        getPhone(state) {
            const phone = localStorage.getItem('phone')
            if (!state.phone) {
                state.phone = phone
            }
            return state.phone
        },
        getId(state) {
            const id = localStorage.getItem('id')
            if (!state.id) {
                state.id = id
            }
            return state.id
        },
        getName(state) {
            const name = localStorage.getItem('name')
            if (!state.name) {
                state.name = name
            }
            return state.name
        }
    }
}