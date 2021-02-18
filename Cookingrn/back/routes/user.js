const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { Op } = require('sequelize');

const { User, Post, Comment, Image } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();


router.get('/', async (req, res, next) => { // GET /user
  try {
    if (req.user) {
      const fullUserWithoutPassword = await User.findOne({
        where: { id: req.user.id },
        attributes: {
          exclude: ['password']
        },
        include: [ 
          {
          model: Post,
          attributes: ['id'],
        },
        {
          model: Post,
          as: 'Followings',
          attributes: ['id'],
        }, 
        // {
        //   model: Post,
        //   as: 'Followers',
        //   attributes: ['id'],
        // }
      ]
      })
      // console.log("fullUserWithoutPassword::::::::::::",JSON.stringify(fullUserWithoutPassword),"enddddddddddddd");
      res.status(200).json(fullUserWithoutPassword);
    } else {
      res.status(200).json(null);
    }
  } catch (error) {
    console.error(error);
   next(error);
  }
});




router.post('/login', isNotLoggedIn, (req, res, next) => {


  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ['password']
        },
        include: [{
          model: Post,
          attributes: ['id'],
        },
        {
          model: Post,
          as: 'Followings',
          attributes: ['id'],
        },  
        // {
        //   model: User,
        //   as: 'Followings',
        //   attributes: ['id'],
        // }, 
        // {
        //   model: Post,
        //   as: 'Followers',
        //   attributes: ['id'],
        // }
      ]
      })
      return res.status(200).json(fullUserWithoutPassword);
    });
  })(req, res, next);
});


router.post('/', isNotLoggedIn, async (req, res, next) => { // POST /user/
  try {
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      }
    });
    if (exUser) {
      return res.status(403).send('이미 사용 중인 아이디입니다.');
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
    });
    res.status(201).send('ok');
  } catch (error) {
    console.error(error);
    next(error); // status 500
  }
});

// router.get('/posts', async (req, res, next) => { // GET /user/1/posts
//   try {

//     if (req.user) {

//       console.log("req.user",req.user);
//       const posts = await Post.findAll({
//         where: { UserId: req.user.id },
//         include: [{
//           model: Image,
//         }, {
//           model: User,
//           attributes: ['id', 'nickname'],
//         }, {
//           model: User,
//           through: 'Like',
//           as: 'Likers',
//           attributes: ['id'],
//         }, {
//           model: Post,
//           as: 'Retweet',
//           include: [{
//             model: User,
//             attributes: ['id', 'nickname'],
//           }, {
//             model: Image,
//           }]
//         }],
//       });
//       console.log("posts:::::::::::::::",JSON.stringify(posts),"endddddddddddddd");
//       res.status(200).json(posts);
//     } else {
//       res.status(404).send('존재하지 않는 사용자입니다.');
//     }
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// });

router.post('/logout', isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('ok');
});

