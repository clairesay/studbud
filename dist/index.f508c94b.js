!function(){var e=(0,("undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{}).parcelRequirec526)("3kQsh");class t{constructor(e,t){this.id=e,this.name=t}updateColumns(){this.updateDeleteButton();const e=document.getElementById("create-task-form");let t=document.querySelectorAll(".column-name"),n=e.querySelector("select[name=status]");n.innerHTML="",t.forEach((function(e){let t=document.createElement("option");t.textContent=e.value,t.value=e.value,n.appendChild(t)}))}updateDeleteButton(){document.querySelectorAll("svg.delete-column").forEach((function(e){let t=document.getElementsByClassName("column"),n=e.parentElement.parentElement.querySelectorAll(".card");t.length>3&&0==n.length?e.classList.remove("disabled"):(t.length<=3||n.length>0)&&e.classList.add("disabled")}))}editColumn(e){function t(){document.querySelectorAll("svg.delete-column").forEach((function(e){let t=document.getElementsByClassName("column"),n=e.parentElement.parentElement.querySelectorAll(".card");t.length>3&&0==n.length?e.classList.remove("disabled"):(t.length<=3||n.length>0)&&e.classList.add("disabled")}));const e=document.getElementById("create-task-form");let t=document.querySelectorAll(".column-name"),n=e.querySelector("select[name=status]");n.innerHTML="",t.forEach((function(e){let t=document.createElement("option");t.textContent=e.value,t.value=e.value,n.appendChild(t)}))}let n=e.parentElement.querySelector("input.column-name");n.addEventListener("change",(function(e){t()})),n.addEventListener("keyup",(function(e){"Enter"===e.key&&n.blur(),t()})),e.addEventListener("click",(function(){n.focus()}));const l=document.querySelector("div.tooltip#edit");e.addEventListener("mouseover",(function(){e.parentElement.appendChild(l)}))}deleteColumn(e){e.addEventListener("click",(function(){let t=document.getElementsByClassName("column"),n=e.parentElement.parentElement,l=n.querySelectorAll(".card");if(t.length>3&&0==l.length){n.remove(),document.querySelectorAll("svg.delete-column").forEach((function(e){let t=document.getElementsByClassName("column"),n=e.parentElement.parentElement.querySelectorAll(".card");t.length>3&&0==n.length?e.classList.remove("disabled"):(t.length<=3||n.length>0)&&e.classList.add("disabled")}));const e=document.getElementById("create-task-form");let t=document.querySelectorAll(".column-name"),l=e.querySelector("select[name=status]");l.innerHTML="",t.forEach((function(e){let t=document.createElement("option");t.textContent=e.value,t.value=e.value,l.appendChild(t)}))}}));const t=document.querySelector("div.tooltip#delete");e.addEventListener("mouseover",(function(){e.parentElement.appendChild(t);let n=document.getElementsByClassName("column"),l=e.parentElement.parentElement.querySelectorAll(".card");n.length>3&&0==l.length?e.classList.remove("disabled"):(n.length<=3||l.length>0)&&e.classList.add("disabled")}))}createColumn(){let e=document.querySelector("div.column");e=e.cloneNode(!0),e.querySelector("input.column-name").value=this.name;let t=e.querySelector("svg.edit-column"),n=e.querySelector("svg.delete-column");e.querySelector("h3.total").textContent=0,e.querySelectorAll(".cards > *").forEach((function(e){e.remove()}));let l=document.getElementById("tasks");l.appendChild(e),this.editColumn(t),this.deleteColumn(n),this.updateColumns(),l.scrollTo({top:0,left:l.clientWidth,behavior:"smooth"})}}e();const n=document.getElementById("create-task-form");function l(){let e=document.querySelectorAll(".column-name"),t=n.querySelector("select[name=status]");t.innerHTML="",e.forEach((function(e){let n=document.createElement("option");n.textContent=e.value,n.value=e.value,t.appendChild(n)}))}l();const o=document.getElementById("modal-background"),c=document.getElementById("add-column-form");var a=!1;function d(){m.innerHTML="",c.querySelector("input").removeAttribute("required"),0==a?(c.classList.add("active"),a=!0,o.style.display="flex"):1==a&&(c.classList.remove("active"),c.reset(),a=!1,o.style.display="none")}document.getElementById("new-column").addEventListener("click",d);const r=document.getElementById("add-column-cancel"),u=r.nextElementSibling;r.addEventListener("click",(function(){d()})),u.addEventListener("click",(function(){d()}));const s=document.getElementById("add-column-submit");var m=c.querySelector(".validate-message");s.addEventListener("click",(function(n){n.preventDefault();let o=Date.now(),a=c.querySelector("input");if(""==a.value)m.innerHTML="Please enter a name for this column.",a.setAttribute("required","true");else{new t(o,a.value).createColumn(),l(),d(),function(){let t=document.querySelectorAll(".cards");t=t[t.length-1],new Sortable(t,{group:"nested",animation:200,swapThreshold:.65,ghostClass:"ghost-card",chosenClass:"chosen-card",dragClass:"sortable-drag",forceFallback:!0,onEnd:function(t){e().countCards()}})}()}}));const i=document.querySelector("div.tooltip#delete"),h=document.querySelector("div.tooltip#edit");document.querySelectorAll("div.title").forEach((function(e){let t=e.querySelector("svg.edit-column"),n=e.querySelector("svg.delete-column"),o=e.querySelector("input.column-name");t.addEventListener("click",(function(){o.focus()})),o.addEventListener("change",(function(e){l()})),o.addEventListener("keyup",(function(e){"Enter"===e.key&&o.blur(),l()})),t.addEventListener("mouseover",(function(){t.parentElement.appendChild(h)})),n.addEventListener("click",(function(){let t=document.getElementsByClassName("column"),n=e.parentElement,o=n.querySelectorAll(".card");t.length>3&&0==o.length&&(n.remove(),l()),document.querySelectorAll("svg.delete-column").forEach((function(e){let t=document.getElementsByClassName("column"),n=e.parentElement.parentElement.querySelectorAll(".card");t.length>3&&0==n.length?e.classList.remove("disabled"):(t.length<=3||n.length>0)&&e.classList.add("disabled")}))})),n.addEventListener("mouseover",(function(){let t=document.getElementsByClassName("column"),l=e.parentElement.querySelectorAll(".card");n.parentElement.appendChild(i),t.length>3&&0==l.length?n.classList.remove("disabled"):(t.length<=3||l.length>0)&&n.classList.add("disabled")}))}))}();
//# sourceMappingURL=index.f508c94b.js.map
