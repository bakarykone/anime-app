import {
  FETCH_ALL,
  FETCH_POST,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
  FETCH_BY_SEARCH,
  START_LOADING,
  END_LOADING,
} from "../constants/actionTypes";
// on export default la fonction car on l'utilise dans l'index.js dans la fonction combineReducers

export default (state = { isloading: true, posts: [] }, action) => {
  switch (action.type) {
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      }; // comme on récupère toutes nos posts dans le posts.js/actions dans la fonction getPosts
    case CREATE:
      return { ...state, posts: [...state, action.payload] }; // on renvoi un tableau de posts et on ajoute un nouveau post qui est stocké dans le action.payload
    case UPDATE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      }; // la méthode prend en argument un post et si l'id du post est égale à l'id du post mis à jour alors on retourne le nouveau post mis à jour sinon renvoi le post sans aucune modification
    case DELETE:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      }; // on va garder tout les posts dauf celui où l'id est égale au action.payload
    case LIKE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case FETCH_BY_SEARCH:
      return {
        ...state,
        posts: action.payload,
      };
    case START_LOADING:
      return { ...state, isloading: true };
    case END_LOADING:
      return { ...state, isloading: false };
    case FETCH_POST:
        return {
          ...state,
          post: action.payload,
    }; 
    default:
      return state; // lorsque qu'on effectue aucune action tous les posts sont renvoyés
  }
};
