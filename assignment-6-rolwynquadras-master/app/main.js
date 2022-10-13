import '../sass/main.scss'              // Import main.scss style file
const todoURI = '/todolist.json'        // location of JSON file
const todoXHR = new XMLHttpRequest()    // instantiate a new XHR request

/**
 * Array to hold todo items 
 */
let todoItemList = []

todoXHR.open('GET', todoURI)

/**
 * Loads the response
 */
todoXHR.onload = function() {
    // if success get the json and parse it, then pass it to  getTodoItems()
    if (this.status === 200) {
        const data = this.responseText
        const todos = JSON.parse(data)
        todoItemList = todos
        getTodoItems(todoItemList)
        document.getElementById('add-due-date').setAttribute('min', convertDate(new Date))
    }
}

/**
 * Sends the request to the server
 */
todoXHR.send();

/**
 * Adds todo as the list item to the parent.
 * 
 * @param {todos} todo object
 * @param {HTMLElement} HTMLElement the parent element
 * @param {todaysDate} todaysDate the todo creation date
 */
const createTodo = (todos, parent) => {
    const li = document.createElement('li')
    li.classList.add('todo-list-item')

    // store due date and today's date for comparison
    const ddate = new Date(todos.duedate)
    const tDate = new Date(convertDate(new Date))
    
    /**
     * InnnerHTML content for single li element
     * if today's date is greater than due date show overdue element
     * if no description return empty else return the element
    */
    li.innerHTML = `
        <div class="list-item-inner">
            <p>${todos.title}</p>
            <div class="action-btn-container">
            <div class="text-content _dueDate">                    
                    ${tDate.getTime() > ddate.getTime() ? `<span class="overdue">Overdue</span>&nbsp;&nbsp` : ''}
                    Created <span>${todos.creationDate} ${todos.time}</span></div>
                <div class="text-content _time">Due on <span>${todos.duedate}</span></div>
                <button type="button" class="mark-complete">Mark Finished</button>
            </div>
        </div>
       ${todos.description != '' ? `<div class="todo-list-desc">${todos.description}</div>`: ''}
    `;

    // click eventlistener when list item is clicked
    li.addEventListener('click', todoListItemClicked)

    // store each todo title element and add it to currentTarget
    const getTitleElem = li.querySelector('.mark-complete').closest('.list-item-inner').querySelector('p')
    li.querySelector('.mark-complete').toggleDoneParam = getTitleElem

    //  store each todo duedate element and add it to currentTarget
    const getDueDateElem = li.querySelector('._dueDate')
    li.querySelector('.mark-complete').dueDateElem = getDueDateElem

    //  store each todo creation time element and add it to currentTarget
    const getTimeElem = li.querySelector('._time')
    li.querySelector('.mark-complete').timeElem = getTimeElem

    //  store each description element and add it to currentTarget
    const getDescElem = li.querySelector('.todo-list-desc')
    li.querySelector('.mark-complete').descElem = getDescElem

    // pass the invidual li item to currentTarget
    li.querySelector('.mark-complete').parentLiParam = li

    // event listener for when mark-complete button is clicked, toggle complete/incomplete
    li.querySelector('.mark-complete').addEventListener('click', toggleComplete)

    // append li element to ul parent element
    parent.appendChild(li)
}

/**
 * loops through each of the todo objects and sends it to createTodo function
 * 
 * @param {todos} todos the todos objects coming from todolist.json
 */
const getTodoItems = (todos) => {
    const ul = document.getElementById('todo-list-container')
    todos.forEach(todo => {
        createTodo(todo, ul)
    })
}

/**
 * Creates a single todo object and pushes to todoItemList array.
 * 
 * @param {todoTitle} todotitle of the todo object
 * @param {todoDesc} tododesc of the todo object
 * @param {dueDate} duedate of the todo object
 * @param {time} time of the todo object
 */
