import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { signToken } from "../repository/tokenRepository.js";
import UserRepository from "../repository/userRepository.js";

export const registerUser = async (req, res) => {
  const { username, name, lastname, email, password } = req.body;

  const userExists = await UserRepository.findByEmail(email);
  //await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: "El usuario ya existe" });
  }

  const userNameExist = await UserRepository.findByUserName(username);

  //await User.findOne({ username });
  if (userNameExist) {
    return res.status(400).json({ message: "El nombre de usuario ya existe" });
  }

  const user = await UserRepository.createUser({
    username,
    name,
    lastname,
    email,
    password,
  });
  //new User({ username, name, lastname, email, password });
  //await user.save();

  const token = signToken(user._id);

  return res.status(201).json({
    message: "Usuario registrado exitosamente",
    token,
    user: {
      userId: user.id,
      username: user.username,
      name: user.name,
      lastname: user.lastname,
      avatar: user.avatar,
      email: user.email,
      description: user.description,
      friends: 0,
    },
  });
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserRepository.findByUserName(username);
    if (!user) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    const token = signToken(user._id);
    //jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    const friendsCount = user.friends.length;

    return res.json({
      message: "Inicio de sesión exitoso",
      token,
      user: {
        userId: user.id,
        username: user.username,
        name: user.name,
        lastname: user.lastname,
        avatar: user.avatar,
        email: user.email,
        description: user.description,
        friends: friendsCount, // Devolver el conteo de amigos
      },
    });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    return res.status(500).json({ message: "Error del servidor", error });
  }
};

//Ver datos del token
export const getUserByToken = async (req, res) => {
  const userId = req.user.id;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(400).json({ message: "Usuario no encontrado" });
  }

  const friendsCount = user.friends.length;

  return res.json({
    user: {
      userId: user.id,
      username: user.username,
      name: user.name,
      lastname: user.lastname,
      avatar: user.avatar,
      email: user.email,
      description: user.description,
      friends: friendsCount, // Devolver el conteo de amigos
    },
  });
};
