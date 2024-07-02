import mongoose, {Schema} from "mongoose";

const questionSchema = mongoose.Schema({
    question :{
        type : String,
        required : true
    },
    answer :{
        type : String,
    },
    advocateType :{
        type : String,
        required: true
    }
    
 
},{timestamps : true})

export const questionModel = mongoose.model('questionModel',questionSchema);


