!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{};function t(e,t,n){Object.defineProperty(e,t,{get:n,enumerable:!0})}var n=e.parcelRequirec526,l={},a={};null==n&&((n=function(e){if(e in a){let t=a[e];delete a[e],t()}if(e in l)return l[e];if("undefined"!=typeof module&&"function"==typeof module.require)return module.require(e);var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}).register=function(e,t){l[e]=t},n.registerBundle=function(e,t){a[e]=t,l[e]={}},e.parcelRequirec526=n);var i={};class s{constructor(e,t,n,l,a,i,s,r,d,c){this.id=e,this.name=t,this.description=n,this.subject=l,this.status=a,this.priorityRating=i,this.estimatedTimeHr=s,this.estimatedTimeMin=r,this.dueDate=d,this.taskList=c}addTask(){return this.taskList.push(this),this.id}updateColumnDelete(){document.querySelectorAll("svg.delete-column").forEach((function(e){let t=document.getElementsByClassName("column"),n=e.parentElement.parentElement.querySelectorAll(".card");t.length>3&&0==n.length?e.classList.remove("disabled"):(t.length<=3||n.length>0)&&e.classList.add("disabled")}))}createCard(e){let t=document.createElement("article"),n=document.createElement("span"),l=document.createElement("h3"),a=document.createElement("p"),i=document.createElement("div"),s=document.createElement("h4"),r=document.createElement("span"),d=document.createElement("a"),c=document.createElement("div"),o=document.createElement("HR");d.classList.add("edit"),d.innerHTML='<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">\n          <path d="M0 12.6672V16H3.33287L13.1626 6.17028L9.82975 2.83741L0 12.6672ZM15.74 3.59286C16.0867 3.24625 16.0867 2.68632 15.74 2.33971L13.6603 0.259994C13.3137 -0.0866241 12.7538 -0.0866241 12.4072 0.259994L10.7807 1.88644L14.1136 5.21931L15.74 3.59286Z" fill="#909090"/>\n          </svg>',c.style.width="12px",c.style.height="12px",c.style.borderRadius="12px","Low"==this.priorityRating?c.style.backgroundColor="#70B815":"Mid"==this.priorityRating?c.style.backgroundColor="#E5C44C":"High"==this.priorityRating&&(c.style.backgroundColor="#F59273"),t.classList.add("card"),t.setAttribute("id","t-"+e),n.classList.add("tag"),n.classList.add("subject"),i.classList.add("time-details"),r.classList.add("time"),r.classList.add("tag"),l.textContent=this.name,a.textContent=this.description,n.textContent=this.subject,s.textContent=this.dueDate,r.textContent=this.estimatedTimeHr+this.estimatedTimeMin,i.appendChild(s),i.appendChild(r),t.appendChild(n),t.appendChild(l),t.appendChild(a),t.appendChild(o),t.appendChild(c),t.appendChild(i),t.appendChild(d);let u=document.querySelectorAll(".column-name"),m=document.querySelectorAll(".cards"),h=this.status;u.forEach((function(e,n){e.value==h&&m[n].appendChild(t)})),this.updateColumnDelete()}}var r,d={};function c(){let e=document.querySelectorAll(".total"),t=document.querySelectorAll(".cards");document.querySelectorAll(".column"),document.getElementsByClassName("card");e.forEach((function(n,l){let a=0;for(let e=0;e<t[l].querySelectorAll(".card").length;e++)1==t[l].querySelectorAll(".card")[e].classList.length&&(a+=1);e[l].textContent=a}))}function o(){document.querySelectorAll(".cards").forEach((function(e){new Sortable(e,{group:"nested",animation:200,swapThreshold:.65,ghostClass:"ghost-card",chosenClass:"chosen-card",dragClass:"sortable-drag",forceFallback:!0,onStart:function(e){e.item.style.cursor="grabbing",document.getElementsByTagName("body")[0].style.cursor="grabbing",e.oldIndex},onEnd:function(e){e.item.style.cursor="grab",document.getElementsByTagName("body")[0].style.cursor="initial",c(),document.querySelectorAll("svg.delete-column").forEach((function(e){let t=document.getElementsByClassName("column"),n=e.parentElement.parentElement.querySelectorAll(".card");t.length>3&&0==n.length?e.classList.remove("disabled"):(t.length<=3||n.length>0)&&e.classList.add("disabled")}))}})}))}function u(e){r=e.matches?"mobile":"desktop"}t(d,"countCards",(function(){return c})),c(),t(d,"sortability",(function(){return o})),o();var m=window.matchMedia("(max-width: 700px)");u(m),m.addEventListener("change",u);var h=document.getElementById("tasks");function p(e){"update"==e?(v.querySelector("h1").textContent="Edit an existing task",v.classList.add("update")):(v.querySelector("h1").textContent="Create a new task",v.classList.remove("update")),0==b?(v.classList.add("active"),b=!0,E.style.display="flex"):1==b&&(v.classList.remove("active"),b=!1,E.style.display="none",v.reset(),C.value="",c(),o())}function g(){document.querySelectorAll(".edit").forEach((function(e){"true"!==e.getAttribute("listener")&&(e.addEventListener("click",(function(){!function(e){let t=e.parentElement.id;t=t.replace("t-",""),f.forEach((function(n){let l=n;if(l.id==t){let t=v.querySelectorAll("form input");t[0].value=l.name,t[1].value=l.description,t[2].value=l.subject,v.querySelector("select[name=status]").value=e.parentElement.parentElement.parentElement.querySelector("div.title input.column-name").value,"Low"==l.priorityRating?t[3].checked=!0:"Mid"==l.priorityRating?t[4].checked=!0:"High"==l.priorityRating&&(t[5].checked=!0),t[6].value=l.estimatedTimeHr,t[7].value=l.estimatedTimeMin,t[8].value=l.dueDate,C.value=l.id,p("update")}}))}(e)})),e.setAttribute("listener","true"))}))}"mobile"==r||new Sortable(h,{animation:150,swapThreshold:.8,ghostClass:"ghost-column",chosenClass:"chosen-column",dragClass:"sortable-drag",forceFallback:!0});var f=[];const y=document.getElementById("new-task"),v=document.getElementById("create-task-form"),E=document.getElementById("modal-background");var b=!1;y.addEventListener("click",p);const C=document.getElementById("task-save"),L=document.getElementById("edit-task-cancel"),k=L.nextElementSibling;document.getElementById("edit-task-delete").addEventListener("click",(function(){let e=parseInt(C.value);for(let t=0;t<f.length;t++){let n=f[t];if(n.id==e){f.splice(f.indexOf(n),1),document.getElementById("t-"+e).remove()}}p(),g()})),L.addEventListener("click",(function(){p(),g()})),k.addEventListener("click",(function(){p(),g()})),C.addEventListener("click",(function(e){let t;if(e.preventDefault(),v.classList.contains("update")){t=parseInt(C.value);for(let e=0;e<f.length;e++){var n=f[e];if(n.id==t){f.splice(f.indexOf(n),1),document.getElementById("t-"+t).remove(),C.value=""}}}else t=Date.now();let l=function(e){let t,n,l,a,i,s,r,d;return t=e[0].value,n=e[1].value,l=e[2].value,a=v.querySelector("select[name=status]").value,1==e[3].checked?i=e[3].value:1==e[4].checked?i=e[4].value:1==e[5].checked&&(i=e[5].value),s=e[6].value,r=e[7].value,d=e[8].value,{name:t,description:n,subject:l,status:a,priorityRating:i,estimatedTimeHr:s,estimatedTimeMin:r,dueDate:d}}(v.querySelectorAll("form input")),a=new s(t,l.name,l.description,l.subject,l.status,l.priorityRating,l.estimatedTimeHr,l.estimatedTimeMin,l.dueDate,f);a.createCard(a.addTask()),p(),g()})),n.register("3kQsh",(function(){return d})),n.register("2FUD0",(function(){return i}))}();
//# sourceMappingURL=index.8cdcfeed.js.map
