import { Router } from "express";
import{
    submitQuery,
    queryStatus
} from "../controllers/query.controller.js"
import { verifyJWTclient } from "../middlewares/authClient.middleware.js";


const router =Router()

router.route("/submit").post(verifyJWTclient, submitQuery)
router.route("/status").get(verifyJWTclient, queryStatus)

export default router