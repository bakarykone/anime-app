import express from "express";
import { getPosts, createPost, updatePost, deletePost, likePost } from "../controllers/posts.js";

const router = express.Router(); // pour la gestion des routes
//router.request("path","function")
router.get("/", getPosts);
router.post("/", createPost)
router.patch("/:id", updatePost) //puisque qu'on souhaite connaître l'id avant de modifier le post
router.delete("/:id", deletePost)
router.patch("/:id/likePost", likePost)
export default router;
