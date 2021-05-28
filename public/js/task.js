const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
// declaring a class called Task - this ordains the structure for all the elements to go into the class
class Task {
    
    // this is what it's made of
    constructor(id, name, description, subject, status, priorityRating, estimatedTimeHr, estimatedTimeMin, dueDate, taskList) {

        this.id = id;
        this.name = name;
        this.description = description;
        this.subject = subject;
        this.status = status;
        this.priorityRating = priorityRating;
        this.estimatedTimeHr = estimatedTimeHr;
        this.estimatedTimeMin = estimatedTimeMin;
        this.dueDate = dueDate;

        // array of tasks
        this.taskList = taskList
    }

    // this adds tasks to the array taskList
    addTask() {
        this.taskList.push(this);
        return this.id
    }

    // this creates a new card and applies it to the kanban board
    createCard(n) {
        // initialising new elements
        let card = document.createElement('article'),
            subjectTag = document.createElement('span'),
            title = document.createElement('h3'),
            description = document.createElement('p'),
            informationDiv = document.createElement('div'),
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

        // time icon has been replaced with a priority rating - the priority is ranked in traffic light colors from green to red
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
        
        // setting relevant attributes
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

        // if there is a due date, reformat for display on the cards
        if (this.dueDate.length != 0) {
            let dueDateElements = this.dueDate.split('-')
            let month = months[parseInt(dueDateElements[1]) - 1]
            let day = dueDateElements[2]
            dueDate.textContent = 'Due ' + day + ' ' + month
        } else {
            dueDate.textContent = 'No due date'
        }

        // concatenating hour and minute estimated time durations
        if (this.estimatedTimeHr > 0 && this.estimatedTimeMin > 0) {
            timeTag.textContent = this.estimatedTimeHr + ' HR ' + this.estimatedTimeMin + ' MIN';
        } else if (this.estimatedTimeHr == 0 && this.estimatedTimeMin > 0) {
            timeTag.textContent = this.estimatedTimeMin + ' MIN';
        } else if (this.estimatedTimeHr > 0 && this.estimatedTimeMin == 0) {
            timeTag.textContent = this.estimatedTimeHr + ' HR';
        } else {
            timeTag.textContent = '∞'
        }

        // appending time details to time div
        timeDetails.appendChild(timeIcon)
        timeDetails.appendChild(dueDate)
        timeDetails.appendChild(timeTag)

        // appending everything to whole div
        // if (this.subject.length != 0) {
            card.appendChild(subjectTag)
        // }
        
        informationDiv.appendChild(title)
        informationDiv.appendChild(description)
        // card.appendChild(title)
        // card.appendChild(description)
        card.appendChild(informationDiv)
        card.appendChild(line)
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
    }
}

export default Task