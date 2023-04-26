<script></script>

<template>
  <main>
    <div class="container">
      <h1 class="fs-sm p-6 shadow bg-light fw-bold mb-10">2021 薪資數據圖表調查</h1>

      <div class="row">
        <div class="col-3">
          <ul class="list-group mb-6">
            <li class="list-group-item p-6 text-light active">資訊類別</li>
            <li class="list-group-item p-6 text-primary">平均年薪</li>
            <li class="list-group-item p-6 text-primary">首份工作使用技術及軟體</li>
            <li class="list-group-item p-6 text-primary">工作相關資訊</li>
            <li class="list-group-item p-6 text-primary">薪資與產業滿意度</li>
          </ul>

          <ul class="list-group">
            <li class="list-group-item p-6 text-primary">圖表類別</li>
            <li class="list-group-item active p-6 text-light">圓餅圖</li>
            <li class="list-group-item p-6 text-primary">折線圖</li>
            <li class="list-group-item p-6 text-primary">長條圖</li>
          </ul>
        </div>
        <div class="col-9">
          <canvas id="myChart"></canvas>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss">
@import '@/assets/style/all.scss';
</style>

<script>
import Chart from 'chart.js/auto'
export default {
  data() {
    return {}
  },
  methods: {
    getFrontend() {
      this.$http
        .get(
          'https://raw.githubusercontent.com/hexschool/2021-ui-frontend-job/master/frontend_data.json'
        )
        .then((res) => {
          console.log(res.data)
        })
    },
    getUi() {
      this.$http
        .get('https://raw.githubusercontent.com/hexschool/2021-ui-frontend-job/master/ui_data.json')
        .then((res) => {
          console.log(res.data)
        })
    },
    createChart() {
      // 使用 Chart.js 創建圖表
      // 這裡可以使用 Chart.js 提供的 API 來設定圖表的類型、資料、配置等
      const ctx = document.getElementById('myChart').getContext('2d')
      const myChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Red', 'Blue', 'Yellow'],
          datasets: [
            {
              label: 'My First Dataset',
              data: [300, 50, 100],
              backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
              hoverOffset: 4
            }
          ]
        }
      })
    }
  },
  mounted() {
    this.getFrontend()
    this.getUi()
    this.createChart()
  }
}
</script>
