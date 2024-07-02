import { Router } from "express";
import { postQuestions, getQuestions } from "../controllers/questions.controller.js";
import { verifyJWTclient } from "../middlewares/authClient.middleware.js";

const router = Router()
router.route("/").get(verifyJWTclient, getQuestions)
router.route("/post").post(verifyJWTclient, postQuestions)

export default router