class Group {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    // updateGroupNames() {
    //     let groupNames = document.querySelectorAll('.group-name')
    //     let groups = createContentForm.querySelector('select[name=group]');
    //     groups.innerHTML = ''
    //     groupNames.forEach(function (object) {
    //         let newOption = document.createElement('option')
    //         newOption.textContent = object.value
    //         newOption.value = object.value
    //         groups.appendChild(newOption)
    //     })
    // }

    createGroup() {
        // creating the column
        let group = document.querySelector('div.group')
        group = group.cloneNode(true)

        let groupName = group.querySelector('input.group-name')
        // console.log(groupName)
        // console.log()
        groupName.value = this.name;
        groupName.removeAttribute('disabled')
        let editButton = group.querySelector('svg.edit-group')
        let deleteButton = group.querySelector('svg.delete-group')

        let tiles = group.querySelectorAll('.tile')
        tiles.forEach(function (tile) {
            tile.remove()
        })

        // let column = document.createElement('div')
        // column.classList.add('column')
        // let title = document.createElement('div')
        // title.classList.add('title')
        // let columnName = document.createElement('input')
        // columnName.classList.add('column-name')
        // columnName.value = this.name

        // let editButton = document.querySelector('svg.edit-column')
        // editButton = editButton.cloneNode(true)
        
        // let deleteButton = document.querySelector('svg.delete-column')
        // deleteButton = deleteButton.cloneNode(true)

        // let total = document.createElement('h3')
        // total.classList.add('total')
        // total.textContent = 0;
        // let cards = document.createElement('div')
        // cards.classList.add('cards')
    
        // title.appendChild(columnName)

        // title.appendChild(total)
        // title.appendChild(editButton)

        // title.appendChild(deleteButton)

        // column.appendChild(title)
        // column.appendChild(cards)

        let content = document.getElementById('content')
        content.appendChild(group)

        // this.editColumn(editButton)
        // this.deleteColumn(deleteButton)
        // this.updateColumns()

        // smooth scroll to the new column
        group.scrollTo({
            top: content.clientHeight,
            left: 0,
            behavior: 'smooth'
        })
    }

}

export default Group