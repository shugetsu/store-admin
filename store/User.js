import createPersistedState from 'vuex-persistedstate'

export const state = () => ({
  Token: {},
  IsLoadingLogin: false
})

export const mutations = {
  SET_TOKEN (state, token) { state.Token = token },
  SET_IS_LOADING_LOGIN (state, loading) { state.IsLoadingLogin = loading }
}

export const actions = {
  async Login (ctx, data) {
    ctx.commit('SET_IS_LOADING_LOGIN', true)
    const res = await this.$axios.$post('/api/admin/v1/user/login', data, { withCredentials: true })
    ctx.commit('SET_TOKEN', res.data)
    ctx.commit('SET_IS_LOADING_LOGIN', false)
    return res
  }
}

export const plugins = [
  createPersistedState({ paths: ['Token' ]})
]
