"use strict";(self["webpackChunkparkinghub_v1_0"]=self["webpackChunkparkinghub_v1_0"]||[]).push([[357],{8357:function(e,n,t){t.r(n),t.d(n,{default:function(){return g}});var a=t(3396),r=t(9242),d=t(7139);const u=e=>((0,a.dD)("data-v-05bc805a"),e=e(),(0,a.Cn)(),e),c={class:"container"},o=u((()=>(0,a._)("h1",null,"Brands",-1))),l={class:"input-section"},s={class:"brands-table"},i=u((()=>(0,a._)("thead",null,[(0,a._)("tr",null,[(0,a._)("th",null,"Brand Name"),(0,a._)("th",null,"Actions")])],-1))),p=["onClick"],b=["onClick"],_={class:"popup-content"},m=u((()=>(0,a._)("h2",null,"Update Brand",-1))),v={class:"popup-buttons"};function B(e,n,t,u,B,w){return(0,a.wg)(),(0,a.iD)("div",c,[o,(0,a._)("div",l,[(0,a.wy)((0,a._)("input",{class:"brand-input","onUpdate:modelValue":n[0]||(n[0]=n=>e.newBrandName=n),placeholder:"Brand Name",onKeyup:n[1]||(n[1]=(0,r.D2)(((...n)=>e.createBrand&&e.createBrand(...n)),["enter"]))},null,544),[[r.nr,e.newBrandName]]),(0,a._)("button",{onClick:n[2]||(n[2]=(...n)=>e.createBrand&&e.createBrand(...n)),class:"add-button"},"Add Brand")]),(0,a._)("table",s,[i,(0,a._)("tbody",null,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(e.brands,(n=>((0,a.wg)(),(0,a.iD)("tr",{key:n.id},[(0,a._)("td",null,(0,d.zw)(n.name),1),(0,a._)("td",null,[(0,a._)("button",{onClick:t=>e.openUpdatePopup(n),class:"action-button"},"Update",8,p),(0,a._)("button",{onClick:t=>e.deleteBrandFromDB(n.id),class:"action-button"},"Delete",8,b)])])))),128))])]),(0,a._)("div",{class:(0,d.C_)(["popup",{show:e.showPopup}])},[(0,a._)("div",_,[m,(0,a.wy)((0,a._)("input",{class:"brand-input","onUpdate:modelValue":n[3]||(n[3]=n=>e.updatedBrandName=n),placeholder:"New Brand Name"},null,512),[[r.nr,e.updatedBrandName]]),(0,a._)("div",v,[(0,a._)("button",{onClick:n[4]||(n[4]=(...n)=>e.updateBrand&&e.updateBrand(...n)),class:"update-button"},"Update"),(0,a._)("button",{onClick:n[5]||(n[5]=(...n)=>e.cancelUpdate&&e.cancelUpdate(...n)),class:"cancel-button"},"Cancel")])])],2)])}var w=t(4870),h=(0,a.aZ)({setup(){const e=(0,w.iH)(""),n=(0,w.iH)(""),t=(0,w.iH)([]);let r,d,u=(0,w.iH)(!1);const c=indexedDB.open("movementDatabase",1);c.onupgradeneeded=function(e){if(r=e.target.result,r){const e=r.createObjectStore("brands",{keyPath:"id",autoIncrement:!0});e.createIndex("name","name",{unique:!0});const n=r.createObjectStore("models",{keyPath:"id",autoIncrement:!0});n.createIndex("register","register",{unique:!1}),n.createIndex("update","update",{unique:!1}),n.createIndex("active","active",{unique:!1})}},c.onsuccess=function(e){r=e.target.result,i()};const o=e=>{if(!r)return;const n=r.transaction(["brands"],"readwrite"),t=n.objectStore("brands"),a=(new Date).toLocaleTimeString(),d={name:e,register:a,update:null,active:!0};t.add(d),i()},l=(e,n)=>{if(!r)return;const t=r.transaction(["brands"],"readwrite"),a=t.objectStore("brands"),d=a.get(e);d.onsuccess=function(){const e=d.result;e.name=n,e.update=new Date,a.put(e),i()}},s=e=>{if(!r)return;const n=r.transaction(["brands"],"readwrite"),t=n.objectStore("brands");t.delete(e),i()},i=()=>{if(!r)return;const e=r.transaction(["brands"],"readonly"),n=e.objectStore("brands"),a=n.getAll();a.onsuccess=function(e){t.value=e.target.result}},p=()=>{""!==e.value.trim()&&(o(e.value),e.value="")},b=e=>{d=e,n.value=e.name,u.value=!0},_=()=>{d&&""!==n.value.trim()&&(l(d.id,n.value),v())},m=()=>{d=null,n.value="",v()},v=()=>{u.value=!1};return(0,a.bv)(i),{newBrandName:e,updatedBrandName:n,brands:t,createBrand:p,openUpdatePopup:b,updateBrand:_,cancelUpdate:m,deleteBrandFromDB:s,showPopup:u}}}),k=t(89);const f=(0,k.Z)(h,[["render",B],["__scopeId","data-v-05bc805a"]]);var g=f}}]);
//# sourceMappingURL=357.dbf7dc12.js.map