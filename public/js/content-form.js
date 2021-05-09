import Content from './content'
import * as countTiles from './count-tiles'

var tags = document.querySelector('input[name=subject]')
// TAGIFYING
var tagify1 = new Tagify(tags, {
    whitelist : ['INFO1110', 'COMP2000']
}) 
// 
const newContent = document.getElementById('new-content')
const createContentForm = document.getElementById('create-content-form')
var overlayToggle = false
const modalBackground = document.getElementById('modal-background')
newContent.addEventListener('click', function() {openContentForm()})

function openContentForm(type) {
    if (type == 'update') {
        createContentForm.querySelector('h1').textContent = 'Edit an existing task'
        createContentForm.classList.add('update')
    } else {
        createContentForm.querySelector('h1').textContent = 'Create a new task'
        createContentForm.classList.remove('update')
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
        function addAutoFill() {
            autoFillContentDetails(editButton)
        }
    })
}

function autoFillContentDetails(object) {
    let objectId = object.parentElement.id;
    objectId = objectId.replace('c-', '')

    contentList.forEach(function(content) {
        let thisContent = content;
        if (thisContent.id == objectId) {
            let contentDetails = createContentForm.querySelectorAll('form input');
            //Title
            contentDetails[0].value = thisContent.title
            //description
            contentDetails[1].value = thisContent.description
            //link
            contentDetails[2].value = thisContent.link
            //subject
            // contentDetails[3].value = thisContent.subject
            //group
            let group = createContentForm.querySelector('select[name=group]');
            group.value = object.parentElement.parentElement.parentElement.querySelector('div.group-title input.group-name').value

            contentSaveButton.value = thisContent.id
            openContentForm('update')

        }
    })
}

var contentList = [];

const contentSaveButton = document.getElementById('content-save')
const contentCancelButton = document.getElementById('edit-content-cancel')
const contentCloseButton = contentCancelButton.nextElementSibling
const contentDeleteButton = document.getElementById('edit-content-delete')
contentCancelButton.addEventListener('click', function(event) {
    event.preventDefault()
    openContentForm()
    reupdate()
})
contentCloseButton.addEventListener('click', function(event) {
    event.preventDefault()
    openContentForm()
    reupdate()
})

contentDeleteButton.addEventListener('click', function(event) {
    event.preventDefault()
    let contentID = parseInt(contentSaveButton.value)
    for (let i = 0; i < contentList.length; i++) {
        var oldContent = contentList[i]
        if (oldContent.id == contentID) {
            contentList.splice(contentList.indexOf(oldContent), 1)
            let oldTile = document.getElementById('c-' + contentID)
            oldTile.remove();
            contentSaveButton.value = ''
        }
    }
    openContentForm()
    reupdate()
    countTiles.countTiles()
})
contentSaveButton.addEventListener('click', function(event) {
    event.preventDefault()
    let contentDetails, content, contentID, contentTitle, contentDescription, contentLink, contentGroup;
    // //
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
    } else {
        contentID = Date.now()
    }

    
      contentDetails = createContentForm.querySelectorAll('form input');
      contentTitle = contentDetails[0].value
      contentDescription = contentDetails[1].value
      contentLink = contentDetails[2].value
    //   contentSubject = contentDetails[3].value

      let groups = createContentForm.querySelector('select[name=group]')
      contentGroup = groups.value

      content = new Content(contentID, contentTitle, contentDescription, contentLink, contentGroup, contentList)
      content.createCard(content.addContent());

      openContentForm()
      countTiles.countTiles()
      countTiles.openGroupLinks()
    //   overlayToggle = false;
    //   modalBackground.style.display = 'none'
    //   createContentForm.classList.remove('active')
    //   createContentForm.reset()
    reupdate()
})