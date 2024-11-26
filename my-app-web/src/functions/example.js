//Crear un post

// POST /posts
app.post("/posts", authenticate, async (req, res) => {
  const { content, imageUrl } = req.body;
  const userId = req.user._id; // Suponiendo que `authenticate` agrega el usuario autenticado a `req.user`

  try {
    const newPost = await Post.create({
      author: userId,
      content,
      imageUrl,
    });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el post", error });
  }
});

//Dar me gusta a un post
// POST /posts/:postId/like
app.post("/posts/:postId/like", authenticate, async (req, res) => {
  const userId = req.user._id;
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post no encontrado" });

    if (post.likes.includes(userId)) {
      post.likes.pull(userId); // Si ya le dio me gusta, se lo quitamos
    } else {
      post.likes.push(userId); // Si no, le damos me gusta
    }

    await post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Error al dar me gusta", error });
  }
});

//Guardar un post
// POST /posts/:postId/save
app.post("/posts/:postId/save", authenticate, async (req, res) => {
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
});

//Obtener los posts de un usuario
//GET /posts?userId=123456&page=2&limit=5
/*
  app.get("/posts", authenticate, async (req, res) => {
    try {
      // Destructura los parámetros de la query
      const { userId, page, limit } = req.query;
      const commentsLimit = 5;
  
      // Filtro opcional: Si hay un userId, filtra los posts por autor
      const filter = userId ? { author: userId } : {};
  
      // Buscar los posts según el filtro
      const posts = await Post.find(filter)
        .populate({
          path: "author",
          select: "username name lastName avatar",
        })
        .populate({
          path: "likes",
          select: "username name lastName avatar",
        })
        .populate({
          path: "comments.user",
          select: "username name lastName avatar",
          options: {
            limit: Number(commentsLimit), // Limitar comentarios
            sort: { createdAt: -1 }, // Ordenar los comentarios por fecha
          },
        })
        .skip((page - 1) * limit)
        .limit(Number(limit))
        .lean();
  
      // Obtener el contador total de comentarios por post
      const postsWithCommentCounts = await Promise.all(
        posts.map(async (post) => {
          const totalComments = await Comment.countDocuments({ post: post._id });
          return {
            ...post,
            totalComments, // Número total de comentarios del post
            savedCount: post.savedBy.length, // Veces que se guardó el post
          };
        })
      );
  
      /// Agregamos un campo 'savedCount' con la cantidad de veces guardado
      const postsWithSavedCount = await Promise.all(
        posts.map((post) => ({
          ...post,
          savedCount: post.savedBy.length, // Cuenta el número de usuarios que guardaron el post
        }))
      );
  
      // Contar el total de posts (aplicando el filtro si hay userId)
      const totalPosts = await Post.countDocuments(filter);
      const totalPages = Math.ceil(totalPosts / limit);
  
      res.status(200).json({
        currentPage: Number(page),
        totalPages,
        totalPosts,
        posts: postsWithCommentCounts,
      });
    } catch (error) {
      console.error("Error al obtener los posts:", error);
      res.status(500).json({ message: "Error al obtener los posts", error });
    }
  });
  */
