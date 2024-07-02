import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { questionModel } from "../models/questions.model.js";

const postQuestions = asyncHandler(async(req,res)=>{
    const {question, advocateType} = req.body
    if(!(question && advocateType)){
        throw new ApiError(400, "No question received")
    }
    const createQuestion = await questionModel.create({question, advocateType})
    if(!createQuestion){
        throw new ApiError(400, "Failed to create new question")
    }
    return res.status(200).json(new ApiResponse(200, {}, "Question saved successfully"))
   
})

const getQuestions= asyncHandler(async(req,res)=>{
    const allQuestions = await questionModel.find()
    return res.status(200).json(new ApiResponse(200, allQuestions, "Fetched all questions"))
})

export{
    postQuestions,
    getQuestions
}