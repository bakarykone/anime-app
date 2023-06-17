import jwt from "jsonwebtoken";
import dotenv from "dotenv";

//le troisième argument next représente le fait de passer à la suite car notre middleware s'éxécute dans une fonction et pour dire qu'après que le middleware a été utilisé on place le next
const auth = async (req, res, next) => {
  try {
    // on va vérifier si le user est réellement la personne qu'il doit être et pour ça on va utiliser le jsonwebtoken après que le user s'est inscrit ou s'est connecté il aura un token spécifique et lorsqu'il voudra faire quelque chose comme liker un post ou supprimer un post on va vérifier si son token est valide
    const token = req.headers.authorization.split(" ")[1]; //comme on veut seulement le token qui est placé à l'index 1 du tableau après qu'on les split

    // on va avoir 2 sortes de token un de google auth et un qui nous appartient
    // on va donc si c'est le notre ou celui de google auth
    const isCustomAuth = token.length < 500; // si le token est inférieur à 500 caractères il s'agit du notre sinon il s'agit de celui de google auth

    let decodedData; // il s'agit de la donné qu'on veut token lui même

    //Voici comment on obtien le user id si on travaille avec notre propre token
    if (token && isCustomAuth) {
      //si on a un token et que c'est le notre alors on  défini notre decodedData
      decodedData = jwt.verify(token, process.env.SECRET); // ça va nous donner la donné spécifique de chaque token, comme le username d'une personne et son id

      // maintenant qu"on a le decodedData on sait qu'elle est le user qui est connecté et quel user a liké ou supprimer un post
      // on va stocker son id
      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);
      // le sub est un nom google pour un id spécifique qui déférencie chaque user de google il s'agit d'un id
      req.userId = decodeData?.sub;
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
