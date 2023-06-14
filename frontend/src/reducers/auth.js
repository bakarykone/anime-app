import { AUTH, LOGOUT } from "../constants/actionTypes";
//authData = {result, token } = payload, on le met à null par déaut
const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem('profile', JSON.stringify({ ...action?.data}))// on stocke notre result et notre token dans le localstorage comme ça lorsqu'on refresh la page le navigateur saura qu'on est connecté
      return { ...state, authData: action?.data};
    default:
      return state;
  }
};

export default authReducer;
