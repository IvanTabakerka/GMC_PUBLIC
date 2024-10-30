export const state = () => ({
    list: [],
    element: {},
    dataLoading: true,
    allPage: {
      limit: 20,
      page: 1,
      loading: true,
      filter: '',
      server: 0
    },
    summary: 0
})
  
export const getters = {
    getThreeEls (state) {
      return state.list.slice(0, 3);
    }
}

export const actions = {
  // Получение топа донатеров
  async getTop ({state}) {
    state.dataLoading = true;
    const res = await this.$axios.$post('/order/top/');
    try {
      if (!res.status) throw new Error(res.message);
      state.list = res.list;
      state.summary = res.summary;
      state.dataLoading = true;
    } catch (e) {
      this.$toast.show(e.message)
    }
  },
  // Получение подписи
  async sign ({state}, data) {
    state.dataLoading = true;
    const res = await this.$axios.$post('/order/sign/', {
      count: data.count,
      comment: data.comment,
      cash: data.cash
    });
    try {
      if (!res.status) throw new Error(res.message);
      document.location.href = res.sign;
      state.dataLoading = false;
    } catch (e) {
      this.$toast.show(e.message)
    }
  },
}