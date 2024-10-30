<template>
    <line-chart
      :chart-options='chartOptions'
      :chart-data='$store.state.stats.servers'
      chart-id='serversGraf'
      class="servers_page_graf"
    />
</template>

<script>
  export default {
    data() {
      return {
        chartOptions: {
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
          },
          plugins: {
            legend: {
              labels: {
                color: '#fff',
                font: {
                  size: 12,
                  family: "Rubik"
                },
                boxWidth: 0,
                boxHeight: 0
              }
            }
          }
        }
      }
    }
  }
</script>
