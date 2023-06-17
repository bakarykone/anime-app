import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js";
import dotenv from "dotenv";

export const signin = async (req, res) => {
  const [email, password] = req.body;

  try {
    const existingUser = await User.findOne({ email }); // afin de trouver si on a un user avec cette adresse mail dans la database parce que si il est déja enregistré on ne peux pas en crée un nouveau avec cette adresse mail

    if (!existingUser) {
      console.log("L'utilisateur n'existe pas");
      return res.status(404).json({ message: "L'utilisateur n'existe pas" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    ); // on compare notre mot de passe à ceux présents dans la bdd, on peut pas faire une verification se string basique car quand on va implémenter le bcrypt on va haché le mot de passe

    if (!isPasswordCorrect) {
      console.log("Identifiants invalide");
      return res.status(400).json({ message: "Identifiants Invalides" });
    }

    //dans le cas où le user existe et que son mdp est correct on va lui donner son jsonwebtoken qu'on va transmettre au frontend
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.SECRET,
      { expiresIn: "1h" }
    ); // on fournit comme 1er paramètres tous les informations qu'on veut stocker dans le token, et le second paramètre est un "secret" que nous seul connaissons et le troisième argument est expiredIn qui nous permet de dire pendant combien de temps on souhaite stocker le token
    console.log("token success");
    res.status(200).json({ result: existingUser, token }); // on va renvoyer le user existant ou le user qui essaye de se connecter et le token qu'on a crée
  } catch (error) {
    console.log(`Erreur : ${error}`);
    res
      .status(500)
      .json({ message: "Aie Aie ! Quelque ne s'est pas déroulé comme prévu" });
  }
};

export const signup = async (req, res) => {
  const { email, password, confirmPassword, firstname, lastname } = req.body;
  try {
    const existingUser = await User.findOne({ email }); // afin de trouver si on a un user avec cette adresse mail dans la database parce que si il est déja enregistré on ne peux pas en crée un nouveau avec cette adresse mail
    if (existingUser) {
      console.log("mail connue");
      return res
        .status(400)
        .json({ message: "L'utilisateur avec ce mail existe déja" });
    }

    if (password !== confirmPassword) {
      console.log("les mots de passes sont différents");
      console.log(confirmPassword);
      return res
        .status(400)
        .json({ message: "Les mots de passe ne sont pas identiques" });
    }
    
    //avat de créer un user on va haché le mdp puisqu'on veut pas stoker dans un texte clair
    const hashedPassword = await bcrypt.hash(password, 12); // le premier argument est le mdp qu'on va haché et le second argumet est le "salt" qui représente le niveau qu'on utilise pour haché le string il s'agit d'un number ou d'un string
    //maintenant on crée notre user
    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstname} ${lastname}`,
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ result, token });
    console.log("Utilisateur crée");
  } catch (error) {
    res
      .status(500)
      .json({ message: "Aie Aie ! Quelque ne s'est pas déroulé comme prévu" });
  }
};
