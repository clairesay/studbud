// STACK OVERFLOW https://stackoverflow.com/questions/4880381/check-whether-html-element-has-scrollbars
// RESIZING CARD WIDTH BASED ON OVERFLOW PROPERTIES TO ACCOUNT FOR SCROLLBAR
function cardWidth() {

    let cards = document.querySelectorAll('.card');

    cards.forEach(function(element) {
        let cardContainer = element.parentElement
        let hasVerticalScrollbar = cardContainer.scrollHeight > cardContainer.clientHeight;

        if (hasVerticalScrollbar) {
            element.style.width = 'auto';
            element.style.maxWidth = '90%';
        } else {
            element.style.width = 'auto';
            cardContainer.style.paddingRight = '36px';
        }
    })
}