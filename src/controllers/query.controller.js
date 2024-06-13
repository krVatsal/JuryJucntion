import {queryModel} from "../models/Query.model.js";
import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"

const submitQuery = asyncHandler(async(req,res)=>{
    const{name, dob, about_the_case, address,contact}= req.body
    if([name, dob, about_the_case, address,contact].some((field)=>field.trim)===""){
        throw new ApiError(500,"All fields are required")
    }
const clientId = req.client._id
const AdvocateId = req.advocate._id
const createQuery = await queryModel.create({
    name, dob, about_the_case, address,contact,clientId,AdvocateId
})
await createQuery.save()
if(!createQuery){
    throw new ApiError(400,"Failed to create the query")
}
return res
.status(200)
.json(new ApiResponse(200, createQuery, "Query created successfully"))
})

export{
    submitQuery
}