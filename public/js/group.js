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

        groupName.value = this.name;
        groupName.removeAttribute('disabled')


        // let interactiveContainer = groupName.parentElement
        // groupName = document.createElement('input')
        // groupName.classList.add('group-name')
        // groupName.value = this.name;
        // interactiveContainer.innerHTML =  groupName + `
        // <svg class="edit-group" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        //     <path
        //         d="M0 12.6672V16H3.33287L13.1626 6.17028L9.82975 2.83741L0 12.6672ZM15.74 3.59286C16.0867 3.24625 16.0867 2.68632 15.74 2.33971L13.6603 0.259994C13.3137 -0.0866241 12.7538 -0.0866241 12.4072 0.259994L10.7807 1.88644L14.1136 5.21931L15.74 3.59286Z"
        //         fill="#909090" />
        // </svg>
        // <svg class="delete-group" width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        //     <path d="M1 16C1 17.1 1.9 18 3 18H11C12.1 18 13 17.1 13 16V4H1V16ZM14 1H10.5L9.5 0H4.5L3.5 1H0V3H14V1Z" fill="#909090"/>
        // </svg>`


        let editButton = group.querySelector('svg.edit-group')
        editButton.classList.remove('first')
        let deleteButton = group.querySelector('svg.delete-group')
        deleteButton.classList.remove('first')

        // let toolTips = group.querySelectorAll('.tooltip') 
        // toolTips.forEach(function(toolTip) {
        //     toolTip.remove();
        // })

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