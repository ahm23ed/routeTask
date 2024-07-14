import mongoose, { model, Schema, Types } from "mongoose";

const categorySchema  = new Schema(
    {
        name: String,
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        }
    },{
        timestamps:true
    }
)
export const categoryModel = model("category",categorySchema)