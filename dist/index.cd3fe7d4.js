!function(){function t(t){return t&&t.__esModule?t.default:t}var e={};var n=function(t){var n=e[t];if(null==n)throw new Error("Could not resolve bundle with id "+t);return n};(function(t){for(var n=Object.keys(t),r=0;r<n.length;r++)e[n[r]]=t[n[r]]})(JSON.parse('{"7aYQq":"index.cd3fe7d4.js","GhzGv":"BEAST.a95bf37d.mp3"}'));var r=null;var l,a=function(){return r||(r=function(){try{throw new Error}catch(e){var t=(""+e.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);if(t)return(""+t[0]).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/,"$1")+"/"}return"/"}()),r},o=n;function s(t){if(""===t)return".";var e="/"===t[t.length-1]?t.slice(0,t.length-1):t,n=e.lastIndexOf("/");return-1===n?".":e.slice(0,n)}function u(t,e){if(t===e)return"";var n=t.split("/");"."===n[0]&&n.shift();var r,i,l=e.split("/");for("."===l[0]&&l.shift(),r=0;(r<l.length||r<n.length)&&null==i;r++)n[r]!==l[r]&&(i=r);var a=[];for(r=0;r<n.length-i;r++)a.push("..");return l.length>i&&a.push.apply(a,l.slice(i)),a.join("/")}(l=function(t,e){return u(s(o(t)),o(e))})._dirname=s,l._relative=u;var c=t(a()+l("7aYQq","GhzGv"));const d=new Plyr("audio",{controls:["progress"]});window.player=d;var p=[{source:c,title:"Amerika",artist:"Audiobinger",album_art:"./audiobinger.jpg"},{source:"If-I-Could-Remember.mp3",title:"If I Could Remember",artist:"Ketsa",album_art:"imagesalbumartKetsa.jpg"}];const f=document.querySelector("#music");var h=f.querySelector("audio");const v=f.querySelector("ul.playlist"),g=f.querySelector("#previous"),m=f.querySelector("#next"),y=f.querySelector("#shuffle");var b,E,w=f.querySelector("#play-pause");function A(){d.paused?w.innerHTML='<svg width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">\n        <path d="M0 0V21L18 10.5L0 0Z" fill="#303030"/>\n        </svg>':d.playing&&(w.innerHTML='<svg width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">\n        <path d="M0 21H6V0H0V21ZM12 0V21H18V0H12Z" fill="#303030"/>\n        </svg>')}function L(){p.forEach((function(t,e){let n=document.createElement("li"),r=document.createElement("img"),i=document.createElement("h3"),l=document.createElement("h4");r.setAttribute("src",t.album_art),i.textContent=t.title,l.textContent=t.artist,i.appendChild(l),n.appendChild(r),n.appendChild(i),v.appendChild(n),n.addEventListener("click",(function(){x(e)}))})),b=f.querySelectorAll("li")}w.addEventListener("click",(function(t){t.stopPropagation(),d.togglePlay(),A()})),L(),g.addEventListener("click",(function(t){let e;t.stopPropagation(),e=0==E?p.length-1:E-1,x(e)})),m.addEventListener("click",(function(t){let e;t.stopPropagation(),e=E==p.length-1?0:E+1,x(e)})),y.addEventListener("click",(function(t){for(t.stopPropagation(),i=p.length-1;i>0;i--){var e=Math.floor(Math.random()*(i+1)),n=p[i];p[i]=p[e],p[e]=n}v.innerHTML="",L(),x(0)}));var S=document.getElementById("phantom-play-button");function x(t,e){t==p.length&&(E=t=0,e="initial"),b[t].classList.add("active"),b.forEach((function(e,n){n!=t&&e.classList.remove("active"),"true"!=e.getAttribute("listener")&&(e.addEventListener("mouseover",(function(){e.appendChild(S),e.classList.contains("active")?S.style.display="none":S.style.display="flex"})),e.setAttribute("listener","true"))})),v.appendChild(b[t]),E=t;let n=p[t],r=document.getElementById("current").querySelector("img"),i=document.querySelector("h1.title"),l=document.querySelector("h3.artist"),a=document.createElement("source");a.setAttribute("type","audio/mp3"),a.setAttribute("src",n.source),h.innerHTML="",h.appendChild(a),r.setAttribute("src",n.album_art),i.textContent=n.title,l.textContent=n.artist,d.source={type:"audio",title:n.title,sources:[{src:n.source}]},"initial"!=e&&(f.setAttribute("static","false"),d.play()),A()}x(0,"initial"),d.on("playing",(()=>{f.setAttribute("static","false")})),d.on("pause",(()=>{f.setAttribute("static","true")})),d.on("ended",(()=>{x(E+1),f.setAttribute("static","true")}));var C=0,q=0;v.addEventListener("scroll",(function(){var t=v.scrollTop;t>C?q+=1:0==t&&setTimeout((function(){v.style.height="100px"}),500),q>5&&(v.style.height="250px",q=0),C=t<=0?0:t}),!1)}();
//# sourceMappingURL=index.cd3fe7d4.js.map
