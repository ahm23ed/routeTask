import {categoryModel} from '../../../DB/models/category.model.js'
import { asyncHandler } from '../../../Service/errorHandling.js'


export const createCategory = asyncHandler(
    async (req,res)=>{
        const {name} = req.body
        const category = new categoryModel({name,user:req.user._id})
        await category.save()
        res.status(201).json({message:"Category created successfully",category})
    }
)


export const getCategories = asyncHandler(
    async(req,res)=>{
        const { page = 1, limit = 10, name, sortBy = 'name', order = 'asc' } = req.query
        const filter = {};
        if (name) {
            filter.name = new RegExp(name, 'i')
        }
        const categories = await categoryModel.find(filter)
            .skip((page - 1) * limit)
            .limit(Number(limit))
            .sort({ [sortBy]: order === 'asc' ? 1 : -1 })
        const count = await categoryModel.countDocuments(filter)
        res.status(200).json({
            categories,
            totalPages: Math.ceil(count / limit),
            currentPage: Number(page)
        })
    }
    
)

export const getCatById = asyncHandler(
    async(req,res)=>{
        const category = await categoryModel.findOne({_id: req.params.id, user: req.user._id})
        if (!category) {
            res.status(400).json({message:"cat not found"})
        }
        res.status(200).json({category})
    }
)

export const updateCategory = asyncHandler(
    async(req,res)=>{
        const{name} = req.body
        const category = await categoryModel.findOneAndUpdate({
            _id:req.params.id,user:req.user._id
        },
        {name},
        {new:true})
            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }
            res.status(200).json({message:"Category updated successfully",category})
    }
)
export const deleteCategory = asyncHandler(
    async(req,res)=>{
        const category = await categoryModel.findOneAndDelete({_id:req.params.id,user:req.user._id})
        if (!category) {
            return res.status(400).json({message:"Category not found"})
        }
        res.status(200).json({message:"Category deleted successfully",category})
    }
)