import React from 'react';
import './Todos.scss';
import Helpers from '../Helpers/Helpers';

export class Todos extends React.Component {

    constructor(props) {
        super(props)
        this.todoPendingClass = '_pending'
        this.descNodes = new Map();
    }

    /**
     * Call the deleteTodo method of the parent i.e App
     * @param {*} index of the todo
     */
    deleteTodo(index) {
        this.props.deleteTodo(index);
    }

    /**
     * Calls the toggleComplet function of parent 
     * which changes the status as Completed/Pending
     * @param {index} index of the todo element
     * @param {e} e the event of the todo element
     */
    toggleComplete(index, e) {
        const offset = -300; //Timezone offset for EST in minutes.
        let dateEST = new Date(new Date().getTime() + offset*60*1000);
        let lastModifiedDate = dateEST

        // if pending class, then make status pending
        if (e.target.classList.contains(this.todoPendingClass)) {
            console.log("has pending class");
            this.props.toggleComplete(index, "Pending", lastModifiedDate)
        } else {
            this.props.toggleComplete(index, "Completed", lastModifiedDate)
        }
    }

    /**
     * Show or hide the description
     * @param {index} index of the todo element
     */
    toggleDescription(index) {
        // console.log(this._nodes)
        for(let [i, value] of this.descNodes.entries()) {
            if (index === i) {
                value.classList.toggle('_showDesc')
            }
        }
    }

    /**
     * Calls the parent's method
     * @param {*} todoId which is passed for a put rest call
     */
    handleEdit(todoId) {
        this.props.handleViewEvent(todoId, false)
    }

    render() {
        const todoElements = this.props.todos
            .map((todo, i) => 
                <li key={i}>
                    <div className="list-item-inner">
                        {/* strike todo if status is completed */}
                        <p onClick={this.toggleDescription.bind(this, i)} className={todo.status === 'Completed' ? 'linethrough' : ''}>{todo.title}</p>
                        <div className="action-btn-container">
                            <div className={todo.status === 'Completed' ? 'text-content _dueDate linethrough' : 'text-content _dueDate'}>                    
                                {new Date(Helpers.convertDate(new Date())).getTime() > new Date(Helpers.convertDate(todo.dueDate)).getTime() ? <span className="overdue">Overdue&nbsp;&nbsp;</span> : null}
                                Created <span>{todo.createdDate.substring(0, 10)} {todo.time}</span>
                            </div>
                            <div className={todo.status === 'Completed' ? 'text-content _time linethrough' : 'text-content _time'}>Due on <span>{todo.dueDate.substring(0, 10)}</span></div>
                            {/* toggle betweenm the Completed and Pending button */}
                            { todo.status === 'Completed' &&
                                <button type="button" className="mark-complete _pending" onClick={this.toggleComplete.bind(this, i)}>Mark Pending</button> 
                            }
                            { todo.status !== 'Completed' &&
                                <button type="button" className="mark-complete" onClick={this.toggleComplete.bind(this, i)}>Mark Completed</button> 
                            }
                            {/* Edit button for editing a todo */}
                            <button type="button" id="edit-btn" className="edit-todo-btn" onClick={this.handleEdit.bind(this, todo._id)}>
                                <img alt="todo-logo" src="assets/images/editIcon.png"></img>
                            </button>

                            {/* <button type="button" className="mark-complete" onClick={this.toggleComplete.bind(this, i)}>Mark Finished</button> */}
                            <button type="button" id="close-btn" className="delete-todo-btn" onClick={this.deleteTodo.bind(this, i)}>X</button>
                        </div>
                    </div>
                    {todo.description !== '' ? <div className={todo.status === 'Completed' ? 'todo-list-desc linethrough' : 'todo-list-desc'} ref={elem => this.descNodes.set(i, elem)}>{todo.description}</div> : null}
                </li>
            );
        return (
            <div>
                <div className="todo-box">
                    <div className="todo-header">
                        <p>Todos</p>
                    </div>
                {/* overflow wrapper for scrolling if todo elements exceeds a certain height */}
                    <div className="todo-overflow-wrapper">
                        {/* dynamically append li (todos) to the parent ul */}
                        <ul id="todo-list-container" className="list-container">
                            {todoElements}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}