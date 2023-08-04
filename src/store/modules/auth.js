// src/store/modules/auth.js

const state = {
    isAuthenticated: !!localStorage.getItem('access_token') && !!localStorage.getItem('refresh_token'),
};

const getters = {
    isAuthenticated: (state) => state.isAuthenticated,
};

const mutations = {
    setIsAuthenticated(state, isAuthenticated) {
        state.isAuthenticated = isAuthenticated;
    },
};

export default {
    namespaced: true, // Add this line to enable namespacing for the module
    state,
    getters,
    mutations,
};
