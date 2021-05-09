export function countTiles() {
    let total = document.querySelectorAll('.open-link'),
        tileContainers = document.querySelectorAll('.tiles'),
        groups = document.querySelectorAll('.group'),
        tiles = document.getElementsByClassName('tile')
    // writing the total number of cards at the head of each column
    total.forEach(function count(object, index) {
        let tileCount = 0;
        for (let i = 0; i < tileContainers[index].querySelectorAll('.tile').length; i ++) {
            if (tileContainers[index].querySelectorAll('.tile')[i].classList.length == 1) {
                tileCount += 1
            }
        }
        if (tileCount == 0) {
            total[index].textContent = 'Try adding content to this group.';
        } else if (tileCount == 1) {
            total[index].textContent = 'Open ' + tileCount + ' link';
        } else {
            total[index].textContent = 'Open ' + tileCount + ' links';
        }
        
    })
}

export function openGroupLinks() {
    let groupLinks = document.querySelectorAll('h3.open-link')
    groupLinks.forEach(function(groupLink) {
        groupLink.style.backgroundColor = 'green'
        if (groupLink.getAttribute('listener') !== 'true') {
            groupLink.style.color = '#FFDD88'
            groupLink.addEventListener('click', function() {
                let links = groupLink.parentElement.parentElement.querySelectorAll('a.external-link')
                
                links.forEach(function(link) {
                    let url = link.getAttribute('href')
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