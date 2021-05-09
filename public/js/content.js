class Content {
    constructor(id, title, description, link, subject, group, contentList) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.subject = subject;
        this.group = group;
        this.link = link;
        this.contentList = contentList;
    }

    addContent() {
        this.contentList.push(this);
        return this.id
    }

    createCard(n) {
        let groupNames = document.querySelectorAll('.group-name')
        let cards = document.querySelectorAll('.tiles'),
            card = document.createElement('article'),
            title = document.createElement('h4'),
            description = document.createElement('p'),
            link = document.createElement('a'),
            editIcon = document.createElement('a');

        card.setAttribute('id', 'c-' + this.id)
        card.classList.add('tile')
        title.textContent = this.title
        description.textContent = this.description
        link.textContent = this.link

        editIcon.classList.add('edit-content')
        editIcon.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 12.6672V16H3.33287L13.1626 6.17028L9.82975 2.83741L0 12.6672ZM15.74 3.59286C16.0867 3.24625 16.0867 2.68632 15.74 2.33971L13.6603 0.259994C13.3137 -0.0866241 12.7538 -0.0866241 12.4072 0.259994L10.7807 1.88644L14.1136 5.21931L15.74 3.59286Z" fill="#909090"/>
          </svg>`

        card.appendChild(title)
        card.appendChild(description)
        card.appendChild(link)
        card.appendChild(editIcon)

        let currentGroup = this.group
        if (this.group == 'None') {
            cards[0].appendChild(card)
        } else {
            groupNames.forEach(function setGroup(object, index) {
                if (object.value == currentGroup) {
                    cards[index].appendChild(card)
                }
            })
        }
    }
}

export default Content