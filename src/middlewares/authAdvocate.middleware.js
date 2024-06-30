import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import {AdvocateModel} from "../models/Advocate.model.js"
import dotenv from 'dotenv';
dotenv.config({
    path: './.env'
});

export const verifyJWTadvocate = asyncHandler(async(req, _, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        console.log(req)
        console.log(token)
        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }
    console.log("1")
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        console.log(decodedToken)
        const advocate = await AdvocateModel.findById(decodedToken?._id).select("-password -refreshToken")
        console.log(advocate)
        if (!advocate) {
            
            throw new ApiError(401, "Invalid Access Token")
        }
        console.log("4")
        req.advocate = advocate;
        console.log("5")
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access1 token")
    }
    
})