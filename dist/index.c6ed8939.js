!function(){const t=document.getElementById("time"),e=document.getElementById("time-selector"),o=document.getElementById("dropdown");var n=document.querySelector("#time nav #peek-status"),r=document.querySelector("#time nav h1"),c=r.querySelector("span.min"),s=r.querySelector("span.sec"),l=!1;function i(){0==l?(e.classList="open",l=!0):1==l&&(e.classList="close",l=!1)}o.addEventListener("click",i);const d=document.getElementById("stopwatch"),a=document.getElementById("stopwatch-select"),u=document.getElementById("pomodoro"),m=document.getElementById("pomodoro-select");function y(){let t=e.querySelector(":first-child");"stopwatch-select"==t.id?(d.classList.add("active"),u.classList.remove("active")):"pomodoro-select"==t.id&&(d.classList.remove("active"),u.classList.add("active"))}a.addEventListener("click",(function(){e.appendChild(m),y()})),m.addEventListener("click",(function(){e.appendChild(a),y()})),y();var p=sec=milli=0,v=document.querySelector("#stopwatch .minutes"),f=document.querySelector("#stopwatch .seconds"),x=document.querySelector("#stopwatch .milliseconds");const k=document.querySelector("#stopwatch button.start-stop"),S=document.querySelector("#stopwatch button.reset");var C,L,b,q,w,E=!1;S.addEventListener("click",(function(){milli=sec=p=g=0,v.textContent=h(p),f.textContent=h(sec),x.textContent=h(milli),c.textContent=h(p),s.textContent=h(sec),k.textContent="Start",k.classList.remove("danger"),k.classList.add("primary"),S.disabled=!1,E=!1,t.setAttribute("static","true"),clearInterval(C),o.addEventListener("click",i)}));var g=0;function h(t){return t.toLocaleString("en-US",{minimumIntegerDigits:2,useGrouping:!1})}k.addEventListener("click",(function(){if(t.setAttribute("static","false"),1==E)clearInterval(C),k.textContent="Start",k.classList.remove("danger"),k.classList.add("primary"),E=!1,g=10*parseInt(milli);else if(0==E){function e(){b=Date.now(),w=(q=b-L+g).toLocaleString("en-US",{minimumIntegerDigits:3,useGrouping:!1}),milli=w[0]+w[1],q>=1e3&&(L+=1e3,sec+=1),60==sec&&(sec=0,p+=1)}L=Date.now(),e(),C=setInterval((function(){v.textContent=h(p),f.textContent=h(sec),x.textContent=h(milli),c.textContent=h(p),s.textContent=h(sec),e()}),10),S.disabled=!1,k.textContent="Stop",k.classList.remove("primary"),k.classList.add("danger"),o.removeEventListener("click",i),E=!0}}));var I=25,B=5,A=document.querySelector("#pomodoro #work .minutes"),D=(document.querySelector("#pomodoro #work .seconds"),document.querySelector("#pomodoro #break .minutes"));document.querySelector("#pomodoro #break .seconds");const G=document.querySelector("#pomodoro #work"),U=document.querySelector("#pomodoro #break"),j=document.querySelector("#pomodoro div#timer"),z=document.querySelector("#pomodoro #work button.add"),F=document.querySelector("#pomodoro #work button.subtract"),H=document.querySelector("#pomodoro #break button.add"),J=document.querySelector("#pomodoro #break button.subtract"),K=document.querySelector("#pomodoro button.start-stop");var M=I,N=0,O=document.querySelector("#pomodoro #timer .minutes"),P=document.querySelector("#pomodoro #timer .seconds");O.textContent=h(M);var Q,R=!1;z.addEventListener("click",(()=>et("add","work"))),F.addEventListener("click",(()=>et("subtract","work"))),H.addEventListener("click",(()=>et("add","break"))),J.addEventListener("click",(()=>et("subtract","break"))),G.style.display="flex",U.style.display="flex",j.style.display="none";var T=document.getElementById("timeline");const V=document.querySelectorAll("#pomodoro div.length > div"),W=(document.querySelectorAll("#pomodoro div > div.length"),document.querySelector("#pomodoro div#final-load")),X=document.querySelector("#pomodoro div#final-load div");document.getElementById("reset-pomo").addEventListener("click",(function(){M=25,I=25,B=5,A.textContent=h(25),D.textContent=h(5),ot()})),K.addEventListener("click",(function(){if(1==R)rt(),_="break",nt("static");else if(0==R){t.setAttribute("static","false"),G.style.display="none",U.style.display="none",j.style.display="flex",Q=setInterval((function(){0==M&&0==N?(tt+=1,nt()):0==N?(M-=1,N=59):N-=1,O.textContent=h(M),P.textContent=h(N),c.textContent=h(M),s.textContent=h(N)}),1e3),K.textContent="Stop",K.classList.remove("primary"),K.classList.add("danger"),o.removeEventListener("click",i),R=!0,nt()}}));const Y=document.querySelectorAll("#pomodoro div > div.length:nth-child(2n + 1)"),Z=document.querySelectorAll("#pomodoro div > div.length:nth-child(2n)"),$=document.getElementById("pomo-status");var _="work",tt=0;function et(t,e){"work"==e?"add"==t&&I<60?I+=5:"subtract"==t&&I>5&&(I-=5):"break"==e&&("add"==t&&B<20?B+=5:"subtract"==t&&B>5&&(B-=5)),M=I,O.textContent=h(M),A.textContent=h(I),D.textContent=h(B),ot()}function ot(){let t=3*I+2*B,e=I/t*232,o=B/t*232;Y.forEach((function(t){t.style.width=e+"px"})),Z.forEach((function(t){t.style.width=o+"px"}))}function nt(t){if($.textContent=_,n.textContent=_,tt<5){let e;"work"==_?(M=I,N=0,_="break"):"break"==_&&(M=B,N=0,_="work"),"work"==_?e=0+60*B:"break"==_&&(e=0+60*I),V[tt].style.animation="static"==t?"none":"load-spans "+e+"s linear forwards",W.style.display="none",T.style.display="flex"}else if(5==tt){_="finalbreak";let t=60*(M=30)+(N=0);W.style.display="flex",T.style.display="none",X.style.animation="load-spans "+t+"s linear forwards"}else W.style.display="none",T.style.display="flex",rt(),_="work"}function rt(){t.setAttribute("static","true"),M=I,N=0,O.textContent=h(M),P.textContent=h(N),c.textContent=h(M),s.textContent=h(N),clearInterval(Q),K.textContent="Start",K.classList.remove("danger"),K.classList.add("primary"),o.addEventListener("click",i),G.style.display="flex",U.style.display="flex",j.style.display="none",R=!1,V.forEach((function(t){t.style.animation=""})),X.style.animation="none",tt=0}ot(),A.textContent=h(I),D.textContent=h(B)}();
//# sourceMappingURL=index.c6ed8939.js.map