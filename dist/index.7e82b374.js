!function(){function e(e){e.matches?deviceSize="tablet":deviceSize="desktop"}function t(e){e.matches&&(deviceSize="mobile")}var n=window.matchMedia("(max-width: 700px)");e(n),n.addEventListener("change",e);var i=window.matchMedia("(max-width: 500px)");t(i),i.addEventListener("change",t);const c=document.getElementsByTagName("main")[0],s=document.getElementById("tasks-tab"),d=document.getElementById("content-tab"),a=document.getElementById("task-buttons"),l=document.getElementById("content-buttons"),o=(document.querySelectorAll("#task-buttons button.create"),document.querySelectorAll("#content-buttons button.create"),document.getElementById("tasks")),m=document.getElementById("content");function u(e){"tasks"==e?(c.appendChild(document.getElementById("tasks")),s.classList.add("active"),d.classList.remove("active"),o.style.visibility="visible",m.style.visibility="hidden",a.style.display="flex",l.style.display="none"):"content"==e&&(c.appendChild(document.getElementById("content")),s.classList.remove("active"),d.classList.add("active"),o.style.visibility="hidden",m.style.visibility="visible",a.style.display="none",l.style.display="flex")}u("tasks"),s.addEventListener("click",(function(){u("tasks")})),d.addEventListener("click",(function(){u("content")}));const v=document.querySelectorAll("#content-buttons button.icon")[0],y=document.getElementById("new-content"),r=document.getElementById("new-group"),b=document.querySelectorAll("#task-buttons button.icon")[0],E=document.getElementById("new-task"),L=document.getElementById("new-column"),k=document.getElementById("button-background");var g=!1,p=!1;function B(){0==g?(y.classList.add("active"),r.classList.add("active"),g=!0,"tablet"==deviceSize&&(k.style.display="flex")):1==g&&(y.classList.remove("active"),r.classList.remove("active"),g=!1,"tablet"==deviceSize&&(k.style.display="none"))}function f(){0==p?(E.classList.add("active"),L.classList.add("active"),p=!0,"tablet"==deviceSize&&(k.style.display="flex")):1==p&&(E.classList.remove("active"),L.classList.remove("active"),p=!1,"tablet"==deviceSize&&(k.style.display="none"))}v.addEventListener("click",B),y.addEventListener("click",B),r.addEventListener("click",B),k.addEventListener("click",(function(){1==g?B():1==p&&f()})),b.addEventListener("click",f),E.addEventListener("click",f),L.addEventListener("click",f)}();
//# sourceMappingURL=index.7e82b374.js.map