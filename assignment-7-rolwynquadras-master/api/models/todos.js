import Mongoose from "mongoose";

/**
 * Create schema
 */
const TodoSchema = new Mongoose.Schema({
    "title": {
        type: String,
        required: "Title is a required field."
    },
    "description": {
        type: String
    },
    "dueDate": {
        type: Date,
        required: "Due date is a required field."
    },
    "time": {
        type: String,
        required: "Time is a required field."
    },
    "createdDate": {
        type: Date,
        default: Date.now
    },
    "lastModifiedDate": {
        type: Date,
        default: Date.now
    }

},
{
    versionKey: false
})


TodoSchema.virtual('id', () => this._id.toHexString())
TodoSchema.set('toJSON', {virtuals: true})


/**
 * Use this collection
 */
const Todo = Mongoose.model('Todo', TodoSchema)

/**
 * Default export
 */
export default Todo