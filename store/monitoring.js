export const state = () => ({
    page: {
        list: []
    },
    rating: []
})

export const getters = {
    getThreeEls (state) {
        if (state.rating[0]) {
            return state.rating[0].list.slice(0,3);
        } else {
            return [];
        }
      
    }
}

export const actions = {
    // Получение списка мониторингов
    async get ({state}) {
        try {
            const res = await this.$axios.$post('/monitorings/get/');
            if (!res.status) throw new Error(res.message);
            state.page.list = res.list;
        } catch (e) {
            this.$toast.show(e.message)
        }
    },
    // Получение рейтинга за любой месяц (по offset)
    async getTop ({state}, offset) {
        try {
            const res = await this.$axios.$post('/monitorings/top/', {
                offset: offset
            });
            if (!res.status) throw new Error(res.message);
            state.rating[offset] = {
                list: res.list,
                summary: res.summary
            }
        } catch (e) {
            this.$toast.show(e.message)
        }
    },
    async convert ({dispatch}, data) {
        try {
            const res = await this.$axios.$post('/monitorings/convert/', {
                serverId: data.serverId,
                amount: data.amount,
                type: data.type
            });
            if (!res.status) throw new Error(res.message);
            this.$toast.show(res.message);
        } catch (e) {
            this.$toast.show(e.message);
        }
    }
}