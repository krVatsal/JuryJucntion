import { Router } from "express";
 import{
    loginAdvocate,
    registerAdvocate,
    logoutAdvocate,
    changePassword,
    changeAvatar,
    getDetails,
    applications,
    statusUpdate
 } from "../controllers/advocate.controller.js"
 import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWTadvocate } from "../middlewares/authAdvocate.middleware.js";

 const router =Router()

 router.route("/register").post(
   upload.fields([
      {
         name: "avatar",
         maxCount: 1
      }
   ]),
   registerAdvocate
 )
 router.route("/login").post(loginAdvocate)
 router.route("/logout").post(verifyJWTadvocate, logoutAdvocate)
 router.route("/changePassword").post(verifyJWTadvocate, changePassword)
 router.route("/changeAvatar").post(verifyJWTadvocate, changeAvatar)
 router.route("/details/:advocate").get(getDetails)
 router.route("/applications").get(applications)
 router.route('/applications/:id/updateStatus').patch(statusUpdate)


 export default router

 
