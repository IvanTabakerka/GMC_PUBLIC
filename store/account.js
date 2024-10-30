export const actions = {
  async auth ({}, data) {
    try {
      const res = await this.$auth.loginWith('local', {data});
      if (!res.data.status) throw new Error(res.data.message);
      await this.$auth.setUserToken(res.data.token, false)
    } catch (e) {
      this.$toast.show(e.message)
    }
  },
  async regist ({}, data) {
    try {
      const res = await this.$axios.$post('/account/create/',data);
      if (!res.status) throw new Error(res.message);
      this.$router.push('/regist/succsess/');
    } catch (e) {
      this.$toast.show(e.message)
    }
  },
  // Profile change
  async update ({dispatch}, data) {
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
      try {
        if (!fileUploadStatus.status) throw new Error(fileUploadStatus.message);
        data.userdata.fileId = fileUploadStatus.file.id;
      } catch (e) {
        this.$toast.show(e.message)
      }
    }
    const res = await this.$axios.$post('/account/update/', data.userdata)
    try {
      if (!res.status) throw new Error(res.message);
      this.$toast.show(res.message)
      if (data.page == 'cabinet') {
        this.$auth.fetchUser()
      } else {
        dispatch('users/getOne', data.userdata.userId, { root: true })
      }

    } catch (e) {
      this.$toast.show(e.message)
    }
  },
  // Password recovery
  async passwordRecovery ({}, data) {
    const res = await this.$axios.$post('/account/password-recovery/', data)
    try {
      if (!res.status) throw new Error(res.message);
      this.$toast.show(res.message)
      this.$router.push('/auth/');
    } catch (e) {
      this.$toast.show(e.message)
    }
  },
  // Password recovery change password
  async passwordRecoverChange ({}, data) {
    const res = await this.$axios.$post('/account/password-change/', data)
    try {
      if (!res.status) throw new Error(res.message);
      this.$toast.show(res.message)
      this.$router.push('/auth/');
    } catch (e) {
      this.$toast.show(e.message)
    }
  },
}
