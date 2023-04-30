import{_ as b,C,o as l,c as d,a as h,b as u,F as f}from"./index-79f66a65.js";const g={data(){return{salaries:[],salaryCountAll:{},selectedTenure:"1 年以下",tenures:[],jobTenure:[],frontendData:[],UiData:[],chartLabelsAll:[],chartDataAll:[],chartLabels:[],chartData:[],showFrontend:!0,canvasRef:"frontendChartCanvas"}},methods:{getFrontend(){this.$http.get("https://raw.githubusercontent.com/hexschool/2021-ui-frontend-job/master/frontend_data.json").then(e=>{console.log(e.data),this.frontendData=e.data;const r=this.frontendData.reduce((t,a)=>{const{job_tenure:n,salary:s}=a.company;return t[n]=Object.assign(t[n]||{},{[s]:(t[n]&&t[n][s]||0)+1}),t},{});this.tenures=Object.keys(r),console.log(this.tenures),this.jobTenure=e.data.map(t=>t.company.job_tenure),this.salaries=e.data.map(t=>t.company.salary),console.log("全部薪資陣列",this.salaries),this.salaryCountAll=this.salaries.reduce((t,a)=>(t[a]?t[a]++:t[a]=1,t),{}),console.log(this.salaryCountAll),this.chartLabelsAll=Object.keys(this.salaryCountAll),this.chartDataAll=Object.values(this.salaryCountAll),console.log(this.chartLabelsAll,this.chartDataAll),this.renderPieChart(this.canvasRef)})},selectTenurePieUi(e){this.$http.get("https://raw.githubusercontent.com/hexschool/2021-ui-frontend-job/master/ui_data.json").then(r=>{const t=r.data.reduce((a,n)=>{const{job_tenure:s,salary:o}=n.company;return a[s]=Object.assign(a[s]||{},{[o]:(a[s]&&a[s][o]||0)+1}),a},{});this.tenures=Object.keys(t),this.tenures.pop(),console.log(t[e]),this.chartLabels=Object.keys(t[e]),this.chartData=Object.values(t[e]),this.renderPieChart()})},switchCanvas(e){console.log("切換圖表",e),e==="frontendChartCanvas"?(this.showFrontend=!0,this.canvasRef=this.$refs.frontendChartCanvas,this.renderPieChart(this.canvasRef),console.log(this.canvasRef)):e==="designerChartCanvas"&&(this.showFrontend=!1,this.canvasRef=this.$refs.designerChartCanvas,this.renderPieChart(this.canvasRef))},selectTenurePie(e,r){let t="https://raw.githubusercontent.com/hexschool/2021-ui-frontend-job/master/frontend_data.json";r==="designer"&&(t="https://raw.githubusercontent.com/hexschool/2021-ui-frontend-job/master/ui_data.json"),this.$http.get(t).then(a=>{const n=a.data.reduce((s,o)=>{const{job_tenure:i,salary:c}=o.company;return s[i]=Object.assign(s[i]||{},{[c]:(s[i]&&s[i][c]||0)+1}),s},{});this.tenures=Object.keys(n),this.tenures.pop(),this.chartLabels=Object.keys(n[e]),console.log(this.chartLabels),this.chartData=Object.values(n[e]),this.renderPieChart(this.canvasRef)})},renderPieChart(e){if(!e)return;e.chart&&e.chart.destroy();const r=e.getContext("2d");e.chart=new C(r,{type:"line",data:{labels:this.chartLabelsAll,datasets:[{data:this.chartDataAll,backgroundColor:["rgba(135, 91, 87, 1)"]}]}})}},mounted(){this.switchCanvas("frontendChartCanvas"),this.selectTenurePie("1 年以下","frontend"),this.renderPieChart(this.canvasRef),this.getFrontend()}},y=h("div",null,"這是折線圖",-1),p={class:"col-12 d-flex align-items-center justify-content-center"},_={key:0},v={ref:"frontendChartCanvas"},j={key:1},m={ref:"designerChartCanvas"};function w(e,r,t,a,n,s){return l(),d(f,null,[y,h("div",p,[h("button",{type:"button",class:"btn btn-light fs-base py-2 px-12 mb-0 bg-light shadow",onClick:r[0]||(r[0]=o=>s.switchCanvas("frontendChartCanvas"))}," 前端工程師 "),h("button",{type:"button",class:"btn btn-light fs-base py-2 px-12 mb-0 bg-light shadow",onClick:r[1]||(r[1]=o=>s.switchCanvas("designerChartCanvas"))}," UI設計師 ")]),n.showFrontend?(l(),d("div",_,[h("canvas",v,null,512)])):u("",!0),n.showFrontend?u("",!0):(l(),d("div",j,[h("canvas",m,null,512)]))],64)}const x=b(g,[["render",w]]);export{x as default};
