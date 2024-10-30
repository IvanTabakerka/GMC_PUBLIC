export const state = () => ({
  list: [],
  limit: 20,
  page: 1,
  count: 0,
  tableBusy: true,
})

export const getters = {
  // Users page set page number for quarry
  getHistoryList (state) {
    return {
      fields: [
        { key: 'createdAt', label: 'Дата', tdClass: 'align-middle' },
        { key: 'context', label: 'Название', tdClass: 'align-middle' },
        { key: 'server', label: 'Сервер', tdClass: 'align-middle' },
        { key: 'cost', label: 'Цена', tdClass: 'align-middle' },
        { key: 'count', label: 'Кол-во', tdClass: 'align-middle' },
        { key: 'all_cost', label: 'Полная', tdClass: 'align-middle' },
      ],
      items: state.list.map((value) => {
        return value;
      })
    };
  }
}

export const mutations = {
  historySetPage (state, pay) {
    state.page = pay;
  },
  historySet (state, pay) {
    state.list = pay.history.list;
    state.count = pay.history.count;
  },
  // History list loading status
  statusBusyHistoryTable (state, pay) {
    state.tableBusy = pay;
  },
}

export const actions = {
  // Get history
  async getHistory ({commit,state}, id) {
    commit('statusBusyHistoryTable', true);
    const res = await this.$axios.$post('/history/get/', {id: id, page: state.page, limit: state.limit})
    try {
      if (res.status === 400) throw new Error(res.message);
      commit('historySet', res);
    } catch (e) {
      this.$toast.show(e.message)
    }
    commit('statusBusyHistoryTable', false);
  },
}
