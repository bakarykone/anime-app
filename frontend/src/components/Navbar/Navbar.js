import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import { AppBar, Avatar, Typography, Toolbar, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import useStyles from "./styles"
import bakanime from '../../images/bakanime.png'

const Navbar = () => {
    const classes = useStyles()
    const  [user, setUser] = useState(JSON.parse(localStorage.getItem('profile'))) // pour chercher le user actuel pour amener quelque chose du local storage donc le profil on utilise JSON.parse(localStorage.getItem('profile'))
    const dispatch = useDispatch();
    const history = useHistory()
    
    const logout = () => {
      dispatch({type: 'LOGOUT'})
      history.push('/') // comme ça quand quelqu'un se déconnecte on le renvoi à l'Accueil
      setUser(null)// puisque qu'on se déconnecte on a plus de user
    }

    useEffect(() => {
      const token = user?.token; // si le token existe alors on le transmet à notre variable token
    
      setUser(JSON.parse(localStorage.getItem('profile')))
    }, []) 

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
    <div className={classes.brandContainer}>
    <Typography component={Link} to="/"
        className={classes.heading}
        variant="h2"
        align="center"
        noWrap
      >
        Bakanime
      </Typography>
      <img
        className={classes.image}
        src={bakanime}
        alt="bakanime"
        height="60"
      />
    </div>
    <Toolbar className={classes.toolbar}>
        {user? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
            <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Se déconnecter</Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="primary">Se connecter</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
