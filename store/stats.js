export const state = () => ({
  servers: {
    labels: [],
    datasets: [],
  },
  playTime: {
    all: 0,
    servers: []
  }
})

export const mutations = {
  setServersStat (state, pay) {
    state.servers.labels = pay.labels;
    state.servers.datasets = pay.datasets;
  },
  setPlayTimeStat (state, pay) {
    state.playTime.all = pay.all;
    state.playTime.servers = pay.servers;
  },
}

export const actions = {
  async getServersStat ({commit,dispatch}, data) {
    const res = await this.$axios.$post('/stats/servers/', {type:data});
    try {
      if (res.status == 400) throw new Error(res.message);
      commit('setServersStat', res);
    } catch (e) {
      commit('core/addModalInfo', {title: 'Ошибка', text: e.message},{root:true})
    }
  },
  async getPlayTime ({commit}) {
    const res = await this.$axios.$post('/stats/play_time/');
    try {
      if (res.status == 400) throw new Error(res.message);
      commit('setPlayTimeStat', res);
    } catch (e) {
      commit('core/addModalInfo', {title: 'Ошибка', text: e.message},{root:true})
    }
  },
}
