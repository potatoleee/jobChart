<template>
  <div>這是折線圖</div>
  <div class="col-12 d-flex align-items-center justify-content-center">
    <button
      type="button"
      class="btn btn-light fs-base py-2 px-12 mb-0 bg-light shadow"
      @click="switchCanvas('frontendChartCanvas')"
    >
      前端工程師
    </button>
    <button
      type="button"
      class="btn btn-light fs-base py-2 px-12 mb-0 bg-light shadow"
      @click="switchCanvas('designerChartCanvas')"
    >
      UI設計師
    </button>
  </div>
  <div v-if="showFrontend">
    <canvas ref="frontendChartCanvas"></canvas>
  </div>
  <div v-if="!showFrontend">
    <canvas ref="designerChartCanvas"></canvas>
  </div>
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
          console.log(this.tenures)

          this.jobTenure = res.data.map((item) => {
            return item.company.job_tenure
          })

          this.salaries = res.data.map((item) => {
            // 移除「萬」字樣，转化为数字并除以 1000
            return item.company.salary
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
          console.log(this.salaryCountAll)
          this.chartLabelsAll = Object.keys(this.salaryCountAll)
          this.chartDataAll = Object.values(this.salaryCountAll)
          console.log(this.chartLabelsAll, this.chartDataAll)
          this.renderPieChart(this.canvasRef)
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
          console.log(salaryByTenure[tenure])
          this.chartLabels = Object.keys(salaryByTenure[tenure])
          this.chartData = Object.values(salaryByTenure[tenure])

          this.renderPieChart()
        })
    },
    switchCanvas(canvasRef) {
      console.log('切換圖表', canvasRef)
      if (canvasRef === 'frontendChartCanvas') {
        this.showFrontend = true
        this.canvasRef = this.$refs.frontendChartCanvas
        this.renderPieChart(this.canvasRef)
        console.log(this.canvasRef)
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
        console.log(this.chartLabels)
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
        type: 'line',
        data: {
          labels: this.chartLabelsAll,
          datasets: [
            {
              data: this.chartDataAll,
              backgroundColor: ['rgba(135, 91, 87, 1)']
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
