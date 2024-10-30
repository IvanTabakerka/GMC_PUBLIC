export const state = {
  list: []
}

export const getters = {
  // Check what user can this (base)
  checkPerm: (state) => (base, user) => {
    return !!user.permissions_connections.find(rule => rule.permission.base === base);
  },
  getPermList: (state) => ({user, servers}) => {
    let result = [];
    if (Array.isArray(state.list) && Array.isArray(user) && Array.isArray(servers)) {
      result = state.list.map(value => {
        if (!value.hasServerConn) {
          if (user.findIndex(el => el.permissionId === value.id) !== -1) {
            value.canThis = true;
          } else {
            value.canThis = false;
          }
        } else {
          value.servers = servers.map(server => {
            return {
              id: server.id,
              name: server.name,
              postfix: server.postfix,
              canThis: user.findIndex(el => el.permissionId === value.id && el.serverId === server.id) !== -1 ? true : false
            }
          })
        }
        return value;
      })
    }
    return result;
  },
  getElement: (state) => (id) => {
    return state.list.find(rule => rule.id === id);
  }
}

export const actions = {
  async getAll ({state}) {
    try {
      const res = await this.$axios.$get('/permissions/get/');
      if (!res.status) throw new Error(res.message);
      state.list = res.list;
    } catch (e) {
      this.$toast.show(e.message)
    }
  },
  // Admin change user rules
  async updateUserPerm ({}, data) {
    try {
      const res = await this.$axios.$post('/permissions/update/user/', data);
      if (!res.status) throw new Error(res.message);
      this.$toast.show(res.message)
    } catch (e) {
      this.$toast.show(e.message)
    }
  }
}
