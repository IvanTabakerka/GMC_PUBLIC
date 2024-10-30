import Vue from 'vue'

export const state = () => ({
    rating: [],
    graf: {
      dataset: {},
      params: {
        period: 'day',
        limit: 20,
        offset: 0,
        type: 'max',
        servers: []
      },
      dataLoading: true
    }
})

export const getters = {
  getIndexM1R : (state) => (serverId) => {
    const dataset = state.graf.dataset[serverId];
    let result = {
      old: 0,
      new: 0,
      index: 0,
      delta: 0
    };
    if (!!dataset) {
      result.new = dataset.datasets[0].data.at(-1)
      for (let i = 0, len = dataset.datasets[0].data.length, delta = 0, counter = 0; i < len; i++) {
        if (i > len - 5 && i < len-1) {
          counter++;
          delta = delta + dataset.datasets[0].data[i];
          result.old = (delta/counter).toFixed(2);
        }
      }
      result.index = (result.new / result.old).toFixed(2);
      result.delta = (result.index*100).toFixed(2)-100;
      result.delta = `${result.delta > 0 ? '+' : ''} ${result.delta}`
    }
    return result
  },
  getIndexM1A : (state) => (serverId) => {
    const dataset = state.graf.dataset[serverId];
    let result = {
      old: 0,
      new: 0,
      index: 0,
      delta: 0
    };
    if (!!dataset) {
      result.new = dataset.datasets[0].data.at(-1)
      for (let i = 0, len = dataset.datasets[0].data.length, delta = 0, counter = 0; i < len; i++) {
        if (i < len-1) {
          counter++;
          delta = delta + dataset.datasets[0].data[i];
          result.old = (delta/counter).toFixed(2);
        }
      }
      result.index = (result.new / result.old).toFixed(2);
      result.delta = (result.index*100).toFixed(2)-100;
      result.delta = `${result.delta > 0 ? '+' : ''} ${result.delta}`
    }
    return result
  },
  getThreeEls (state) {
      if (state.rating[0]) {
          return state.rating[0].list.slice(0,3);
      } else {
          return [];
      }

  }
}
export const mutations = {
    setDataset (state, dataset) {
      Vue.set(state.graf.dataset, dataset.serverId, dataset);
    },
    setParams (state, params) {
      state.graf.params.period = params.period || params.period == 0 ? params.period : state.graf.params.period;
      state.graf.params.limit = params.limit || params.limit == 0 ? params.limit : state.graf.params.limit;
      state.graf.params.offset = params.offset || params.offset == 0 ? params.offset : state.graf.params.offset;
      state.graf.params.type = params.type || params.type == 0 ? params.type : state.graf.params.type;
    }
}

export const actions = {
    async getGraf ({commit,state},serverId) {
        state.graf.dataLoading = true;
        const res = await this.$axios.$post(`/online/graf/`, {
          period: state.graf.params.period,
          limit: state.graf.params.limit,
          offset: state.graf.params.offset,
          type: state.graf.params.type,
          servers: serverId
        });
        try {
            if (!res.status) throw new Error(res.message);
            commit('setDataset', res.dataset);
            state.graf.dataLoading = false;
        } catch (e) {
            this.$toast.show(e.message)
        }
    },
    async getTop ({state},offset) {
      const res = await this.$axios.$post(`/online/top/`, {
        offset: offset
      });
      try {
          if (!res.status) throw new Error(res.message);
          state.rating[offset] = {
              list: res.list,
              summary: res.summary
          }
      } catch (e) {
          this.$toast.show(e.message)
      }
  },
}
