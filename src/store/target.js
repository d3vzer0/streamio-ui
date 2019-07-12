export default {
    namespaced: true,
    state: {
      domain: '',
      monitored: false,
      confirmed: false,
    },
    mutations: {
      update_domain (state, payload) {
        state.domain = payload
      },
      filter_monitored (state, payload) {
        state.monitored = payload
      },
      filter_confirmed (state, payload) {
        state.confirmed = payload
      }
    },
    getters: {
      domain (state) {
        return state.domain
      },
      monitored (state) {
        return state.monitored
      },
      confirmed (state) {
        return state.confirmed
      }
    }
  }
  