!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{};function t(e,t,n){Object.defineProperty(e,t,{get:n,enumerable:!0})}var n=e.parcelRequirec526,a={},l={};null==n&&((n=function(e){if(e in l){let t=l[e];delete l[e],t()}if(e in a)return a[e];if("undefined"!=typeof module&&"function"==typeof module.require)return module.require(e);var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}).register=function(e,t){a[e]=t},n.registerBundle=function(e,t){l[e]=t,a[e]={}},e.parcelRequirec526=n);var s={};class r{constructor(e,t,n,i,a,l,s,r,d,o){this.months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],this.id=e,this.name=t,this.description=n,this.subject=i,this.status=a,this.priorityRating=l,this.estimatedTimeHr=s,this.estimatedTimeMin=r,this.dueDate=d,this.taskList=o}addTask(){return this.taskList.push(this),this.id}updateColumnDelete(){document.querySelectorAll("svg.delete-column").forEach((function(e){let t=document.getElementsByClassName("column"),n=e.parentElement.parentElement.querySelectorAll(".card");t.length>3&&0==n.length?e.classList.remove("disabled"):(t.length<=3||n.length>0)&&e.classList.add("disabled")}))}createCard(e){let t=document.createElement("article"),n=document.createElement("span"),i=document.createElement("h3"),a=document.createElement("p"),l=document.createElement("div"),s=document.createElement("h4"),r=document.createElement("span"),d=document.createElement("a"),o=document.createElement("div"),c=document.createElement("HR");if(d.classList.add("edit"),d.innerHTML='<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">\n          <path d="M0 12.6672V16H3.33287L13.1626 6.17028L9.82975 2.83741L0 12.6672ZM15.74 3.59286C16.0867 3.24625 16.0867 2.68632 15.74 2.33971L13.6603 0.259994C13.3137 -0.0866241 12.7538 -0.0866241 12.4072 0.259994L10.7807 1.88644L14.1136 5.21931L15.74 3.59286Z" fill="#909090"/>\n          </svg>',o.style.width="12px",o.style.height="12px",o.style.borderRadius="12px","Low"==this.priorityRating?o.style.backgroundColor="#70B815":"Mid"==this.priorityRating?o.style.backgroundColor="#E5C44C":"High"==this.priorityRating&&(o.style.backgroundColor="#F59273"),t.classList.add("card"),t.setAttribute("id","t-"+e),n.classList.add("tag"),n.classList.add("subject"),l.classList.add("time-details"),r.classList.add("time"),r.classList.add("tag"),i.textContent=this.name,a.textContent=this.description,n.textContent=this.subject,0!=this.dueDate.length){let e=this.dueDate.split("-"),t=this.months[parseInt(e[1])-1],n=e[2];s.textContent="Due "+n+" "+t}else s.textContent="";this.estimatedTimeHr>0&&this.estimatedTimeMin>0?r.textContent=this.estimatedTimeHr+" HR "+this.estimatedTimeMin+" MIN":0==this.estimatedTimeHr&&this.estimatedTimeMin>0?r.textContent=this.estimatedTimeMin+" MIN":this.estimatedTimeHr>0&&0==this.estimatedTimeMin?r.textContent=this.estimatedTimeHr+" HR":r.textContent="∞",l.appendChild(o),l.appendChild(s),l.appendChild(r),0!=this.subject.length&&t.appendChild(n),t.appendChild(i),t.appendChild(a),t.appendChild(c),t.appendChild(l),t.appendChild(d);let u=document.querySelectorAll(".column-name"),m=document.querySelectorAll(".cards"),h=this.status;u.forEach((function(e,n){e.value==h&&m[n].appendChild(t)})),this.updateColumnDelete()}}var d,o={};function c(){let e=document.querySelectorAll(".total"),t=document.querySelectorAll(".cards");document.querySelectorAll(".column"),document.getElementsByClassName("card");e.forEach((function(n,i){let a=0;for(let e=0;e<t[i].querySelectorAll(".card").length;e++)1==t[i].querySelectorAll(".card")[e].classList.length&&(a+=1);e[i].textContent=a}))}function u(){let e=document.querySelectorAll(".cards");console.log("number of cardContainers is"+e.length),e.forEach((function(e){new Sortable(e,{group:"nested",animation:200,swapThreshold:.65,ghostClass:"ghost-card",chosenClass:"chosen-card",dragClass:"sortable-drag",forceFallback:!0,onStart:function(e){e.item.style.cursor="grabbing",document.getElementsByTagName("body")[0].style.cursor="grabbing",e.oldIndex},onEnd:function(e){e.item.style.cursor="grab",document.getElementsByTagName("body")[0].style.cursor="initial",c(),document.querySelectorAll("svg.delete-column").forEach((function(e){let t=document.getElementsByClassName("column"),n=e.parentElement.parentElement.querySelectorAll(".card");t.length>3&&0==n.length?e.classList.remove("disabled"):(t.length<=3||n.length>0)&&e.classList.add("disabled")}))}})}))}function m(e){d=e.matches?"mobile":"desktop"}t(o,"countCards",(function(){return c})),c(),t(o,"sortability",(function(){return u})),u();var h=window.matchMedia("(max-width: 700px)");m(h),h.addEventListener("change",m);var p=document.getElementById("tasks");"mobile"==d||new Sortable(p,{animation:150,swapThreshold:.8,ghostClass:"ghost-column",chosenClass:"chosen-column",dragClass:"sortable-drag",forceFallback:!0});var g=[];function f(){E.forEach((function(e){let t=e.subject.trim().toUpperCase(),n=!1;for(i in g)g[i]==t&&(n=!0);0==n&&g.push(t)}));let e=document.querySelector("datalist#subject");e.innerHTML="",g.forEach((function(t){let n=document.createElement("option");n.textContent=t,e.appendChild(n)}))}function y(e){"update"==e?(b.querySelector("h1").textContent="Edit task",b.classList.add("update")):(b.querySelector("h1").textContent="Create new task",b.classList.remove("update")),0==k?(b.classList.add("active"),k=!0,L.style.display="flex"):1==k&&(b.classList.remove("active"),k=!1,L.style.display="none",b.reset(),T.value="",c(),u())}function v(){document.querySelectorAll(".edit").forEach((function(e){"true"!==e.getAttribute("listener")&&(e.addEventListener("click",(function(){!function(e){let t=e.parentElement.id;t=t.replace("t-",""),E.forEach((function(n){let i=n;if(i.id==t){let t=b.querySelectorAll("form input"),n=b.querySelector("textarea");t[0].value=i.name,n.value=i.description,t[1].value=i.subject,b.querySelector("select[name=status]").value=e.parentElement.parentElement.parentElement.querySelector("div.title input.column-name").value,"Low"==i.priorityRating?t[2].checked=!0:"Mid"==i.priorityRating?t[3].checked=!0:"High"==i.priorityRating&&(t[4].checked=!0),t[5].value=i.estimatedTimeHr,t[6].value=i.estimatedTimeMin,t[7].value=i.dueDate,T.value=i.id,y("update")}}))}(e)})),e.setAttribute("listener","true"))}))}var E=[];const C=document.getElementById("new-task"),b=document.getElementById("create-task-form"),L=document.getElementById("modal-background");var k=!1;C.addEventListener("click",y);const T=document.getElementById("task-save"),S=document.getElementById("edit-task-cancel"),q=S.nextElementSibling;document.getElementById("edit-task-delete").addEventListener("click",(function(){let e=parseInt(T.value);for(let t=0;t<E.length;t++){let n=E[t];if(n.id==e){E.splice(E.indexOf(n),1),document.getElementById("t-"+e).remove()}}y(),v(),f()})),S.addEventListener("click",(function(){y(),v()})),q.addEventListener("click",(function(){y(),v()})),T.addEventListener("click",(function(e){let t;if(e.preventDefault(),b.classList.contains("update")){t=parseInt(T.value);for(let e=0;e<E.length;e++){var n=E[e];if(n.id==t){E.splice(E.indexOf(n),1),document.getElementById("t-"+t).remove(),T.value=""}}}else t=Date.now();let i=function(e){let t,n,i,a,l,s,r,d;return t=e[0].value,n=b.querySelector("textarea").value,i=e[1].value,a=b.querySelector("select[name=status]").value,1==e[2].checked?l=e[2].value:1==e[3].checked?l=e[3].value:1==e[4].checked&&(l=e[4].value),s=e[5].value,r=e[6].value,d=e[7].value,{name:t,description:n,subject:i,status:a,priorityRating:l,estimatedTimeHr:s,estimatedTimeMin:r,dueDate:d}}(b.querySelectorAll("form input")),a=new r(t,i.name,i.description,i.subject,i.status,i.priorityRating,i.estimatedTimeHr,i.estimatedTimeMin,i.dueDate,E);a.createCard(a.addTask()),y(),v(),f()})),n.register("3kQsh",(function(){return o})),n.register("2FUD0",(function(){return s}))}();
//# sourceMappingURL=index.80db4a00.js.map