// declaring a class called Task - this ordains the structure for all the elements to go into the class
class Task {
    // this is what it's made of
    constructor(id, name, description, subject, status, priorityRating, estimatedTimeHr, estimatedTimeMin, dueDate, taskList) {
        // constructor(id, name, description, dueDate, priorityRating, estimatedTime, completionStatus, saveStatus) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.subject = subject;
        this.status = status;
        this.priorityRating = priorityRating;
        this.estimatedTimeHr = estimatedTimeHr;
        this.estimatedTimeMin = estimatedTimeMin;
        this.dueDate = dueDate;

        this.taskList = taskList
    }

    // this adds tasks to the array taskList
    addTask() {
        this.taskList.push(this);
        return this.id
    }

    // making sure the column 'deletable' status is updated when a new card is added.
    updateColumnDelete() {
        let allDeleteColumnButtons = document.querySelectorAll('svg.delete-column')
        allDeleteColumnButtons.forEach( function(button) {
            let columns = document.getElementsByClassName('column')
            let column = button.parentElement.parentElement
            let cards = column.querySelectorAll('.card')
    
            if (columns.length > 3 && cards.length == 0) {
                button.classList.remove('disabled')
            } else if (columns.length <= 3 || cards.length > 0) {
                button.classList.add('disabled')
            }
        })
    }

    // this creates a new card and applies it to the kanban board
    createCard(n) {
        // initialising new elements
        let card = document.createElement('article'),
            subjectTag = document.createElement('span'),
            title = document.createElement('h3'),
            description = document.createElement('p'),
            timeDetails = document.createElement('div'),
            dueDate = document.createElement('h4'),
            timeTag = document.createElement('span'),
            editIcon = document.createElement('a'),
            timeIcon = document.createElement('div'),
            line = document.createElement('HR');

        // setting classes and attributes
        editIcon.classList.add('edit')
        editIcon.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 12.6672V16H3.33287L13.1626 6.17028L9.82975 2.83741L0 12.6672ZM15.74 3.59286C16.0867 3.24625 16.0867 2.68632 15.74 2.33971L13.6603 0.259994C13.3137 -0.0866241 12.7538 -0.0866241 12.4072 0.259994L10.7807 1.88644L14.1136 5.21931L15.74 3.59286Z" fill="#909090"/>
          </svg>`
        // time icon has been replaced with a priority rating
        timeIcon.style.width = '12px'
        timeIcon.style.height = '12px'
        timeIcon.style.borderRadius = '12px'
        if (this.priorityRating == 'Low') {
            timeIcon.style.backgroundColor = '#70B815'
        } else if (this.priorityRating == 'Mid') {
            timeIcon.style.backgroundColor = '#E5C44C'
        } else if (this.priorityRating == 'High') {
            timeIcon.style.backgroundColor = '#F59273'
        }
        // timeIcon.innerHTML = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        // <path d="M9.99 3.05176e-05C4.47 3.05176e-05 0 4.48003 0 10C0 15.52 4.47 20 9.99 20C15.52 20 20 15.52 20 10C20 4.48003 15.52 3.05176e-05 9.99 3.05176e-05ZM10 18C5.58 18 2 14.42 2 10C2 5.58003 5.58 2.00003 10 2.00003C14.42 2.00003 18 5.58003 18 10C18 14.42 14.42 18 10 18Z" fill="#909090"/>
        // <path d="M10.5 5.00003H9V11L14.25 14.15L15 12.92L10.5 10.25V5.00003Z" fill="#909090"/>
        // </svg>`
        card.classList.add('card')
        card.setAttribute('id', 't-' + n)
        subjectTag.classList.add('tag')
        subjectTag.classList.add('subject')
        timeDetails.classList.add('time-details')
        timeTag.classList.add('time')
        timeTag.classList.add('tag')

        // setting values
        title.textContent = this.name;
        description.textContent = this.description;
        subjectTag.textContent = this.subject;
        dueDate.textContent = this.dueDate;
        timeTag.textContent = this.estimatedTimeHr + this.estimatedTimeMin;

        // appending time details to time div
        timeDetails.appendChild(dueDate)
        timeDetails.appendChild(timeTag)

        // appending everything to whole div
        card.appendChild(subjectTag)
        card.appendChild(title)
        card.appendChild(description)
        card.appendChild(line)
        card.appendChild(timeIcon)
        card.appendChild(timeDetails)
        card.appendChild(editIcon)

        // appending card to column
        let columnNames = document.querySelectorAll('.column-name')
        let cardContainers = document.querySelectorAll('.cards')
        let currentStatus = this.status
        columnNames.forEach(function setColumn(object, index) {
            if (object.value == currentStatus) {
                cardContainers[index].appendChild(card)
            }
        })

        this.updateColumnDelete();
    }
}

export default Task