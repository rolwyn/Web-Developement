import React from 'react';
// import logo from './logo.svg';
import './App.scss';
import { Navbar } from './Navbar/Navbar'
import { AddTodo } from './Add-Todo/AddTodo';
import { Todos } from './Todos/Todos'

export class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			todos: [],
			show: false,
			todoId: null,
			addTodo: true
		}
	}

	/**
	 * This will be called only once. GET all the todo data
	 */
	componentDidMount() {
		const toJson = (res) => res.json()
		const loadData = (config) => {
			fetch(config.todos_api_url).then(toJson).then((todos) => this.setState({ todos }))
		}
		fetch("config/config.json").then(toJson).then(loadData)
	}
	 
	/**
	 * function to show/hide add todo view
	 */
	showAddTodoForm(showTodo) {
		this.setState({show: showTodo})
	}

	/**
	 * Deletes todo when delete button is clicked
	 * @param {*} index of the selected todo element
	 */
	deleteTodo(index) {
		let todoId = null;
		let tempTodos = [...this.state.todos]
		tempTodos = tempTodos.filter(function (element, i) {
			if (index === i) {
				todoId = element._id;
			}
			return i !== index;
		})
		// Delete only if id is present
		if (todoId !== undefined || todoId !== null || todoId !== '') {
			const toJson = (res) => res.json()
			const deleteData = (config) => {
				fetch(config.todos_api_url+'/'+todoId, { method: 'DELETE' })
				.then(this.setState({
					todos: tempTodos
				}))
				.then(() => console.log('Delete successful'))
			}
			fetch("config/config.json").then(toJson).then(deleteData)
		}
	}

	/**
	 * Toggle the status of todo as complete or pending
	 * @param {*} index of the todo element
	 * @param {*} status of the selected todo element
	 * @param {*} lastModifiedDate when the status is changed 
	 */
	toggleComplete(index, status, lastModifiedDate) {
		let todoId = null;
		const tempTodos = [...this.state.todos]
		this.state.todos.filter(function (element, i) {
			if (index === i) {
				todoId = element._id;
				// let todos = [...this.state.todos];
				let todo = {
					...tempTodos[i],
					status: status,
					lastModifiedDate: lastModifiedDate
				}
				tempTodos[i] = todo
			}
			return i;
		});
		
		// Update only if id is present
		if (todoId !== undefined || todoId !== null || todoId !== '') {
			const toJson = (res) => res.json()
			const requestOptions = {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ status: status, lastModifiedDate: lastModifiedDate })
			};
			const updateData = (config) => {
				fetch(config.todos_api_url+'/'+todoId, requestOptions).then(this.setState({todos: tempTodos})).then(() => console.log('Update successful'))
			}
			fetch("config/config.json").then(toJson).then(updateData)
		}
	}

	/**
	 * Edit state when todo is updated from the form.
	 * Data gets updated in the backend
	 * @param {*} todoObj the object which is used for updating the todo
	 */
	handleEditState(todoObj) {
		const tempTodo = [...this.state.todos]
		const todoid = this.state.todoId
		this.state.todos.filter(function (element, i) {
			if (todoid === element._id) {
				let todo = {
					...tempTodo[i],
					title: todoObj.title,
					description: todoObj.description,
					dueDate: todoObj.dueDate,
					time: todoObj.time
				}
				tempTodo[i] = todo
			}
			return "ok";
		});
		this.setState({todos: tempTodo})
	}

	// When todo is updated, get all the todos again
	handleSubmitState() {
		this.componentDidMount()
	}

	/**
	 * true is view // false is edit
	 * take todo id if present and check which button is pressed (whether add or edit)
	 * @param {*} todoId view event of the selected todo item to edit
	 * @param {*} addTodo check if add todo button is clicked, else it's an edit
	 */
	handleViewEvent(todoId, addTodo) {
		this.setState({addTodo: addTodo, todoId: todoId, show: true})
	}

	// render the ui
	render() {
		return (
			<div className="container">
				{/* Navbar Component */}
				<Navbar handleViewEvent={this.handleViewEvent.bind(this)}></Navbar>
        		<div className="container_wrapper">					
					{/* Add todo-add view here */}
					<div className="todo-wrapper">
						<AddTodo show={this.state.show} addTodo={this.state.addTodo} todoId={this.state.todoId} 
							showAddTodoForm={this.showAddTodoForm.bind(this)} handleSubmitState={this.handleSubmitState.bind(this)}
							handleEditState ={this.handleEditState.bind(this)}>	
						</AddTodo>
						{/* todo box for displaying all the fetched and the new todos */}
						<Todos todos={this.state.todos} handleViewEvent={this.handleViewEvent.bind(this)}  deleteTodo={this.deleteTodo.bind(this)} toggleComplete={this.toggleComplete.bind(this)}></Todos>					
					</div>
				</div>
			</div>
		)
	}
}
