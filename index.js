import{a as f,S as d,i as a}from"./assets/vendor-DMjJPMAs.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function t(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(e){if(e.ep)return;e.ep=!0;const r=t(e);fetch(e.href,r)}})();const p="49351008-1bfee9cf32a9c846c40651839",m="https://pixabay.com/api/";function g(i){const o={key:p,q:i,image_type:"photo",orientation:"horizontal",per_page:20,safesearch:!0};return f.get(m,{params:o}).then(t=>t.data.hits.length?t.data.hits:Promise.reject(new Error("No images found"))).catch(t=>Promise.reject(t))}let l;function y(i,o){const t=i.map(h).join("");o.insertAdjacentHTML("beforeend",t),b()}function h({webformatURL:i,largeImageURL:o,tags:t,likes:n,views:e,comments:r,downloads:s}){return`
    <li class="gallery-item">
      <a href="${o}">
        <img src="${i}" alt="${t}" loading="lazy" />
      </a>
      <div class="info">
        <p class="info-item"><b>Likes</b>${n}</p>
        <p class="info-item"><b>Views</b>${e}</p>
        <p class="info-item"><b>Comments</b>${r}</p>
        <p class="info-item"><b>Downloads</b>${s}</p>
      </div>
    </li>
  `}function b(){l?l.refresh():l=new d(".gallery a",{captionsData:"alt",captionDelay:250})}const L=document.querySelector(".form"),u=document.querySelector(".gallery"),c=document.querySelector(".loader");window.addEventListener("load",()=>{c.style.display="none"});L.addEventListener("submit",i=>{i.preventDefault();const o=i.target.elements["search-text"],t=o.value.trim();if(!t){a.warning({title:"Попередження",message:"Введіть пошуковий запит!",position:"topRight"});return}u.innerHTML="",c.style.display="block",setTimeout(()=>{g(t).then(n=>{if(n.length===0){a.error({title:"Error",message:"No images found",position:"topRight"});return}y(n,u)}).catch(n=>{a.error({title:"Error",message:"Failed to fetch images",position:"topRight"})}).finally(()=>{o.value="",c.style.display="none"})},700)});
//# sourceMappingURL=index.js.map
