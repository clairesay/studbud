export function countTiles() {
    let total = document.querySelectorAll('.open-link'),
        tileContainers = document.querySelectorAll('.tiles');
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
            total[index].textContent = '';
        // otherwise, enable group link opening
        } else if (tileCount == 1) {
            total[index].textContent = 'Open ' + tileCount + ' link';
        } else {
            total[index].textContent = 'Open ' + tileCount + ' links';
        }
    })
}

// open all links within a group
export function openGroupLinks() {
    let groupLinks = document.querySelectorAll('h3.open-link')
    // for each group link
    groupLinks.forEach(function(groupLink) {
        if (groupLink.getAttribute('listener') !== 'true') {
            // add an event listener so that on click, it opens up all links in child element
            groupLink.addEventListener('click', function() {
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