import { Router } from "express";
import{
    loginClient,
    registerClient,
    logoutClient,
    changePassword
} from "../controllers/client.controller.js"
import { verifyJWTclient } from "../middlewares/authClient.middleware.js";


const router = Router()

router.route("/register").post(registerClient)
router.route("/login").post(loginClient)
router.route("/logout").post(verifyJWTclient,logoutClient)
router.route("/changePassword").post(verifyJWTclient, changePassword)

export default router
