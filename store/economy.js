export const state = () => ({
    list: [],
    balance: 'Недоступно',
    dataLoading: true,
    sum: 0,
    medium: 0
  })
  
  export const getters = {
    getLimitedList (state) {
        return state.list.slice(0, 20);
    }
  }

  export const mutations = {
    setElement (state, element) {
      state.balance = element;
    }
  }
  
  export const actions = {
    async getTop ({state}, serverId) {
      state.dataLoading = true;
      const res = await this.$axios.$post('/economy/top/', {
        serverId: serverId
      });
      try {
        if (!res.status) throw new Error(res.message);
        state.list = res.list;
        let sum = 0;
        res.list.forEach(el => {
            sum = sum+el.balance;
        });
        state.sum = sum;
        state.medium = (sum/res.list.length).toFixed(0);
        state.dataLoading = false;
      } catch (e) {
        this.$toast.show(e.message)
      }
    },
    async getBalance ({state, commit}, data) {
      state.dataLoading = true;
      const res = await this.$axios.$post(`/economy/get/`, {
        serverId: data.serverId,
        username: data.username
      });
      try {
        if (!res.status) throw new Error(res.message);
        commit('setElement', res.element);
        state.dataLoading = false;
      } catch (e) {
        this.$toast.show(e.message)
      }
    },
    async changeBalance ({state, dispatch}, data) {
      let sendObject = {}
      sendObject.id = data.id
      for (let key in data) {
        if (state.updateCheck[key] != data[key]) {
          sendObject[key] = data[key];
        }
      }
      const res = await this.$axios.$post(`/privileges/update/${data.id}/`, sendObject);
      try {
        if (!res.status) throw new Error(res.message);
        dispatch('getAll')
        this.$toast.show(res.message)
      } catch (e) {
        this.$toast.show(e.message)
      }
    }
  }
  