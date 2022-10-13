import { response } from 'express';
import * as todoService from '../services/todo.js';

/**
 * Set a success response
 * 
 * @param {*} data take the response of the query and returns as JSON
 * @param {*} res server response if call is successful
 */
const setSuccessResponse = (data, res) => {
    res.status(200);
    res.json(data);
}

/**
 * Set a error response
 * 
 * @param {*} message the message if there is an error (returned from catch block)
 * @param {*} res will return 500 response status code if there is an error
 */
const setErrorResponse = (message, res) => {
    res.status(500);
    res.json({error: message});
}

/**
 * 
 * @param {*} req the request to get all todos - passed as empty will fetch all records
 * @param {*} res the response from the server after promise has been fulfilled
 */
export const getAllTodos = async (req, res) => {
    try {
        const todo = await todoService.getAllTodo()
        setSuccessResponse(todo, res)
    } catch(e) {
        setErrorResponse(e.message, res)
    }
}

/**
 * clones the request body and create a todo
 * 
 * @param {*} req the json body
 * @param {*} res the response returned from server
 */
export const saveTodo = async (req, res) => {
    try {
        const todo = {...req.body}
        const newTodo = await todoService.createTodo(todo)
        setSuccessResponse(newTodo, res)
    } catch (e) {
        setErrorResponse(e.message, res) 
    }
}

/**
 * Gets a single todo based on id
 * 
 * @param {*} req the request will have an id 
 * @param {*} res will return the response when data found
 */
export const getTodoById = async (req, res) => {
    try {
        const id = req.params.id
        const singleTodo = await todoService.getTodoById(id)
        setSuccessResponse(singleTodo, res)
    } catch(e) {
        setErrorResponse(e.message, res)
    }
}

/**
 * Updates a single todo based on id
 * 
 * @param {*} req is the id and body as parameter
 * @param {*} res returns a response from server
 */
 export const updateTodoById = async (req, res) => {
    try {
        const id = req.params.id
        const todo = {...req.body, id}
        const updatedTodo = await todoService.updateTodoById(todo)
        setSuccessResponse(updatedTodo, res)
    } catch(e) {
        setErrorResponse(e.message, res)
    }
}

/**
 * removes the data based on the id
 * 
 * @param {*} request is the id parameter
 * @param {*} response deletes the todo from server and returns success
 */
 export const removeTodoById = async (req, res) => {
    try {
        const id = req.params.id
        const todo = await todoService.removeTodoById(id)
        setSuccessResponse({message: `Todo ${id} removed successfully from Database.`}, res);
    } catch (e) {
        setErrorResponse(e.message, res)
    }
}