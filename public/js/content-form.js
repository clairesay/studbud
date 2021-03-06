import Content from './content'
import * as resource from './resource'

// declaring relevant variables
const newContent = document.getElementById('new-content')
const createContentForm = document.getElementById('create-content-form')
var overlayToggle = false
const modalBackground = document.getElementById('modal-background')
newContent.addEventListener('click', function () { toggleContentForm() })

// open content form (may be prepopulated or blank)
function toggleContentForm(type) {
    // reset the validation status of the form
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

        resource.countTiles()
        resource.sortability()
    }
}

// adding event listeners to edit buttons on for each resource card
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

// autofill existing details into form ^^
function autoFillContentDetails(object) {

    // get id of content card
    let objectId = object.parentElement.id;
    objectId = objectId.replace('c-', '')

    // for each item, get the value and set to the for inputs
    contentList.forEach(function (content) {
        let thisContent = content;

        // if we find a match
        if (thisContent.id == objectId) {
            // get all the input values
            let contentDetails = createContentForm.querySelectorAll('form input');
            let codeArea = createContentForm.querySelector('textArea')
            //title
            contentDetails[0].value = thisContent.title
            //description
            codeArea.value = thisContent.description
            //link
            contentDetails[1].value = thisContent.link
            //group
            let group = createContentForm.querySelector('select[name=group]');
            group.value = object.parentElement.parentElement.parentElement.querySelector('div.group-title input.group-name').value

            // open up the form with updated content
            contentSaveButton.value = thisContent.id
            toggleContentForm('update')
        }
    })
}

// this function resets whether each group is deletable or not, based on whether it is the only group, or whether there are tiles inside it
function enableButtons() {
    let groups = document.getElementsByClassName('group')
    let deleteGroupButtons = document.querySelectorAll('svg.delete-group')

    // for each delete group button
    deleteGroupButtons.forEach(function(deleteGroupButton) {
        let tiles = deleteGroupButton.parentElement.parentElement.parentElement.querySelectorAll('.tile')

        // set the disabled status
        if (groups.length > 1 && tiles.length == 0) {
            deleteGroupButton.classList.remove('disabled')
        } else if (groups.length <= 1 || tiles.length > 0) {
            deleteGroupButton.classList.add('disabled')
        }
    })
}

// array where we store all the content
var contentList = [];

// selecting relevant DOM elements
var validateText = createContentForm.querySelector('.validate-message')
const contentSaveButton = document.getElementById('content-save')
const contentCancelButton = document.getElementById('edit-content-cancel')
const contentCloseButton = contentCancelButton.nextElementSibling
const contentDeleteButton = document.getElementById('edit-content-delete')

// cancel/close without saving - note that resetting the form is still required
contentCancelButton.addEventListener('click', function (event) {
    event.preventDefault()
    toggleContentForm()
    reupdate()
})
contentCloseButton.addEventListener('click', function (event) {
    event.preventDefault()
    toggleContentForm()
    reupdate()
})

// delete this card
contentDeleteButton.addEventListener('click', function (event) {
    event.preventDefault()
    let contentID = parseInt(contentSaveButton.value)
    // iterate to find match in ID and delete its card and its presence in the array
    for (let i = 0; i < contentList.length; i++) {
        var oldContent = contentList[i]
        // if we find a match
        if (oldContent.id == contentID) {
            // remove from array
            contentList.splice(contentList.indexOf(oldContent), 1)
            // remove element
            let oldTile = document.getElementById('c-' + contentID)
            oldTile.remove();
            contentSaveButton.value = ''
        }
    }
    
    // scroll back to top of form
    createContentForm.scrollTop = 0;

    // reset form status
    toggleContentForm()
    reupdate()
    resource.countTiles()
    resource.sortability()
    enableButtons()
})

// save the content
contentSaveButton.addEventListener('click', function (event) {
    event.preventDefault()
    let contentDetails, content, contentID, contentTitle, contentDescription, contentLink, contentGroup;
     // extract values from input form
     contentDetails = createContentForm.querySelectorAll('form input');
    //  title
     contentTitle = contentDetails[0].value
    //  code snippet
     let codeArea = createContentForm.querySelector('textarea')
     contentDescription = codeArea.value
    //  link
     contentLink = contentDetails[1].value
    //  group
     let groups = createContentForm.querySelector('select[name=group]')
     contentGroup = groups.value

    //  for resource to be saved, user must have inputted a title and a link, because this is a resource library
    if (contentTitle == "" || contentLink == "") {
        contentDetails[0].setAttribute('required', 'true')
        contentDetails[1].setAttribute('required', 'true')
        validateText.innerHTML = 'Please enter a title and a resource link to save this content.'

    } else {
        // if updating the card, look for content with same id value and replace it
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
    content = new Content(contentID, contentTitle, contentDescription, contentLink, contentGroup, contentList)
    // create DOM and also save to list
    content.createCard(content.addContent());

    // scroll back to top of form
    createContentForm.scrollTop = 0;

    // update tile count and group links
    toggleContentForm()
    resource.countTiles()
    resource.sortability()
    resource.openGroupLinks()
    reupdate()
    enableButtons()
    }
})

// if the user decides to create a new card through the empty state CTA, emulate what would happen with the create task button
var emptyStateButton = document.querySelector('#empty-state-content button')
emptyStateButton.addEventListener('click', function() {
    if (deviceSize != 'desktop') {
        // counter click for the 'buttons container dropdown'
        document.querySelector('#content-buttons button.icon').click()
    }
    newContent.click()
})

// if user pastes code content into the content cards
// https://stackoverflow.com/questions/12027137/javascript-trick-for-paste-as-plain-text-in-execcommand
document.querySelector('[contenteditable]').addEventListener('paste', function (event) {
    event.preventDefault();
    document.execCommand('inserttext', false, event.clipboardData.getData('text/plain'));
});