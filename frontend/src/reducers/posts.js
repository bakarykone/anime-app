import { FETCH_ALL,CREATE,UPDATE,DELETE,LIKE } from "../constants/actionTypes";
// on export default la fonction car on l'utilise dans l'index.js dans la fonction combineReducers

export default (posts = [], action) => {
    switch (action.type) {
        case FETCH_ALL:
            return action.payload; // comme on récupère toutes nos posts dans le posts.js/actions dans la fonction getPosts 
        case CREATE :
            return [...posts, action.payload] // on renvoi un tableau de posts et on ajoute un nouveau post qui est stocké dans le action.payload 
        case UPDATE :
            return posts.map((post) => post._id === action.payload._id ? action.payload : post) // la méthode prend en argument un post et si l'id du post est égale à l'id du post mis à jour alors on retourne le nouveau post mis à jour sinon renvoi le post sans aucune modification
        case DELETE :
            return posts.filter((post) => post._id !== action.payload) // on va garder tout les posts dauf celui où l'id est égale au action.payload
        case LIKE :
            return posts.map((post) => post._id === action.payload._id ? action.payload : post)
        default:
           return posts; // lorsque qu'on effectue aucune action tous les posts sont renvoyés
    }
}