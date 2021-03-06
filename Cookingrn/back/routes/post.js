const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { Post, Image, User, Comment, Hashtag } = require('../models');
const { isLoggedIn } = require('./middlewares');


const router = express.Router();

try {
  fs.accessSync('uploads');
} catch (error) {
  console.log('uploads 폴더가 없으므로 생성합니다.');
  fs.mkdirSync('uploads');
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads');
    },
    filename(req, file, done) { 
      const ext = path.extname(file.originalname); 
      const basename = path.basename(file.originalname, ext); 
      done(null, basename + '_' + new Date().getTime() + ext); 
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 }, 
});

router.post('/', upload.none(), async (req, res, next) => { // POST /post
  try {
    // console.log("req.body::::::::::::::",JSON.stringify(req.body));
    // console.log("req.body.info[0]::::::", req.body.info.foodname);

    const hashtags = req.body.info.recipe.match(/#[^\s#]+/g);
console.log("hashtags:",hashtags);
    const post = await Post.create({
      name: req.body.info.foodname,
      content1: req.body.info.ingre1,
      content2: req.body.info.ingre2,
      content3: req.body.info.ingre3,
      recipe: req.body.info.recipe,
      UserId: req.user.id,
    });
    if (hashtags) {
      const result = await Promise.all(hashtags.map((tag) => Hashtag.findOrCreate({
        where: { name: tag.slice(1).toLowerCase() },
      }))); // [[노드, true], [리액트, true]]
      console.log("result:::::",JSON.stringify(result));
      await post.addHashtags(result.map((v) => v[0]));
    }
   
    if (req.body.image) {
      if (Array.isArray(req.body.image)) { // 이미지를 여러 개 올리면 image: [제로초.png, 부기초.png]
        const images = await Promise.all(req.body.image.map((image) => Image.create({ src: image })));
        await post.addImages(images);
      } else { // 이미지를 하나만 올리면 image: 제로초.png
        const image = await Image.create({ src: req.body.image });
        await post.addImages(image);
      }
    }
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [{
        model: Image,
      },  {
        model: User, // 게시글 작성자
        attributes: ['id', 'nickname'],
      }, {
        model: User, // 좋아요 누른 사람
        as: 'Likers',
        attributes: ['id'],
      }]
    })
    // console.log("fullpost::::::::::::::::::",JSON.stringify(fullPost),"endddddddddddddd");
    res.status(201).json(fullPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});


router.post('/images', isLoggedIn, upload.array('image'), (req, res, next) => { // POST /post/images
  // console.log(req.files);
  res.json(req.files.map((v) => v.filename));
});



router.post('/:postId/comment', isLoggedIn, async (req, res, next) => { // POST /post/1/comment
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });
    if (!post) {
      return res.status(403).send('존재하지 않는 게시글입니다.');
    }
    const comment = await Comment.create({
      content: req.body.content,
      PostId: parseInt(req.params.postId, 10),
      UserId: req.user.id,
    })
    const fullComment = await Comment.findOne({
      where: { id: comment.id },
      include: [{
        model: User,
        attributes: ['id', 'nickname'],
      }],
    })
    //  console.log("fullComment::::",JSON.stringify(fullComment),"enddddd");
    res.status(201).json(fullComment);
  } catch (error) {
    console.error(error);
    next(error);
  }
});


