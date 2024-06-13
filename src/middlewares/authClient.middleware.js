import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import {clientModel} from "../models/client.model.js";

export const verifyJWTclient = asyncHandler(async(req, _, next) => {
    try {
        const token = req.cookies?.accesstoken 
        console.log(token);
        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const client = await clientModel.findById(decodedToken?._id).select("-password -refreshToken")
    
        if (!client) {
            
            throw new ApiError(401, "Invalid Access Token")
        }
    
        req.client = client;
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }
    
})