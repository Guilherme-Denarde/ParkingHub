"use strict";(self["webpackChunkparkinghub_v1_0"]=self["webpackChunkparkinghub_v1_0"]||[]).push([[832],{832:function(t,e,a){a.r(e),a.d(e,{default:function(){return P}});var n=a(3396),i=a(9242),s=a(7139);const o={class:"container"},c=(0,n._)("h1",null,"Settings",-1),r={class:"option"},d=(0,n._)("label",{for:"hourValue"},"Hour Value:",-1),u={class:"option"},l=(0,n._)("label",{for:"trafficTicket"},"Traffic Ticket:",-1),k={class:"option"},h=(0,n._)("label",{for:"startWorkHr"},"Start Work Hour:",-1),p={class:"option"},g=(0,n._)("label",{for:"endWorkHr"},"End Work Hour:",-1),f={class:"option"},V=(0,n._)("label",{for:"discountTime"},"Discount value:",-1),y={class:"option"},v=(0,n._)("label",{for:"discountTime"},"Discount Time:",-1),m={class:"option"},b=(0,n._)("label",{for:"discountShift"},"Discount Shift:",-1),_=(0,n._)("div",{class:"handle"},null,-1),S=[_],T={class:"option"},H=(0,n._)("label",{for:"carVacancy"},"Car Vacancy:",-1),W={class:"option"},w=(0,n._)("label",{for:"bikeVacancy"},"Bike Vacancy:",-1),D={class:"option"},M=(0,n._)("label",{for:"vanVacancy"},"Van Vacancy:",-1),U={class:"dark-mode"},C=(0,n._)("label",{for:"darkMode"},"Dark Mode:",-1),j=(0,n._)("div",{class:"handle"},null,-1),B=[j];function x(t,e,a,_,j,x){return(0,n.wg)(),(0,n.iD)("div",o,[c,(0,n._)("div",r,[d,(0,n.wy)((0,n._)("input",{"onUpdate:modelValue":e[0]||(e[0]=t=>j.hourValue=t),type:"number",min:"0",step:"0.01",class:"rounded-input"},null,512),[[i.nr,j.hourValue]])]),(0,n._)("div",u,[l,(0,n.wy)((0,n._)("input",{"onUpdate:modelValue":e[1]||(e[1]=t=>j.trafficTicket=t),type:"number",min:"0",step:"0.01",class:"rounded-input"},null,512),[[i.nr,j.trafficTicket]])]),(0,n._)("div",k,[h,(0,n.wy)((0,n._)("input",{"onUpdate:modelValue":e[2]||(e[2]=t=>j.startWorkHr=t),type:"time",class:"rounded-input"},null,512),[[i.nr,j.startWorkHr]])]),(0,n._)("div",p,[g,(0,n.wy)((0,n._)("input",{"onUpdate:modelValue":e[3]||(e[3]=t=>j.endWorkHr=t),type:"time",class:"rounded-input"},null,512),[[i.nr,j.endWorkHr]])]),(0,n._)("div",f,[V,(0,n.wy)((0,n._)("input",{"onUpdate:modelValue":e[4]||(e[4]=e=>t.discountValue=e),type:"number",min:"0",step:"0.01",class:"rounded-input"},null,512),[[i.nr,t.discountValue]])]),(0,n._)("div",y,[v,(0,n.wy)((0,n._)("input",{"onUpdate:modelValue":e[5]||(e[5]=t=>j.discountTime=t),type:"number",min:"0",step:"0.01",class:"rounded-input"},null,512),[[i.nr,j.discountTime]])]),(0,n._)("div",m,[b,(0,n._)("div",{class:(0,s.C_)(["toggle-button",{active:j.discountShift}]),onClick:e[6]||(e[6]=(...t)=>x.toggleDiscountShift&&x.toggleDiscountShift(...t))},S,2)]),(0,n._)("div",T,[H,(0,n.wy)((0,n._)("input",{"onUpdate:modelValue":e[7]||(e[7]=t=>j.carVacancy=t),type:"number",min:"0",class:"rounded-input"},null,512),[[i.nr,j.carVacancy]])]),(0,n._)("div",W,[w,(0,n.wy)((0,n._)("input",{"onUpdate:modelValue":e[8]||(e[8]=t=>j.bikeVacancy=t),type:"number",min:"0",class:"rounded-input"},null,512),[[i.nr,j.bikeVacancy]])]),(0,n._)("div",D,[M,(0,n.wy)((0,n._)("input",{"onUpdate:modelValue":e[9]||(e[9]=t=>j.vanVacancy=t),type:"number",min:"0",class:"rounded-input"},null,512),[[i.nr,j.vanVacancy]])]),(0,n._)("div",U,[C,(0,n._)("div",{class:(0,s.C_)(["toggle-button",{active:j.darkMode}]),onClick:e[10]||(e[10]=(...t)=>x.toggleDarkMode&&x.toggleDarkMode(...t))},B,2)])])}var L={data(){return{hourValue:0,trafficTicket:0,startWorkHr:"",endWorkHr:"",discountTime:0,discountShift:!1,carVacancy:0,bikeVacancy:0,vanVacancy:0,darkMode:!1}},mounted(){this.loadSettings()},methods:{loadSettings(){const t=window.indexedDB.open("settingsDatabase",1);t.onupgradeneeded=t=>{const e=t.target.result,a=e.createObjectStore("settings",{keyPath:"id"});a.transaction.oncomplete=()=>{const t=e.transaction("settings","readwrite").objectStore("settings");t.add(this.getDefaultSettings())}},t.onsuccess=t=>{const e=t.target.result,a=e.transaction("settings","readwrite").objectStore("settings"),n=a.get(1);n.onsuccess=t=>{const e=t.target.result;e&&this.updateSettings(e)}}},getDefaultSettings(){return{id:1,hourValue:0,trafficTicket:0,startWorkHr:"",endWorkHr:"",discountTime:0,discountShift:!1,carVacancy:0,bikeVacancy:0,vanVacancy:0,darkMode:!1}},updateSettings(t){this.hourValue=t.hourValue,this.trafficTicket=t.trafficTicket,this.startWorkHr=t.startWorkHr,this.endWorkHr=t.endWorkHr,this.discountTime=t.discountTime,this.discountShift=t.discountShift,this.carVacancy=t.carVacancy,this.bikeVacancy=t.bikeVacancy,this.vanVacancy=t.vanVacancy,this.darkMode=t.darkMode,document.body.classList.toggle("dark",this.darkMode)},saveSettings(){const t=window.indexedDB.open("settingsDatabase",1);t.onsuccess=t=>{const e=t.target.result,a=e.transaction("settings","readwrite").objectStore("settings"),n={id:1,hourValue:this.hourValue,trafficTicket:this.trafficTicket,startWorkHr:this.startWorkHr,endWorkHr:this.endWorkHr,discountTime:this.discountTime,discountShift:this.discountShift,carVacancy:this.carVacancy,bikeVacancy:this.bikeVacancy,vanVacancy:this.vanVacancy,darkMode:this.darkMode};a.put(n)}},toggleDiscountShift(){this.discountShift=!this.discountShift},toggleDarkMode(){this.darkMode=!this.darkMode,document.body.classList.toggle("dark",this.darkMode)}},watch:{hourValue:"saveSettings",trafficTicket:"saveSettings",startWorkHr:"saveSettings",endWorkHr:"saveSettings",discountTime:"saveSettings",discountShift:"saveSettings",carVacancy:"saveSettings",bikeVacancy:"saveSettings",vanVacancy:"saveSettings",darkMode:"saveSettings"}},E=a(89);const O=(0,E.Z)(L,[["render",x]]);var P=O}}]);
//# sourceMappingURL=832.231fa0d5.js.map