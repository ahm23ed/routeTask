import {taskModel} from '../../../DB/models/Task.model.js'
import{asyncHandler} from '../../../Service/errorHandling.js'


export const createTask = asyncHandler(
    async (req, res) => {
        const {type, text, listItems, shared, categoryID} = req.body
        const task = new taskModel({type,text,listItems,shared,categoryID,user: req.user._id})
        await task.save()
        res.status(201).json({ message:"Task created successfully",task})
    }
)
export const updateTask = asyncHandler(
    async (req, res) => {
        const { type, text, listItems, shared } = req.body
        const task = await taskModel.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id },
            { type, text, listItems, shared },
            { new: true }
        )
        if (!task) {
            return res.status(404).json({ message: 'Task not found' })
        }
        res.status(200).json({ message: "Task updated successfully", task })
    }
)

export const getTasks = asyncHandler(
    async (req, res) => {
        const { page = 1, limit = 10, shared, categoryID, sortBy = 'createdAt', order = 'desc' } = req.query
        const filter = {};
        if (shared !== undefined) {
            filter.shared = shared === 'true'
        }
        if (categoryID) {
            filter.categoryID = categoryID
        }
        const tasks = await taskModel.find(filter)
            .skip((page - 1) * limit)
            .limit(Number(limit))
            .sort({ [sortBy]: order === 'asc' ? 1 : -1 })
        const count = await taskModel.countDocuments(filter)
        res.status(200).json({
            tasks,
            totalPages: Math.ceil(count / limit),
            currentPage: Number(page)
        })
    }
)


export const deleteTask = asyncHandler(
    async (req, res) => {
        const task = await taskModel.findOneAndDelete({ _id: req.params.id, user: req.user._id })
        if (!task) {
            return res.status(404).json({ message: 'Task not found' })
        }
        res.status(200).json({ message: "Task deleted successfully" })
    }
)