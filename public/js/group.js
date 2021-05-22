class Group {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    addGroup() { 
        groupList.push(this)
        localStorage.setItem('groupList', JSON.stringify(groupList))
    }

    createGroup() {
        // creating the group
        let group = document.querySelector('div.group')
        group = group.cloneNode(true)

        let groupName = group.querySelector('input.group-name')

        groupName.value = this.name;
        groupName.removeAttribute('disabled')

        let groupLink = group.querySelector('h3.open-link')
        groupLink.setAttribute('listener', 'false')

        let editButton = group.querySelector('svg.edit-group')
        editButton.classList.remove('first')
        let deleteButton = group.querySelector('svg.delete-group')
        deleteButton.classList.remove('first')

        let tiles = group.querySelectorAll('.tiles > *')
        tiles.forEach(function (tile) {
            tile.remove()
        })
 

        let content = document.getElementById('content')
        content.appendChild(group)

        // smooth scroll to the new column
        group.scrollTo({
            top: content.clientHeight,
            left: 0,
            behavior: 'smooth'
        })
    }

}

export default Group