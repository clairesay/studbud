!function(){const t=new Plyr("audio",{controls:["progress"]});window.player=t;var e=[{source:"BEAST.mp3",title:"Amerika",artist:"Audiobinger",album_art:"./audiobinger.jpg"},{source:"If-I-Could-Remember.mp3",title:"If I Could Remember",artist:"Ketsa",album_art:"imagesalbumartKetsa.jpg"}];const n=document.querySelector("#music");var r=n.querySelector("audio");const l=n.querySelector("ul.playlist"),o=n.querySelector("#previous"),a=n.querySelector("#next"),s=n.querySelector("#shuffle");var c,u,d=n.querySelector("#play-pause");function p(){t.paused?d.innerHTML='<svg width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">\n        <path d="M0 0V21L18 10.5L0 0Z" fill="#303030"/>\n        </svg>':t.playing&&(d.innerHTML='<svg width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">\n        <path d="M0 21H6V0H0V21ZM12 0V21H18V0H12Z" fill="#303030"/>\n        </svg>')}function m(){e.forEach((function(t,e){let n=document.createElement("li"),i=document.createElement("img"),r=document.createElement("h3"),o=document.createElement("h4");i.setAttribute("src",t.album_art),r.textContent=t.title,o.textContent=t.artist,r.appendChild(o),n.appendChild(i),n.appendChild(r),l.appendChild(n),n.addEventListener("click",(function(){h(e)}))})),c=n.querySelectorAll("li")}d.addEventListener("click",(function(e){e.stopPropagation(),t.togglePlay(),p()})),m(),o.addEventListener("click",(function(t){let n;t.stopPropagation(),n=0==u?e.length-1:u-1,h(n)})),a.addEventListener("click",(function(t){let n;t.stopPropagation(),n=u==e.length-1?0:u+1,h(n)})),s.addEventListener("click",(function(t){for(t.stopPropagation(),i=e.length-1;i>0;i--){var n=Math.floor(Math.random()*(i+1)),r=e[i];e[i]=e[n],e[n]=r}l.innerHTML="",m(),h(0)}));var g=document.getElementById("phantom-play-button");function h(i,o){i==e.length&&(u=i=0,o="initial"),c[i].classList.add("active"),c.forEach((function(t,e){e!=i&&t.classList.remove("active"),"true"!=t.getAttribute("listener")&&(t.addEventListener("mouseover",(function(){t.appendChild(g),t.classList.contains("active")?g.style.display="none":g.style.display="flex"})),t.setAttribute("listener","true"))})),l.appendChild(c[i]),u=i;let a=e[i],s=document.getElementById("current").querySelector("img"),d=document.querySelector("h1.title"),m=document.querySelector("h3.artist"),h=document.createElement("source");h.setAttribute("type","audio/mp3"),h.setAttribute("src",a.source),r.innerHTML="",r.appendChild(h),s.setAttribute("src",a.album_art),d.textContent=a.title,m.textContent=a.artist,t.source={type:"audio",title:a.title,sources:[{src:a.source}]},"initial"!=o&&(n.setAttribute("static","false"),t.play()),p()}h(0,"initial"),t.on("playing",(()=>{n.setAttribute("static","false")})),t.on("pause",(()=>{n.setAttribute("static","true")})),t.on("ended",(()=>{h(u+1),n.setAttribute("static","true")}));var y=0,f=0;l.addEventListener("scroll",(function(){var t=l.scrollTop;t>y?f+=1:0==t&&setTimeout((function(){l.style.height="100px"}),500),f>5&&(l.style.height="250px",f=0),y=t<=0?0:t}),!1)}();
//# sourceMappingURL=index.c7b78388.js.map
