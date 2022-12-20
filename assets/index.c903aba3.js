(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const c of n)if(c.type==="childList")for(const g of c.addedNodes)g.tagName==="LINK"&&g.rel==="modulepreload"&&r(g)}).observe(document,{childList:!0,subtree:!0});function l(n){const c={};return n.integrity&&(c.integrity=n.integrity),n.referrerpolicy&&(c.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?c.credentials="include":n.crossorigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function r(n){if(n.ep)return;n.ep=!0;const c=l(n);fetch(n.href,c)}})();let t=[];const y=document.querySelector(".tasks"),i=document.querySelector("#inputTaskField"),d=document.querySelector("#deadlineInput"),h=document.querySelector("#submit"),p=document.querySelector("#sortSection"),k=document.querySelector("#taskError"),S=new Date,v=document.querySelector("#todaysDate");v.innerHTML=S.toLocaleDateString();function D(){if(i.value.length===0||d.value===""){k.innerHTML="Fyll i Todo & deadline!";return}else if(i.value.length>=2&&d!=""){console.log(t.indexOf),k.innerHTML="";const e=document.querySelector("input[name='category']:checked").value;let o={task:i.value,deadline:d.value,addedDate:S.toString(),category:e,isComplete:!1};t.push(o),a(t),i.value="",d.value=""}}function s(e){y.innerHTML="";for(let r=0;r<e.length;r++){const n=e[r].isComplete?"checked":"";y.innerHTML+=`
        <li data-id="${r}" class="${n}"> <div class="licontainer">
        <input type="checkbox" name="checkbox" class="checkbox"data-id="${r}">
        <span class="text" id="texttodo">${e[r].task}</span><br>
        <span class="text"> ${e[r].deadline}</span></div><div class="rightsection">
        <span class="material-symbols-outlined category">${e[r].category}</span>
        <button class="material-symbols-outlined" data-id="${r}">close</button>
        </div>
        </li>`}console.log(e),B(),Array.from(document.querySelectorAll(".tasks button")).forEach(r=>{r.addEventListener("click",T)}),Array.from(document.querySelectorAll(".tasks input")).forEach(r=>{r.addEventListener("change",L)})}function L(e){const o=t.findIndex(l=>l.task===e.currentTarget.nextElementSibling.innerHTML);console.log(e.currentTarget.nextElementSibling),t[o].isComplete===!0&&(e.currentTarget.nextElementSibling.classList.add("checked"),console.log(e.currentTarget)),N()}function B(){t.length<=1&&p.classList.remove("open"),t.length>=2&&p.classList.add("open")}function T(e){const o=e.currentTarget.dataset.id;o>-1&&(t.splice(o,1),s(t)),a(t)}let u=!0,f=!0,m=!0;const b=document.querySelector("#sortByDateBtn"),q=document.querySelector("#sortByNameBtn"),x=document.querySelector("#sortByDeadlineBtn");function E(e){console.log("clicketi"),console.log(t),e.preventDefault(),u?(t.sort((o,l)=>o.addedDate.localeCompare(l.addedDate)),u=!1):u===!1&&(t.sort((o,l)=>l.addedDate.localeCompare(o.addedDate)),u=!0),s(t),a(t)}function C(e){console.log(t),e.preventDefault(),f?(t.sort((o,l)=>o.task.localeCompare(l.task)),f=!1):f===!1&&(t.sort((o,l)=>l.task.localeCompare(o.task)),f=!0),s(t),a(t),console.log("klick")}function I(e){console.log("clicketiclick"),console.log(t),e.preventDefault(),m?(t.sort((o,l)=>l.deadline.localeCompare(o.deadline)),m=!1):m===!1&&(t.sort((o,l)=>o.deadline.localeCompare(l.deadline)),m=!0),s(t),a(t)}function N(){console.log("clickt"),console.log(t)}b.addEventListener("click",E);q.addEventListener("click",C);x.addEventListener("click",I);function a(e){localStorage.setItem("taskList",JSON.stringify(e)),s(e)}function M(){const e=localStorage.getItem("taskList");e&&(t=JSON.parse(e),s(t))}M();h.addEventListener("click",function(e){e.preventDefault(),D()});
