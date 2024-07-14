import { model, Schema } from "mongoose";


const userSchema = new Schema(
    {
        name:{
            type:String,
            required:[true, 'name is required'],
        },
        email:{
            type:String,
            required:[true, 'email is required'],
        },
        password:{
            type:String,
            required:[true, 'password is required'],
            },
            online:{
                type:Boolean,
                default:false,
            },
            lastSeen:{
                type:Date,
                },
                blocked: { 
                    type: Boolean, 
                    default: false 
                    },
                    code:{
                        type:String,
                        
                    }
    },{
        timestamps:true
    }
)
export const userModel = model("User",userSchema)
export default userModel