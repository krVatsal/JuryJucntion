import { queryModel } from "../models/Query.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {AdvocateModel} from "../models/Advocate.model.js"

const submitQuery = asyncHandler(async (req, res) => {
    const { clientId, advocateId, name, dob, about_the_case, address, contact } = req.body.data;

    // Validate all required fields are present
    if ([clientId, advocateId, name, dob, about_the_case, address, contact].some((field)=> field?.trim) === "") {
        throw new ApiError(500, "All fields are required");
    }

    // Create the query document
    const createQuery = await queryModel.create({
        clientId,
        advocateId,
        name,
        dob,
        about_the_case,
        address,
        contact
    });

    if (!createQuery) {
        throw new ApiError(400, "Failed to create the query");
    }

    // Respond with success message and created query data
    return res.status(200).json(new ApiResponse(200, createQuery, "Query created successfully"));
});

const queryStatus = asyncHandler(async (req, res) => {
    const clientId = req.headers.clientid // Assuming clientId is sent in headers
// console.log(req.headers.clientid)
    // Fetch queries based on clientId
    // console.log(clientId)
    const queries = await queryModel.find({clientId});
// console.log(queries)
    if (!queries || queries.length === 0) {
        throw new ApiError(404, "No queries found for this client");
    }

    // Prepare an array to store advocate names
    const advocateNames = {};

    // Iterate through each query to fetch advocate details
    for (const query of queries) {
        const advocate = await AdvocateModel.findById(query.advocateId);
        console.log(advocate)

        if (!advocate) {
            throw new ApiError(404, `Advocate with ID ${query.advocateId} not found`);
        }

        // Push advocate name into the array
        advocateNames[query.advocateId] = advocate.name;
    }

    // Respond with queries and advocate names
    return res.status(200).json(new ApiResponse(200, { queries, advocateNames }, "Query status retrieved successfully"));
});

export {
    submitQuery,
    queryStatus
};
