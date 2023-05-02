import{_ as L,r as a,o as j,a as r,c as l,b as o,n as T,w as k,v as F,F as y,d as B,e as O,f as M,C as N,t as V}from"./index-e7654802.js";const P={setup(){const C=a([]),n=a("1 年以下"),u=a([]),t=a([]),c=a([]),v=a(!0),e=a(null),m=a(null),_=a(null),p=s=>{s==="frontendChartCanvas"?(v.value=!0,e.value=m.value,h("1 年以下","frontend")):s==="designerChartCanvas"&&(v.value=!1,e.value=_.value,h("1 年以下","designer")),b(e.value)};j(()=>{p("frontendChartCanvas")});const d=a({}),h=(s,f)=>{let x="https://raw.githubusercontent.com/hexschool/2021-ui-frontend-job/master/frontend_data.json";f==="designer"&&(x="https://raw.githubusercontent.com/hexschool/2021-ui-frontend-job/master/ui_data.json"),M.get(x).then(D=>{d.value=D.data.reduce((i,U)=>{const{job_tenure:g,salary:w}=U.company;return i[g]=Object.assign(i[g]||{},{[w]:(i[g]&&i[g][w]||0)+1}),i},{}),u.value=Object.keys(d.value),u.value.pop(),t.value=Object.keys(d.value[s]),c.value=Object.values(d.value[s]),b(e.value)})},b=s=>{if(!s)return;s.chart&&s.chart.destroy();const f=s.getContext("2d");s.chart=new N(f,{type:"pie",data:{labels:t.value,datasets:[{data:c.value}]}})};return j(()=>{h("1 年以下","frontend"),b(e.value)}),{frontendChartCanvas:m,designerChartCanvas:_,salaryByTenure:d,salaries:C,selectedTenure:n,tenures:u,chartLabels:t,chartData:c,showFrontend:v,canvasRef:e,switchCanvas:p,selectTenurePie:h,renderPieChart:b}}},S={class:"col-12 d-flex align-items-center justify-content-center mb-6"},z={key:0},E={class:"d-flex justify-content-end mb-6"},I=["value"],q={ref:"frontendChartCanvas"},A={key:1},G={class:"d-flex justify-content-end mb-6"},H=["value"],J={ref:"designerChartCanvas"};function K(C,n,u,t,c,v){return r(),l(y,null,[o("div",S,[o("button",{type:"button",class:T(["btn btn-light fs-base py-2 px-12 mb-0 shadow",t.showFrontend?"bg-primary text-light":"bg-light"]),onClick:n[0]||(n[0]=e=>t.switchCanvas("frontendChartCanvas"))}," 前端工程師 ",2),o("button",{type:"button",class:T(["btn btn-light fs-base py-2 px-12 mb-0 shadow",t.showFrontend?"bg-light":"bg-primary text-light"]),onClick:n[1]||(n[1]=e=>t.switchCanvas("designerChartCanvas"))}," UI設計師 ",2)]),t.showFrontend?(r(),l("div",z,[o("div",E,[k(o("select",{"onUpdate:modelValue":n[2]||(n[2]=e=>t.selectedTenure=e),onChange:n[3]||(n[3]=e=>t.selectTenurePie(t.selectedTenure,"frontend")),class:"bg-primary text-light py-2 px-10 rounded"},[(r(!0),l(y,null,B(t.tenures,e=>(r(),l("option",{value:e,key:e+"年"},V(e),9,I))),128))],544),[[F,t.selectedTenure]])]),o("canvas",q,null,512)])):O("",!0),t.showFrontend?O("",!0):(r(),l("div",A,[o("div",G,[k(o("select",{"onUpdate:modelValue":n[4]||(n[4]=e=>t.selectedTenure=e),onChange:n[5]||(n[5]=e=>t.selectTenurePie(t.selectedTenure,"designer")),class:"bg-primary text-light py-2 px-10 rounded"},[(r(!0),l(y,null,B(t.tenures,e=>(r(),l("option",{value:e,key:e+"年"},V(e),9,H))),128))],544),[[F,t.selectedTenure]])]),o("canvas",J,null,512)]))],64)}const W=L(P,[["render",K]]);export{W as default};
