(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))l(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const p of a.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&l(p)}).observe(document,{childList:!0,subtree:!0});function r(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerpolicy&&(a.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?a.credentials="include":n.crossorigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function l(n){if(n.ep)return;n.ep=!0;const a=r(n);fetch(n.href,a)}})();let t=[];const y=document.querySelector(".tasks"),i=document.querySelector("#inputTaskField"),d=document.querySelector("#deadlineInput"),S=document.querySelector("#submit"),g=document.querySelector("#sortSection"),k=document.querySelector("#taskError"),h=new Date,v=document.querySelector("#todaysDate");v.innerHTML=h.toLocaleDateString();function D(){if((i.value.length===0||d.value==="")&&(k.innerHTML="Fyll i Todo & deadline!"),i.value.length>=2&&d!=""){k.innerHTML="";const e=document.querySelector("input[name='category']:checked").value;let o={task:i.value,deadline:d.value,addedDate:new Date,category:e,isComplete:!1};t.push(o),s(t),i.value="",d.value=""}}function c(e){y.innerHTML="";for(let l=0;l<e.length;l++){const n=e[l].isComplete?"checked":"";y.innerHTML+=`
        <li data-id="${l}" class="${n}"> <div class="licontainer">
        <input type="checkbox" name="checkbox" class="checkbox" data-id="${l}">
        <span class="text" id="texttodo">${e[l].task}</span><br>
        <span class="text"> ${e[l].deadline}</span></div><div class="rightsection">
        <span class="material-symbols-outlined category">${e[l].category}</span>
        <button class="material-symbols-outlined" data-id="${l}">close</button>
        </div>
        </li>`}console.log(e),L(),Array.from(document.querySelectorAll(".tasks button")).forEach(l=>{l.addEventListener("click",b)}),Array.from(document.querySelectorAll(".tasks input")).forEach(l=>{l.addEventListener("change",B)})}function B(e){console.log("if clicked once - isComplete = true"),console.log("if clicked again - isComplete = false"),e.preventDefault()}function L(){t.length<=1&&g.classList.remove("open"),t.length>=2&&g.classList.add("open")}function b(e){const o=e.currentTarget.dataset.id;o>-1&&(t.splice(o,1),c(t)),s(t)}let u=!0,f=!0,m=!0;const q=document.querySelector("#sortByDateBtn"),T=document.querySelector("#sortByNameBtn"),C=document.querySelector("#sortByDeadlineBtn");function E(e){console.log("clicketi"),console.log(t),e.preventDefault(),u?(t.sort((o,r)=>o.addedDate.localeCompare(r.addedDate)),u=!1):u===!1&&(t.sort((o,r)=>r.addedDate.localeCompare(o.addedDate)),u=!0),c(t),s(t)}function N(e){console.log(t),e.preventDefault(),f?(t.sort((o,r)=>o.task.localeCompare(r.task)),f=!1):f===!1&&(t.sort((o,r)=>r.task.localeCompare(o.task)),f=!0),c(t),s(t),console.log("klick")}function I(e){console.log("clicketiclick"),console.log(t),e.preventDefault(),m?(t.sort((o,r)=>r.deadline.localeCompare(o.deadline)),m=!1):m===!1&&(t.sort((o,r)=>o.deadline.localeCompare(r.deadline)),m=!0),c(t),s(t)}q.addEventListener("click",E);T.addEventListener("click",N);C.addEventListener("click",I);function s(e){localStorage.setItem("taskList",JSON.stringify(e)),c(e)}function x(){let e=localStorage.getItem("taskList");e&&(t=JSON.parse(e),c(t))}x();S.addEventListener("click",function(e){e.preventDefault(),D()});
