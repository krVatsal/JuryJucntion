import {clientModel} from "../models/client.model.js";
import { AdvocateModel } from "../models/Advocate.model.js";
import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken"


const generateAccessAndRefereshTokens = async(userId)=>{
try {
       const client = await clientModel.findById(userId)
       const accessToken= await client.generateAccessToken()
       const refreshToken= await client.generateRefreshToken()
       client.refreshToken=refreshToken
       await client.save({validateBeforeSave: false})
       return {accessToken, refreshToken}
} catch (error) {
    throw new ApiError(400, "Failed to create access and refresh token")
}

   
}

const registerClient = asyncHandler(async(req,res)=>{
const{ name, email, password}= req.body
if(
    [name,email,password].some((field)=>field?.trim) ===""
){
throw new ApiError(500,"All fields are required")
}
const existingClient =await clientModel.findOne({email})
if(existingClient){
    throw new ApiError(500,"Client already registered please go to login page")
}
const newClient= await clientModel.create({name, email, password})
const createdClient = await clientModel.findById(newClient._id).select(
    "-password -refreshToken"
)
if(!createdClient){
    throw new ApiError(400, "Failed to create client")
}
return res.status(200)
.json(new ApiResponse(200, createdClient, "Client created successfully"))
})

const loginClient = asyncHandler(async(req,res)=>{
const{email, password}= req.body
if([email,password].some((field)=> field?.trim)===""){
    throw new ApiError(500, "All fields are required")
}
const checkClient = await clientModel.findOne({email})
if(!checkClient){
 throw new ApiError(500, "client is not registered")
}
const correctPass =await checkClient.isPasswordCorrect(password)
if(!correctPass){
 throw new ApiError(500, "Invalid password")
}

const{refreshToken,accessToken}= await generateAccessAndRefereshTokens(checkClient._id)
const loggedinClient = await clientModel.findById(checkClient._id).select("-password -refreshToken")
const options = {
    httpOnly: true,
    secure: true
}
return res
.status(200)
.cookie("refreshToken",refreshToken, options)
.cookie("accessToken",accessToken, options)
.json(new ApiResponse(200, 
    {checkClient: loggedinClient, refreshToken, accessToken}, 
    "Client logged in successfully"))
})

const logoutClient= asyncHandler(async(req,res)=>{
    await clientModel.findByIdAndUpdate(
        req.client._id,
        {
            $unset:{
                refreshToken:1
            }
        },
        {
            new:true
        }

    )
    const options= {
        httpOnly: true,
        secure:true
    } 
    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)   
    .json(new ApiResponse(200, {}, "Client logged out successfully"))
})

const refreshAccessToken= asyncHandler(async(req,res)=>{
    const incomingRefreshToken= req.cookie.refreshToken|| req.body.refreshToken
    if(!incomingRefreshToken){
        throw new ApiError(401, "Failed to fetch refresh token")
    }
    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
        const client =await clientModel.findById(decodedToken?._id)
        if(!client){
            throw new ApiError(401, "Invalid refrsh token")
        }
        if(incomingRefreshToken !== client?.refreshToken){
            throw new ApiError(401, "Refresh tken is either used or expired")
        }
    const options ={
        httpOnly:true,
        secure: true
    }
    const{accessToken,newrefreshToken}= await generateAccessAndRefereshTokens(client._id)
    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", newRefreshToken, options)
    .json(
        new ApiResponse(
            200, 
            {accessToken, refreshToken: newRefreshToken},
            "Access token refreshed"
        )
    )

    } catch (error) {
        throw new ApiError(400, "Invalid refersh token"|| error?.message)
    }
}) 

const changePassword= asyncHandler(async(req,res)=>{
const{oldPassword, newPassword}= req.body
if([oldPassword, newPassword].some((field)=>field?.trim)===""){
    throw new ApiError(500,"All fields are required")
}
const client = await clientModel.findById(req.client?._id)
const isPasswordCorrect = await client.isPasswordCorrect(oldPassword)
if(!isPasswordCorrect){
    throw new ApiError(500,"Wrong old password entered")
}
client.password =newPassword
await client.save({validateBeforeSave:false})
return res
.status(200)
.json(new ApiResponse(200, {}, "Password changed successfully"))
})

const findALawyer = asyncHandler(async(req,res)=>{
    try {
            const Advocate = {$name:{$search:req.body.name}}
            if(!Advocate){
                throw new ApiError(401, "No Advocate Found")
            }
            res.send(Advocate)
    } catch (error) {
        return res
         .status(400)
         .json(400, new ApiError(400, "Some Error occured"))
    
    }
})
    
const filter =asyncHandler(async(req,res)=>{
    try {
            const{location, experience, specilization}= req.body
            const Advocate = await AdvocateModel.find({specilization:specilization},{location:location}, {experience:experience})
            if(!Advocate){
                throw new ApiError(401, "No Advocates found")
            }
            res.send(Advocate)
    } catch (error) {
         return res
         .status(400)
         .json(400, new ApiError(400, "Some Error occured"))
    
    }
})

// const queries = asyncHandler(async(req,res)=>{

// })

// const blogs = asyncHandler(async(req,res)=>{

// })

export{
    loginClient,
    registerClient,
    logoutClient,
    generateAccessAndRefereshTokens,
    refreshAccessToken,
    changePassword,
    findALawyer,
    filter,
    queries,
    blogs

}