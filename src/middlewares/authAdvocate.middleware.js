import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import {AdvocateModel} from "../models/Advocate.model.js"

export const verifyJWTadvocate = asyncHandler(async(req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        
        // console.log(token);
        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const advocate = await AdvocateModel.findById(decodedToken?._id).select("-password -refreshToken")
    
        if (!advocate) {
            
            throw new ApiError(401, "Invalid Access Token")
        }
    
        req.advocate = advocate;
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }
    
})