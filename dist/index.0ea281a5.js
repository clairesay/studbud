!function(){const t=document.getElementById("time"),e=document.getElementById("time-selector"),o=document.getElementById("dropdown");var n=!1;function r(){0==n?(e.classList="open",n=!0):1==n&&(e.classList="close",n=!1)}o.addEventListener("click",r);const c=document.getElementById("stopwatch"),l=document.getElementById("stopwatch-select"),d=document.getElementById("pomodoro"),i=document.getElementById("pomodoro-select");function s(){let t=e.querySelector(":first-child");"stopwatch-select"==t.id?(c.classList.add("active"),d.classList.remove("active")):"pomodoro-select"==t.id&&(c.classList.remove("active"),d.classList.add("active"))}l.addEventListener("click",(function(){e.appendChild(i),s()})),i.addEventListener("click",(function(){e.appendChild(l),s()})),s();var a=sec=milli=0,u=document.querySelector("#stopwatch .minutes"),m=document.querySelector("#stopwatch .seconds"),y=document.querySelector("#stopwatch .milliseconds");const p=document.querySelector("#stopwatch button.start-stop"),v=document.querySelector("#stopwatch button.reset");var f,k,S,x,b,w=!1;v.addEventListener("click",(function(){milli=sec=a=E=0,u.textContent=q(a),m.textContent=q(sec),y.textContent=q(milli),p.textContent="Start",v.disabled=!1,w=!1,t.setAttribute("static","true"),clearInterval(f),o.addEventListener("click",r)}));var E=0;function q(t){return t.toLocaleString("en-US",{minimumIntegerDigits:2,useGrouping:!1})}p.addEventListener("click",(function(){if(t.setAttribute("static","false"),1==w)clearInterval(f),p.textContent="Start",w=!1,E=10*parseInt(milli);else if(0==w){function e(){S=Date.now(),b=(x=S-k+E).toLocaleString("en-US",{minimumIntegerDigits:3,useGrouping:!1}),milli=b[0]+b[1],x>=1e3&&(k+=1e3,sec+=1),60==sec&&(sec=0,a+=1)}k=Date.now(),e(),f=setInterval((function(){u.textContent=q(a),m.textContent=q(sec),y.textContent=q(milli),e()}),10),v.disabled=!1,p.textContent="Stop",o.removeEventListener("click",r),w=!0}}));var C=25,h=5,L=document.querySelector("#pomodoro #work .minutes"),g=(document.querySelector("#pomodoro #work .seconds"),document.querySelector("#pomodoro #break .minutes"));document.querySelector("#pomodoro #break .seconds");const I=document.querySelector("#pomodoro #work"),B=document.querySelector("#pomodoro #break"),A=document.querySelector("#pomodoro div#timer"),D=document.querySelector("#pomodoro #work button.add"),G=document.querySelector("#pomodoro #work button.subtract"),U=document.querySelector("#pomodoro #break button.add"),j=document.querySelector("#pomodoro #break button.subtract"),z=document.querySelector("#pomodoro button.start-stop");var F=C,H=0,J=document.querySelector("#pomodoro #timer .minutes"),K=document.querySelector("#pomodoro #timer .seconds");J.textContent=q(F);var M,N=!1;D.addEventListener("click",(()=>Z("add","work"))),G.addEventListener("click",(()=>Z("subtract","work"))),U.addEventListener("click",(()=>Z("add","break"))),j.addEventListener("click",(()=>Z("subtract","break"))),I.style.display="flex",B.style.display="flex",A.style.display="none";var O=document.getElementById("timeline");const P=document.querySelectorAll("#pomodoro div.length > div"),Q=(document.querySelectorAll("#pomodoro div > div.length"),document.querySelector("#pomodoro div#final-load")),R=document.querySelector("#pomodoro div#final-load div");document.getElementById("reset-pomo").addEventListener("click",(function(){F=25,C=25,h=5,L.textContent=q(25),g.textContent=q(5),$()})),z.addEventListener("click",(function(){if(1==N)tt(),X="break",_("static");else if(0==N){t.setAttribute("static","false"),I.style.display="none",B.style.display="none",A.style.display="flex",M=setInterval((function(){0==F&&0==H?(Y+=1,_()):0==H?(F-=1,H=59):H-=1,J.textContent=q(F),K.textContent=q(H)}),1e3),z.textContent="Stop",o.removeEventListener("click",r),N=!0,_()}}));const T=document.querySelectorAll("#pomodoro div > div.length:nth-child(2n + 1)"),V=document.querySelectorAll("#pomodoro div > div.length:nth-child(2n)"),W=document.getElementById("pomo-status");var X="work",Y=0;function Z(t,e){"work"==e?"add"==t&&C<60?C+=5:"subtract"==t&&C>5&&(C-=5):"break"==e&&("add"==t&&h<20?h+=5:"subtract"==t&&h>5&&(h-=5)),F=C,J.textContent=q(F),L.textContent=q(C),g.textContent=q(h),$()}function $(){let t=3*C+2*h,e=C/t*232,o=h/t*232;T.forEach((function(t){t.style.width=e+"px"})),V.forEach((function(t){t.style.width=o+"px"}))}function _(t){if(W.textContent=X,Y<5){let e;"work"==X?(F=C,H=0,X="break"):"break"==X&&(F=h,H=0,X="work"),"work"==X?e=0+60*C:"break"==X&&(e=0+60*h),P[Y].style.animation="static"==t?"none":"load-spans "+e+"s linear forwards",Q.style.display="none",O.style.display="flex"}else if(5==Y){X="finalbreak";let t=60*(F=30)+(H=0);Q.style.display="flex",O.style.display="none",R.style.animation="load-spans "+t+"s linear forwards"}else Q.style.display="none",O.style.display="flex",tt(),X="work"}function tt(){t.setAttribute("static","true"),F=C,H=0,J.textContent=q(F),K.textContent=q(H),clearInterval(M),z.textContent="Start",o.addEventListener("click",r),I.style.display="flex",B.style.display="flex",A.style.display="none",N=!1,P.forEach((function(t){t.style.animation=""})),R.style.animation="none",Y=0}$(),L.textContent=q(C),g.textContent=q(h)}();
//# sourceMappingURL=index.0ea281a5.js.map
