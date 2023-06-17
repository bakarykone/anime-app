import axios from "axios"; //pour faire des appels d'API

//il s'agit d'une création d'instance axios
//fais exactement la même chose que l'url mis en commentaire mais l'a on a plus besoin de spécifié le point de départ
const API = axios.create({ baseURL: "http://localhost:5000" });

//ce code s'éxécutera avant les requêtes qu'on a fait ci-dessous
API.interceptors.request.use((req) => {
  // on doit renvoyer notre token au backend, pour que le middleware vérifie si on est connecté
  if (localStorage.getItem("profile")) {
    // c'est là qu'on stocke notre token
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`; // on obtiens le token du prfil spécifique
  }
  return req;
});

//l'url qui pointe vers les routes du backend et qui retourne tout les posts qu'on a dans la database
//plus utile car on souhaite que l'api face des call sur les posts mais aussi sur les users
// const url = "http://localhost:5000/posts";

export const fetchPost = (id) => API.get(`/posts/${id}`)
export const fetchPosts = (page) => API.get(`/posts?page=${page}`); // maintenant on passe la donné à notre backend pour savoir sur quel page on est actuellement
export const fetchPostBySearch = (searchQuery)  => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`)
export const createPost = (newPost) => API.post("/posts", newPost);
export const updatePost = (id, updatePost) => API.patch(`/posts/${id}`, updatePost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const signIn = (formData) => API.post("user/signin", formData);
export const signUp = (formData) => API.post("user/signup", formData);

// à noter après l'url on rajoute l'id ou pour d'autre un chemin comme /likePost il s'agit tout simplement du chemin qu'on a défini dans nos routes
