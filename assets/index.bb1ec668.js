(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function d(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=d(e);fetch(e.href,t)}})();const n=[],o=document.querySelector("#newTaskInput"),a=document.querySelector("#deadlineInput"),l=document.querySelector("#addTaskBtn"),f=document.querySelector("#tasks"),y=new Date,u=document.querySelector("#todaysDate");u.innerHTML=y.toLocaleDateString();const c={task:o.value,date:u.innerHTML,deadline:a.value,category:"kategori"};localStorage.setItem("userTask",JSON.stringify(c));console.log(JSON.parse(localStorage.getItem("userTask")||"{}"));localStorage.clear();function p(){f.innerHTML+=`
  <li><input type="checkbox" class="checkbox">
  ${o.value}<br>
  ${c.date} -
  ${a.value} -
  ${c.category}
  <button class="material-symbols-outlined">
  close
  </button></li>`}function m(){o.value.length!==0&&n.indexOf(o.value)===-1&&(n.push(o.value),n.push(a.value),console.log(n),p())}l==null||l.addEventListener("click",m);
