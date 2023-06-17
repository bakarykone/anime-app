import express from "express";
import { getPostsBySearch, getPosts, getPost, createPost, updatePost, deletePost, likePost } from "../controllers/posts.js";
import  auth  from "../middleware/auth.js";


const router = express.Router(); // pour la gestion des routes
//router.request("path","function")

//toutes ces routes commence dorénavent par "/posts"
router.get("/", getPosts);
router.get("/search", getPostsBySearch)
router.get("/:id", getPost)

router.post("/",auth, createPost)
router.patch("/:id",auth, updatePost) //puisque qu'on souhaite connaître l'id avant de modifier le post
router.delete("/:id",auth, deletePost)
router.patch("/:id/likePost",auth, likePost) // tout le monde peut liker un post mais ne peux le faire qu'une seul foi c'est pour ça qu'on utilise le auth avant le likePost
export default router;
