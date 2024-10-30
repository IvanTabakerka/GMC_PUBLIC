export const state = () => ({
    list: [],
    element: {},
    count: 0,
    updateCheck: {},
    dataLoading: true,
    allPage: {
      limit: 20,
      page: 1,
      loading: true,
      filter: '',
      server: 0
    }
  })
  
  export const getters = {
    getListBSTable (state) {
      return {
        fields: [
          { key: 'name', label: 'Название', tdClass: 'align-middle' },
          { key: 'description', label: 'Описание', tdClass: 'align-middle' },
          { key: 'show_details', label: '', tdClass: 'text-right align-middle' },
        ],
        items: state.list
      };
    },
    getListBSTableShop (state) {
      return {
        fields: [
          { key: 'name', label: 'Название', tdClass: 'align-middle' },
          { key: 'description', label: 'Описание', tdClass: 'align-middle' },
          { key: 'real_cost', label: 'Цена ₽', tdClass: 'align-middle' },
          { key: 'game_cost', label: 'Цена УЕ', tdClass: 'align-middle' },
          { key: 'show_details', label: '', tdClass: 'text-right align-middle' },
        ],
        items: state.list
      };
    },
    getElement: (state) => (id) => {
      return state.list.find(el => el.id === id);
    }
  }
  
  export const mutations = {
    setElement (state, element) {
      state.element = element;
      Object.assign(state.updateCheck, element);
    },
    setServer (state, pay) {
      state.allPage.server = pay;
    },
    // Users page set page number for quarry
    setPage (state, pay) {
      state.allPage.page = pay;
    },
    // Search filter by name
    setFilter (state, pay) {
      state.allPage.filter = pay;
    },
    // Set elements list
    setList (state, pay) {
      state.list = pay.list;
      state.count = pay.count;
    }
  }
  
  export const actions = {
    async getAll ({state, commit}) {
      state.dataLoading = true;
      const res = await this.$axios.$post('/privileges/get/', {
        page: state.allPage.page,
        limit: state.allPage.limit,
        filter: state.allPage.filter,
        serverId: state.allPage.server
      });
      try {
        if (!res.status) throw new Error(res.message);
        commit('setList', res);
        state.dataLoading = false;
      } catch (e) {
        this.$toast.show(e.message)
      }
    },
    async getOne ({state, commit},id) {
      state.dataLoading = true;
      const res = await this.$axios.$post(`/privileges/get/${id}/`, {
        serverId: state.allPage.server
      });
      try {
        if (!res.status) throw new Error(res.message);
        commit('setElement', res.element);
        state.dataLoading = false;
      } catch (e) {
        this.$toast.show(e.message)
      }
    },
    async update ({state, dispatch}, data) {
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
    },
    async create ({dispatch}, data) {
      state.dataLoading = true;
      const res = await this.$axios.$post(`/privileges/create/`, data);
      try {
        if (!res.status) throw new Error(res.message);
        dispatch('getAll')
        state.dataLoading = false;
        this.$toast.show(res.message)
      } catch (e) {
        state.dataLoading = false;
        this.$toast.show(e.message)
      }
    },
    async updateCosts ({dispatch}, data) {
      state.dataLoading = true;
      const res = await this.$axios.$post(`/privileges/update_costs/`, data);
      try {
        if (!res.status) throw new Error(res.message);
        dispatch('getAll')
        state.dataLoading = false;
        this.$toast.show(res.message)
      } catch (e) {
        state.dataLoading = false;
        this.$toast.show(e.message)
      }
    },
    async delete ({dispatch}, data) {
      state.dataLoading = true;
      const res = await this.$axios.$post(`/privileges/delete/`, data);
      try {
        if (!res.status) throw new Error(res.message);
        dispatch('getAll')
        state.dataLoading = false;
        this.$toast.show(res.message)
      } catch (e) {
        state.dataLoading = false;
        this.$toast.show(e.message)
      }
    },
    async buy ({dispatch}, data) {
      const res = await this.$axios.$post(`/privileges/buy/`, {
        privilegesEntitieId: data.privilegesEntitieId,
        privilegeId: data.privilegeId,
        serverId: data.serverId,
        count: data.count
      });
      try {
        if (!res.status) throw new Error(res.message);
        dispatch('getAll')
        this.$toast.show(res.message)
      } catch (e) {
        this.$toast.show(e.message)
      }
    },
  }
  