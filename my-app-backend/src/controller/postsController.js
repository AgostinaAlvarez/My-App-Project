import Comment from "../models/comentsModel.js";
import Like from "../models/likeModel.js";
import Post from "../models/postModel.js";
import Save from "../models/saveModel.js";

export const createPost = async (req, res) => {
  const { content, imageUrl } = req.body;
  const userId = req.user.id;
  try {
    const newPost = await Post.create({
      author: userId,
      content,
      imageUrl,
    });

    const postWithExtras = {
      ...newPost.toObject(), // Convertir el documento de Mongoose a un objeto
      likesCount: 0,
      savedCount: 0,
      totalComments: 0,
    };

    return res.status(201).json({ newPost: postWithExtras });
  } catch (error) {
    return res.status(500).json({ message: "Error al crear el post", error });
  }
};

//guardar un post
export const savePost = async (req, res) => {
  const userId = req.user._id;
  const { postId } = req.params;
  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post no encontrado" });

    if (post.savedBy.includes(userId)) {
      post.savedBy.pull(userId); // Si ya está guardado, lo quitamos
    } else {
      post.savedBy.push(userId); // Si no está guardado, lo guardamos
    }

    await post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Error al guardar el post", error });
  }
};

export const getAllPostsByUserId = async (req, res) => {
  try {
    const { userId, page, limit } = req.query;
    const commentsLimit = 3;
    const likesLimit = 5;

    const filter = userId ? { author: userId } : {};

    const posts = await Post.find(filter)
      .populate({
        path: "author",
        select: "username name lastname avatar",
      })
      .populate({
        path: "comments",
        populate: {
          path: "user",
          select: "username name lastname avatar",
        },
        options: {
          limit: Number(commentsLimit),
          sort: { createdAt: -1 },
        },
      })
      .populate({
        path: "likes",
        populate: {
          path: "user",
          select: "username name lastname avatar",
        },
        options: {
          limit: Number(likesLimit), //limiar el numero de likes que se muestran
          sort: { createdAt: -1 },
        },
      })
      .skip((page - 1) * Number(limit)) // Paginación para los posts
      .limit(Number(limit)) // Limitar la cantidad de posts por página
      .lean(); // Devuelve los documentos como objetos JavaScript puros, sin metadatos de mongoose

    // Agregar campos adicionales como totalComments, savedCount, likesCount
    const postsWithExtras = await Promise.all(
      posts.map(async (post) => {
        const totalComments = await Comment.countDocuments({
          postId: post._id,
        }); // Número de comentarios ya poblados
        const likesCount = await Like.countDocuments({ post: post._id }); // Número total de "me gusta" en el post
        const savedCount = await Save.countDocuments({ post: post._id });
        return {
          ...post,
          totalComments, // Número total de comentarios del post
          savedCount,
          likesCount, // Número total de "me gusta" en el post
        };
      })
    );

    const totalPosts = await Post.countDocuments(filter);
    const totalPages = Math.ceil(totalPosts / limit); // Calcular el número total de páginas

    return res.status(200).json({
      currentPage: Number(page),
      totalPages,
      totalPosts,
      posts: postsWithExtras, // Posts con los datos adicionales
    });
  } catch (error) {
    console.error("Error al obtener los posts:", error);
    return res
      .status(500)
      .json({ message: "Error al obtener los posts", error });
  }
};

export const getMyPosts = async (req, res) => {
  try {
    const userId = req.user.id;
    const { page, limit } = req.query;
    const commentsLimit = 3;
    const likesLimit = 5;

    const filter = { author: userId };

    const posts = await Post.find(filter)
      .populate({
        path: "author",
        select: "username name lastname avatar",
      })
      .populate({
        path: "comments",
        populate: {
          path: "user",
          select: "username name lastname avatar",
        },
        options: {
          limit: Number(commentsLimit),
          sort: { createdAt: -1 },
        },
      })
      .populate({
        path: "likes",
        populate: {
          path: "user",
          select: "username name lastname avatar",
        },
        options: {
          limit: Number(likesLimit),
          sort: { createdAt: -1 },
        },
      })
      .skip((page - 1) * Number(limit)) // Paginación para los posts
      .limit(Number(limit)) // Limitar la cantidad de posts por página
      .lean(); // Devuelve los documentos como objetos JavaScript puros, sin metadatos de mongoose

    // Agregar campos adicionales como totalComments, savedCount, likesCount
    const postsWithExtras = await Promise.all(
      posts.map(async (post) => {
        const totalComments = await Comment.countDocuments({
          postId: post._id,
        }); // Número de comentarios ya poblados
        const likesCount = await Like.countDocuments({ post: post._id }); // Número total de "me gusta" en el post
        const savedCount = await Save.countDocuments({ post: post._id });
        return {
          ...post,
          totalComments, // Número total de comentarios del post
          savedCount,
          likesCount, // Número total de "me gusta" en el post
        };
      })
    );

    const totalPosts = await Post.countDocuments(filter);
    const totalPages = Math.ceil(totalPosts / limit); // Calcular el número total de páginas

    return res.status(200).json({
      currentPage: Number(page),
      totalPages,
      totalPosts,
      posts: postsWithExtras, // Posts con los datos adicionales
    });
  } catch (error) {
    console.error("Error al obtener los posts:", error);
    return res
      .status(500)
      .json({ message: "Error al obtener los posts", error });
  }
};