const addSingleTodo = (todoTitle, todoDesc, dueDate, time, creationDate) => {
    const todo = {
        title       : todoTitle,
        description : todoDesc,
        duedate     : dueDate,
        time        : time,
        creationDate: creationDate
    };

    let todoArrOriginalLength = todoItemList.length
    todoItemList.push(todo)
    let todoArrNewLength = todoItemList.length

    // compare length, If a new todo is added to the array then only proceed
    if (todoArrOriginalLength !== todoArrNewLength) {
        // set all input and textbox element as empty after todo creation
        document.querySelectorAll('._inputField').forEach(function(item) {
           item.value = ''
        })
        const ul = document.getElementById('todo-list-container')
        createTodo(todo, ul)
        // remove _shown class to hide the add todo box
        document.getElementById("add-todo-item").classList.remove('_shown')
    }
}


/**
 * Event listener {click} for show/hide add todo input box
 */
const addTodoBtn = document.querySelector('#add-todo-btn')
addTodoBtn.addEventListener('click', event => {
    const addTodoInputContainer = document.getElementById("add-todo-item")
    addTodoInputContainer.classList.add('_shown')
    addTodoInputContainer.querySelector('#add-title').focus()
})


/**
 * Event listener {submit} for create a todo submit
 */
const addTodoForm = document.querySelector('#add-todo-form')
addTodoForm.addEventListener('submit', event => {

    event.preventDefault()

    // get all text inputs
    const title     = document.querySelector('#add-title').value.trim()
    const desc      = document.querySelector('#add-description').value.trim()
    const duedate   = document.querySelector('#add-due-date').value.trim()
    const duetime   = document.querySelector('#add-due-time').value.trim()

    // add the single todo item to array provided title, due data and time is not empty
    if (title !== '' && duedate !== '' && duetime !== '') {
        addSingleTodo(title, desc, duedate, duetime, convertDate(new Date))
    }
    else
        alert("Title, Data and Time cannot be empty")
    
})

// 
/**
 * when todo item is clicked, display the description
 * 
 * @param {event} event for the todo li element
 */
function todoListItemClicked(event) {
    const containsClass = event.target.classList.contains('expand-todo')
    if (event.target.children[1] !== undefined) {
        const expandTarget = event.target.children[1].classList
        expandTarget.toggle('_showDesc')
    }
}

/**
 *  Mark the todo as complete on button click,
 *  and strike the list element
 * 
 * @param {event} event for the .mark-complete button 
 */
function toggleComplete(event) {
    // get title, parent li (for green border), duedate and time element and strike through
    const todoTitleElem = event.currentTarget.toggleDoneParam
    const parentLiParam = event.currentTarget.parentLiParam
    const dueDateElem   = event.currentTarget.dueDateElem
    const timeElem      = event.currentTarget.timeElem
    const descElem  = event.currentTarget.descElem

    // handle if class is empty
    if (todoTitleElem.classList == "")
        event.target.textContent = "Mark Pending"
    else
        event.target.textContent = "Mark Finished"
    
    // toggle linethrough, _pending and _statusComplete classes
    event.currentTarget.classList.toggle('_pending')
    parentLiParam.classList.toggle('_statusComplete')
    todoTitleElem.classList.toggle('linethrough')
    dueDateElem.classList.toggle('linethrough')
    timeElem.classList.toggle('linethrough')

    // if description is not null add linethrough class
    if (event.currentTarget.descElem != null) {
        descElem.classList.toggle('linethrough')
    }
}

/**
 *  Close the add todo on close btn click
 * 
 * @param {event} event for the #close-btn button 
 */
const closeBtn = document.getElementById('close-btn')
closeBtn.addEventListener('click', event => {
    document.getElementById("add-todo-item").classList.remove('_shown')
})

/**
 * Takes date and converts it to suitable format i.e yyyy-mm-dd, in this case
 * 
 * @param {todaysDate} todaysDate present date
 * @returns formattedDate
 */
function convertDate(todaysDate) {
    let tDate = new Date(todaysDate),
        tmonth = '' + (tDate.getMonth() + 1),
        tday = '' + tDate.getDate(),
        tyear = tDate.getFullYear()

    if (tmonth.length < 2) 
        tmonth = '0' + tmonth
    if (tday.length < 2)
        tday = '0' + tday

    return [tyear, tmonth, tday].join('-')
}