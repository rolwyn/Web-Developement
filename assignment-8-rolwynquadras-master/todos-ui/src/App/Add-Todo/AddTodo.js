import React, { Component } from 'react';
import './AddTodo.scss';
import Helpers from '../Helpers/Helpers';

export class AddTodo extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.addBtnClicked = this.addBtnClicked.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.addTodo)
            this.formElement.reset()

        // perform a single get call by id to get single todo values
        if ((this.props.todoId !== prevProps.todoId) && this.props.todoId !== null) {
            const toJson = (res) => res.json()
			const getTodoData = (config) => {
				fetch(config.todos_api_url+'/'+this.props.todoId, { method: 'GET' })
                .then(toJson).then((todo) => {
                    this.title.value = todo.title
                    this.todoDesc.value = todo.description
                    this.duedate.value = todo.dueDate.substring(0, 10)
                    this.duetime.value = todo.time
                })
                .catch(function(error) {
                    console.log('Get by id operation not done succesfully: ', 
                    error.message);
                });
			}
			fetch("config/config.json").then(toJson).then(getTodoData)
        }
    }

    // function to hide add/edit todo form
    hideView() {
	    this.props.showAddTodoForm(false)
    }

    /**
     * Perform a PUT HTTP request
     * Offset the time for getting the correct date in EST
     * @param {event} event to prevent default submit by called preventDefault method
     */
    handleEdit(event) {
        event.preventDefault()
        console.log("reached in edit")
        let todoTitle = this.title.value
        let todoDesc = this.todoDesc.value
        let todoDueDate = this.duedate.value
        let dueTime = this.duetime.value

        const offset = -300; //Timezone offset for EST in minutes.
        let dateEST = new Date(new Date().getTime() + offset*60*1000);
        let lastModifiedDate = dateEST

        // the todo object which updated values
        let todoObject = { title: todoTitle, description: todoDesc, dueDate: todoDueDate, time: dueTime, lastModifiedDate: lastModifiedDate}
        
        const toJson = (res) => res.json()
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(todoObject)
        };
        // update the todo data
        const updateData = (config) => {
            fetch(config.todos_api_url+'/'+this.props.todoId, requestOptions)
                .then(this.props.handleEditState(todoObject))
                .then(this.formElement.checkValidity ? this.closeBtnElement.click(): null)
                .then(() => console.log('Update successful'))
                .catch(function(error) {
                    console.log('Update operation not done succesfully: ', 
                    error.message);
                });
        }
        fetch("config/config.json").then(toJson).then(updateData)
    }

    /**
     * Perform a POST request to save new data to database
     * This method is for adding a todo to the database and the todo list
     * @param {event} event to handle default submit
     */
    handleSubmit(event) {
        event.preventDefault();
        let todoTitle = this.title.value
        let todoDesc = this.todoDesc.value
        let todoDueDate = this.duedate.value
        let dueTime = this.duetime.value

        // pass date in Eastern Standard Time
        const offset = -300; // set timezone offset in minutes
        let dateEST = new Date(new Date().getTime() + offset*60*1000);
        let createdDate = dateEST
        let lastModifiedDate = dateEST

        // the todoObject to be passed in the body of the POST request
        let todoObject = { title: todoTitle, description: todoDesc, dueDate: todoDueDate, time: dueTime, createdDate: createdDate, lastModifiedDate: lastModifiedDate}

        const toJson = (res) => res.json()
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(todoObject)
        };
        // .then(this.closeBtnElement.click())
        const saveData = (config) => {
            fetch(config.todos_api_url, requestOptions)
                .then(this.props.handleSubmitState(todoObject))
                    .then(this.formElement.checkValidity ? this.closeBtnElement.click(): null)
                        .then(() => console.log('Data is successfully added'))
                            .catch(function(error) {
                                console.log('Post operation not done succesfully: ', 
                                error.message);
                            });
        }
        fetch("config/config.json").then(toJson).then(saveData)
    }
    
    // Reset form when add button is clicked by using form reference
    addBtnClicked() {
        this.formElement.reset()
    }

    render() {
        return(
            <div id="add-todo-item" className={this.props.show ? "add-todo-item _shown" : "add-todo-item"}>
                <header className="add-todo-header">
                    <h2>What will you do today?</h2>
                    {/* <!-- close button for closing the add view --> */}
                    <button type="button" id="close-btn" className="close-btn" ref={button => this.closeBtnElement = button} onClick={this.hideView.bind(this)}>X</button>
                </header>
                {/* <!-- form for submitting the input values and creating a todo --> */}
                {/* Call handleSubmit (Adding new data) or handleEdit (Edit current todo based on if add todo button is clicked) */}
                <form ref={form => this.formElement = form} id="add-todo-form" className="add-todo-form" 
                    onSubmit={this.props.addTodo ? this.handleSubmit: this.handleEdit}>
                    {/* <!-- title, description, due date and time input fields --> */}
                    <fieldset className="column-fieldset">
                        <label>Title</label>
                        <input id="add-title" ref={(ref) => {this.title = ref}} name="title" type="text" className="add-title _inputField" placeholder="Your task Sir?" required></input>
                    </fieldset>
                    <fieldset className="column-fieldset">
                        <label>Description</label>
                        <textarea id="add-description" ref={(ref) => {this.todoDesc = ref}} name="todoDesc" className="_inputField" rows="3" cols="5"></textarea>
                    </fieldset>
                    <fieldset className="row-fieldset d-flex-row">
                        <label>Due Date:
                            <input id="add-due-date" ref={(ref) => {this.duedate = ref}} type="date" name="duedate" className="_inputField" min={Helpers.convertDate(new Date())} pattern="\d{4}-\d{2}-\d{2}" required></input>
                        </label>
                        <label>Time
                            <input id="add-due-time" ref={(ref) => {this.duetime = ref}} type="time" name="duetime" className="_inputField" required></input>
                        </label>
                    </fieldset>
                    {/* <!-- submit button for creating a todo --> */}
                    <div className="btn-wrapper">
                        <button id="create-todo" type="submit">{this.props.addTodo ? 'Create': 'Update'}</button>
                    </div>
                </form>
            </div>
        )
    }
}