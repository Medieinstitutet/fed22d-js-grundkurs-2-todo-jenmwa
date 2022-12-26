(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))l(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const g of r.addedNodes)g.tagName==="LINK"&&g.rel==="modulepreload"&&l(g)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerpolicy&&(r.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?r.credentials="include":s.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function l(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}})();let o=[];const f=document.querySelector(".tasks"),a=document.querySelector("#inputTaskField"),i=document.querySelector("#deadlineInput"),p=document.querySelector("#submit"),y=document.querySelector("#sortSection"),k=document.querySelector("#taskError"),h=new Date,S=document.querySelector("#todaysDate");S.innerHTML=h.toLocaleDateString();function L(){console.log(localStorage.getItem("taskList"));const t=localStorage.getItem("taskList");t&&(o=JSON.parse(t),c(o))}function b(t){if(t.preventDefault(),a.value.length===0||i.value===""){k.innerHTML="Fyll i Todo & deadline!";return}if(a.value.length>=2&&i!=""){k.innerHTML="";const e=document.querySelector("input[name='category']:checked").value;let n={task:a.value,deadline:i.value,addedDate:new Date().toString(),category:e,isComplete:!1};o.push(n),c(o),a.value="",i.value=""}}function c(t){localStorage.setItem("taskList",JSON.stringify(t)),f.innerHTML="";for(let e=0;e<t.length;e++){const n=t[e].isComplete?"todochecked":"",l=t[e].isComplete?"toggled":"",s=t[e].isComplete?"checked":"";f.innerHTML+=`
        <li data-id="${e}">
          <div class="licontainer">
            <label for= "${t[e].task}">
              <input type="checkbox" name="checkbox" class="checkbox ${l}"  ${s} data-id="${e}">
              <span class="text ${n}" id="texttodo">${t[e].task}</span><br>
              <span class="text"> ${t[e].deadline}</span>
            </label>
          </div>
          <div class="rightsection">
            <span class="material-symbols-outlined category">${t[e].category}</span>
            <button class="material-symbols-outlined" aria-label="ta bort todo" data-id="${e}">close</button>
          </div>
        </li>`}B(),v()}function v(){Array.from(document.querySelectorAll(".tasks button")).forEach(n=>{n.addEventListener("click",T)}),Array.from(document.querySelectorAll(".tasks input")).forEach(n=>{n.addEventListener("change",D)})}function D(t){const e=o[t.currentTarget.dataset.id];t.target.checked?(e.isComplete=!0,console.log("The checkbox is checked"),t.currentTarget.nextElementSibling.classList.add("todochecked"),t.target.classList.add("toggled"),t.target.classList.add("checked"),console.log(t.target),console.log(e)):(e.isComplete=!1,console.log("The checkbox is not checked"),t.currentTarget.nextElementSibling.classList.remove("todochecked"),t.target.classList.remove("toggled"),t.target.classList.remove("checked")),localStorage.setItem("taskList",JSON.stringify(o)),console.table(o)}function B(){o.length<=1&&y.classList.remove("open"),o.length>=2&&y.classList.add("open")}function T(t){const e=t.currentTarget.dataset.id;e>-1&&(o.splice(e,1),c(o))}let d=!0,u=!0;const q=document.querySelector("#sortByDateBtn"),E=document.querySelector("#sortByNameBtn"),I=document.querySelector("#sortByDeadlineBtn");function x(t){t.preventDefault(),o.sort((e,n)=>e.addedDate<n.addedDate?-1:e.addedDate>n.addedDate?1:0),console.table(o),localStorage.setItem("taskList",JSON.stringify(o)),c(o)}function C(t){console.log(o),t.preventDefault(),d?(o.sort((e,n)=>e.task.localeCompare(n.task)),d=!1):d===!1&&(o.sort((e,n)=>n.task.localeCompare(e.task)),d=!0),localStorage.setItem("taskList",JSON.stringify(o)),c(o)}function N(t){console.log("clicketiclick"),console.log(o),t.preventDefault(),u?(o.sort((e,n)=>n.deadline.localeCompare(e.deadline)),u=!1):u===!1&&(o.sort((e,n)=>e.deadline.localeCompare(n.deadline)),u=!0),localStorage.setItem("taskList",JSON.stringify(o)),c(o)}q.addEventListener("click",x);E.addEventListener("click",C);I.addEventListener("click",N);const O=document.querySelector("body"),m=document.querySelector(".light-mode-icon");m.addEventListener("click",()=>{O.classList.toggle("change")?m.textContent="dark_mode":m.textContent="light_mode"});p.addEventListener("click",b);L();
