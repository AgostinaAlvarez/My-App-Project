import Comment from "../models/comentsModel.js";
import Post from "../models/postModel.js";

export const addNewCommentInPost = async (req, res) => {
  const { content, postId } = req.body;
  const userId = req.user.id;
  try {
    const newComment = new Comment({
      user: userId,
      content,
      postId,
    });

    //Guarda el comentario
    await newComment.save();

    // Actualiza el post para incluir este comentario en su arreglo `comments`
    await Post.findByIdAndUpdate(
      postId,
      { $push: { comments: newComment._id } }, // Agrega el comentario al arreglo `comments`
      { new: true } // Devuelve el documento actualizado
    );

    return res.status(201).json({ newComment });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al agregar el comentario" });
  }
};

export const getComentsByPost = async (rq, res) => {
  try {
    const { postId } = req.params;
    const { page = 1, limit = 10 } = req.query; 

    // Validación de entrada (opcional)
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: "ID de Post inválido" });
    }

    // Paginación: Calcular saltos
    const skip = (page - 1) * limit;

    // Buscar comentarios del post, con autor incluido
    const comments = await Comment.find({ post: postId })
      .sort({ createdAt: -1 }) // Ordenar por fecha, más recientes primero
      .skip(skip)
      .limit(parseInt(limit))
      .populate("user", "username name lastName avatar"); // Incluye datos del autor del comentario

    // Contar el total de comentarios del post (para calcular páginas)
    const totalComments = await Comment.countDocuments({ post: postId });

    return res.json({
      comments: comments.map((comment) => ({
        _id: comment._id,
        content: comment.content,
        createdAt: comment.createdAt,
        user: comment.user, // Información del autor del comentario
      })),
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalComments / limit),
      totalComments,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al obtener comentarios" });
  }
};

export const verTodos = async (req, res) => {
  try {
    const comments = await Comment.find();
    return res.status(201).json({ comments });
  } catch (err) {
    return res.status(500).json({ message: "Error al ver todos" });
  }
};
