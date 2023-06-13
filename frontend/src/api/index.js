import axios from "axios"; //pour faire des appels d'API

const url = "http://localhost:5000/posts"; //l'url qui pointe vers les routes du backend et qui retourne tout les posts qu'on a dans la database

export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost);
export const updatePost = (id, updatePost) => axios.patch(`${url}/${id}`, updatePost)
export const deletePost = (id) => axios.delete(`${url}/${id}`)
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`)

// à noter après l'url on rajoute l'id ou pour d'autre un chemin comme /likePost il s'agit tout simplement du chemin qu'on a défini dans nos routes