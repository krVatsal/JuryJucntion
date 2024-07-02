import { Router } from "express";
import { postBlog, getBlogs } from "../controllers/blogs.controller.js";
import { verifyJWTadvocate } from "../middlewares/authAdvocate.middleware.js";

const router= Router()

router.route("/post").post(verifyJWTadvocate, postBlog)
router.route("/").get(getBlogs)

export default router