import mongoose, {Schema} from "mongoose";

const blogSchema = mongoose.Schema({
    title :{
        type : String,
        required : true
    },
    body :{
        type : String,
        required: true
    },
    advocateName :{
        type : String,
        required: true
    }
    
 
},{timestamps : true})

export const blogModel = mongoose.model('blogModel',blogSchema);


