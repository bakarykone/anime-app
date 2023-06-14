import React, { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  TextField,
} from "@material-ui/core";
import Icon from "./Icon";
import { GoogleLogin } from "react-google-login";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useDispatch } from "react-redux"; // pour pouvoir dispatchh nos actions
import { useHistory } from "react-router-dom";
import Input from "./Input";
import { signup, signin } from "../../actions/auth";

import useStyles from "./styles";

const initialState = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState); // on a crée un state initial qui représente la valeur de départ avec les champs de notre formulaire et on passe dans le state du FormData
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault(); //pour retirer le comportement de rafrachissement du navigateur lorsque qu'on clique sur connecte à utiliser dans lesformulaires sur React
    if (isSignup) {
      dispatch(signup(formData, history));
    } else {
      dispatch(signin(formData, history)); // on passe le formData pour l'avoir dans notre database et le history pour pouvoir naviguer si quelque chose se passe
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value }); // pour pouvoir utiliser le [] on doit vérifier si les clés donné dans le initial state est égale au "name" donnée dans le formulaire
  }; // ça va permettre d'ajouter le reste des propriété et de seulement changer celui qu'on veut seulement changer dans notre il s'agit du "Input" dans lequel on est

  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword); // si on change un state à partir de la valeur précédente du state on utilise un callback pour pouvoir switcher

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    handleShowPassword(false); // permet de reset le faite de montrer le mdp
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj; // pour ne pas retourner d'erreur s'il objet n'existe pas on aura donc un undefined
    const token = res?.tokenId;

    try {
      dispatch({ type: "AUTH", data: { result, token } });
      history.push("/"); // pour qu'on soit redirigé vers le HOME
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = (error) => {
    console.log(error);
    console.log("Connexion avec Google échoué, Réessayer plus tard");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">
          {isSignup ? "S'inscrire" : "Se connecter"}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstname"
                  label="Prénom"
                  handleChange={handleChange}
                  autofocus
                  half
                />
                <Input
                  name="lastname"
                  label="Nom"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Adresse Email"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Mot de passe"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Ré-écrire le mot de passe"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "S'inscrire" : "Se Connecter"}
          </Button>
          <Grid container justifyContent="flex-end">
            <GoogleLogin
              clientId="353352025599-q4r5coonu4j3tp4n24apl35ra7ddaouj.apps.googleusercontent.com" // GOOGLE ID
              render={(renderProps) => (
                <Button
                  className={classes.googleButton}
                  color="primary"
                  fullWidth
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  startIcon={<Icon />}
                  variant="contained"
                >
                  Connexion avec Google
                </Button>
              )}
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy="single_host_origin"
            />
            <Button onClick={switchMode}>
              {isSignup
                ? "Vous avez déja un compte? Connectez-vous"
                : "Pas encore de compte? Créer en un"}
            </Button>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
