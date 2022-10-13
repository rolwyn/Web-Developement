import Todo from '../models/todos.js'

/**
 * 
 * @param {*} params 
 * @returns {Todo}
 */
export const getAllTodo = (params = {}) => {
    /**
     * returns promise
     * service takes care of business logic i.e getall values from db
     */
    const promise = Todo.find(params).exec()
    return promise
}

/**
 * save function returns a promise when data is saved
 * create a single todo and inserts it in db
 * 
 * @param {todo} the todo item 
 * @returns the save promise 
 */
export const createTodo = (todo) => {
    const newTodo = new Todo(todo)
    return newTodo.save()
}

/**
 * Get a single todo by Id
 * 
 * @param {*} id parameter to find a single todo by id
 * @returns a promise when todo is found
 */
export const getTodoById = (id) => {
    const promise = Todo.findById(id).exec()
    return promise
}

/**
 * Updates a todo by id, body is also passed
 * 
 * @param {*} todo the todo body
 * @returns a promise to the update request
 */
export const updateTodoById = (todo) => {
    todo._id = todo.id
    const promise = Todo.findByIdAndUpdate(todo.id, todo, { new: true }).exec()
    return promise
}


/**
 * Removes a todo by id and then finds and deletes a todo
 * 
 * @param {*} id takes an id as parameter
 * @returns promise
 */
 export const removeTodoById = (id) => {
    const promise = Todo.findByIdAndDelete(id).exec()
    return promise
}