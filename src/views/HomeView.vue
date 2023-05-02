<template>
  <main>
    <div class="container">
      <h1 class="fs-sm p-6 shadow bg-light fw-bold mb-10">2021 薪資數據圖表調查</h1>

      <div class="row">
        <div class="col-3">
          <div class="shadow">
            <h2 class="bg-light p-6 fs-lg fw-bold mb-0 rounded-top-3 bg-white">資訊類別</h2>
            <ul class="list-group bg-white mb-6">
              <li class="list-group-item p-6 rounded-top-0 border-0 bg-primary text-light">
                平均年薪
              </li>
              <li class="list-group-item p-6 text-primary border-0" disabled>
                首份工作使用技術及軟體
              </li>
              <li class="list-group-item p-6 text-primary border-0" disabled>工作相關資訊</li>
              <li class="list-group-item p-6 text-primary border-0" disabled>薪資與產業滿意度</li>
            </ul>
          </div>
          <div class="shadow">
            <h2 class="p-6 fs-lg fw-bold rounded-top-3 bg-white">圖表類別</h2>
            <ul class="list-group mb-6">
              <li>
                <RouterLink to="/" class="list-group-item p-6 text-primary border-0"
                  >圓餅圖</RouterLink
                >
              </li>
              <li>
                <RouterLink to="line" class="list-group-item p-6 text-primary border-0"
                  >折線圖</RouterLink
                >
              </li>
              <li>
                <RouterLink to="bar" class="list-group-item p-6 text-primary border-0"
                  >長條圖</RouterLink
                >
              </li>
            </ul>
          </div>
        </div>
        <div class="col-9">
          <div class="row justify-content-center">
            <RouterView />
          </div>
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
      salaries: [],
      salaryCountAll: {},
      selectedTenure: '1 年以下',
      tenures: [],
      jobTenure: [],
      frontendData: [],
      UiData: [],
      chartLabelsAll: [],
      chartDataAll: [],
      chartLabels: [],
      chartData: [],
      showFrontend: true,
      canvasRef: 'frontendChartCanvas'
    }
  },
  methods: {
    getFrontend() {
      this.$http
        .get(
          'https://raw.githubusercontent.com/hexschool/2021-ui-frontend-job/master/frontend_data.json'
        )
        .then((res) => {
          this.frontendData = res.data
          const salaryByTenure = this.frontendData.reduce((acc, cur) => {
            const { job_tenure, salary } = cur.company
            acc[job_tenure] = Object.assign(acc[job_tenure] || {}, {
              [salary]: ((acc[job_tenure] && acc[job_tenure][salary]) || 0) + 1
            })
            return acc
          }, {})

          this.chartLabels = Object.keys(salaryByTenure['1 年以下'])
          this.chartData = Object.values(salaryByTenure['1 年以下'])

          this.tenures = Object.keys(salaryByTenure) //年資 key

          this.jobTenure = res.data.map((item) => {
            return item.company.job_tenure
          })

          this.salaries = res.data.map((item) => {
            // 移除「萬」字樣，转化为数字并除以 1000
            return item.company.salary.replace('萬', '')
          })

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
    selectTenurePieUi(tenure) {
      this.$http
        .get('https://raw.githubusercontent.com/hexschool/2021-ui-frontend-job/master/ui_data.json')
        .then((res) => {
          const salaryByTenure = res.data.reduce((acc, cur) => {
            const { job_tenure, salary } = cur.company
            acc[job_tenure] = Object.assign(acc[job_tenure] || {}, {
              [salary]: ((acc[job_tenure] && acc[job_tenure][salary]) || 0) + 1
            })
            return acc
          }, {})
          this.tenures = Object.keys(salaryByTenure) //年資 key
          this.tenures.pop()

          this.chartLabels = Object.keys(salaryByTenure[tenure])
          this.chartData = Object.values(salaryByTenure[tenure])

          this.renderPieChart()
        })
    },
    switchCanvas(canvasRef) {
      if (canvasRef === 'frontendChartCanvas') {
        this.showFrontend = true
        this.canvasRef = this.$refs.frontendChartCanvas
        this.renderPieChart(this.canvasRef)
      } else if (canvasRef === 'designerChartCanvas') {
        this.showFrontend = false
        this.canvasRef = this.$refs.designerChartCanvas
        this.renderPieChart(this.canvasRef)
      }
    },
    selectTenurePie(tenure, jobType) {
      let url =
        'https://raw.githubusercontent.com/hexschool/2021-ui-frontend-job/master/frontend_data.json'
      if (jobType === 'designer') {
        url = 'https://raw.githubusercontent.com/hexschool/2021-ui-frontend-job/master/ui_data.json'
      }
      this.$http.get(url).then((res) => {
        const salaryByTenure = res.data.reduce((acc, cur) => {
          const { job_tenure, salary } = cur.company
          acc[job_tenure] = Object.assign(acc[job_tenure] || {}, {
            [salary]: ((acc[job_tenure] && acc[job_tenure][salary]) || 0) + 1
          })
          return acc
        }, {})
        this.tenures = Object.keys(salaryByTenure) //年資 key
        this.tenures.pop()

        this.chartLabels = Object.keys(salaryByTenure[tenure])
        this.chartData = Object.values(salaryByTenure[tenure])
        this.renderPieChart(this.canvasRef)
      })
    },
    renderPieChart(canvasRef) {
      if (!canvasRef) {
        return // 當 canvasRef 為 null 或 undefined 時退出函數
      }
      if (canvasRef.chart) {
        canvasRef.chart.destroy()
      }
      // 創建新的圖表實例
      const ctx = canvasRef.getContext('2d')
      canvasRef.chart = new Chart(ctx, {
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
    this.switchCanvas('frontendChartCanvas')
    this.selectTenurePie('1 年以下', 'frontend')
    this.renderPieChart(this.canvasRef)
    this.getFrontend()
  }
}
</script>