router.patch('/:PostId/follow', isLoggedIn, async (req, res, next) => { // PATCH /user/1/follow
  try {
 
    const post = await Post.findOne({ where: { id: req.params.PostId }});
    if (!post) {
      res.status(403).send('없는 사람을 팔로우하려고 하시네요?');
    }
    await post.addFollowers(req.user.id);
    res.status(200).json({ PostId: parseInt(req.params.PostId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});


router.delete('/:PostId/follow', isLoggedIn, async (req, res, next) => { // DELETE /user/1/follow
  try {
    const post = await Post.findOne({ where: { id: req.params.PostId }});
    if (!post) {
      res.status(403).send('없는 사람을 언팔로우하려고 하시네요?');
    }
    await post.removeFollowers(req.user.id);
    res.status(200).json({ PostId: parseInt(req.params.PostId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;











// const express = require('express');
// const bcrypt = require('bcrypt');
// const passport = require('passport');
// const { Op } = require('sequelize');

// const { User, Post, Comment, Image } = require('../models');
// const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

// const router = express.Router();


// router.get('/', async (req, res, next) => { // GET /user
//   try {
//     if (req.user) {
//       const fullUserWithoutPassword = await User.findOne({
//         where: { id: req.user.id },
//         attributes: {
//           exclude: ['password']
//         },
//         include: [ 
//           {
//           model: Post,
//           attributes: ['id'],
//         },
//         {
//           model: User,
//           as: 'Followings',
//           attributes: ['id'],
//         }, {
//           model: User,
//           as: 'Followers',
//           attributes: ['id'],
//         }]
//       })
//       // console.log("fullUserWithoutPassword::::::::::::",JSON.stringify(fullUserWithoutPassword),"enddddddddddddd");
//       res.status(200).json(fullUserWithoutPassword);
//     } else {
//       res.status(200).json(null);
//     }
//   } catch (error) {
//     console.error(error);
//    next(error);
//   }
// });




// router.post('/login', isNotLoggedIn, (req, res, next) => {
//   passport.authenticate('local', (err, user, info) => {
//     if (err) {
//       console.error(err);
//       return next(err);
//     }
//     if (info) {
//       return res.status(401).send(info.reason);
//     }
//     return req.login(user, async (loginErr) => {
//       if (loginErr) {
//         console.error(loginErr);
//         return next(loginErr);
//       }
//       const fullUserWithoutPassword = await User.findOne({
//         where: { id: user.id },
//         attributes: {
//           exclude: ['password']
//         },
//         include: [{
//           model: Post,
//           attributes: ['id'],
//         }, {
//           model: User,
//           as: 'Followings',
//           attributes: ['id'],
//         }, {
//           model: User,
//           as: 'Followers',
//           attributes: ['id'],
//         }]
//       })
//       return res.status(200).json(fullUserWithoutPassword);
//     });
//   })(req, res, next);
// });


// router.post('/', isNotLoggedIn, async (req, res, next) => { // POST /user/
//   try {
//     const exUser = await User.findOne({
//       where: {
//         email: req.body.email,
//       }
//     });
//     if (exUser) {
//       return res.status(403).send('이미 사용 중인 아이디입니다.');
//     }
//     const hashedPassword = await bcrypt.hash(req.body.password, 12);
//     await User.create({
//       email: req.body.email,
//       nickname: req.body.nickname,
//       password: hashedPassword,
//     });
//     res.status(201).send('ok');
//   } catch (error) {
//     console.error(error);
//     next(error); // status 500
//   }
// });

// // router.get('/posts', async (req, res, next) => { // GET /user/1/posts
// //   try {

// //     if (req.user) {

// //       console.log("req.user",req.user);
// //       const posts = await Post.findAll({
// //         where: { UserId: req.user.id },
// //         include: [{
// //           model: Image,
// //         }, {
// //           model: User,
// //           attributes: ['id', 'nickname'],
// //         }, {
// //           model: User,
// //           through: 'Like',
// //           as: 'Likers',
// //           attributes: ['id'],
// //         }, {
// //           model: Post,
// //           as: 'Retweet',
// //           include: [{
// //             model: User,
// //             attributes: ['id', 'nickname'],
// //           }, {
// //             model: Image,
// //           }]
// //         }],
// //       });
// //       console.log("posts:::::::::::::::",JSON.stringify(posts),"endddddddddddddd");
// //       res.status(200).json(posts);
// //     } else {
// //       res.status(404).send('존재하지 않는 사용자입니다.');
// //     }
// //   } catch (error) {
// //     console.error(error);
// //     next(error);
// //   }
// // });

// router.post('/logout', isLoggedIn, (req, res) => {
//   req.logout();
//   req.session.destroy();
//   res.send('ok');
// });

// router.patch('/:userId/follow', isLoggedIn, async (req, res, next) => { // PATCH /user/1/follow
//   try {
//     const user = await User.findOne({ where: { id: req.params.userId }});
//     if (!user) {
//       res.status(403).send('없는 사람을 팔로우하려고 하시네요?');
//     }
//     await user.addFollowers(req.user.id);
//     res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// });

// router.delete('/:userId/follow', isLoggedIn, async (req, res, next) => { // DELETE /user/1/follow
//   try {
//     const user = await User.findOne({ where: { id: req.params.userId }});
//     if (!user) {
//       res.status(403).send('없는 사람을 언팔로우하려고 하시네요?');
//     }
//     await user.removeFollowers(req.user.id);
//     res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// });

// module.exports = router;



