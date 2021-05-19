!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{};function t(e,t,n){Object.defineProperty(e,t,{get:n,enumerable:!0})}var n=e.parcelRequirec526,l={},a={};null==n&&((n=function(e){if(e in a){let t=a[e];delete a[e],t()}if(e in l)return l[e];if("undefined"!=typeof module&&"function"==typeof module.require)return module.require(e);var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}).register=function(e,t){l[e]=t},n.registerBundle=function(e,t){a[e]=t,l[e]={}},e.parcelRequirec526=n);var i={};class s{constructor(e,t,n,l,a,i,s,r,d,o){this.id=e,this.name=t,this.description=n,this.subject=l,this.status=a,this.priorityRating=i,this.estimatedTimeHr=s,this.estimatedTimeMin=r,this.dueDate=d,this.taskList=o}addTask(){return this.taskList.push(this),this.id}updateColumnDelete(){document.querySelectorAll("svg.delete-column").forEach((function(e){let t=document.getElementsByClassName("column"),n=e.parentElement.parentElement.querySelectorAll(".card");t.length>3&&0==n.length?e.classList.remove("disabled"):(t.length<=3||n.length>0)&&e.classList.add("disabled")}))}createCard(e){let t=document.createElement("article"),n=document.createElement("span"),l=document.createElement("h3"),a=document.createElement("p"),i=document.createElement("div"),s=document.createElement("h4"),r=document.createElement("span"),d=document.createElement("a"),o=document.createElement("div"),c=document.createElement("HR");d.classList.add("edit"),d.innerHTML='<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">\n          <path d="M0 12.6672V16H3.33287L13.1626 6.17028L9.82975 2.83741L0 12.6672ZM15.74 3.59286C16.0867 3.24625 16.0867 2.68632 15.74 2.33971L13.6603 0.259994C13.3137 -0.0866241 12.7538 -0.0866241 12.4072 0.259994L10.7807 1.88644L14.1136 5.21931L15.74 3.59286Z" fill="#909090"/>\n          </svg>',o.style.width="12px",o.style.height="12px",o.style.borderRadius="12px","Low"==this.priorityRating?o.style.backgroundColor="#70B815":"Mid"==this.priorityRating?o.style.backgroundColor="#E5C44C":"High"==this.priorityRating&&(o.style.backgroundColor="#F59273"),t.classList.add("card"),t.setAttribute("id","t-"+e),n.classList.add("tag"),n.classList.add("subject"),i.classList.add("time-details"),r.classList.add("time"),r.classList.add("tag"),l.textContent=this.name,a.textContent=this.description,n.textContent=this.subject,s.textContent=this.dueDate,r.textContent=this.estimatedTimeHr+this.estimatedTimeMin,i.appendChild(s),i.appendChild(r),t.appendChild(n),t.appendChild(l),t.appendChild(a),t.appendChild(c),t.appendChild(o),t.appendChild(i),t.appendChild(d);let u=document.querySelectorAll(".column-name"),m=document.querySelectorAll(".cards"),h=this.status;u.forEach((function(e,n){e.value==h&&m[n].appendChild(t)})),this.updateColumnDelete()}}var r,d={};function o(){let e=document.querySelectorAll(".total"),t=document.querySelectorAll(".cards");document.querySelectorAll(".column"),document.getElementsByClassName("card");e.forEach((function(n,l){let a=0;for(let e=0;e<t[l].querySelectorAll(".card").length;e++)1==t[l].querySelectorAll(".card")[e].classList.length&&(a+=1);e[l].textContent=a}))}function c(){let e=document.querySelectorAll(".cards");console.log("number of cardContainers is"+e.length),e.forEach((function(e){new Sortable(e,{group:"nested",animation:200,swapThreshold:.65,ghostClass:"ghost-card",chosenClass:"chosen-card",dragClass:"sortable-drag",forceFallback:!0,onStart:function(e){e.item.style.cursor="grabbing",document.getElementsByTagName("body")[0].style.cursor="grabbing",e.oldIndex},onEnd:function(e){e.item.style.cursor="grab",document.getElementsByTagName("body")[0].style.cursor="initial",o(),document.querySelectorAll("svg.delete-column").forEach((function(e){let t=document.getElementsByClassName("column"),n=e.parentElement.parentElement.querySelectorAll(".card");t.length>3&&0==n.length?e.classList.remove("disabled"):(t.length<=3||n.length>0)&&e.classList.add("disabled")}))}})}))}function u(e){r=e.matches?"mobile":"desktop"}t(d,"countCards",(function(){return o})),o(),t(d,"sortability",(function(){return c})),c();var m=window.matchMedia("(max-width: 700px)");u(m),m.addEventListener("change",u);var h=document.getElementById("tasks");"mobile"==r||new Sortable(h,{animation:150,swapThreshold:.8,ghostClass:"ghost-column",chosenClass:"chosen-column",dragClass:"sortable-drag",forceFallback:!0});var p=[];function g(e){"update"==e?(E.querySelector("h1").textContent="Edit an existing task",E.classList.add("update")):(E.querySelector("h1").textContent="Create a new task",E.classList.remove("update")),0==C?(E.classList.add("active"),C=!0,b.style.display="flex"):1==C&&(E.classList.remove("active"),C=!1,b.style.display="none",E.reset(),L.value="",o(),c())}function f(){document.querySelectorAll(".edit").forEach((function(e){"true"!==e.getAttribute("listener")&&(e.addEventListener("click",(function(){!function(e){let t=e.parentElement.id;t=t.replace("t-",""),y.forEach((function(n){let l=n;if(l.id==t){let t=E.querySelectorAll("form input"),n=E.querySelector("textarea");t[0].value=l.name,n.value=l.description,t[1].value=l.subject,E.querySelector("select[name=status]").value=e.parentElement.parentElement.parentElement.querySelector("div.title input.column-name").value,"Low"==l.priorityRating?t[2].checked=!0:"Mid"==l.priorityRating?t[3].checked=!0:"High"==l.priorityRating&&(t[4].checked=!0),t[5].value=l.estimatedTimeHr,t[6].value=l.estimatedTimeMin,t[7].value=l.dueDate,L.value=l.id,g("update")}}))}(e)})),e.setAttribute("listener","true"))}))}var y=[];const v=document.getElementById("new-task"),E=document.getElementById("create-task-form"),b=document.getElementById("modal-background");var C=!1;v.addEventListener("click",g);const L=document.getElementById("task-save"),k=document.getElementById("edit-task-cancel"),q=k.nextElementSibling;document.getElementById("edit-task-delete").addEventListener("click",(function(){let e=parseInt(L.value);for(let t=0;t<y.length;t++){let n=y[t];if(n.id==e){y.splice(y.indexOf(n),1),document.getElementById("t-"+e).remove()}}g(),f()})),k.addEventListener("click",(function(){g(),f()})),q.addEventListener("click",(function(){g(),f()})),L.addEventListener("click",(function(e){let t;if(e.preventDefault(),E.classList.contains("update")){t=parseInt(L.value);for(let e=0;e<y.length;e++){var n=y[e];if(n.id==t){y.splice(y.indexOf(n),1),document.getElementById("t-"+t).remove(),L.value=""}}}else t=Date.now();let l=function(e){let t,n,l,a,i,s,r,d;return t=e[0].value,n=E.querySelector("textarea").value,l=e[1].value,a=E.querySelector("select[name=status]").value,1==e[2].checked?i=e[2].value:1==e[3].checked?i=e[3].value:1==e[4].checked&&(i=e[4].value),s=e[5].value,r=e[6].value,d=e[7].value,{name:t,description:n,subject:l,status:a,priorityRating:i,estimatedTimeHr:s,estimatedTimeMin:r,dueDate:d}}(E.querySelectorAll("form input")),a=new s(t,l.name,l.description,l.subject,l.status,l.priorityRating,l.estimatedTimeHr,l.estimatedTimeMin,l.dueDate,y);a.createCard(a.addTask()),p.push(l.subject),console.log(p),g(),f()})),n.register("3kQsh",(function(){return d})),n.register("2FUD0",(function(){return i}))}();
//# sourceMappingURL=index.f3fea635.js.map
