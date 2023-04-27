<script></script>

<template>
  <main>
    <div class="container">
      <h1 class="fs-sm p-6 shadow bg-light fw-bold mb-10">2021 薪資數據圖表調查</h1>

      <div class="row">
        <div class="col-3">
          <div>
            <h2 class="bg-primary text-light p-6 fs-sm mb-0 rounded-top-3">資訊類別</h2>
            <ul class="list-group mb-6">
              <li class="list-group-item p-6 text-primary">平均年薪</li>
              <li class="list-group-item p-6 text-primary">首份工作使用技術及軟體</li>
              <li class="list-group-item p-6 text-primary">工作相關資訊</li>
              <li class="list-group-item p-6 text-primary">薪資與產業滿意度</li>
            </ul>
          </div>
          <div>
            <h2 class="bg-primary text-light p-6 fs-sm mb-0 rounded-top-3">圖表類別</h2>
            <ul class="list-group mb-6">
              <li class="list-group-item p-6 text-primary">圓餅圖</li>
              <li class="list-group-item p-6 text-primary">折線圖</li>
              <li class="list-group-item p-6 text-primary">長條圖</li>
            </ul>
          </div>
        </div>
        <div class="col-9">
          <div class="row">
            <div class="col-4">
              <h3 class="fs-base">前端工程師</h3>
              <h3 class="fs-base">UI設計師</h3>
            </div>
            <select v-model="selectedTenure" @change="selectTenurePie(selectedTenure)">
              <option v-for="tenure in tenures" :value="tenure" :key="tenure + '年'">
                {{ tenure }}
              </option>
            </select>
          </div>

          <canvas ref="chartCanvas"></canvas>
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
    return {
      chart: null,
      salaries: [],
      salaryCountAll: {},
      selectedTenure: '1 年以下',
      tenures: [],
      jobTenure: [],
      frontendData: [],
      chartLabelsAll: [],
      chartDataAll: [],
      chartLabels: [],
      chartData: []
    }
  },
  methods: {
    getFrontend() {
      this.$http
        .get(
          'https://raw.githubusercontent.com/hexschool/2021-ui-frontend-job/master/frontend_data.json'
        )
        .then((res) => {
          console.log(res.data)
          this.frontendData = res.data
          const salaryByTenure = this.frontendData.reduce((acc, cur) => {
            const { job_tenure, salary } = cur.company
            acc[job_tenure] = Object.assign(acc[job_tenure] || {}, {
              [salary]: ((acc[job_tenure] && acc[job_tenure][salary]) || 0) + 1
            })
            return acc
          }, {})

          console.log('年資:薪資', salaryByTenure)
          console.log(salaryByTenure['1 年以下'])
          this.chartLabels = Object.keys(salaryByTenure['1 年以下'])
          this.chartData = Object.values(salaryByTenure['1 年以下'])

          this.tenures = Object.keys(salaryByTenure) //年資 key
          console.log(this.tenures)

          this.jobTenure = res.data.map((item) => {
            return item.company.job_tenure
          })

          this.salaries = res.data.map((item) => {
            // 移除「萬」字樣，转化为数字并除以 1000
            return item.company.salary.replace('萬', '')
          })
          console.log('全部薪資陣列', this.salaries)
          this.salaryCountAll = this.salaries.reduce((acc, val) => {
            if (!acc[val]) {
              acc[val] = 1
            } else {
              acc[val]++
            }
            return acc
          }, {})

          this.chartLabelsAll = Object.keys(this.salaryCountAll)
          this.chartDataAll = Object.values(this.salaryCountAll)
        })
    },
    selectTenurePie(tenure) {
      console.log('更換年資')
      this.$http
        .get(
          'https://raw.githubusercontent.com/hexschool/2021-ui-frontend-job/master/frontend_data.json'
        )
        .then((res) => {
          console.log(res.data)
          this.frontendData = res.data
          const salaryByTenure = this.frontendData.reduce((acc, cur) => {
            const { job_tenure, salary } = cur.company
            acc[job_tenure] = Object.assign(acc[job_tenure] || {}, {
              [salary]: ((acc[job_tenure] && acc[job_tenure][salary]) || 0) + 1
            })
            return acc
          }, {})
          this.tenures = Object.keys(salaryByTenure) //年資 key
          this.tenures.pop()
          console.log(salaryByTenure[tenure])
          this.chartLabels = Object.keys(salaryByTenure[tenure])
          this.chartData = Object.values(salaryByTenure[tenure])

          this.renderPieChart()
        })
    },
    getUi() {
      this.$http
        .get('https://raw.githubusercontent.com/hexschool/2021-ui-frontend-job/master/ui_data.json')
        .then((res) => {
          console.log(res.data)
          this.salaries = res.data
          this.salaries.forEach((item) => {
            console.log(item)
          })
        })
    },
    renderPieChart() {
      if (this.chart) {
        this.chart.destroy()
      }
      // 創建新的圖表實例
      const ctx = this.$refs.chartCanvas.getContext('2d')
      this.chart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: this.chartLabels,
          datasets: [
            {
              data: this.chartData
            }
          ]
        }
      })
    }
  },
  mounted() {
    this.selectTenurePie('1 年以下')
  }
}
</script>
