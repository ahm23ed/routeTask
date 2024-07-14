import mongoose from "mongoose";
const connectDB  = async ()=>{
    return await mongoose.connect(process.env.DBURI).then(()=>
    console.log(`connectedDB on ........... ${process.env.DBURI}`)
    )
}

export default connectDB