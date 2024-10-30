export const state = () => ({
  skin: false,
  cloak: false
})

export const mutations = {
  setSkinState (state, payload) {
    state.skin = payload;
  },
  setCloakState (state, payload) {
    state.cloak = payload;
  }
}

export const actions = {
  async skinCheck ({dispatch, state, commit}) {
    try {
      await this.$axios.$get('/storage/skins/' + this.$auth.user.username + '.png');
      commit('setSkinState', true);
    } catch (e) {
      commit('setSkinState', false);
    }
    try {
      await this.$axios.$get('/storage/cloaks/' + this.$auth.user.username + '.png');
      commit('setCloakState', true);
    } catch (e) {
      commit('setCloakState', false);
    }
    dispatch('skinContructor');
  },
  async skinContructor ({state, rootGetters}) {
    const canvas = document.getElementById('skin_container');
    canvas.width = canvas.width;
    let skinViewer = new skinview3d.SkinViewer({
      canvas: document.getElementById("skin_container"),
      width: 300,
      height: 400,
      skin: rootGetters['core/getAddress'] + 'storage/static/img/steve_default.png'
    });
    let control = skinview3d.createOrbitControls(skinViewer);
    control.enableRotate = true;
    control.enableZoom = false;
    control.enablePan = false;
    // Add an animation
    let walk = skinViewer.animations.add(skinview3d.WalkingAnimation);
    // Add another animation
    let rotate = skinViewer.animations.add(skinview3d.RotatingAnimation);
    skinViewer.loadSkin(state.skin == true ? rootGetters['core/getAddress'] + 'storage/skins/' + this.$auth.user.username + '.png' : rootGetters['core/getAddress'] + '/store/static/img/steve_default.png');
    skinViewer.loadCape(state.cloak == true ? rootGetters['core/getAddress'] + 'storage/cloaks/' + this.$auth.user.username + '.png' : null);
  },
  async skinsUploadImage ({dispatch}, data) {
    try {
      let formData = new FormData();
      formData.append('skin', data)
      const res = await this.$axios.$post('/files/skin/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          size: data.size,
          type: data.type
        }
      })
      if (!res.status) throw new Error(res.message);
      this.$toast.show(res.message)
      dispatch('skinCheck');
    } catch (e) {
      this.$toast.show(e.message)
    }
  },
  async cloaksUploadImage ({dispatch}, data) {
    try {
      let formData = new FormData();
      formData.append('cloak', data)
      const res = await this.$axios.$post('/files/cloak/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          size: data.size,
          type: data.type,
        }
      })
      if (!res.status) throw new Error(res.message);
      this.$toast.show(res.message)
      dispatch('skinCheck');
    } catch (e) {
      this.$toast.show(e.message)
    }
  },
  async deleteSkin ({dispatch}) {
    try {
      const res = await this.$axios.$post('/files/skin/delete/');
      if (!res.status) throw new Error(res.message);
      this.$toast.show(res.message)
      dispatch('skinCheck');
    } catch (e) {
      this.$toast.show(e.message)
    }
  },
  async deleteCloak ({dispatch}) {
    try {
      const res = await this.$axios.$post('/files/cloak/delete/');
      if (!res.status) throw new Error(res.message);
      this.$toast.show(res.message)
      dispatch('skinCheck');
    } catch (e) {
      this.$toast.show(e.message)
    }
  }
}