router.patch('/:postId/like', isLoggedIn, async (req, res, next) => { // PATCH /post/1/like
  try {
    // console.log("req.params.postId::::::::",req.params.postId);
    const post = await Post.findOne(
      { where: { id: req.params.postId }});
    if (!post) {
      return res.status(403).send('게시글이 존재하지 않습니다.');
    }
    await post.addLikers(req.user.id);
    res.json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete('/:postId/like', isLoggedIn, async (req, res, next) => { // DELETE /post/1/like
  try {
    const post = await Post.findOne({ where: { id: req.params.postId }});
    if (!post) {
      return res.status(403).send('게시글이 존재하지 않습니다.');
    }
    await post.removeLikers(req.user.id);
    res.json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/:postId', async (req, res, next) => {
  try {
   
        const ha = parseInt(req.params.postId);

        // console.log("ha:",ha);
      
    const post = await Post.findOne({
      where: { id:  ha },
      include: [{
        model: User,
        attributes: ['id', 'nickname'],
      }, {
        model: Image,
      }, {
        model: User, // 좋아요 누른 사람
        as: 'Likers',
        attributes: ['id'],
      },
      {
        model: Comment,
        include: [{
          model: User,
          attributes: ['id', 'nickname'],
        }],
      },
    ],
    });
    // console.log("post:::::",JSON.stringify((post)));
    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    next(error);
  }
});



router.patch('/editcomment/', isLoggedIn, async (req, res, next) => {
  try {
       await Comment.update({
         content: req.body.editText,
       }, {
         where: {
           id:req.body.itemId,
           UserId: req.user.id,
         },
       });

    res.status(200).json({commentId: req.body.itemId,  content: req.body.editText})
  } catch (error) {
    console.error(error);
    next(error);
  }
});


router.patch('/:postId', isLoggedIn, async (req, res, next) => { // PATCH /post/10
  const hashtags = req.body.recipe.match(/#[^\s#]+/g);
  try {
    await Post.update({
      name: req.body.foodname,
      content1: req.body.ingre1,
      content2: req.body.ingre2,
      content3: req.body.ingre3,
      recipe: req.body.recipe,
    }, {
      where: {
        id: req.params.postId,
        UserId: req.user.id,
      },
    });
    const post = await Post.findOne({ where: {id: req.params.postId}});

    if (hashtags) {
      const result = await Promise.all(hashtags.map((tag) => Hashtag.findOrCreate({
        where: { name: tag.slice(1).toLowerCase() },
      }))); // [[노드, true], [리액트, true]]
      await post.setHashtags(result.map((v) => v[0]));
    }
    
    res.status(200).json({ PostId: parseInt(req.params.postId, 10), name: req.body.foodname,
      content1: req.body.ingre1,
      content2: req.body.ingre2,
      content3: req.body.ingre3,
      recipe: req.body.recipe, });
  } catch (error) {
    console.error(error);
    next(error);
  }
});



router.delete('/:postId', isLoggedIn, async (req, res, next) => {
  try {
    await Post.destroy({
   where: {
      id: req.params.postId,
      UserId: req.user.id,
   },
});
res.status(200).json({PostId: parseInt(req.params.postId,10 )});
} catch (error) {
  console.error(error);
  next(error);
}
});

router.post('/removecomment/', isLoggedIn, async (req, res, next) => {
  try {
        console.log("req.body:::",req.body);
    const post = await Post.findOne({
      where: {id: req.body.hi},
    });
    // console.log("post:::",JSON.stringify(post));
    if (!post) {
      return res.status(403).send('존재하지 않는 게시글 입니다');
    }
    const user = await User.findOne({
      where: {id: req.user.id},
    });
    if (!user) {
      return res.status(403).send("권한이 없습니다");
    }

   await Comment.destroy({
      where: {
        id: req.body.item,
        UserId: req.user.id,
        PostId: req.body.hi,            
      },
    });
    res.status(200).json({PostId:req.body.hi, commentId: req.body.item});
  } catch (error) {
    console.error(error);
    next(error);
  }
});





module.exports = router;





// const express = require('express');
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');
// const { Post, Image, User, Comment, Hashtag } = require('../models');
// const { isLoggedIn } = require('./middlewares');


// const router = express.Router();

// try {
//   fs.accessSync('uploads');
// } catch (error) {
//   console.log('uploads 폴더가 없으므로 생성합니다.');
//   fs.mkdirSync('uploads');
// }

// const upload = multer({
//   storage: multer.diskStorage({
//     destination(req, file, done) {
//       done(null, 'uploads');
//     },
//     filename(req, file, done) { 
//       const ext = path.extname(file.originalname); 
//       const basename = path.basename(file.originalname, ext); 
//       done(null, basename + '_' + new Date().getTime() + ext); 
//     },
//   }),
//   limits: { fileSize: 20 * 1024 * 1024 }, 
// });

// router.post('/', upload.none(), async (req, res, next) => { // POST /post
//   try {
//     // console.log("req.body::::::::::::::",JSON.stringify(req.body));
//     // console.log("req.body.info[0]::::::", req.body.info.foodname);

//     const hashtags = req.body.info.recipe.match(/#[^\s#]+/g);
// console.log("hashtags:",hashtags);
//     const post = await Post.create({
//       name: req.body.info.foodname,
//       content1: req.body.info.ingre1,
//       content2: req.body.info.ingre2,
//       content3: req.body.info.ingre3,
//       recipe: req.body.info.recipe,
//       UserId: req.user.id,
//     });
//     if (hashtags) {
//       const result = await Promise.all(hashtags.map((tag) => Hashtag.findOrCreate({
//         where: { name: tag.slice(1).toLowerCase() },
//       }))); // [[노드, true], [리액트, true]]
//       console.log("result:::::",JSON.stringify(result));
//       await post.addHashtags(result.map((v) => v[0]));
//     }
   
//     if (req.body.image) {
//       if (Array.isArray(req.body.image)) { // 이미지를 여러 개 올리면 image: [제로초.png, 부기초.png]
//         const images = await Promise.all(req.body.image.map((image) => Image.create({ src: image })));
//         await post.addImages(images);
//       } else { // 이미지를 하나만 올리면 image: 제로초.png
//         const image = await Image.create({ src: req.body.image });
//         await post.addImages(image);
//       }
//     }
//     const fullPost = await Post.findOne({
//       where: { id: post.id },
//       include: [{
//         model: Image,
//       },  {
//         model: User, // 게시글 작성자
//         attributes: ['id', 'nickname'],
//       }, {
//         model: User, // 좋아요 누른 사람
//         as: 'Likers',
//         attributes: ['id'],
//       }]
//     })
//     // console.log("fullpost::::::::::::::::::",JSON.stringify(fullPost),"endddddddddddddd");
//     res.status(201).json(fullPost);
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// });


// router.post('/images', isLoggedIn, upload.array('image'), (req, res, next) => { // POST /post/images
//   // console.log(req.files);
//   res.json(req.files.map((v) => v.filename));
// });



// router.post('/:postId/comment', isLoggedIn, async (req, res, next) => { // POST /post/1/comment
//   try {
//     const post = await Post.findOne({
//       where: { id: req.params.postId },
//     });
//     if (!post) {
//       return res.status(403).send('존재하지 않는 게시글입니다.');
//     }
//     const comment = await Comment.create({
//       content: req.body.content,
//       PostId: parseInt(req.params.postId, 10),
//       UserId: req.user.id,
//     })
//     const fullComment = await Comment.findOne({
//       where: { id: comment.id },
//       include: [{
//         model: User,
//         attributes: ['id', 'nickname'],
//       }],
//     })
//     //  console.log("fullComment::::",JSON.stringify(fullComment),"enddddd");
//     res.status(201).json(fullComment);
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// });


// router.patch('/:postId/like', isLoggedIn, async (req, res, next) => { // PATCH /post/1/like
//   try {
//     // console.log("req.params.postId::::::::",req.params.postId);
//     const post = await Post.findOne(
//       { where: { id: req.params.postId }});
//     if (!post) {
//       return res.status(403).send('게시글이 존재하지 않습니다.');
//     }
//     await post.addLikers(req.user.id);
//     res.json({ PostId: post.id, UserId: req.user.id });
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// });

// router.delete('/:postId/like', isLoggedIn, async (req, res, next) => { // DELETE /post/1/like
//   try {
//     const post = await Post.findOne({ where: { id: req.params.postId }});
//     if (!post) {
//       return res.status(403).send('게시글이 존재하지 않습니다.');
//     }
//     await post.removeLikers(req.user.id);
//     res.json({ PostId: post.id, UserId: req.user.id });
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// });

// router.get('/:postId', async (req, res, next) => {
//   try {
   
//         const ha = parseInt(req.params.postId);

//         // console.log("ha:",ha);
      
//     const post = await Post.findOne({
//       where: { id:  ha },
//       include: [{
//         model: User,
//         attributes: ['id', 'nickname'],
//       }, {
//         model: Image,
//       }, {
//         model: User, // 좋아요 누른 사람
//         as: 'Likers',
//         attributes: ['id'],
//       },
//       {
//         model: Comment,
//         include: [{
//           model: User,
//           attributes: ['id', 'nickname'],
//         }],
//       },
//     ],
//     });
//     // console.log("post:::::",JSON.stringify((post)));
//     res.status(200).json(post);
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// });


// router.patch('/:postId', isLoggedIn, async (req, res, next) => { // PATCH /post/10
//   const hashtags = req.body.recipe.match(/#[^\s#]+/g);
//   try {
//     await Post.update({
//       name: req.body.foodname,
//       content1: req.body.ingre1,
//       content2: req.body.ingre2,
//       content3: req.body.ingre3,
//       recipe: req.body.recipe,
//     }, {
//       where: {
//         id: req.params.postId,
//         UserId: req.user.id,
//       },
//     });
//     const post = await Post.findOne({ where: {id: req.params.postId}});

//     if (hashtags) {
//       const result = await Promise.all(hashtags.map((tag) => Hashtag.findOrCreate({
//         where: { name: tag.slice(1).toLowerCase() },
//       }))); // [[노드, true], [리액트, true]]
//       await post.setHashtags(result.map((v) => v[0]));
//     }
    
//     res.status(200).json({ PostId: parseInt(req.params.postId, 10), name: req.body.foodname,
//       content1: req.body.ingre1,
//       content2: req.body.ingre2,
//       content3: req.body.ingre3,
//       recipe: req.body.recipe, });
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// });



// router.delete('/:postId', isLoggedIn, async (req, res, next) => {
//   try {
//     await Post.destroy({
//    where: {
//       id: req.params.postId,
//       UserId: req.user.id,
//    },
// });
// res.status(200).json({PostId: parseInt(req.params.postId,10 )});
// } catch (error) {
//   console.error(error);
//   next(error);
// }
// });

// router.post('/removecomment/', isLoggedIn, async (req, res, next) => {
//   try {
//         console.log("req.body:::",req.body);
//     const post = await Post.findOne({
//       where: {id: req.body.hi},
//     });
//     // console.log("post:::",JSON.stringify(post));
//     if (!post) {
//       return res.status(403).send('존재하지 않는 게시글 입니다');
//     }
//     const user = await User.findOne({
//       where: {id: req.user.id},
//     });
//     if (!user) {
//       return res.status(403).send("권한이 없습니다");
//     }

//    await Comment.destroy({
//       where: {
//         id: req.body.item,
//         UserId: req.user.id,
//         PostId: req.body.hi,            
//       },
//     });
//     res.status(200).json({PostId:req.body.hi, commentId: req.body.item});
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// });



// module.exports = router;



