import { FETCH_ALL,FETCH_BY_SEARCH,FETCH_POST,CREATE,UPDATE,DELETE,LIKE, START_LOADING, END_LOADING } from "../constants/actionTypes";
import * as api from "../api"; //on importe tout des actions comme des api
//Créateurs d'action
//fonction qui permettent de renvoyer des actions
//comme on travail de manière asyncrone, si on veut chercher tout les posts le temps va passer et pour cela on doit utiliser redux thunk qui nous permet de spécifier une fonction fléchée supplémentaire
//on retourne plus l'action mais on l'a dispatch
export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    const { data } = await api.fetchPosts(page); // on utilise redux pour passer ou envoyer une action depuis les données de notre backend, on fetch les donnée de l'api puis on les envoi à travers l'action.payload on peut donct dans le reducers faire un action.payload
    console.log(data)
    dispatch({ type: FETCH_ALL, payload: data });
    dispatch({type: END_LOADING})
  } catch (error) {
    console.log(error.message);
  }
};

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    const { data } = await api.fetchPost(id); // on utilise redux pour passer ou envoyer une action depuis les données de notre backend, on fetch les donnée de l'api puis on les envoi à travers l'action.payload on peut donct dans le reducers faire un action.payload
    console.log(data)
    dispatch({ type: FETCH_POST, payload: data });
    dispatch({type: END_LOADING})
  } catch (error) {
    console.log(error.message);
  }
};


export const getPostsBySearch = (searchQuery) => async(dispatch) => {
 try {
  dispatch({ type: START_LOADING })
  const { data: {data} } = await api.fetchPostBySearch(searchQuery)
  dispatch({ type: FETCH_BY_SEARCH, payload: data }); // le data est envoyé aux reducers
  dispatch({type: END_LOADING})
  console.log(data)
 } catch (error) {
  console.log(error)
 }
}

export const createPost = (post) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    const { data } = await api.createPost(post);
    dispatch({ type: CREATE, payload: data });
    dispatch({type: END_LOADING})
  } catch (error) {
    console.log(error.message);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post) // cette requête api renvoi le post ou la mémoire mise à jour
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
}

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id) // on a pas besoin de transmettre des donées (const {data} =) pour supprimer le post on décide alors de passer en argument l'id on va juste attendre l'appel de l'api, on est pas intéressé par les données de retour
    dispatch({type: DELETE, payload: id}) //comme on a pas besoin de la réponse on dispatch 
  } catch (error) {
    console.log(error.message)
  }
}

export const likePost = (id) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  try {
    const { data } = await api.likePost(id, user?.token)
    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error.message)
  }
}