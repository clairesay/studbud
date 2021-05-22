class Group {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    createGroup() {
        // creating the group
        let group = document.querySelector('div.group')
        group = group.cloneNode(true)
        group.style.display = 'flex'

        // setting the relevant name, link values and edit and delete buttons
        let groupName = group.querySelector('input.group-name'),
            groupLink = group.querySelector('h3.open-link'),
            editButton = group.querySelector('svg.edit-group'),
            deleteButton = group.querySelector('svg.delete-group')

        // setting attributes
        groupName.value = this.name;
        groupName.removeAttribute('disabled')        
        groupLink.setAttribute('listener', 'false')
        editButton.classList.remove('first')
        deleteButton.classList.remove('first')

        // removing any tiles that might have duplicated over
        let tiles = group.querySelectorAll('.tiles > *')
        tiles.forEach(function (tile) {
            tile.remove()
        })
 
        // append the group to the content tab
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