import { Router } from "express";
import{
    loginClient,
    registerClient,
    logoutClient,
    changePassword,
    findALawyer,
    filter,

} from "../controllers/client.controller.js"
import { verifyJWTclient } from "../middlewares/authClient.middleware.js";


const router = Router()

router.route("/register").post(registerClient)
router.route("/login").post(loginClient)
router.route("/logout").post(verifyJWTclient,logoutClient)
router.route("/changePassword").post(verifyJWTclient, changePassword)
router.route("/find").post(verifyJWTclient, findALawyer)
router.route("/filter").post(verifyJWTclient, filter)

export default router
