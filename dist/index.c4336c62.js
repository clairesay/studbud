!function(){function e(){var e=document.querySelectorAll(".total"),o=document.querySelectorAll(".cards");e.forEach((function(t,n){counta=0;for(let e=0;e<o[n].querySelectorAll(".card").length;e++)1==o[n].querySelectorAll(".card")[e].classList.length&&(counta+=1);e[n].textContent=counta}))}e(),document.querySelectorAll(".cards").forEach((function(o){new Sortable(o,{group:"nested",animation:200,swapThreshold:.65,ghostClass:"ghost-card",chosenClass:"chosen-card",forceFallback:!0,onEnd:function(o){e(),console.log(o.to.parentElement.querySelector("div.title input.column-name").value);o.item}})}));var o=document.getElementById("tasks");new Sortable(o,{animation:150,swapThreshold:.8,ghostClass:"ghost-column",chosenClass:"chosen-column",forceFallback:!0})}();
//# sourceMappingURL=index.c4336c62.js.map