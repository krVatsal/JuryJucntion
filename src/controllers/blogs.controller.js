import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import { blogModel } from "../models/blogs.model.js"
import { AdvocateModel } from "../models/Advocate.model.js"

const postBlog = asyncHandler(async(req, res)=>{
const{title, body, advocateId}= req.body
if([title, body, advocateId].some((field)=>field?.trim)===""){
    throw new ApiError(400, "All the fields are required")
}
const advocate = await AdvocateModel.findById(advocateId)
if(!advocate){
    throw new ApiError(400, "invalid advocate id")
}
const advocateName = advocate.name

const blog = await blogModel.create({title, body, advocateName})
if(!blog){
    throw new ApiError(400, "failed to post blog")
}

return res.status(200).json(new ApiResponse(200 ,{}, "created the blog successfully"))
})

const getBlogs = asyncHandler(async(req,res)=>{
    const blogs = await blogModel.find()
    if(!blogs){
        throw new ApiError(400, "failed to fetch blogs")
    }
    return res.status(200).json(new ApiResponse(200, blogs, "fetched all blogs successfully"))
})
export{
    postBlog,
    getBlogs
}