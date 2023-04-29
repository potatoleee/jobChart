import{_ as p,C as v,o as i,c as l,a as h,w as C,v as y,F as d,r as f,b as c,t as g}from"./index-f8286bee.js";const j={data(){return{salaries:[],salaryCountAll:{},selectedTenure:"1 年以下",tenures:[],jobTenure:[],frontendData:[],UiData:[],chartLabelsAll:[],chartDataAll:[],chartLabels:[],chartData:[],showFrontend:!0,canvasRef:"frontendChartCanvas"}},methods:{getFrontend(){this.$http.get("https://raw.githubusercontent.com/hexschool/2021-ui-frontend-job/master/frontend_data.json").then(s=>{console.log(s.data),this.frontendData=s.data;const e=this.frontendData.reduce((t,o)=>{const{job_tenure:n,salary:a}=o.company;return t[n]=Object.assign(t[n]||{},{[a]:(t[n]&&t[n][a]||0)+1}),t},{});console.log("年資:薪資",e),console.log(e["1 年以下"]),this.chartLabels=Object.keys(e["1 年以下"]),this.chartData=Object.values(e["1 年以下"]),this.tenures=Object.keys(e),console.log(this.tenures),this.jobTenure=s.data.map(t=>t.company.job_tenure),this.salaries=s.data.map(t=>t.company.salary.replace("萬","")),console.log("全部薪資陣列",this.salaries),this.salaryCountAll=this.salaries.reduce((t,o)=>(t[o]?t[o]++:t[o]=1,t),{}),this.chartLabelsAll=Object.keys(this.salaryCountAll),this.chartDataAll=Object.values(this.salaryCountAll)})},selectTenurePieUi(s){this.$http.get("https://raw.githubusercontent.com/hexschool/2021-ui-frontend-job/master/ui_data.json").then(e=>{const t=e.data.reduce((o,n)=>{const{job_tenure:a,salary:r}=n.company;return o[a]=Object.assign(o[a]||{},{[r]:(o[a]&&o[a][r]||0)+1}),o},{});this.tenures=Object.keys(t),this.tenures.pop(),console.log(t[s]),this.chartLabels=Object.keys(t[s]),this.chartData=Object.values(t[s]),this.renderPieChart()})},switchCanvas(s){console.log("切換圖表",s),s==="frontendChartCanvas"?(this.showFrontend=!0,this.canvasRef=this.$refs.frontendChartCanvas,this.renderPieChart(this.canvasRef),console.log(this.canvasRef)):s==="designerChartCanvas"&&(this.showFrontend=!1,this.canvasRef=this.$refs.designerChartCanvas,this.renderPieChart(this.canvasRef))},selectTenurePie(s,e){let t="https://raw.githubusercontent.com/hexschool/2021-ui-frontend-job/master/frontend_data.json";e==="designer"&&(t="https://raw.githubusercontent.com/hexschool/2021-ui-frontend-job/master/ui_data.json"),this.$http.get(t).then(o=>{const n=o.data.reduce((a,r)=>{const{job_tenure:u,salary:b}=r.company;return a[u]=Object.assign(a[u]||{},{[b]:(a[u]&&a[u][b]||0)+1}),a},{});this.tenures=Object.keys(n),this.tenures.pop(),this.chartLabels=Object.keys(n[s]),this.chartData=Object.values(n[s]),this.renderPieChart(this.canvasRef)})},renderPieChart(s){if(!s)return;s.chart&&s.chart.destroy();const e=s.getContext("2d");s.chart=new v(e,{type:"pie",data:{labels:this.chartLabels,datasets:[{data:this.chartData}]}})}},mounted(){this.switchCanvas("frontendChartCanvas"),this.selectTenurePie("1 年以下","frontend"),this.renderPieChart(this.canvasRef),this.getFrontend()}},m=h("div",null,"這是圓餅圖",-1),_={class:"col-12 d-flex align-items-center justify-content-center"},w={key:0},T=["value"],k={ref:"frontendChartCanvas"},O={key:1},x=["value"],D={key:0,ref:"designerChartCanvas"};function P(s,e,t,o,n,a){return i(),l(d,null,[m,h("div",_,[h("button",{type:"button",class:"btn btn-light fs-base py-2 px-12 mb-0 bg-light shadow",onClick:e[0]||(e[0]=r=>a.switchCanvas("frontendChartCanvas"))}," 前端工程師 "),h("button",{type:"button",class:"btn btn-light fs-base py-2 px-12 mb-0 bg-light shadow",onClick:e[1]||(e[1]=r=>a.switchCanvas("designerChartCanvas"))}," UI設計師 ")]),n.showFrontend?(i(),l("div",w,[C(h("select",{"onUpdate:modelValue":e[2]||(e[2]=r=>n.selectedTenure=r),onChange:e[3]||(e[3]=r=>a.selectTenurePie(n.selectedTenure,"frontend"))},[(i(!0),l(d,null,f(n.tenures,r=>(i(),l("option",{value:r,key:r+"年"},g(r),9,T))),128))],544),[[y,n.selectedTenure]]),h("canvas",k,null,512)])):c("",!0),n.showFrontend?c("",!0):(i(),l("div",O,[C(h("select",{"onUpdate:modelValue":e[4]||(e[4]=r=>n.selectedTenure=r),onChange:e[5]||(e[5]=r=>a.selectTenurePie(n.selectedTenure,"designer"))},[(i(!0),l(d,null,f(n.tenures,r=>(i(),l("option",{value:r,key:r+"年"},g(r),9,x))),128))],544),[[y,n.selectedTenure]]),n.showFrontend?c("",!0):(i(),l("canvas",D,null,512))]))],64)}const A=p(j,[["render",P]]);export{A as default};
