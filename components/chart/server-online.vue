<template>
  <div>
    <div class="standart_graf_control" v-show="!hideControl">
      <b-tabs small>
        <b-tab title="Часы" @click="changePeriod('hour')"></b-tab>
        <b-tab title="Дни" active @click="changePeriod('day')"></b-tab>
        <b-tab title="Месяцы" @click="changePeriod('month')"></b-tab>
      </b-tabs>
      <b-button-toolbar key-nav aria-label="Управление графиком">
        <b-button-group class="mx-1">
          <b-button @click="changeOffset('plus')">&laquo;</b-button>
          <b-button @click="changeOffset('minus')">&raquo;</b-button>
        </b-button-group>
        <b-button-group class="mx-1">
          <b-button @click="changeLimit('minus')">-</b-button>
          <b-button @click="changeLimit('plus')">+</b-button>
        </b-button-group>
      </b-button-toolbar>
      <b-tabs small>
        <b-tab title="Максимум" @click="changeType('max')"></b-tab>
        <b-tab title="В среднем" @click="changeType('mid')" v-if="this.$store.state.online.graf.params.period != 'hour'"></b-tab>
      </b-tabs>
      <span>ONLINE<b>STATISTIC</b></span>
    </div>
    <client-only>
      <line-chart
        :chart-options='options'
        :chart-data='!$store.state.online.graf.dataset[servers] ? stub : $store.state.online.graf.dataset[servers]'
        chart-id='server-graf'
        class="standart_graf"
      />
    </client-only>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        stub: {
          lables: {},
          datasets: []
        },
        options: {
          responsive: true,
          scales: {
            xAxis: {
              ticks: {
                color: '#fff',
                font: {
                  size: 8,
                  family: "Rubik"
                }
              },
              grid: {
                color: 'rgba(255,255,255,0.2)',
              }
            },
            yAxis: {
              ticks: {
                color: '#fff',
                font: {
                  size: 8,
                  family: "Rubik"
                }
              },
              grid: {
                color: 'rgba(255,255,255,0.2)',
              }
            },
          }
        }
      }
    },
    async created () {
      await this.$store.dispatch('online/getGraf', this.servers);
    },
    watch: {
      '$store.state.online.graf.params': {
        async handler() {
          await this.$store.dispatch('online/getGraf', this.servers);
        },
        deep: true
      }
    },
    methods: {
      async changePeriod (period) {
        this.$store.commit('online/setParams', {
          period: period,
          limit: 30,
          offset: 0
        });
        await this.$store.dispatch('online/getGraf', this.servers);
      },
      async changeOffset (offset) {
        let oldOffset = this.$store.state.online.graf.params.offset;
        if (offset == 'minus') {
          if (oldOffset != 0) {
            this.changeOffsetConfirm(oldOffset-=1);
          }
        } else if (offset == 'plus') {
          this.changeOffsetConfirm(oldOffset+=1);
        }
      },
      async changeOffsetConfirm (offset) {
        this.$store.commit('online/setParams', {
          offset: offset
        });
        await this.$store.dispatch('online/getGraf', this.servers);
      },
      async changeLimit (limit) {
        let oldLimit = this.$store.state.online.graf.params.limit;
        if (limit == 'minus') {
          if (oldLimit > 20) {
            this.changeLimitConfirm(oldLimit-=10);
          }
        } else if (limit == 'plus') {
          if (oldLimit < 60) {
            this.changeLimitConfirm(oldLimit+=10);
          }
        }
      },
      async changeLimitConfirm (limit) {
        this.$store.commit('online/setParams', {
          limit: limit
        });
        await this.$store.dispatch('online/getGraf', this.servers);
      },
      async changeType (type) {
        this.$store.commit('online/setParams', {
          type: type,
          limit: 24,
          offset: 0
        });
        await this.$store.dispatch('online/getGraf', this.servers);
      },
    },
    props: ['servers', 'hideControl']
  }
</script>
