import express from "express";
import { signin, signup } from "../controllers/user.js";

const router = express.Router(); // pour la gestion des routes
//router.request("path","function")
router.post("/signin", signin);// il s'agint d'un .post car on doit envoyer des données au backend on doit dans notre cas envoyer tous les détails du formulaire vers le backend et ensuite le backend  se basera sur ces infos pour faire quelque chose
router.post("/signup", signup)
export default router;
