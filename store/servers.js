export const state = () => ({
  list: [],
  element: {},
  admins: [],
  updateCheck: {},
  dataLoading: true
})

export const getters = {
  getAllOnlineString (state) {
    let online = 0;
    let max_online = 0;
    state.list.forEach(server => {
      if (server.servers_stats_hours[0]) {
        online += server.servers_stats_hours[0].players;
        max_online += server.servers_stats_hours[0].players_max;
      }
    });
    return `${online}/${max_online}`;
  },
  // Servers page
  getListBSTable (state) {
    return {
      fields: [
        { key: 'name', label: 'Название', tdClass: 'align-middle' },
        { key: 'version', label: 'Версия', tdClass: 'align-middle' },
        { key: 'type', label: 'Тип', tdClass: 'align-middle' },
        { key: 'pvp', label: 'PvP', tdClass: 'align-middle' },
        { key: 'difficulty', label: 'Сложность', tdClass: 'align-middle' },
        { key: 'voteAward', label: 'Цена голоса', tdClass: 'align-middle' },
        { key: 'worldSize', label: 'Карта', tdClass: 'align-middle' },
        { key: 'housePoints', label: 'Домов', tdClass: 'align-middle' },
        { key: 'privatLimit', label: 'Приват', tdClass: 'align-middle' },
        { key: 'privatPlus', label: 'Приват+', tdClass: 'align-middle' },
        { key: 'whitelist', label: 'Вайтлист', tdClass: 'align-middle' },
        { key: 'control', label: '', tdClass: 'align-middle' },
      ],
      items: state.list
    };
  },
  getElement: (state) => (id) => {
    return state.list.find(el => el.id === id);
  },
  getActive (state) {
    return state.list.filter(el => !el.hide)
  },
  getServerShops: (state) => (modId) => {
    let result = [];
    state.list.forEach(server => {
      const hasMod = server.servers_mods.find(mod => mod.id === modId);
      if (hasMod && server.shopType) {
        result.push(server);
      }
    })
    return result;
  },
  getSelectOptions: (state) => (active) => {
    let servers = !!active ? state.list.filter(el => !el.hide) : state.list;
    let options = [
      {value: 0, text: 'Не выбрано'},
    ];
    for (let i = 0; i < servers.length; i++) {
      options.push({
        value: servers[i].id,
        text: servers[i].name + '-' + servers[i].postfix
      })
    }
    return options;
  }
}

export const mutations = {
  setList (state, list) {
    state.list = list;
  },
  setElement (state, element) {
    state.element = element;
    Object.assign(state.updateCheck, element);
  },
  setAdmins (state, admins) {
    state.admins = admins;
  },
}

export const actions = {
  async getAll ({commit,state}) {
    state.dataLoading = true;
    const res = await this.$axios.$get('/servers/get/');
    try {
      if (!res.status) throw new Error(res.message);
      commit('setList', res.list);
      state.dataLoading = false;
    } catch (e) {
      this.$toast.show(e.message)
    }
  },
  async getOne ({commit},id) {
    state.dataLoading = true;
    const res = await this.$axios.$get(`/servers/get/${id}/`);
    try {
      if (!res.status) throw new Error(res.message);
      commit('setElement', res.element);
      state.dataLoading = false;
    } catch (e) {
      this.$toast.show(e.message)
    }
  },
  async getAdmins ({commit},id) {
    state.dataLoading = true;
    const res = await this.$axios.$get(`/servers/get-admins/${id}/`);
    try {
      if (!res.status) throw new Error(res.message);
      commit('setAdmins', res.admins);
      state.dataLoading = false;
    } catch (e) {
      this.$toast.show(e.message)
    }
  },
  async update ({state,dispatch}, data) {
    let sendObject = {}
    sendObject.id = data.id
    for (let key in data) {
      if (state.updateCheck[key] != data[key]) {
        if (key !== 'newFile' ?? key !== 'file' ) {
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
      try {
        if (fileUploadStatus.status === 400) throw new Error(fileUploadStatus.message);
        sendObject.fileId = fileUploadStatus.file.id;
      } catch (e) {
        this.$toast.show(e.message)
      }
    }
    const res = await this.$axios.$post(`/servers/update/${data.id}/`, sendObject);
    try {
      if (!res.status) throw new Error(res.message);
      dispatch('getOne',data.id)
      this.$toast.show(res.message)
    } catch (e) {
      this.$toast.show(e.message)
    }
  },
  async create ({dispatch}, data) {
    const res = await this.$axios.$post(`/servers/create/`, data);
    try {
      if (!res.status) throw new Error(res.message);
      dispatch('getAll')
      this.$toast.show(res.message)
    } catch (e) {
      this.$toast.show(e.message)
    }
  },
}
