<template>
  <div class="col-12 d-flex align-items-center justify-content-center">
    <button
      type="button"
      class="btn btn-light fs-base py-2 px-12 mb-0 shadow"
      @click="getAllAverageSalary('frontend')"
      :class="showFrontend ? 'bg-primary text-light' : 'bg-light'"
    >
      前端工程師
    </button>
    <button
      type="button"
      class="btn btn-light fs-base py-2 px-12 mb-0 shadow"
      @click="getAllAverageSalary('designer')"
      :class="showFrontend ? 'bg-light' : 'bg-primary text-light'"
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
import { ref, onMounted } from 'vue'
import axios from 'axios'
export default {
  setup() {
    const salaries = ref([])
    const salaryCountAll = ref({})
    const chartLabelsAll = ref([])
    const chartDataAll = ref([])
    const showFrontend = ref(true)
    const canvasRef = ref(null)
    const frontendChartCanvas = ref(null)
    const designerChartCanvas = ref(null)

    const getAllAverageSalary = (jobType) => {
      let url = ''
      if (jobType === 'frontend') {
        url =
          'https://raw.githubusercontent.com/hexschool/2021-ui-frontend-job/master/frontend_data.json'
        showFrontend.value = true
        canvasRef.value = frontendChartCanvas.value
      } else if (jobType === 'designer') {
        url = 'https://raw.githubusercontent.com/hexschool/2021-ui-frontend-job/master/ui_data.json'
        showFrontend.value = false
        canvasRef.value = designerChartCanvas.value
      }

      axios.get(url).then((res) => {
        salaries.value = res.data.map((item) => {
          return item.company.salary
        })

        salaryCountAll.value = salaries.value.reduce((acc, val) => {
          if (!acc[val]) {
            acc[val] = 1
          } else {
            acc[val]++
          }
          return acc
        }, {})

        chartLabelsAll.value = Object.keys(salaryCountAll.value)
        chartDataAll.value = Object.values(salaryCountAll.value)

        renderChart(canvasRef.value)
      })
    }

    const renderChart = (renderCanvasRef) => {
      if (!renderCanvasRef) {
        return // 當 RenderCanvasRef 為 null 或 undefined 時退出函數
      }
      if (renderCanvasRef.chart) {
        renderCanvasRef.chart.destroy()
      }
      // 創建新的圖表實例
      const ctx = renderCanvasRef.getContext('2d')
      renderCanvasRef.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: chartLabelsAll.value,
          datasets: [
            {
              label: '平均年薪',
              data: chartDataAll.value,
              borderColor: ['rgba(135, 91, 87, 1)']
            }
          ]
        }
      })
    }
    onMounted(() => {
      getAllAverageSalary('frontend')
      renderChart(canvasRef.value)
    })
    return {
      salaries,
      salaryCountAll,
      chartLabelsAll,
      chartDataAll,
      showFrontend,
      getAllAverageSalary,
      renderChart,
      canvasRef,
      frontendChartCanvas,
      designerChartCanvas
    }
  }
}
</script>
