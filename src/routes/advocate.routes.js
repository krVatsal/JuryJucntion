import { Router } from "express";
 import{
    loginAdvocate,
    registerAdvocate,
    logoutAdvocate,
    changePassword,
    changeAvatar
 } from "../controllers/advocate.controller.js"
 import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWTadvocate } from "../middlewares/authAdvocate.middleware.js";

 const router =Router()

 router.route("/registerAdvocate").post(
   upload.fields([
      {
         name: "avatar",
         maxCount:1
      }
   ]),
   registerAdvocate
 )
 router.route("/login").post(loginAdvocate)
 router.route("/logout").post(verifyJWTadvocate, logoutAdvocate)
 router.route("/changePassword").post(verifyJWTadvocate, changePassword)
 router.route("/changeAvatar").post(verifyJWTadvocate, changeAvatar)

 export default router

 
