import mongoose, {Schema} from "mongoose";

const querySchema = mongoose.Schema({
    clientId :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users',
        required : true
    },
    AdvocatId :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'lawyers',
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
    }
},{timespamps : true})

export const queryModel = mongoose.model('queryModel',querySchema);


