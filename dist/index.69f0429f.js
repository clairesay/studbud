!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{};function t(e,t,n){Object.defineProperty(e,t,{get:n,enumerable:!0})}var n=e.parcelRequirec526,l={},i={};null==n&&((n=function(e){if(e in i){let t=i[e];delete i[e],t()}if(e in l)return l[e];if("undefined"!=typeof module&&"function"==typeof module.require)return module.require(e);var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}).register=function(e,t){l[e]=t},n.registerBundle=function(e,t){i[e]=t,l[e]={}},e.parcelRequirec526=n);var r={};class o{constructor(e,t,n,l,i,r){this.id=e,this.title=t,this.description=n,this.group=i,this.link=l,this.contentList=r}addContent(){return this.contentList.push(this),this.id}createCard(e){let t=document.querySelectorAll(".group-name"),n=document.querySelectorAll(".tiles"),l=document.createElement("article"),i=document.createElement("h3"),r=document.createElement("pre"),o=document.createElement("code"),c=document.createElement("a"),u=document.createElement("svg"),d=document.createElement("a"),s=document.createElement("HR");l.setAttribute("id","c-"+this.id),l.classList.add("tile"),i.textContent=this.title,this.description.length>0&&(o.textContent=this.description,r.appendChild(o)),this.link.includes("https://")||this.link.includes("http://")?(c.textContent=this.link,c.setAttribute("href",this.link)):(c.textContent="https://"+this.link,c.setAttribute("href","https://"+this.link)),c.classList.add("external-link"),c.setAttribute("target","_blank"),c.appendChild(u),u.innerHTML='<svg width="20" height="10" viewBox="0 0 20 10" fill="none" xmlns="http://www.w3.org/2000/svg">\n        <path d="M1.9 5.00003C1.9 3.29003 3.29 1.90003 5 1.90003H9V3.05176e-05H5C2.24 3.05176e-05 0 2.24003 0 5.00003C0 7.76003 2.24 10 5 10H9V8.10003H5C3.29 8.10003 1.9 6.71003 1.9 5.00003ZM6 6.00003H14V4.00003H6V6.00003ZM15 3.05176e-05H11V1.90003H15C16.71 1.90003 18.1 3.29003 18.1 5.00003C18.1 6.71003 16.71 8.10003 15 8.10003H11V10H15C17.76 10 20 7.76003 20 5.00003C20 2.24003 17.76 3.05176e-05 15 3.05176e-05Z" fill="#909090"/>\n        </svg>\n        ',d.classList.add("edit-content"),d.innerHTML='<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">\n          <path d="M0 12.6672V16H3.33287L13.1626 6.17028L9.82975 2.83741L0 12.6672ZM15.74 3.59286C16.0867 3.24625 16.0867 2.68632 15.74 2.33971L13.6603 0.259994C13.3137 -0.0866241 12.7538 -0.0866241 12.4072 0.259994L10.7807 1.88644L14.1136 5.21931L15.74 3.59286Z" fill="#909090"/>\n          </svg>',l.appendChild(i),l.appendChild(r),l.appendChild(s),l.appendChild(c),l.appendChild(d);let a=this.group;"None"==this.group?n[0].appendChild(l):t.forEach((function(e,t){e.value==a&&n[t].appendChild(l)})),hljs.highlightAll()}}var c={};function u(){let e=document.querySelectorAll(".open-link"),t=document.querySelectorAll(".tiles"),n='<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">\n        <path d="M16 16H2V2H9V0H2C0.89 0 0 0.9 0 2V16C0 17.1 0.89 18 2 18H16C17.1 18 18 17.1 18 16V9H16V16ZM11 0V2H14.59L4.76 11.83L6.17 13.24L16 3.41V7H18V0H11Z" fill="#909090"/>\n        </svg>';e.forEach((function(l,i){let r=0;for(let e=0;e<t[i].querySelectorAll(".tile").length;e++)1==t[i].querySelectorAll(".tile")[e].classList.length&&(r+=1);e[i].innerHTML=0==r?"0 links":1==r?"Open "+r+" link"+n:"Open "+r+" links"+n}))}function d(){console.log("grouplinks"),document.querySelectorAll("h3.open-link").forEach((function(e){"true"!=e.getAttribute("listener")&&(e.addEventListener("click",(function(){console.log("clicked"),e.parentElement.parentElement.querySelectorAll("a.external-link").forEach((function(e){let t=e.getAttribute("href");t.includes("https://")||t.includes("http://")||(t="https://"+t),window.open(t)}))})),e.setAttribute("listener","true"))}))}t(c,"countTiles",(function(){return u})),t(c,"openGroupLinks",(function(){return d})),d();const s=document.getElementById("new-content"),a=document.getElementById("create-content-form");var p=!1;const h=document.getElementById("modal-background");function f(e){"update"==e?(a.querySelector("h1").textContent="Edit existing resource",a.classList.add("update")):(a.querySelector("h1").textContent="Add new content",a.classList.remove("update")),0==p?(a.classList.add("active"),p=!0,h.style.display="flex"):1==p&&(a.classList.remove("active"),a.reset(),p=!1,h.style.display="none",E.value="")}function m(){document.querySelectorAll(".edit-content").forEach((function(e){"true"!==e.getAttribute("listener")&&(e.addEventListener("click",(function(){!function(e){let t=e.parentElement.id;t=t.replace("c-",""),v.forEach((function(n){let l=n;if(l.id==t){let t=a.querySelectorAll("form input"),n=a.querySelector("textArea");t[0].value=l.title,n.value=l.description,t[1].value=l.link,a.querySelector("select[name=group]").value=e.parentElement.parentElement.parentElement.querySelector("div.group-title input.group-name").value,E.value=l.id,f("update")}}))}(e)})),e.setAttribute("listener","true"))}))}function g(){let e=document.getElementsByClassName("group");document.querySelectorAll("svg.delete-group").forEach((function(t){let n=t.parentElement.parentElement.parentElement.querySelectorAll(".tile");e.length>1&&0==n.length?t.classList.remove("disabled"):(e.length<=1||n.length>0)&&t.classList.add("disabled")}))}s.addEventListener("click",(function(){f()}));var v=[];const E=document.getElementById("content-save"),y=document.getElementById("edit-content-cancel"),L=y.nextElementSibling,C=document.getElementById("edit-content-delete");y.addEventListener("click",(function(e){e.preventDefault(),f(),m()})),L.addEventListener("click",(function(e){e.preventDefault(),f(),m()})),C.addEventListener("click",(function(e){e.preventDefault();let t=parseInt(E.value);for(let e=0;e<v.length;e++){var n=v[e];if(n.id==t){v.splice(v.indexOf(n),1),document.getElementById("c-"+t).remove(),E.value=""}}f(),m(),u(),g()})),E.addEventListener("click",(function(e){let t,n,l,i,r,c,s;if(e.preventDefault(),a.classList.contains("update")){l=parseInt(E.value);for(let e=0;e<v.length;e++){var p=v[e];if(p.id==l){v.splice(v.indexOf(p),1),document.getElementById("c-"+l).remove(),E.value=""}}}else l=Date.now();t=a.querySelectorAll("form input"),i=t[0].value,r=a.querySelector("textarea").value,c=t[1].value,s=a.querySelector("select[name=group]").value,n=new o(l,i,r,c,s,v),n.createCard(n.addContent()),f(),u(),d(),m(),g()})),n.register("53HbX",(function(){return c})),n.register("1AM86",(function(){return r}))}();
//# sourceMappingURL=index.69f0429f.js.map
