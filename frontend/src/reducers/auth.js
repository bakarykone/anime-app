import { AUTH, LOGOUT } from "../constants/actionTypes";
//authData = {result, token } = payload, on le met à null par déaut
const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem('profile', JSON.stringify({ ...action?.data}))// on stocke notre result et notre token dans le localstorage comme ça lorsqu'on refresh la page le navigateur saura qu'on est connecté
      return { ...state, authData: action?.data};
    case LOGOUT:
      localStorage.clear()// puisque le problème est que si ondécide de logout notre profil est gardé dans le localstorage et quand on refresh la page on est alors à nouveau connecté on décide alors de rajouter un clear pour que quand on se logout le cache du local storage est supprimé
      return { ...state, authData: null};
      default:
      return state;
  }
};

export default authReducer;
