export const state = () => ({
  page: {
    list: [],
    element: {},
    updateCheck: {},
    raw: [],
    serverId: 0,
    limit: 30,
    page: 1,
    count: 0,
    filter: ''
  },
  shop: {
    list: [],
    count: 0,
    serverId: 0,
    modId: 0
  }
})

export const getters = {
  getLinkedMods(state) {
    return state.page.list.map(mod => {
      if (mod.servers.findIndex(server => server.id === state.page.serverId) !== -1) {
        mod.linked = true;
      } else {
        mod.linked = false;
      }
      return mod;
    })
  }
}

export const mutations = {
  setPage(state, pay) {
    state.page.page = pay;
  },
  setFilter(state, pay) {
    state.page.filter = pay;
  },
  setElement(state, element) {
    state.page.element = element;
    Object.assign(state.page.updateCheck, element);
  }
}

export const actions = {
  // Список модификаций в админпанели
  async get({state}, data) {
    try {
      const res = await this.$axios.$post('/mods/get/', {
        serverId: !data ? 0 : data.serverId,
        limit: state.page.limit,
        page: state.page.page,
        filter: state.page.filter
      });
      if (!res.status) throw new Error(res.message);
      state.page.list = res.list;
      state.page.count = res.count;

    } catch (e) {
      this.$toast.show(e.message)
    }
  },

  // Получить один товар
  async getOne({state, commit}, id) {
    state.page.loading = true;
    const res = await this.$axios.$post(`/mods/get/${id}/`);
    try {
      if (!res.status) throw new Error(res.message);
      commit('setElement', res.element);
      state.page.loading = false;
    } catch (e) {
      this.$toast.show(e.message)
      state.page.loading = false;
    }
  },

  // Список модофикаций в админпанели (данные из server-querry)
  async getRawMods({state}, serverId) {
    try {
      const res = await this.$axios.$post('/mods/get-raw/', {
        serverId: serverId
      });
      if (!res.status) throw new Error(res.message);
      state.page.raw = res.list;
    } catch (e) {
      this.$toast.show(e.message)
    }
  },
  // Создание модификации
  async create({dispatch}, data) {
    try {
      const res = await this.$axios.$post('/mods/create/', {
        name: data.name,
        description: data.description
      });
      if (!res.status) throw new Error(res.message);
      this.$toast.show(res.message)
      dispatch('get', {
        serverId: 0
      })
    } catch (e) {
      this.$toast.show(e.message)
    }
  },
  // Обновление данных модификации
  async update({dispatch}, data) {
    try {
      const res = await this.$axios.$post(`/mods/update/${data.modId}/`, {
        name: data.name,
        description: data.description
      });
      if (!res.status) throw new Error(res.message);
      this.$toast.show(res.message)
      dispatch('get', {
        serverId: 0
      })
    } catch (e) {
      this.$toast.show(e.message)
    }
  },
  // Удаление модификации
  async delete({dispatch}, id) {
    try {
      const res = await this.$axios.$get(`/mods/delete/${id}/`);
      if (!res.status) throw new Error(res.message);
      this.$toast.show(res.message)
      dispatch('get', {
        serverId: 0
      })
    } catch (e) {
      this.$toast.show(e.message)
    }
  },
  // Присоеденить/отсоеденить сервер к модификации
  async toggleServer({}, data) {
    try {
      const res = await this.$axios.$post(`/mods/toggle/${data.modId}/`, {
        serverId: data.serverId
      });
      if (!res.status) throw new Error(res.message);
      this.$toast.show(res.message)
    } catch (e) {
      this.$toast.show(e.message)
    }
  },
}
