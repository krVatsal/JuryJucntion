import {AdvocateModel} from "../models/Advocate.model.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken"
import { uploadOnCloudinary } from "../utils/cloudinary.js"

    const generateAccessAndRefereshTokens = async(userId)=>{
    try {
           const advocate = await AdvocateModel.findById(AdvocateModel._id)
           const accessToken= advocate.generateAccessToken()
           const refreshToken= advocate.generateRefreshToken()
           advocate.refreshToken=refreshToken
           await advocate.save({validateBeforeSave: false})
           return {accessToken, refreshToken}
    } catch (error) {
        throw new ApiError(400, "Failed to create access and refresh token")
    }
    
       
    }
    
    const registerAdvocate = asyncHandler(async(req,res)=>{
    const{name,email,password,contact,experience,location,qualification,about,enrollmentNumber,specilization}= req.body
    if(
        [name,email,password,contact,experience,location,qualification,about,enrollmentNumber,specilization].some((field)=>field?.trim) ===""
    ){
    throw new ApiError(500,"All fields are required")
    }
    const existingadvocate =await AdvocateModel.findOne(email)
    if(existingadvocate){
        throw new ApiError(400,"advocate already registered please go to login page")
    }

    const LocalAvatarPath = req.file?.avatar[0]?.path
    if(!LocalAvatarPath){
        throw new ApiError(500, "Avatar file missing")
    }
    const avatar = uploadOnCloudinary(LocalAvatarPath)
    if(!avatar){
        throw new ApiError(401, "Failed to upload image on cloudinary")
    }

    const newadvocate= await AdvocateModel.create({name, email, password, avatar: avatar.url, contact,experience,location,specilization,about,enrollmentNumber })
    const createdadvocate = await AdvocateModel.findById(newadvocate._id).select(
        "-password -refreshToken"
    )
    if(!createdadvocate){
        throw new ApiError(400, "Failed to create advocate")
    }
    return res.status(200)
    .jsom(new ApiResponse(200, createdadvocate, "advocate created successfully"))
    })
    
    const loginAdvocate = asyncHandler(async(req,res)=>{
    const{email, password}= req.body
    if([email,password].some((field)=> field?.trim)===""){
        throw new ApiError(500, "All fields are required")
    }
    const checkadvocate = await AdvocateModel.findOne(email)
    if(!checkadvocate){
     throw new ApiError(500, "User is not registered")
    }
    const isPasswordCorrect =await isPasswordCorrect(password)
    if(!isPasswordCorrect){
     throw new ApiError(500, "Invalid password")
    }
    
    const{refreshToken,accessToken}= await generateAccessAndRefereshTokens(checkadvocate._id)
    const loggedinadvocate = await AdvocateModel.findById(checkadvocate._id).select("-password -refreshToken")
    const options = {
        httpOnly: true,
        secure: true
    }
    return res
    .status(200)
    .cookie("refreshToken",refreshToken, options)
    .cookie("accessToken",accessToken, options)
    .json(new ApiResponse(200, 
        {checkadvocate: loggedinadvocate, refreshToken, accessToken}, 
        "advocate logged in successfully"))
    })
    
    const logoutAdvocate= asyncHandler(async(req,res)=>{
        await AdvocateModel.findByIdandUpdate(
            req.advocate._id,
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
        .json(new ApiResponse(200, {}, "advocate logged out successfully"))
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
            const advocate =await AdvocateModel.findById(decodedToken?._id)
            if(!advocate){
                throw new ApiError(401, "Invalid refrsh token")
            }
            if(incomingRefreshToken !== advocate?.refreshToken){
                throw new ApiError(401, "Refresh tken is either used or expired")
            }
        const options ={
            httpOnly:true,
            secure: true
        }
        const{accessToken,newrefreshToken}= await generateAccessAndRefereshTokens(advocate._id)
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
    const advocate = await AdvocateModel.findById(req.advocate?._id)
    const isPasswordCorrect = await advocate.isPasswordCorrect(oldPassword)
    if(!isPasswordCorrect){
        throw new ApiError(500,"Wrong old password entered")
    }
    advocate.password =newPassword
    await advocate.save({validateBeforeSave:false})
    return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"))
    })

    const changeAvatar= asyncHandler(async(req,res)=>{
    const oldAvatar = req.advocate.avatar
    const oldAvatarPublicId= oldAvatar.public_id
    const avatarLocalPath= req.file?.path
    if(!avatarLocalPath){
        throw new ApiError(401, "failed to fetch image")
    }
    const deleteOldAvatar =cloudinary.uploader.destroy(oldAvatarPublicId, function(result) { console.log(result) });
    if(!deleteOldAvatar){
        throw new ApiError(401, "Failed to delete old avatar image")
    }
    const newAvatar= await uploadOnCloudinary(avatarLocalPath)
    if (!newAvatar.url) {
        throw new ApiError(400, "Error while uploading on avatar")
    }
    const advocate = await AdvocateModel.findByIdAndUpdate(
        req.advocate?._id,
        {
            $set:{
                avatar: newAvatar.url
            }
        },
        {new: true}
    ).select("-password")

    return res
    .status(200)
    .json(
        new ApiResponse(200, advocate, "Avatar image updated successfully")
    )

    })

    export {
        loginAdvocate,
        registerAdvocate,
        logoutAdvocate,
        changePassword,
        refreshAccessToken,
        generateAccessAndRefereshTokens,
        changeAvatar
    }