import{_ as L,r as s,o as T,a,c as r,b as l,n as j,w as F,v as B,F as f,d as O,e as y,f as M,C as N,t as V}from"./index-665a2eaa.js";const S={setup(){const _=s([]),n=s("1 年以下"),i=s([]),t=s([]),c=s([]),v=s(!0),e=s(null),m=s(null),w=s(null),x=o=>{o==="frontendChartCanvas"?(console.log("目前職位:",o,e),v.value=!0,e.value=m.value,console.log(e.value),h("1 年以下","frontend")):o==="designerChartCanvas"&&(console.log("目前職位:",o,e),v.value=!1,e.value=w.value,h("1 年以下","designer")),g(e.value)};T(()=>{console.log(e.value),x("frontendChartCanvas")});const d=s({}),h=(o,C)=>{let p="https://raw.githubusercontent.com/hexschool/2021-ui-frontend-job/master/frontend_data.json";C==="designer"&&(p="https://raw.githubusercontent.com/hexschool/2021-ui-frontend-job/master/ui_data.json"),M.get(p).then(D=>{d.value=D.data.reduce((u,U)=>{const{job_tenure:b,salary:k}=U.company;return u[b]=Object.assign(u[b]||{},{[k]:(u[b]&&u[b][k]||0)+1}),u},{}),console.log(d.value),i.value=Object.keys(d.value),i.value.pop(),t.value=Object.keys(d.value[o]),c.value=Object.values(d.value[o]),g(e.value)})},g=o=>{if(!o){console.log("PieCanvasRef===null");return}o.chart&&o.chart.destroy();const C=o.getContext("2d");o.chart=new N(C,{type:"bar",data:{labels:t.value,datasets:[{data:c.value,backgroundColor:["rgba(135, 91, 87, 1)"]}]},options:{indexAxis:"y"}})};return T(()=>{h("1 年以下","frontend"),g(e.value)}),{frontendChartCanvas:m,designerChartCanvas:w,salaryByTenure:d,salaries:_,selectedTenure:n,tenures:i,chartLabels:t,chartData:c,showFrontend:v,canvasRef:e,switchCanvas:x,selectTenurePie:h,renderPieChart:g}}},z=l("div",null,"這是長條圖",-1),A={class:"col-12 d-flex align-items-center justify-content-center"},E={key:0},I=["value"],P={ref:"frontendChartCanvas"},q={key:1},G=["value"],H={key:0,ref:"designerChartCanvas"};function J(_,n,i,t,c,v){return a(),r(f,null,[z,l("div",A,[l("button",{type:"button",class:j(["btn btn-light fs-base py-2 px-12 mb-0 shadow",t.showFrontend?"bg-primary text-light":"bg-light"]),onClick:n[0]||(n[0]=e=>t.switchCanvas("frontendChartCanvas"))}," 前端工程師 ",2),l("button",{type:"button",class:j(["btn btn-light fs-base py-2 px-12 mb-0 shadow",t.showFrontend?"bg-light":"bg-primary text-light"]),onClick:n[1]||(n[1]=e=>t.switchCanvas("designerChartCanvas"))}," UI設計師 ",2)]),t.showFrontend?(a(),r("div",E,[F(l("select",{"onUpdate:modelValue":n[2]||(n[2]=e=>t.selectedTenure=e),onChange:n[3]||(n[3]=e=>t.selectTenurePie(t.selectedTenure,"frontend"))},[(a(!0),r(f,null,O(t.tenures,e=>(a(),r("option",{value:e,key:e+"年"},V(e),9,I))),128))],544),[[B,t.selectedTenure]]),l("canvas",P,null,512)])):y("",!0),t.showFrontend?y("",!0):(a(),r("div",q,[F(l("select",{"onUpdate:modelValue":n[4]||(n[4]=e=>t.selectedTenure=e),onChange:n[5]||(n[5]=e=>t.selectTenurePie(t.selectedTenure,"designer"))},[(a(!0),r(f,null,O(t.tenures,e=>(a(),r("option",{value:e,key:e+"年"},V(e),9,G))),128))],544),[[B,t.selectedTenure]]),t.showFrontend?y("",!0):(a(),r("canvas",H,null,512))]))],64)}const Q=L(S,[["render",J]]);export{Q as default};
