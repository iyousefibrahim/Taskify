const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A task must have a name'],
        maxlength: [30, 'A task name must be shorter than or equal to 30 characters'],
        minlength: [5, 'A task name must be at least 5 characters long'],
        trim: true
    },
    description: {
        type: String,
        maxlength: [150, 'A task description must be shorter than or equal to 150 characters'],
        minlength: [5, 'A task description must be at least 5 characters long'],
        trim: true,
        required: [true, 'A task must have a description'],
    },
    completed: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true }); // This line add CreatedAt & UpdatedAt

taskSchema.plugin(mongoosePaginate);
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;