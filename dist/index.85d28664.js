!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{};function t(e,t,n){Object.defineProperty(e,t,{get:n,enumerable:!0})}var n=e.parcelRequirec526,l={},i={};null==n&&((n=function(e){if(e in i){let t=i[e];delete i[e],t()}if(e in l)return l[e];if("undefined"!=typeof module&&"function"==typeof module.require)return module.require(e);var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}).register=function(e,t){l[e]=t},n.registerBundle=function(e,t){i[e]=t,l[e]={}},e.parcelRequirec526=n);var r={};class o{constructor(e,t,n,l,i,r){this.id=e,this.title=t,this.description=n,this.group=i,this.link=l,this.contentList=r}addContent(){return this.contentList.push(this),this.id}createCard(e){let t=document.querySelectorAll(".group-name"),n=document.querySelectorAll(".tiles"),l=document.createElement("article"),i=document.createElement("h4"),r=document.createElement("p"),o=document.createElement("a"),c=document.createElement("svg"),u=document.createElement("a"),d=document.createElement("HR");l.setAttribute("id","c-"+this.id),l.classList.add("tile"),i.textContent=this.title,r.textContent=this.description,this.link.includes("https://")||this.link.includes("http://")?(o.textContent=this.link,o.setAttribute("href",this.link)):(o.textContent="https://"+this.link,o.setAttribute("href","https://"+this.link)),o.classList.add("external-link"),o.setAttribute("target","_blank"),o.appendChild(c),c.innerHTML='<svg width="20" height="10" viewBox="0 0 20 10" fill="none" xmlns="http://www.w3.org/2000/svg">\n        <path d="M1.9 5.00003C1.9 3.29003 3.29 1.90003 5 1.90003H9V3.05176e-05H5C2.24 3.05176e-05 0 2.24003 0 5.00003C0 7.76003 2.24 10 5 10H9V8.10003H5C3.29 8.10003 1.9 6.71003 1.9 5.00003ZM6 6.00003H14V4.00003H6V6.00003ZM15 3.05176e-05H11V1.90003H15C16.71 1.90003 18.1 3.29003 18.1 5.00003C18.1 6.71003 16.71 8.10003 15 8.10003H11V10H15C17.76 10 20 7.76003 20 5.00003C20 2.24003 17.76 3.05176e-05 15 3.05176e-05Z" fill="#909090"/>\n        </svg>\n        ',u.classList.add("edit-content"),u.innerHTML='<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">\n          <path d="M0 12.6672V16H3.33287L13.1626 6.17028L9.82975 2.83741L0 12.6672ZM15.74 3.59286C16.0867 3.24625 16.0867 2.68632 15.74 2.33971L13.6603 0.259994C13.3137 -0.0866241 12.7538 -0.0866241 12.4072 0.259994L10.7807 1.88644L14.1136 5.21931L15.74 3.59286Z" fill="#909090"/>\n          </svg>',l.appendChild(i),l.appendChild(r),l.appendChild(d),l.appendChild(o),l.appendChild(u);let a=this.group;"None"==this.group?n[0].appendChild(l):t.forEach((function(e,t){e.value==a&&n[t].appendChild(l)}))}}var c={};function u(){let e=document.querySelectorAll(".open-link"),t=document.querySelectorAll(".tiles");document.querySelectorAll(".group"),document.getElementsByClassName("tile");e.forEach((function(n,l){let i=0;for(let e=0;e<t[l].querySelectorAll(".tile").length;e++)1==t[l].querySelectorAll(".tile")[e].classList.length&&(i+=1);e[l].textContent=0==i?"Try adding content to this group.":1==i?"Open "+i+" link":"Open "+i+" links"}))}function d(){document.querySelectorAll("h3.open-link").forEach((function(e){e.style.backgroundColor="green","true"!==e.getAttribute("listener")&&(e.style.color="#FFDD88",e.addEventListener("click",(function(){e.parentElement.parentElement.querySelectorAll("a.external-link").forEach((function(e){let t=e.getAttribute("href");t.includes("https://")||t.includes("http://")||(t="https://"+t),window.open(t)}))})),e.setAttribute("listener","true"))}))}t(c,"countTiles",(function(){return u})),t(c,"openGroupLinks",(function(){return d})),d();var a=document.querySelector("input[name=subject]");new Tagify(a,{whitelist:["INFO1110","COMP2000"]});const s=document.getElementById("new-content"),p=document.getElementById("create-content-form");var f=!1;const h=document.getElementById("modal-background");function m(e){"update"==e?(p.querySelector("h1").textContent="Edit an existing task",p.classList.add("update")):(p.querySelector("h1").textContent="Create a new task",p.classList.remove("update")),0==f?(p.classList.add("active"),f=!0,h.style.display="flex"):1==f&&(p.classList.remove("active"),p.reset(),f=!1,h.style.display="none",y.value="")}function g(){document.querySelectorAll(".edit-content").forEach((function(e){"true"!==e.getAttribute("listener")&&(e.addEventListener("click",(function(){!function(e){let t=e.parentElement.id;t=t.replace("c-",""),v.forEach((function(n){let l=n;if(l.id==t){let t=p.querySelectorAll("form input");t[0].value=l.title,t[1].value=l.description,t[2].value=l.link,p.querySelector("select[name=group]").value=e.parentElement.parentElement.parentElement.querySelector("div.group-title input.group-name").value,y.value=l.id,m("update")}}))}(e)})),e.setAttribute("listener","true"))}))}s.addEventListener("click",(function(){m()}));var v=[];const y=document.getElementById("content-save"),E=document.getElementById("edit-content-cancel"),C=E.nextElementSibling,L=document.getElementById("edit-content-delete");E.addEventListener("click",(function(e){e.preventDefault(),m(),g()})),C.addEventListener("click",(function(e){e.preventDefault(),m(),g()})),L.addEventListener("click",(function(e){e.preventDefault();let t=parseInt(y.value);for(let e=0;e<v.length;e++){var n=v[e];if(n.id==t){v.splice(v.indexOf(n),1),document.getElementById("c-"+t).remove(),y.value=""}}m(),g(),u()})),y.addEventListener("click",(function(e){let t,n,l,i,r,c,a;if(e.preventDefault(),p.classList.contains("update")){l=parseInt(y.value);for(let e=0;e<v.length;e++){var s=v[e];if(s.id==l){v.splice(v.indexOf(s),1),document.getElementById("c-"+l).remove(),y.value=""}}}else l=Date.now();t=p.querySelectorAll("form input"),i=t[0].value,r=t[1].value,c=t[2].value,a=p.querySelector("select[name=group]").value,n=new o(l,i,r,c,a,v),n.createCard(n.addContent()),m(),u(),d(),g()})),n.register("53HbX",(function(){return c})),n.register("1AM86",(function(){return r}))}();
//# sourceMappingURL=index.85d28664.js.map