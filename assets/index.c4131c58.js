(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))y(s);new MutationObserver(s=>{for(const l of s)if(l.type==="childList")for(const m of l.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&y(m)}).observe(document,{childList:!0,subtree:!0});function n(s){const l={};return s.integrity&&(l.integrity=s.integrity),s.referrerpolicy&&(l.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?l.credentials="include":s.crossorigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function y(s){if(s.ep)return;s.ep=!0;const l=n(s);fetch(s.href,l)}})();let o=[];const p=document.querySelector(".tasks"),a=document.querySelector("#inputTaskField"),i=document.querySelector("#deadlineInput"),v=document.querySelector("#submit"),k=document.querySelector("#sortSection"),h=document.querySelector("#taskError"),S=new Date,L=document.querySelector("#todaysDate");L.innerHTML=S.toLocaleDateString();function D(){const t=localStorage.getItem("taskList");t&&(o=JSON.parse(t),r(o))}function B(t){if(t.preventDefault(),a.value.length===0||i.value===""){h.innerHTML="Fyll i Todo & deadline!";return}if(a.value.length>=2&&i!=""){h.innerHTML="";const e=document.querySelector("input[name='category']:checked").value;let n={task:a.value,deadline:i.value,addedDate:S.toString(),category:e,isComplete:!1};o.push(n),r(o),a.value="",i.value=""}}function r(t){localStorage.setItem("taskList",JSON.stringify(t)),p.innerHTML="";for(let e=0;e<t.length;e++)p.innerHTML+=`
        <li data-id="${e}"> <div class="licontainer">
        <label for= "${t[e].task}">
        <input type="checkbox" name="checkbox" class="checkbox"data-id="${e}">
        <span class="text" id="texttodo">${t[e].task}</span><br>
        <span class="text"> ${t[e].deadline}</span></div><div class="rightsection">
        <span class="material-symbols-outlined category">${t[e].category}</span>
        <button class="material-symbols-outlined" data-id="${e}">close</button>
        </div>
        </li>`;E(),b()}function b(){Array.from(document.querySelectorAll(".tasks button")).forEach(n=>{n.addEventListener("click",C)}),Array.from(document.querySelectorAll(".tasks input")).forEach(n=>{n.addEventListener("change",T)})}function T(t){t.target.checked?(console.log("The checkbox is checked"),t.currentTarget.parentElement.classList.add("todochecked"),c=!c):(console.log("The checkbox is not checked"),t.currentTarget.parentElement.classList.remove("todochecked")),q()}let c=!1;function q(){console.log(o.findIndex(t=>t.isComplete===!0)),(c=!c)?console.log("still false"):c&&console.log("true"),console.log(o)}function E(){o.length<=1&&k.classList.remove("open"),o.length>=2&&k.classList.add("open")}function C(t){const e=t.currentTarget.dataset.id;e>-1&&(o.splice(e,1),r(o))}let d=!0,u=!0,f=!0;const I=document.querySelector("#sortByDateBtn"),N=document.querySelector("#sortByNameBtn"),x=document.querySelector("#sortByDeadlineBtn");function O(t){console.log("clicketi"),console.log(o),t.preventDefault(),d?(o.sort((e,n)=>e.addedDate.localeCompare(n.addedDate)),d=!1):d===!1&&(o.sort((e,n)=>n.addedDate.localeCompare(e.addedDate)),d=!0),localStorage.setItem("taskList",JSON.stringify(o)),r(o)}function M(t){console.log(o),t.preventDefault(),u?(o.sort((e,n)=>e.task.localeCompare(n.task)),u=!1):u===!1&&(o.sort((e,n)=>n.task.localeCompare(e.task)),u=!0),localStorage.setItem("taskList",JSON.stringify(o)),r(o)}function $(t){console.log("clicketiclick"),console.log(o),t.preventDefault(),f?(o.sort((e,n)=>n.deadline.localeCompare(e.deadline)),f=!1):f===!1&&(o.sort((e,n)=>e.deadline.localeCompare(n.deadline)),f=!0),localStorage.setItem("taskList",JSON.stringify(o)),r(o)}I.addEventListener("click",O);N.addEventListener("click",M);x.addEventListener("click",$);const A=document.querySelector("body"),g=document.querySelector(".light-mode-icon");g.addEventListener("click",()=>{A.classList.toggle("change")?g.textContent="dark_mode":g.textContent="light_mode"});v.addEventListener("click",B);D();
