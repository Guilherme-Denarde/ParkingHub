"use strict";(self["webpackChunkparkinghub_v1_0"]=self["webpackChunkparkinghub_v1_0"]||[]).push([[637],{7637:function(e,t,l){l.r(t),l.d(t,{default:function(){return B}});var n=l(3396),a=l(7139),o=l(9242);const c=e=>((0,n.dD)("data-v-2879cb66"),e=e(),(0,n.Cn)(),e),i={class:"container"},r=c((()=>(0,n._)("h1",null,"Vehicles",-1))),d={class:"input-section"},u=["value"],s=["value"],p=(0,n.uE)('<option value="Red" data-v-2879cb66>Red</option><option value="Blue" data-v-2879cb66>Blue</option><option value="Green" data-v-2879cb66>Green</option><option value="Yellow" data-v-2879cb66>Yellow</option><option value="Black" data-v-2879cb66>Black</option><option value="White" data-v-2879cb66>White</option>',6),h=[p],v={class:"vehicles-table"},b=c((()=>(0,n._)("thead",null,[(0,n._)("tr",null,[(0,n._)("th",null,"Brand"),(0,n._)("th",null,"Model"),(0,n._)("th",null,"Color"),(0,n._)("th",null,"Plate"),(0,n._)("th",null,"Actions")])],-1))),w=["onClick"],m=["onClick"];function _(e,t,l,c,p,_){return(0,n.wg)(),(0,n.iD)("div",i,[r,(0,n._)("div",d,[(0,n.wy)((0,n._)("select",{"onUpdate:modelValue":t[0]||(t[0]=t=>e.newVehicleBrandId=t),class:"brand-input"},[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(e.brands,(e=>((0,n.wg)(),(0,n.iD)("option",{key:e.id,value:e.id},(0,a.zw)(e.name),9,u)))),128))],512),[[o.bM,e.newVehicleBrandId]]),(0,n.wy)((0,n._)("select",{"onUpdate:modelValue":t[1]||(t[1]=t=>e.newVehicleModelId=t),class:"brand-input"},[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(e.models,(e=>((0,n.wg)(),(0,n.iD)("option",{key:e.id,value:e.id},(0,a.zw)(e.name),9,s)))),128))],512),[[o.bM,e.newVehicleModelId]]),(0,n.wy)((0,n._)("select",{"onUpdate:modelValue":t[2]||(t[2]=t=>e.newVehicleColor=t),class:"color-select"},h,512),[[o.bM,e.newVehicleColor]]),(0,n.wy)((0,n._)("input",{"onUpdate:modelValue":t[3]||(t[3]=t=>e.newVehiclePlate=t),placeholder:"Plate",class:"plate-input"},null,512),[[o.nr,e.newVehiclePlate]]),(0,n._)("button",{onClick:t[4]||(t[4]=(...t)=>e.createVehicle&&e.createVehicle(...t)),class:"add-button"},"Add Vehicle")]),(0,n._)("table",v,[b,(0,n._)("tbody",null,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(e.vehicles,((t,l)=>((0,n.wg)(),(0,n.iD)("tr",{key:l},[(0,n._)("td",null,(0,a.zw)(e.getBrandNameById(t.brand)),1),(0,n._)("td",null,(0,a.zw)(e.getModelNameById(t.model)),1),(0,n._)("td",null,(0,a.zw)(t.color),1),(0,n._)("td",null,(0,a.zw)(t.plate),1),(0,n._)("td",null,[(0,n._)("button",{onClick:l=>e.updateVehicleInDB(t),class:"add"},"Editar",8,w),(0,n._)("button",{onClick:l=>e.deleteVehicleFromDB(t.id)},"Excluir",8,m)])])))),128))])])])}var g=l(4870),V=(0,n.aZ)({setup(){const e=(0,g.iH)(null),t=(0,g.iH)(null),l=(0,g.iH)([]),n=(0,g.iH)([]),a=((0,g.iH)(""),(0,g.iH)(""),(0,g.iH)("Red")),o=(0,g.iH)(""),c=(0,g.iH)([]);let i;const r=window.indexedDB.open("movementDatabase",1);r.onupgradeneeded=function(e){if(i=e.target.result,i&&!i.objectStoreNames.contains("vehicles")){const e=i.createObjectStore("vehicles",{keyPath:"id",autoIncrement:!0});e.createIndex("brand","brand",{unique:!1}),e.createIndex("model","model",{unique:!1}),e.createIndex("color","color",{unique:!1}),e.createIndex("plate","plate",{unique:!1}),e.createIndex("register","register",{unique:!1}),e.createIndex("update","update",{unique:!1}),e.createIndex("active","active",{unique:!1})}},r.onsuccess=function(e){i=e.target.result,v()};const d=()=>{if(!i)return;const e=i.transaction(["brands"],"readonly"),t=e.objectStore("brands"),n=t.getAll();n.onsuccess=function(e){l.value=e.target.result}},u=()=>{if(!i)return;const e=i.transaction(["models"],"readonly"),t=e.objectStore("models"),l=t.getAll();l.onsuccess=function(e){n.value=e.target.result}},s=(e,t,l,n)=>{if(!i)return;const a=i.transaction(["vehicles"],"readwrite"),o=a.objectStore("vehicles"),c=(new Date).toLocaleTimeString(),r={brand:e,model:t,color:l,plate:n,register:c,update:null,active:!0};o.add(r),v()},p=e=>{if(!i)return;const t=i.transaction(["vehicles"],"readwrite"),l=t.objectStore("vehicles"),n=l.get(e);n.onsuccess=function(){const e=n.result,t=prompt("Enter the updated Brand:",e.brand),a=prompt("Enter the updated Model:",e.model),o=prompt("Enter the updated Color:",e.color),c=prompt("Enter the updated Plate:",e.plate);t&&a&&o&&c&&(e.brand=t,e.model=a,e.color=o,e.plate=c,e.update=new Date,l.put(e),v())}},h=e=>{if(!i)return;const t=i.transaction(["vehicles"],"readwrite"),l=t.objectStore("vehicles");l.delete(e),v()},v=()=>{if(!i)return;const e=i.transaction(["vehicles"],"readonly"),t=e.objectStore("vehicles"),l=t.getAll();l.onsuccess=function(e){c.value=e.target.result}},b=e=>{const t=l.value.find((t=>t.id===e));return t?t.name:""},w=e=>{const t=n.value.find((t=>t.id===e));return t?t.name:""},m=()=>{null!==e.value&&null!==t.value&&""!==o.value.trim()&&s(e.value,t.value,a.value,o.value)};return r.onsuccess=function(e){i=e.target.result,v(),d(),u()},{newVehicleBrandId:e,newVehicleModelId:t,brands:l,models:n,newVehicleColor:a,newVehiclePlate:o,vehicles:c,createVehicle:m,updateVehicleInDB:p,deleteVehicleFromDB:h,getBrandNameById:b,getModelNameById:w}}}),f=l(89);const I=(0,f.Z)(V,[["render",_],["__scopeId","data-v-2879cb66"]]);var B=I}}]);
//# sourceMappingURL=637.732e4159.js.map