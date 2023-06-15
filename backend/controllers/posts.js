// les controllers permmettent de traiter les requêtes, effectuer les actions nécéssaires de l'utilisateur et coordonne les intéractions entre la vue et le modèle

import mongoose from "mongoose"; // on importe mongoose puisqu'on a besoin du modèle PostMessages pour faire les modifications nécéssaires sur le modèle
import PostMessage from "../models/postMessage.js";

//qui nous permet d'afficher les posts
export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//qui nous permet de créer des posts
export const createPost = async (req, res) => {
  const post = req.body; // informations donnée par l'utilisateur qu'on va récupérer pour créer un nouveau post(ps: ligne suivante)
  const newPost = new PostMessage(post);
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("Aucun post avec cette id");

  const updatedPost = await PostMessage.findByIdAndUpdate(
    _id,
    { ...post, _id },
    { new: true }
  ); // comme ça on a accès au post mis à jour et va la base de donnée va mettre le post à jour

  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("Aucun post avec cette id");

  await PostMessage.findByIdAndDelete(id);

  res.json({ message: "Post supprimé avec succès" });
};

export const likePost = async (req, res) => {
  const { id } = req.params;
  //condition qui vérifie si le user est authentifié pour qu'il puisse liker le post 1 seul fois
  if (!req.userId) {
    //fais référence à notre middleware
    console.log("Non authentifié");
    return res.json({ message: "Non authentifié" });
  }

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("Aucun post avec cette id");

  const post = await PostMessage.findById(id); // pour trouver le post qu'on recherche

  //on va vérifier si le user id a déja liker
  //on check si l'id est égale à l'id qu'on connais
  const index = post.likes.findIndex((id) => id === String(req.userId));

  //seulement si son id n'est pas connu dans le req.userId alors se sera égale à -1
  if (index === -1) {
    //aimer un post
    post.likes.push(req.userId)
  } else {
    //dislike the post
    //les likes deviennent des ids et on filtre avec celui de la personne actuelle
    //ce qui va retourner le tableau de tout les likes avant que le user like
    post.likes = post.likes.filter((id) => id !== String(req.userId))
  }

  // maintenant on a le meme vieux post qui inclue le like lui-même
  const updatedPost = await PostMessage.findByIdAndUpdate(
    id,
    post,
    { new: true }
  ); // en plus de l'id en second paramètre on veut passer notre maj c'est donc un objet comme on peut le voir dans le modèle on va donc incrémenter notre likeCount avec post.likeCount(qui représente le post qu'on a recherché dans la ligne de dessus) + 1 et comme c'est une requête patch on doit rajouter un troisième paramètre new qui est à l'intérieur d'un objet où new est vrai

  res.json(updatedPost);
};
