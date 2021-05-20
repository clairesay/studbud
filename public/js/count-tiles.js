export function countTiles() {
    let total = document.querySelectorAll('.open-link'),
        tileContainers = document.querySelectorAll('.tiles'),
        openLinkSVG = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 16H2V2H9V0H2C0.89 0 0 0.9 0 2V16C0 17.1 0.89 18 2 18H16C17.1 18 18 17.1 18 16V9H16V16ZM11 0V2H14.59L4.76 11.83L6.17 13.24L16 3.41V7H18V0H11Z" fill="#909090"/>
        </svg>`;
    // writing the total number of cards at the head of each column
    // counts how many resource cards there are in each list
    total.forEach(function count(object, index) {
        let tileCount = 0;
        for (let i = 0; i < tileContainers[index].querySelectorAll('.tile').length; i ++) {
            if (tileContainers[index].querySelectorAll('.tile')[i].classList.length == 1) {
                tileCount += 1
            }
        }
        // if the tilecount is empty, cannot open links
        if (tileCount == 0) {
            total[index].innerHTML = '0 links';
        // otherwise, enable group link opening
        } else if (tileCount == 1) {
            total[index].innerHTML = 'Open ' + tileCount + ' link' + openLinkSVG;
        } else {
            total[index].innerHTML = 'Open ' + tileCount + ' links' + openLinkSVG;
        }
    })
}

// open all links within a group
export function openGroupLinks() {
    console.log('grouplinks')
    let groupLinks = document.querySelectorAll('h3.open-link')
    // for each group link
    groupLinks.forEach(function(groupLink) {
        if (groupLink.getAttribute('listener') != 'true') {
            // add an event listener so that on click, it opens up all links in child element
            groupLink.addEventListener('click', function() {
                console.log('clicked')
                let links = groupLink.parentElement.parentElement.querySelectorAll('a.external-link')
                links.forEach(function(link) {
                    let url = link.getAttribute('href')
                    
                    // ensuring the link is to a valid external site
                    if (url.includes('https://') || url.includes('http://')) {
                        window.open(url)
                    } else {
                        url = 'https://' + url
                        window.open(url)
                    }  
                })
            })
            groupLink.setAttribute('listener', 'true')
        }
    })
}

openGroupLinks()