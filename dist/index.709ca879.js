!function(){var e,t,o=document.querySelectorAll(".total"),l=document.querySelectorAll(".cards");document.querySelectorAll(".card"),document.querySelectorAll(".edit")[0];t=l,(e=o).forEach((function(o,l){counta=0;for(let e=0;e<t[l].querySelectorAll(".card").length;e++)1==t[l].querySelectorAll(".card")[e].classList.length&&(counta+=1);t[l].classList.contains("draggable-container--over")&&(counta+=1),console.log("counter is :"+counta),e[l].textContent=counta})),(l=document.querySelectorAll(".cards")).forEach((function(e){new Sortable(e,{group:"nested",animation:200,fallbackOnBody:!0,swapThreshold:.65,ghostClass:"banana"})}));var a=document.getElementById("tasks");new Sortable(a,{animation:150,fallbackOnBody:!0,swapThreshold:.65,ghostClass:"apple"})}();
//# sourceMappingURL=index.709ca879.js.map
