class Content {
    // declare variables
    constructor(id, title, description, link, group, contentList) {
        this.id = id;
        this.title = title;
        this.description = description;
        // this.subject = subject;
        this.group = group;
        this.link = link;
        this.contentList = contentList;
    }

    // add content to array
    addContent() {
        this.contentList.push(this);
        return this.id
    }

    // create new card with relevant elements
    createCard(n) {
        let groupNames = document.querySelectorAll('.group-name')
        let cards = document.querySelectorAll('.tiles'),
            card = document.createElement('article'),
            title = document.createElement('h4'),
            descriptionContainer = document.createElement('pre'),
            description = document.createElement('code'),
            link = document.createElement('a'),
            linkIcon = document.createElement('svg'),
            editIcon = document.createElement('a'),
            line = document.createElement('HR');

        card.setAttribute('id', 'c-' + this.id)
        card.classList.add('tile')
        title.textContent = this.title
        // description.classList.add('class="language-css"')
        if (this.description.length > 0) {
            description.textContent = this.description
            descriptionContainer.appendChild(description)
        }

        // fix links pending invalid nature
        if (this.link.includes('https://') || this.link.includes('http://')) {
            link.textContent = this.link
            link.setAttribute('href', this.link)
        } else {
            link.textContent = 'https://' + this.link
            link.setAttribute('href', 'https://' + this.link)
        }

        // set attribute for 'open in new tab' functionality
        link.classList.add('external-link')
        link.setAttribute('target', '_blank')
        link.appendChild(linkIcon)

        // add icons
        linkIcon.innerHTML = `<svg width="20" height="10" viewBox="0 0 20 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.9 5.00003C1.9 3.29003 3.29 1.90003 5 1.90003H9V3.05176e-05H5C2.24 3.05176e-05 0 2.24003 0 5.00003C0 7.76003 2.24 10 5 10H9V8.10003H5C3.29 8.10003 1.9 6.71003 1.9 5.00003ZM6 6.00003H14V4.00003H6V6.00003ZM15 3.05176e-05H11V1.90003H15C16.71 1.90003 18.1 3.29003 18.1 5.00003C18.1 6.71003 16.71 8.10003 15 8.10003H11V10H15C17.76 10 20 7.76003 20 5.00003C20 2.24003 17.76 3.05176e-05 15 3.05176e-05Z" fill="#909090"/>
        </svg>
        `
        editIcon.classList.add('edit-content')
        editIcon.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 12.6672V16H3.33287L13.1626 6.17028L9.82975 2.83741L0 12.6672ZM15.74 3.59286C16.0867 3.24625 16.0867 2.68632 15.74 2.33971L13.6603 0.259994C13.3137 -0.0866241 12.7538 -0.0866241 12.4072 0.259994L10.7807 1.88644L14.1136 5.21931L15.74 3.59286Z" fill="#909090"/>
          </svg>`

        // append elements to the card
        card.appendChild(title)
        card.appendChild(descriptionContainer)
        card.appendChild(line)

        card.appendChild(link)
        card.appendChild(editIcon)

        // add card to relevant group, or to 'Ungrouped' as the default
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
        hljs.highlightAll();
    }
}

export default Content