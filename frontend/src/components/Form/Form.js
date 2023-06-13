import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./styles";
import { createPost, updatePost } from "../../actions/posts";

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const post = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id === currentId) : null
  ); // ici on veut que les données du post mis à jour, cette opération signifie que si on a un identifiant actuel s'il n'est pas null alors on va boucler sur le state des posts et faire appel à la méthode find pour trouver le post qui a le même id que notre id actuelle et sinon s'il n'ya pas de current id alors on renvoi null
  const classes = useStyles();
  const dispatch = useDispatch(); // on utilisera le dispatch sur le handleSubmit afin d'envoyer un message avec toutes les données que l'utilisateur aura renseigné
  // on utilise le use effect afin de remplir les champs du formulaire avec les valeur du post
  useEffect(() => {
    if (post) setPostData(post); // si le post éxiste alors on va définir le setPostData et le remplir avec les donnéd du post
  }, [post]); // le useEffect s'éxécutera lorsque la valeur du post changera

  const handleSubmit = (e) => {
    e.preventDefault(); // empêche le rafraichissement du navigateur
    if (currentId) {
      //si l'id n'est pas nul, alors on met à jour le post grâce à l'id
      dispatch(updatePost(currentId, postData));
    } else {
      // si on a pas d'id ça signifie qu'on crée un poste
      dispatch(createPost(postData)); // la requête contient toutes les donnée de notre state PostData et s'éxécute une fois que l'utilisateur aura rempli le formulaire et cliquer sur le boutton envoyer
    }
    clear();
  };

  const clear = () => {
    setCurrentId(null);
    setPostData({
      creator: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? "Modifier" : "Créer"} un Anipost
        </Typography>
        <TextField
          name="creator"
          variant="outlined"
          label="Createur"
          fullWidth
          value={postData.creator} // la valeur va être stocké dans le state postData.Creator ce qui veut dire que l'ensemble des données de notre post va être stocké dans l'objet postData et chaque clé d'objet va être un champs de texte spécifique
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          } //pour mettre à jour seulement une propriété de l'objet mais le problème est que si on ne souhaite ajouter un second TextField ça signifie qu'on annulerra toujours tout, et on aura que la propriété créateur on rajoute alors le spread operator pour avoir le reste des propriété
        />
        <TextField
          name="title"
          variant="outlined"
          label="Titre"
          fullWidth
          value={postData.title} // la valeur va être stocké dans le state postData.Creator ce qui veut dire que l'ensemble des données de notre post va être stocké dans l'objet postData et chaque clé d'objet va être un champs de texte spécifique
          onChange={(e) => setPostData({ ...postData, title: e.target.value })} //pour mettre à jour seulement une propriété de l'objet mais le problème est que si on ne souhaite ajouter un second TextField ça signifie qu'on annulerra toujours tout, et on aura que la propriété créateur on rajoute alors le spread operator pour avoir le reste des propriété
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={postData.message} // la valeur va être stocké dans le state postData.Creator ce qui veut dire que l'ensemble des données de notre post va être stocké dans l'objet postData et chaque clé d'objet va être un champs de texte spécifique
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          } //pour mettre à jour seulement une propriété de l'objet mais le problème est que si on ne souhaite ajouter un second TextField ça signifie qu'on annulerra toujours tout, et on aura que la propriété créateur on rajoute alors le spread operator pour avoir le reste des propriété
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Hashtag(s)"
          fullWidth
          value={postData.tags} // la valeur va être stocké dans le state postData.Creator ce qui veut dire que l'ensemble des données de notre post va être stocké dans l'objet postData et chaque clé d'objet va être un champs de texte spécifique
          onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(', ') })} //pour mettre à jour seulement une propriété de l'objet mais le problème est que si on ne souhaite ajouter un second TextField ça signifie qu'on annulerra toujours tout, et on aura que la propriété créateur on rajoute alors le spread operator pour avoir le reste des propriété
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          {currentId ? "Modifier" : "Envoyer"}
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Annuler
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
