import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import dotenv from 'dotenv';
dotenv.config({
    path: './.env'
});

const AdvocateSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    contact : {
        type : Number,
        required : true
    },
    experience : {
        type : Number,
        required : true
    },
    location : {
        type : String,
        enum : ['New Delhi' , 'Prayagraj' , 'Mumbai' , 'Kolkata' , 'Chennai' , 'Bangalore']
    },
  qualification : {
        type : String,
        required : true
    },
    about : {
        type : String,
        required : true
    },
    enrollmentNumber : {
        type : String,
        required : true,
        unique: true
    },
    specilization : {
        type : String,
        enum : ['Criminal lawyer' , 'Corporate lawyer' , 'Civil lawyer' , 'Intellectual property lawyer' , 'Tax lawyer' , 'Labour lawyer' , 'Immigration lawyer' , 'Government lawyer' , 'Bankruptcy lawyer']
    },
    avatar:{
        type: String
    },
    refreshToken: {
        type: String
    }
},{timestamps : true})
AdvocateSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

AdvocateSchema.methods.isPasswordCorrect = async function(password){
    try {
       const verifyPass= await bcrypt.compare(password, this.password);
        return verifyPass
      } catch (err) {
        throw new Error(err);
      }
    }

AdvocateSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            name: this.name,
            EnrollmentNumber: this.EnrollmentNumber
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
AdvocateSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const AdvocateModel = mongoose.model('AdvocateModel',AdvocateSchema);

