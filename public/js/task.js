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

    updateTask(id) {
        this.taskList.filter(function (element) {
            return element.id == id;
        })
    }

    createCard(n) {
        var card = document.createElement('article');
        var subjectTag = document.createElement('span'),
            title = document.createElement('h3'),
            description = document.createElement('p'),
            timeDetails = document.createElement('div'),
            dueDate = document.createElement('h4'),
            timeTag = document.createElement('span'),

            editIcon = document.createElement('a')
        editIcon.classList.add('edit')
        editIcon.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 12.6672V16H3.33287L13.1626 6.17028L9.82975 2.83741L0 12.6672ZM15.74 3.59286C16.0867 3.24625 16.0867 2.68632 15.74 2.33971L13.6603 0.259994C13.3137 -0.0866241 12.7538 -0.0866241 12.4072 0.259994L10.7807 1.88644L14.1136 5.21931L15.74 3.59286Z" fill="#909090"/>
          </svg>`
        card.classList.add('card')
        card.setAttribute('id', 't-' + n)
        subjectTag.classList.add('tag')
        subjectTag.classList.add('subject')
        timeDetails.classList.add('time-details')
        timeTag.classList.add('time')
        timeTag.classList.add('tag')
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
        card.appendChild(editIcon)
        card.appendChild(timeDetails)

        // appending card to column
        var columnNames = document.querySelectorAll('.column-name')
        var cardContainers = document.querySelectorAll('.cards')
        var currentStatus = this.status
        columnNames.forEach(function setColumn(object, index) {
            if (object.value == currentStatus) {
                cardContainers[index].appendChild(card)
            }
        })
    }
}

export default Task