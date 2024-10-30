// Userdata contain in @nuxt/auth
export const state = {
  list: [],
  element: {},
  count: 0,
  allPage: {
    limit: 40,
    page: 1,
    loading: true,
    filter: '',
    sortBy: 'createdAt',
    sortDesc: true
  }
}

export const mutations = {
  // Users page set page number for quarry
  setPage (state, pay) {
    state.allPage.page = pay;
  },
  // Search filter by name
  setFilter (state, pay) {
    state.allPage.filter = pay;
  },
  // Custom sort
  setSort (state, pay) {
    state.allPage.sortBy = pay.sortBy === 'time' ? 'createdAt' : pay.sortBy;
    state.allPage.sortDesc = pay.sortDesc;
  }
}

export const actions = {
  async getAll ({state,commit}) {
    try {
      state.allPage.loading = true;
      const res = await this.$axios.$post('/users/get/', {
        page: state.allPage.page,
        limit: state.allPage.limit,
        filter: state.allPage.filter,
        sortBy: state.allPage.sortBy,
        sortDesc: state.allPage.sortDesc
      });
      if (!res.status) throw new Error(res.message);
      state.list = res.list;
      state.count = res.count;
      state.allPage.loading = false;
    } catch (e) {
      this.$toast.show(e.message)
    }
  },
  async getOne ({state}, id) {
    try {
      const res = await this.$axios.$get(`/users/get/${id}/`);
      if (!res.status) throw new Error(res.message);
      state.element = res.element;
    } catch (e) {
      this.$toast.show(e.message)
    }
  },
  async updateBalance ({dispatch}, data) {
    try {
      const res = await this.$axios.$post(`/users/update/balance/`, data);
      if (!res.status) throw new Error(res.message);
      await dispatch('getOne', data.id);
      this.$toast.show(res.message)
    } catch (e) {
      this.$toast.show(e.message)
    }
  },
  async ban ({dispatch}, data) {
    try {
      const res = await this.$axios.$post(`/users/update/ban/`, data);
      if (!res.status) throw new Error(res.message);
      await dispatch('getOne', data.userId);
      this.$toast.show(res.message)
    } catch (e) {
      this.$toast.show(e.message)
    }
  }
}
