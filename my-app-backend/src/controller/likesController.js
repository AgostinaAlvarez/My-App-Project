import Like from "../models/likeModel.js";
import Post from "../models/postModel.js";

export const addLike = async (req, res) => {
  try {
    const { postId } = req.body;
    const userId = req.user.id;

    // Evitar likes duplicados
    const existingLike = await Like.findOne({ post: postId, user: userId });
    if (existingLike) {
      return res.status(400).json({ message: "Ya has dado like a este post" });
    }

    const newLike = new Like({ post: postId, user: userId });
    await newLike.save();

    await Post.findByIdAndUpdate(
      postId,
      { $push: { likes: newLike._id } }, // Agrega el comentario al arreglo `comments`
      { new: true } // Devuelve el documento actualizado
    );

    res.status(201).json({ message: "Like agregado exitosamente" });
  } catch (error) {
    console.error("Error al agregar like:", error);
    res.status(500).json({ message: "Error al agregar like" });
  }
};
