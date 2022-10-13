import todoRouter from './todos.js'

/**
 * take express app as input and set this router
 */
export default (app) => {
    app.use('/', todoRouter)
}