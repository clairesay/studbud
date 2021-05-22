// import Content from './content'
import * as countTiles from './count-tiles'

class Content {
    // declare variables
    constructor(id, title, description, link, group) {
        this.id = id;
        this.title = title;
        this.description = description;
        // this.subject = subject;
        this.group = group;
        this.link = link;
        // this.contentList = contentList;
    }

    // add content to array
    addContent() {
        contentList.push(this);
        localStorage.setItem('content', JSON.stringify(contentList))
        return this.id
    }

    // create new card with relevant elements
    createCard(n) {
        let groupNames = document.querySelectorAll('.group-name')
        let cards = document.querySelectorAll('.tiles'),
            card = document.createElement('article'),
            title = document.createElement('h3'),
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

// declaring relevant variables
const newContent = document.getElementById('new-content')
const createContentForm = document.getElementById('create-content-form')
var overlayToggle = false
const modalBackground = document.getElementById('modal-background')
newContent.addEventListener('click', function () { openContentForm() })

// should hold all of the user's content in local storage
// on page load, check how much content ther is in local storage (this should be an array)
// for each object in the array, create a relevant card
// populate that card with the relevant details
// append card to the relevant group

// open content form (may be prepopulated or blank)
function openContentForm(type) {
    validateText.innerHTML = ''
    let contentDetails = createContentForm.querySelectorAll('form input');
    contentDetails[0].removeAttribute('required')
    contentDetails[1].removeAttribute('required')
    // if updating existing content, set type update
    if (type == 'update') {
        createContentForm.querySelector('h1').textContent = 'Edit existing resource'
        createContentForm.classList.add('update')
    } else {
        createContentForm.querySelector('h1').textContent = 'Add new content'
        createContentForm.classList.remove('update')
    }
    // show/hide
    if (overlayToggle == false) {
        createContentForm.classList.add('active')
        overlayToggle = true
        modalBackground.style.display = 'flex'
    } else if (overlayToggle == true) {
        createContentForm.classList.remove('active')
        createContentForm.reset()
        overlayToggle = false
        modalBackground.style.display = 'none'
        contentSaveButton.value = ''
    }
}

// adding event listeners to edit buttons 
function reupdate() {

    // each card has an edit button that allows users to reaccess and update task details
    let editButtons = document.querySelectorAll('.edit-content')
    editButtons.forEach(function (editButton) {

        // if there hasn't been a listener previously attached, attach one
        if (editButton.getAttribute('listener') !== 'true') {
            editButton.addEventListener('click', addAutoFill)
            editButton.setAttribute('listener', 'true')
        }

        // autofill existing details into form
        function addAutoFill() {
            autoFillContentDetails(editButton)
        }
    })
}

function autoFillContentDetails(object) {
    // get id of content card
    let objectId = object.parentElement.id;
    objectId = objectId.replace('c-', '')

    // for each item, get the value and set to the for inputs
    contentList.forEach(function (content) {
        let thisContent = content;
        if (thisContent.id == objectId) {
            let contentDetails = createContentForm.querySelectorAll('form input');
            let codeArea = createContentForm.querySelector('textArea')
            //Title
            contentDetails[0].value = thisContent.title
            //description
            codeArea.value = thisContent.description
            // contentDetails[1].value = thisContent.description
            //link
            contentDetails[1].value = thisContent.link

            //group
            let group = createContentForm.querySelector('select[name=group]');
            group.value = object.parentElement.parentElement.parentElement.querySelector('div.group-title input.group-name').value

            // open up the form with updated content
            contentSaveButton.value = thisContent.id
            openContentForm('update')
        }
    })
}

function enableButtons() {
    let groups = document.getElementsByClassName('group')
    let deleteGroupButtons = document.querySelectorAll('svg.delete-group')
    deleteGroupButtons.forEach(function(deleteGroupButton) {
        let tiles = deleteGroupButton.parentElement.parentElement.parentElement.querySelectorAll('.tile')
        if (groups.length > 1 && tiles.length == 0) {
            deleteGroupButton.classList.remove('disabled')
        } else if (groups.length <= 1 || tiles.length > 0) {
            deleteGroupButton.classList.add('disabled')
        }
        
    })
}

// array where we store all the content
var contentList = [];
var validateText = createContentForm.querySelector('.validate-message')
const contentSaveButton = document.getElementById('content-save')
const contentCancelButton = document.getElementById('edit-content-cancel')
const contentCloseButton = contentCancelButton.nextElementSibling
const contentDeleteButton = document.getElementById('edit-content-delete')


// cancel/close without saving
contentCancelButton.addEventListener('click', function (event) {
    event.preventDefault()
    openContentForm()
    reupdate()
})
contentCloseButton.addEventListener('click', function (event) {
    event.preventDefault()
    openContentForm()
    reupdate()
})

// delete this card
contentDeleteButton.addEventListener('click', function (event) {
    event.preventDefault()
    let contentID = parseInt(contentSaveButton.value)
    // iterate to find match in ID and delete that one
    for (let i = 0; i < contentList.length; i++) {
        var oldContent = contentList[i]
        if (oldContent.id == contentID) {
            contentList.splice(contentList.indexOf(oldContent), 1)
            let oldTile = document.getElementById('c-' + contentID)
            oldTile.remove();
            contentSaveButton.value = ''
        }
    }
    // localStorage.setItem('content', JSON.stringify(contentList))
    openContentForm()
    reupdate()
    countTiles.countTiles()
    enableButtons()
})

// save the content
contentSaveButton.addEventListener('click', function (event) {
    event.preventDefault()
    let contentDetails, content, contentID, contentTitle, contentDescription, contentLink, contentGroup;
     // extract values from input form
     contentDetails = createContentForm.querySelectorAll('form input');
     contentTitle = contentDetails[0].value
     let codeArea = createContentForm.querySelector('textarea')
     contentDescription = codeArea.value
     // contentDescription = contentDetails[1].value 
     contentLink = contentDetails[1].value
 
     let groups = createContentForm.querySelector('select[name=group]')
     contentGroup = groups.value

    if (contentTitle == "" || contentLink == "") {
        contentDetails[0].setAttribute('required', 'true')
        contentDetails[1].setAttribute('required', 'true')
        validateText.innerHTML = 'Please enter a title and a resource link to save this content.'

    } else {
        
        // if updating, look for content with same id value
        if (createContentForm.classList.contains('update')) {
            contentID = parseInt(contentSaveButton.value)
            for (let i = 0; i < contentList.length; i++) {
                var oldContent = contentList[i]
                if (oldContent.id == contentID) {
                    contentList.splice(contentList.indexOf(oldContent), 1)
                    let oldTile = document.getElementById('c-' + contentID)
                    oldTile.remove();
                    contentSaveButton.value = ''
                }
            }
        // otherwise, generate one
        } else {
            contentID = Date.now()
        }
    
       
    // create new object in class
    content = new Content(contentID, contentTitle, contentDescription, contentLink, contentGroup)
    content.createCard(content.addContent());

    // update tile count and group links
    // localStorage.setItem('content', JSON.stringify(contentList))
    openContentForm()
    countTiles.countTiles()
    countTiles.openGroupLinks()
    reupdate()
    enableButtons()
    }

})

var emptyStateButton = document.querySelector('#empty-state-content button')
emptyStateButton.addEventListener('click', function() {
    newContent.click()
})