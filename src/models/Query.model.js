import mongoose, {Schema} from "mongoose";

const querySchema = mongoose.Schema({
    clientId :{
        type : String,
        required : true
    },
    advocateId :{
        type : String,
        required : true
    },
    name :{
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    contact : {
        type : Number,
        required : true
    },
    dob : {
        type : String,
        default : new Date().toLocaleDateString(),
        required : true
    },
    about_the_case : {
        type : String,
        required : true
    },
    status : {
        type : String,
    }
},{timestamps : true})

export const queryModel = mongoose.model('queryModel',querySchema);


