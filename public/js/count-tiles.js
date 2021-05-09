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