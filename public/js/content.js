const newContent = document.getElementById('new-content')
const createContentForm = document.getElementById('create-content-form')
var overlayToggle = false
const modalBackground = document.getElementById('modal-background')
newContent.addEventListener('click', function() {openContentForm()})

function openContentForm(type) {
    if (type == 'update') {

    }
    if (overlayToggle == false) {
        createContentForm.classList.add('active')
        overlayToggle = true
        modalBackground.style.display = 'flex'
    } else if (overlayToggle == true) {
        createContentForm.classList.remove('active')
        createContentForm.reset()
        overlayToggle = false
        modalBackground.style.display = 'none'
    }
}

var contentList = [];
class Content {
    constructor(id, title, description, link, subject, group) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.subject = subject;
        this.group = group;
        this.link = link;
    }

    addContent() {
        contentList.push(this);
        return this.id
    }

    createCard(n) {
        var groupNames = document.querySelectorAll('.group-name')
        var cards = document.querySelectorAll('.tiles')
        var card = document.createElement('article'),
            title = document.createElement('h4'),
            description = document.createElement('p'),
            link = document.createElement('a');

        
        card.classList.add('tile')
        title.textContent = this.title
        description.textContent = this.description
        link.textContent = this.link

        card.appendChild(title)
        card.appendChild(description)
        card.appendChild(link)

        var currentGroup = this.group
        groupNames.forEach(function setGroup(object, index) {
            if (object.value == currentGroup) {
                cards[index].appendChild(card)
            }
        })

    }
}

const contentSubmitButton = document.getElementById('create-content-submit')
contentSubmitButton.addEventListener('click', function(event) {
    event.preventDefault()
    var contentDetails, content, contentID, contentTitle, contentDescription, contentLink, contentSubject, contentGroup;
      contentID = contentList.length
      contentDetails = createContentForm.querySelectorAll('form input');
      contentTitle = contentDetails[0].value
      contentDescription = contentDetails[1].value
      contentLink = contentDetails[2].value
      contentSubject = contentDetails[3].value

      var groups = createContentForm.querySelector('select[name=group]')
      contentGroup = groups.value

      content = new Content(contentID, contentTitle, contentDescription, contentLink, contentSubject, contentGroup)
      content.createCard(content.addContent());
      overlayToggle = false;
      modalBackground.style.display = 'none'
      createContentForm.classList.remove('active')
      createContentForm.reset()

      console.log(contentList)
})