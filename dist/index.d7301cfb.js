!function(){var t;function e(e){t=e.matches?"mobile":"desktop"}var n=window.matchMedia("(max-width: 700px)");e(n),n.addEventListener("change",e);const s=document.getElementsByTagName("main")[0],c=document.getElementById("tasks-tab"),d=document.getElementById("content-tab"),a=(document.getElementById("tasks"),document.getElementById("content"),document.getElementById("task-buttons")),o=document.getElementById("content-buttons");document.querySelectorAll("#task-buttons button.create"),document.querySelectorAll("#content-buttons button.create");function l(t){"tasks"==t?(s.appendChild(document.getElementById("tasks")),c.classList.add("active"),d.classList.remove("active"),a.style.display="flex",o.style.display="none"):"content"==t&&(s.appendChild(document.getElementById("content")),c.classList.remove("active"),d.classList.add("active"),a.style.display="none",o.style.display="flex")}l("tasks"),c.addEventListener("click",(function(){l("tasks")})),d.addEventListener("click",(function(){l("content")}));const i=document.querySelectorAll("#content-buttons button.icon")[0],m=document.querySelectorAll("#task-buttons button.icon")[0],u=document.getElementById("new-content"),y=document.getElementById("new-group"),r=document.getElementById("new-task"),v=document.getElementById("new-column"),E=document.getElementById("button-background");var b=!1,L=!1;function g(){0==L?(r.classList.add("active"),v.classList.add("active"),L=!0,"mobile"==t&&(E.style.display="flex")):1==L&&(r.classList.remove("active"),v.classList.remove("active"),L=!1,"mobile"==t&&(E.style.display="none"))}i.addEventListener("click",(function(){0==b?(u.classList.add("active"),y.classList.add("active"),b=!0,"mobile"==t&&(E.style.display="flex")):1==b&&(u.classList.remove("active"),y.classList.remove("active"),b=!1,"mobile"==t&&(E.style.display="none"))})),m.addEventListener("click",g),r.addEventListener("click",g),v.addEventListener("click",g)}();
//# sourceMappingURL=index.d7301cfb.js.map
