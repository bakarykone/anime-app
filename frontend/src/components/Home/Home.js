import React, { useState, useEffect } from "react";
import {
  Container,
  Grow,
  Grid,
  Paper,
  AppBar,
  TextField,
  Button,
} from "@material-ui/core";
import { useDispatch } from "react-redux"; // pour dispatcher nos actions
import { useHistory, useLocation } from "react-router-dom"; // la location pour savoir sr qu'elle page on est et le history pour pouvoir renaviguer vers certaines pages
import ChipInput from "material-ui-chip-input";

import { getPosts, getPostsBySearch } from "../../actions/posts";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import Pagination from "../Pagination/Pagination";

import useStyles from "./styles";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const [currentId, setCurrentId] = useState(0); // on met l'id a null au début si on a pas d'id sélectionnée
  const dispatch = useDispatch();
  const query = useQuery(); // c'est là où on obtient notre page info
  const history = useHistory();
  const page = query.get("page") || 1; //ça va lire notre Url et ça va voir si on a parametre page dedans, ça va alimenter la variable
  const searchQuery = query.get("searchQuery");
  const classes = useStyles();
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);

  //on doit demander à notre database de retourner seulement les posts qui match notre query

  const searchPost = () => {
    if (search.trim() || tags) {
      //dispatch => fetch search post
      //par exemple si on a comme tags [europe, usa] -> "europe,usa"
      //les tags doit être un string et non un tableau puisque qu'on peut passer un tableau à nos paramètre pour l'url
      dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
      history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
    } else {
      history.push("/");
    }
  };

  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const handleAdd = (tag) => setTags([...tags, tag]);

  const handleDelete = (tagToDelete) =>
    setTags(tags.filter((tag) => tag !== tagToDelete));

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
          className={classes.gridContainer}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                name="search"
                variant="outlined"
                label="Rechercher un Post"
                onKeyUp={handleKeyUp}
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <ChipInput
                style={{ margin: "10px 0" }}
                value={tags}
                onAdd={handleAdd}
                onDelete={handleDelete}
                label="Hashtag(s)"
                variant="outlined"
              />
              <Button
                onClick={searchPost}
                className={classes.searchButton}
                variant="contained"
                color="primary"
              >
                Rechercher
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {(!searchQuery && !tags.length) && (
              <Paper elevation={6} className={classes.pagination}>
                <Pagination page={page}/>
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
