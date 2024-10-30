export const state = () => ({
  page: {
    list: [],
    element: {},
    updateCheck: {},
    count: 0,
    limit: 30,
    page: 1,
    loading: true,
    filter: '',
    serverId: 0,
    modId: 0,
    entityId: 0,
    public: false
  },
  mods: {
    selectId: 0,
    list: [],
    navigate: []
  },
  item: {
    shopId: 0,
    serverId: 0,
    element: {}
  }
})

export const getters = {
}

export const mutations = {
  setModsNavigate (state, list) {
    state.mods.navigate = list;
  },
  setAllMods (state, list) {
    state.mods.list = list;
  },
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
  // Создать товар
  async create({state, dispatch}, data) {
    try {
      state.page.loading = true;
      if (data.file) {
        let formData = new FormData();
        formData.append('file', data.file);
        const fileUploadStatus = await this.$axios.$post('/files/upload/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            token: this.$auth.getToken('local'),
            size: data.file.size,
            type: data.file.type,
          }
        })
        if (!fileUploadStatus.status) throw new Error(fileUploadStatus.message);
        data.fileId = fileUploadStatus.file.id;
      }
      const res = await this.$axios.$post(`/shop/create/`, {
        name: data.name,
        descript: data.descript,
        count: data.count,
        hide: data.hide,
        fileId: data.fileId ? data.fileId : null,
        serversModId: state.mods.selectId
      });
      if (!res.status) throw new Error(res.message);
      state.page.loading = false;
      this.$toast.show(res.message)
    } catch (e) {
      state.page.loading = false;
      this.$toast.show(e.message)
    }
  },
  // Получить список модов для добавления товара
  async getAllMods ({state, commit}) {
    try {
      let res = await this.$axios.$get(`/shop/select/all-mods/${state.page.serverId}/`);
      if (!res.status) throw new Error(res.message);
      commit('setAllMods', res.list);
    } catch (e) {
      this.$toast.show(e.message)
    }
  },
  // Получить список модов для навигации
  async getModsNavigate ({state, commit}, serverId) {
    try {
      let res = await this.$axios.$post(`/shop/select/navigate/${serverId}/`, {
        serverId: state.page.public ? state.page.serverId : null,
      });
      if (!res.status) throw new Error(res.message);
      commit('setModsNavigate', res.list);
    } catch (e) {
      this.$toast.show(e.message)
    }
  },
  // Список товаров
  async get({state}) {
    try {
      let res = await this.$axios.$post('/shop/get/', {
        serversModId: state.page.modId,
        limit: state.page.limit,
        page: state.page.page,
        filter: state.page.filter,
        serverId: state.page.public ? state.page.serverId : null,
      });
      if (!res.status) throw new Error(res.message);

      for (let i = 0; i < res.list.length; i++) {
        if (state.item.shopId === res.list[i].id) {
          res.list[i]._showDetails = true;
        }
      }
      state.page.list = res.list;
      state.page.count = res.count;
    } catch (e) {
      this.$toast.show(e.message)
    }
  },
  // Получить один товар
  async getOne({state, commit}, id) {
    state.page.loading = true;
    const res = await this.$axios.$post(`/shop/get/${id}/`);
    try {
      if (!res.status) throw new Error(res.message);
      commit('setElement', res.element);
      state.page.loading = false;
    } catch (e) {
      this.$toast.show(e.message)
      state.page.loading = false;
    }
  },
  // Обновление элемента
  async update({state, dispatch}, data) {
    try {
      let sendObject = {}
      sendObject.id = data.id
      for (let key in data) {
        if (state.page.updateCheck[key] != data[key]) {
          if (key !== 'newFile' ?? key !== 'file') {
            sendObject[key] = data[key];
          }
        }
      }
      if (data.newFile) {
        let formData = new FormData();
        formData.append('file', data.newFile);
        const fileUploadStatus = await this.$axios.$post('/files/upload/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            token: this.$auth.getToken('local'),
            size: data.newFile.size,
            type: data.newFile.type,
          }
        })
        if (fileUploadStatus.status === 400) throw new Error(fileUploadStatus.message);

        sendObject.fileId = fileUploadStatus.file.id;
      }
      const res = await this.$axios.$post(`/shop/update/${sendObject.id}/`, sendObject);
      if (!res.status) throw new Error(res.message);
      this.$toast.show(res.message)
      await dispatch('get');
    } catch (e) {
      this.$toast.show(e.message)
    }
  },
  // Удаление элемента
  async delete({state, dispatch}, id) {
    try {
      const res = await this.$axios.$post(`/shop/delete/${id}/`);
      if (!res.status) throw new Error(res.message);
      this.$toast.show(res.message);
      dispatch('get');
    } catch (e) {
      this.$toast.show(e.message)
    }
  },
  // Срздание связки ID:META
  async createItem({state, dispatch}, data) {
    try {
      const res = await this.$axios.$post(`/shop/item/create/`, {
        item_id: data.item_id,
        item_meta: data.item_meta,
        shopId: state.item.shopId,
        serverId: state.item.serverId
      });
      if (!res.status) throw new Error(res.message);
      await dispatch('get');
      this.$toast.show(res.message);
    } catch (e) {
      this.$toast.show(e.message)
    }
  },
  // Удаление связки ID:META
  async deleteItem({state, dispatch}, id) {
    try {
      const res = await this.$axios.$post(`/shop/item/delete/${id}/`);
      if (!res.status) throw new Error(res.message);
      this.$toast.show(res.message)
      await dispatch('get');
    } catch (e) {
      this.$toast.show(e.message)
    }
  },
  // Создание цены
  async setCost({state, dispatch}, data) {
    try {
      const res = await this.$axios.$post(`/shop/item/set-cost/`, data);
      if (!res.status) throw new Error(res.message);
      this.$toast.show(res.message)
      await dispatch('get');
    } catch (e) {
      this.$toast.show(e.message)
    }
  },
  async buy ({dispatch}, data) {
    const res = await this.$axios.$post(`/shop/buy/`, data);
    try {
      if (!res.status) throw new Error(res.message);
      dispatch('getAll')
      this.$toast.show(res.message)
    } catch (e) {
      this.$toast.show(e.message)
    }
  },
}
