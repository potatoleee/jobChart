<template>
  <div>這是圓餅圖</div>

  <div class="col-12 d-flex align-items-center justify-content-center">
    <button
      type="button"
      class="btn btn-light fs-base py-2 px-12 mb-0 shadow"
      @click="switchCanvas('frontendChartCanvas')"
      :class="showFrontend ? 'bg-primary text-light' : 'bg-light'"
    >
      前端工程師
    </button>
    <button
      type="button"
      class="btn btn-light fs-base py-2 px-12 mb-0 shadow"
      @click="switchCanvas('designerChartCanvas')"
      :class="showFrontend ? 'bg-light' : 'bg-primary text-light'"
    >
      UI設計師
    </button>
  </div>
  <div v-if="showFrontend">
    <select v-model="selectedTenure" @change="selectTenurePie(selectedTenure, 'frontend')">
      <option v-for="tenure in tenures" :value="tenure" :key="tenure + '年'">
        {{ tenure }}
      </option>
    </select>
    <canvas ref="frontendChartCanvas"></canvas>
  </div>
  <div v-if="!showFrontend">
    <select v-model="selectedTenure" @change="selectTenurePie(selectedTenure, 'designer')">
      <option v-for="tenure in tenures" :value="tenure" :key="tenure + '年'">
        {{ tenure }}
      </option>
    </select>
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
    const selectedTenure = ref('1 年以下')
    const tenures = ref([])
    const chartLabels = ref([])
    const chartData = ref([])
    const showFrontend = ref(true)

    const canvasRef = ref(null)
    const frontendChartCanvas = ref(null)
    const designerChartCanvas = ref(null)
    const switchCanvas = (chartCanvasRef) => {
      if (chartCanvasRef === 'frontendChartCanvas') {
        console.log('目前職位:', chartCanvasRef, canvasRef)
        showFrontend.value = true
        canvasRef.value = frontendChartCanvas.value
        console.log(canvasRef.value)

        // canvasRef.value = frontendChartCanvas.value
        selectTenurePie('1 年以下', 'frontend')
      } else if (chartCanvasRef === 'designerChartCanvas') {
        console.log('目前職位:', chartCanvasRef, canvasRef)
        showFrontend.value = false

        canvasRef.value = designerChartCanvas.value

        selectTenurePie('1 年以下', 'designer')
      }
      renderPieChart(canvasRef.value)
    }
    onMounted(() => {
      console.log(canvasRef.value)
      switchCanvas('frontendChartCanvas')
    })

    const salaryByTenure = ref({})
    const selectTenurePie = (tenure, jobType) => {
      let url =
        'https://raw.githubusercontent.com/hexschool/2021-ui-frontend-job/master/frontend_data.json'
      if (jobType === 'designer') {
        url = 'https://raw.githubusercontent.com/hexschool/2021-ui-frontend-job/master/ui_data.json'
      }
      axios.get(url).then((res) => {
        salaryByTenure.value = res.data.reduce((acc, cur) => {
          const { job_tenure, salary } = cur.company
          acc[job_tenure] = Object.assign(acc[job_tenure] || {}, {
            [salary]: ((acc[job_tenure] && acc[job_tenure][salary]) || 0) + 1
          })
          return acc
        }, {})
        console.log(salaryByTenure.value)
        tenures.value = Object.keys(salaryByTenure.value) //年資 key
        tenures.value.pop()

        chartLabels.value = Object.keys(salaryByTenure.value[tenure])
        chartData.value = Object.values(salaryByTenure.value[tenure])
        renderPieChart(canvasRef.value)
      })
    }

    const renderPieChart = (PieCanvasRef) => {
      if (!PieCanvasRef) {
        console.log('PieCanvasRef===null')
        // 創建一個新的 canvas 元素
        return
      }
      if (PieCanvasRef.chart) {
        PieCanvasRef.chart.destroy()
      }
      // 創建新的圖表實例
      const ctx = PieCanvasRef.getContext('2d')

      PieCanvasRef.chart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: chartLabels.value,
          datasets: [
            {
              data: chartData.value
            }
          ]
        }
      })
    }
    onMounted(() => {
      selectTenurePie('1 年以下', 'frontend')
      renderPieChart(canvasRef.value)
    })
    return {
      frontendChartCanvas,
      designerChartCanvas,
      salaryByTenure,
      salaries,
      selectedTenure,
      tenures,
      chartLabels,
      chartData,
      showFrontend,
      canvasRef,
      switchCanvas,
      selectTenurePie,
      renderPieChart
    }
  }
}
</script>
