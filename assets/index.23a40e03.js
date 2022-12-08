(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&c(s)}).observe(document,{childList:!0,subtree:!0});function u(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function c(e){if(e.ep)return;e.ep=!0;const t=u(e);fetch(e.href,t)}})();const l=[],o=document.querySelector("#newTaskInput"),i=document.querySelector("#addTaskBtn"),d=document.querySelector("#tasks"),f=new Date,a=document.querySelector("#todaysDate");a.innerHTML=f.toLocaleDateString();const n={task:o.value,date:a.innerHTML,deadline:"deadline",category:"kategori"};localStorage.setItem("userTask",JSON.stringify(n));console.log(JSON.parse(localStorage.getItem("userTask")||"{}"));localStorage.clear();function y(){d.innerHTML+=`
  <li><input type="checkbox" class="checkbox">
  ${o.value} -
  ${n.date} -
  ${n.deadline} -
  ${n.category}
  <button class="material-symbols-outlined">
  close
  </button></li>`}function g(){o.value.length!==0&&l.indexOf(o.value)===-1&&(l.push(o.value),console.log(l),y())}i==null||i.addEventListener("click",g);
