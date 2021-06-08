// counts how many tiles there are in total, and within a group
export function countTiles() {
    let groups = document.querySelectorAll('.group'),
        total = document.querySelectorAll('.open-link'),
        tileContainers = document.querySelectorAll('.tiles'),
        tiles = document.querySelectorAll('.tile'),
        openLinkSVG = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 16H2V2H9V0H2C0.89 0 0 0.9 0 2V16C0 17.1 0.89 18 2 18H16C17.1 18 18 17.1 18 16V9H16V16ZM11 0V2H14.59L4.76 11.83L6.17 13.24L16 3.41V7H18V0H11Z" fill="#909090"/>
        </svg>`;

    // writing the total number of cards at the head of each column
    // counts how many resource cards there are in each list
    total.forEach(function count(object, index) {
        let tileCount = 0;
        // iterates through each list of tiles, to add to tileCount
        for (let i = 0; i < tileContainers[index].querySelectorAll('.tile').length; i++) {
            if (tileContainers[index].querySelectorAll('.tile')[i].classList.length == 1) {
                tileCount += 1
            }
        }
        // if the tilecount is empty, there are no links to open in that group
        if (tileCount == 0) {
            total[index].innerHTML = '0 links' + openLinkSVG;
            total[index].classList.add('link-absent')
            // otherwise, enable group link opening with relevant CTA
        } else if (tileCount == 1) {
            total[index].innerHTML = 'Open ' + tileCount + ' link' + openLinkSVG;
            total[index].classList.remove('link-absent')
        } else {
            total[index].innerHTML = 'Open ' + tileCount + ' links' + openLinkSVG;
            total[index].classList.remove('link-absent')
        }
    })

    // show or hide the empty state message pending if there are tiles or not.
    let emptyStateMessage = document.getElementById('empty-state-content')
    if (tiles.length == 0) {
        tileContainers[0].appendChild(emptyStateMessage)
        emptyStateMessage.style.display = 'flex'
    } else {
        emptyStateMessage.style.display = 'none'
    }

    // show or hide ungrouped if there are none in it
    if (tiles.length > 0 && groups[0].querySelectorAll('.tile').length == 0) {
        groups[0].style.display = 'none'
    } else {
        groups[0].style.display = 'flex'
    }
}

// open all links within a group
export function openGroupLinks() {
    let groupLinks = document.querySelectorAll('h3.open-link')
    // for each group link
    groupLinks.forEach(function (groupLink) {
        if (groupLink.getAttribute('listener') != 'true') {
            // add an event listener so that on click, it opens up all links in child element
            groupLink.addEventListener('click', function () {
                let links = groupLink.parentElement.parentElement.querySelectorAll('a.external-link')
                links.forEach(function (link) {
                    let url = link.getAttribute('href')
                    // opens url in a new tab
                    window.open(url)
                })
            })
            groupLink.setAttribute('listener', 'true')
        }
    })
}

openGroupLinks()

// Setting sortable functionality to the cards with the sortable.js library
export function sortability() {
    // applying sortability to the children of each .cards container
    let tileContainers = document.querySelectorAll('.tiles')
    tileContainers.forEach(function (element) {
        new Sortable(element, {
            group: 'grouped',
            animation: 200,
            swapThreshold: 1,
            ghostClass: 'ghost-card',
            chosenClass: 'chosen-card',
            dragClass: "sortable-drag",
            filter: '.filtered', // 'filtered' class is not draggable
            forceFallback: true,

            onStart: function (evt) {
                // setting the cursor to grabbing while user is holding card
                let itemEl = evt.item;
                itemEl.style.cursor = 'grabbing'

                let body = document.getElementsByTagName('body')[0]
                body.style.cursor = 'grabbing'
            },

            onEnd: function (evt) {
                console.log('dropped')
                // setting the cursor to grab 
                let itemEl = evt.item;
                itemEl.style.cursor = 'grab'

                // reset cursor to normal arrow
                let body = document.getElementsByTagName('body')[0]
                body.style.cursor = 'initial'

                // recount all the tiles in each group and update their totals
                countTiles()

                 // // set enabled/disabled status to each of the buttons after the reallocation happened
                let allDeleteGroupButtons = document.querySelectorAll('svg.delete-group')
                allDeleteGroupButtons.forEach(function (button) {
                    let groups = document.getElementsByClassName('group')
                    let group = button.parentElement.parentElement.parentElement
                    let tiles = group.querySelectorAll('.tile')
    
                    //if there are tiles inside the group, or there is only 1 group, delete is disabled. 
                    if (groups.length > 1 && tiles.length == 0) {
                        button.classList.remove('disabled')
                    } else if (groups.length <= 1 || tiles.length > 0) {
                        button.classList.add('disabled')
                    }
                })
            },
        });
    })
}

sortability()