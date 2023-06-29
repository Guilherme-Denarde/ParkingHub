"use strict";(self["webpackChunkparkinghub_v1_0"]=self["webpackChunkparkinghub_v1_0"]||[]).push([[861],{861:function(e,t,n){n.r(t),n.d(t,{default:function(){return _}});var u=n(3396),o=n(9242),l=n(7139);const r=e=>((0,u.dD)("data-v-259c796e"),e=e(),(0,u.Cn)(),e),a={class:"container"},c=r((()=>(0,u._)("h1",null,"Conductors",-1))),d={class:"input-section"},i={class:"conductors-table"},s=r((()=>(0,u._)("thead",null,[(0,u._)("tr",null,[(0,u._)("th",null,"Full Name"),(0,u._)("th",null,"Phone Number"),(0,u._)("th",null,"CPF"),(0,u._)("th",null,"Gmail"),(0,u._)("th",null,"Actions")])],-1))),p=["onClick"],m=["onClick"];function C(e,t,n,r,C,h){return(0,u.wg)(),(0,u.iD)("div",a,[c,(0,u._)("div",d,[(0,u.wy)((0,u._)("input",{class:"full-name-input","onUpdate:modelValue":t[0]||(t[0]=t=>e.newConductorFullName=t),placeholder:"Full Name"},null,512),[[o.nr,e.newConductorFullName]]),(0,u.wy)((0,u._)("input",{class:"phone-number-input","onUpdate:modelValue":t[1]||(t[1]=t=>e.newConductorPhoneNumber=t),placeholder:"Phone Number"},null,512),[[o.nr,e.newConductorPhoneNumber]]),(0,u.wy)((0,u._)("input",{class:"cpf-input","onUpdate:modelValue":t[2]||(t[2]=t=>e.newConductorCPF=t),placeholder:"CPF"},null,512),[[o.nr,e.newConductorCPF]]),(0,u.wy)((0,u._)("input",{class:"gmail-input","onUpdate:modelValue":t[3]||(t[3]=t=>e.newConductorGmail=t),placeholder:"Gmail"},null,512),[[o.nr,e.newConductorGmail]]),(0,u._)("button",{onClick:t[4]||(t[4]=(...t)=>e.createConductor&&e.createConductor(...t)),class:"add-button"},"Add Conductor")]),(0,u._)("table",i,[s,(0,u._)("tbody",null,[((0,u.wg)(!0),(0,u.iD)(u.HY,null,(0,u.Ko)(e.conductors,(t=>((0,u.wg)(),(0,u.iD)("tr",{key:t.id},[(0,u._)("td",null,(0,l.zw)(t.fullName),1),(0,u._)("td",null,(0,l.zw)(t.phoneNumber),1),(0,u._)("td",null,(0,l.zw)(t.cpf),1),(0,u._)("td",null,(0,l.zw)(t.gmail),1),(0,u._)("td",null,[(0,u._)("button",{onClick:n=>e.updateConductorInDB(t.id),class:"action-button"},"Update",8,p),(0,u._)("button",{onClick:n=>e.deleteConductorFromDB(t.id),class:"action-button"},"Delete",8,m)])])))),128))])])])}var h=n(4870),b=(0,u.aZ)({setup(){const e=(0,h.iH)(""),t=(0,h.iH)(""),n=(0,h.iH)(""),o=(0,h.iH)(""),l=(0,h.iH)([]);let r;const a=window.indexedDB.open("movementDatabase",1);a.onupgradeneeded=function(e){if(r=e.target.result,r){const e=r.createObjectStore("conductors",{keyPath:"id",autoIncrement:!0});e.createIndex("fullName","fullName",{unique:!1}),e.createIndex("phoneNumber","phoneNumber",{unique:!1}),e.createIndex("cpf","cpf",{unique:!1}),e.createIndex("gmail","gmail",{unique:!1}),e.createIndex("register","register",{unique:!1}),e.createIndex("update","update",{unique:!1}),e.createIndex("active","active",{unique:!1})}},a.onsuccess=function(e){r=e.target.result,s()};const c=(e,t,n,u)=>{if(!r)return;const o=r.transaction(["conductors"],"readwrite"),l=o.objectStore("conductors"),a=(new Date).toLocaleTimeString(),c={fullName:e,phoneNumber:t,cpf:n,gmail:u,register:a,update:null,active:!0};l.add(c),s()},d=e=>{if(!r)return;const t=r.transaction(["conductors"],"readwrite"),n=t.objectStore("conductors"),u=n.get(e);u.onsuccess=function(){const e=u.result,t=prompt("Enter the updated full name:",e.fullName),o=prompt("Enter the updated phone number:",e.phoneNumber),l=prompt("Enter the updated CPF:",e.cpf),r=prompt("Enter the updated Gmail:",e.gmail);t&&o&&l&&r&&(e.fullName=t,e.phoneNumber=o,e.cpf=l,e.gmail=r,e.update=new Date,n.put(e),s())}},i=e=>{if(!r)return;const t=r.transaction(["conductors"],"readwrite"),n=t.objectStore("conductors");n.delete(e),s()},s=()=>{if(!r)return;const e=r.transaction(["conductors"],"readonly"),t=e.objectStore("conductors"),n=t.getAll();n.onsuccess=function(e){l.value=e.target.result}},p=()=>{""!==e.value.trim()&&""!==t.value.trim()&&""!==n.value.trim()&&""!==o.value.trim()&&(c(e.value,t.value,n.value,o.value),e.value="",t.value="",n.value="",o.value="")};return(0,u.bv)(s),{newConductorFullName:e,newConductorPhoneNumber:t,newConductorCPF:n,newConductorGmail:o,conductors:l,createConductor:p,updateConductorInDB:d,deleteConductorFromDB:i}}}),w=n(89);const f=(0,w.Z)(b,[["render",C],["__scopeId","data-v-259c796e"]]);var _=f}}]);
//# sourceMappingURL=861.41f9c5b3.js.map