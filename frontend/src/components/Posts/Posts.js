import React from "react";
import { Grid, CircularProgress} from "@material-ui/core"
import { useSelector } from "react-redux"; // pour récuperer les données du "state"

import Post from "./Post/Post";
import useStyles from "./styles";

const Posts = ({ setCurrentId }) => {
  const posts = useSelector((state) => state.posts); // on sait qu'il se nomme posts car si on va dans "reducers/index.js" on peut aperçevoir notre posts
  const classes = useStyles();

  console.log(posts);

  return (
    // si on a pas de posts on retourne un spinner sinon elle affiche une grid de posts
    !posts.length ? <CircularProgress/> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {posts.map((post) => (
            <Grid key={post.id} item xs={12} sm={6}>
              <Post post={post} setCurrentId={setCurrentId}/>
            </Grid>
          ))}
      </Grid>
    )
  );
};

export default Posts;
