// should hold all of the user's content in local storage
// on page load, check how much content ther is in local storage (this should be an array)
// for each object in the array, create a relevant card
// populate that card with the relevant details
// append card to the relevant group
// import Content from './content'
import Group from './group'
// import Task from './task'
// import Column from './column'

// If there are items in local storage - create groups create columns
// create card for each task in column
// create tile for each content in group

window.addEventListener('load', function() {

    if (localStorage.getItem('groupList') != null) {

        let groups = JSON.parse(localStorage.getItem('groupList'));
        groups.forEach(function(group) {
            let newGroup = new Group(group.id, group.name)
            newGroup.createGroup()
            newGroup.addGroup()
        
            // reset states
            // toggleGroupForm()
            // updateGroupNames()
            // countTiles.openGroupLinks()
            // countTiles.countTiles()
            // groupEditDeleteFunctionality()
        })
        // let contents = JSON.parse(localStorage.getItem('content'));
        // contents.forEach(function(content) {
        //     content = new Content(contentID, contentTitle, contentDescription, contentLink, contentGroup)
        //     content.createCard(content.addContent());
        // })    
    }

    // if localStorage.getItem('')
})