/*
  app.get("/posts", authenticate, async (req, res) => {
    try {
      // Destructura los parámetros de la query
      const { userId, page = 1, limit = 10 } = req.query; // Valores predeterminados
      const commentsLimit = 5;
  
      // Filtro opcional: Si hay un userId, filtra los posts por autor
      const filter = userId ? { author: userId } : {};
  
      // Buscar los posts según el filtro
      const posts = await Post.find(filter)
        .populate({
          path: "author",
          select: "username name lastName avatar",
        })
        .populate({
          path: "likes",
          select: "username name lastName avatar",
        })
        .populate({
          path: "comments.user",
          select: "username name lastName avatar",
          options: {
            limit: Number(commentsLimit), // Limitar comentarios
            sort: { createdAt: -1 }, // Ordenar los comentarios por fecha
          },
        })
        .skip((page - 1) * Number(limit))
        .limit(Number(limit))
        .lean();
  
      // Agregar campos adicionales como totalComments, savedCount, y likesCount
      const postsWithExtras = await Promise.all(
        posts.map(async (post) => {
          const totalComments = await Comment.countDocuments({ post: post._id });
          const likesCount = post.likes.length; // Contamos el número de "me gusta" (tamaño del array likes)
          return {
            ...post,
            totalComments, // Número total de comentarios del post
            savedCount: post.savedBy.length, // Veces que se guardó el post
            likesCount, // Número total de "me gusta" en el post
          };
        })
      );
  
      // Contar el total de posts (aplicando el filtro si hay userId)
      const totalPosts = await Post.countDocuments(filter);
      const totalPages = Math.ceil(totalPosts / limit);
  
      res.status(200).json({
        currentPage: Number(page),
        totalPages,
        totalPosts,
        posts: postsWithExtras,
      });
    } catch (error) {
      console.error("Error al obtener los posts:", error);
      res.status(500).json({ message: "Error al obtener los posts", error });
    }
  });
  
  */

app.get("/posts", authenticate, async (req, res) => {
  try {
    // Destructura los parámetros de la query
    const { userId, page = 1, limit = 10 } = req.query; // Valores predeterminados
    const commentsLimit = 5; // Limitar la cantidad de comentarios por post

    // Filtro opcional: Si hay un userId, filtra los posts por autor
    const filter = userId ? { author: userId } : {};

    // Buscar los posts según el filtro
    const posts = await Post.find(filter)
      .populate({
        path: "author",
        select: "username name lastName avatar",
      })
      .populate({
        path: "likes",
        select: "username name lastName avatar",
      })
      .populate({
        path: "comments",
        select: "content createdAt",
        populate: {
          path: "user",
          select: "username name lastName avatar", // Informacion del autor del comentario
        },
        options: {
          limit: Number(commentsLimit), // Limitar comentarios
          sort: { createdAt: -1 }, // Ordenar los comentarios por fecha (más recientes primero)
        },
      })
      .skip((page - 1) * Number(limit)) // Paginación para los posts
      .limit(Number(limit)) // Limitar la cantidad de posts por página
      .lean(); // Devuelve los documentos como objetos JavaScript puros, sin metadatos de mongoose

    // Agregar campos adicionales como totalComments, savedCount, likesCount
    const postsWithExtras = await Promise.all(
      posts.map(async (post) => {
        const totalComments = post.comments.length; // Número de comentarios ya poblados
        const likesCount = post.likes.length; // Número total de "me gusta" en el post
        return {
          ...post,
          totalComments, // Número total de comentarios del post
          savedCount: post.savedBy.length, // Veces que se guardó el post
          likesCount, // Número total de "me gusta" en el post
        };
      })
    );

    // Contar el total de posts (aplicando el filtro si hay userId)
    const totalPosts = await Post.countDocuments(filter);
    const totalPages = Math.ceil(totalPosts / limit); // Calcular el número total de páginas

    res.status(200).json({
      currentPage: Number(page),
      totalPages,
      totalPosts,
      posts: postsWithExtras, // Posts con los datos adicionales
    });
  } catch (error) {
    console.error("Error al obtener los posts:", error);
    res.status(500).json({ message: "Error al obtener los posts", error });
  }
});

/*
  router.get("/posts/:postId/comments", async (req, res) => {
    try {
      const { postId } = req.params;
      const { page = 1, limit = 10 } = req.query; // Valores predeterminados: página 1, 10 comentarios por página
  
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
        .populate("author", "username name last_name avatar"); // Incluye datos del autor
  
      // Contar el total de comentarios del post (para calcular páginas)
      const totalComments = await Comment.countDocuments({ post: postId });
  
      res.json({
        comments,
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalComments / limit),
        totalComments,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener comentarios" });
    }
  });
  */
router.get("/posts/:postId/comments", async (req, res) => {
  try {
    const { postId } = req.params;
    const { page = 1, limit = 10 } = req.query; // Valores predeterminados: página 1, 10 comentarios por página

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

    res.json({
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
    res.status(500).json({ message: "Error al obtener comentarios" });
  }
});
