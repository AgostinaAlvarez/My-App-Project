import Post from "../models/postModel.js";
import Save from "../models/saveModel.js";

export const addSave = async (req, res) => {
  try {
    const { postId } = req.body;
    const userId = req.user.id;

    // Evitar likes duplicados
    const existingSave = await Save.findOne({ post: postId, user: userId });
    if (existingSave) {
      return res.status(400).json({ message: "Ya has guardado este post" });
    }

    const newSave = new Save({ post: postId, user: userId });
    await newSave.save();

    await Post.findByIdAndUpdate(
      postId,
      { $push: { savedBy: newSave._id } }, // Agrega el comentario al arreglo `comments`
      { new: true } // Devuelve el documento actualizado
    );

    res.status(201).json({ message: "Save agregado exitosamente" });
  } catch (error) {
    console.error("Error al agregar save:", error);
    res.status(500).json({ message: "Error al agregar save" });
  }
};
