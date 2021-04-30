// SETTING THE TOTAL NUMBER OF CARDS IN EACH COLUMN FOR DISPLAY

// initialising the total for each of the elements
var total = document.querySelectorAll('.total')

// for each of them
total.forEach(function set(object) {
    // set the textcontent of total to be the number of cards in the respective column
    var cards = object.parentElement.nextElementSibling.querySelectorAll('div.cards .card');
    object.textContent = cards.length;
})