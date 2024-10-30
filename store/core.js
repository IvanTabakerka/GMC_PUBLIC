export const state = () => ({
  server: {
    address: process.env.NODE_ENV === 'production' ? 'https://goodminecraft.com/express/' : 'https://localhost:3005/'
  },
  pageName: '',
  version: '5.0.0',
  modalInfo: {
    status: false,
    timerId: '',
    content: []
  },
  breadcrumb: []
})

export const getters = {
  getAddress (state) {
    return state.server.address
  },
  declOfNum: (state) => (data) => {
    return data.words[(data.number % 100 > 4 && data.number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(data.number % 10 < 5) ? Math.abs(data.number) % 10 : 5]];
  },
  getTimeString: (state) => (time) => {
    let hours = Math.trunc(time/60);
    let minutes = time % 60;
    return hours + 'ч ' + minutes + 'м';
  },
  getDateString: (state) => (data, add) => {
    let date = new Date(data);
    if (add) {
      date.setDate(date.getDate() + add);
    }
    return new Intl.DateTimeFormat('ru', {
      year: 'numeric',
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  },
  getPath: (state) => (file) => {
    return !!file ? `${state.server.address}storage/uploads/${file.id}_${file.name}.${file.type.split('/')[1]}` : false;
  },
  newLineNTag: (state) => (value) => {
    if (value) {
      return value.replace(/\n/g, "<br />");
    } else {
      return ''
    }
  },
}

export const mutations = {
  setPageName (state, name) {
    state.pageName = name;
  },
  addModalInfo (state, pay) {
    state.modalInfo.status = true;
    let content = state.modalInfo.content;
    if (content.leight > 5) {
      content.splice(0,1);
    }
    content.push({title: pay.title, text: pay.text});
  },
  setModalTimeout (state, pay) {
    state.modalInfo.timerId = pay;
  },
  deleteModalInfo (state) {
    state.modalInfo.status = false;
    state.modalInfo.content = [];
  },
}

export const strict = false
