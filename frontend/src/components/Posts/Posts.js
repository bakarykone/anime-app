import React from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux"; // pour récuperer les données du "state"

import Post from "./Post/Post";
import useStyles from "./styles";

const Posts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts); // on sait qu'il se nomme posts car si on va dans "reducers/index.js" on peut aperçevoir notre posts// avant on avait un tableau de post mais maintenant on a un objet posts
  const classes = useStyles();

  if (!posts.length && !isLoading) return "Aucun posts";

  console.log(posts);

  return (
    // si on a pas de posts on retourne un spinner sinon elle affiche une grid de posts
    isLoading ? (
      <CircularProgress />
    ) : (
      <Grid
        className={classes.container}
        container
        alignItems="stretch"
        spacing={3}
      >
        {posts?.map((post) => (
          <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Posts;
