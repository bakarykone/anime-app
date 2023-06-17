import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { AppBar, Avatar, Typography, Toolbar, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";

import useStyles from "./styles";
import * as actionType from '../../constants/actionTypes';
import bakanime from "../../images/coollogo_com-15681541.png";

const Navbar = () => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile"))); // pour chercher le user actuel pour amener quelque chose du local storage donc le profil on utilise JSON.parse(localStorage.getItem('profile'))
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    history.push("/auth"); // comme ça quand quelqu'un se déconnecte on le renvoi à l'Accueil
    setUser(null); // puisque qu'on se déconnecte on a plus de user
  };
  // on souhaite utiliser le useEffect lorsque l'url change "/auth" à "/" on va donc utiliser le hook useLocation
  // on a besoin du use effect car quand on si on ne l'a pas on est obligé de refresh la page pour que notre profil s'affiche
  useEffect(() => {
    const token = user?.token; // si le token existe alors on le transmet à notre variable token
    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) { logout()};
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]); // pour rappel le deuxième argument de useEffect est un callback qui va attendre le changement du paramètre ici on att le changement de la location pour faire le useEffect

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to="/" className={classes.brandContainer}>
        <img
          className={classes.image}
          src={bakanime}
          alt="bakanime"
          height="60"
        />
      </Link>
      <Toolbar className={classes.toolbar}>
        {user?.result ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user?.result.name}
              src={user?.result.imageUrl}
            >
              {user?.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user?.result.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={logout}
            >
              Se déconnecter
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Se connecter
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
