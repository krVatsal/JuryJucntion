import { Router } from "express";
import{
    submitQuery
} from "../controllers/query.controller.js"
import { verifyJWTclient } from "../middlewares/authClient.middleware.js";


const router =Router()

router.route("/submitQuery").post(verifyJWTclient, submitQuery)

export default router