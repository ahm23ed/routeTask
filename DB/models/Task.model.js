import mongoose, { model, Schema } from "mongoose";

const taskSchema = new Schema({
    type: {
        type: String,
        enum: ['text', 'list'],
        required: true,
    },
    text: {
        type: String,
    },
    shared: {
        type: Boolean,
        default: false,
    },
    categoryID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        },
    listItems: [
        {
            text: {
                type: String,
                required: true,
            },
        },
    ],
})
export const taskModel = model("Task",taskSchema)