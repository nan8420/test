const express = require('express');
const { Op } = require('sequelize');

const { Post, Image, User, Comment } = require('../models');

const router = express.Router();

// router.get('/', async (req, res, next) => { // GET /posts
//   try {
//     const posts = await Post.findAll({
//       limit: 10,
//       order: [
//         ['createdAt', 'DESC'],
//         ['createdAt', 'DESC'],
//       ],
//       include: [{
//         model: User,
//         attributes: ['id', 'nickname'],
//       }, {
//         model: Image,
//       },  {
//         model: User, // 좋아요 누른 사람
//         as: 'Likers',
//         attributes: ['id'],
//       },
//     ],
//     });
//     // console.log("posts::::::::",JSON.stringify(posts),"enddddddd")
//     res.status(200).json(posts);
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// });

router.post('/cookup/postss', async (req, res, next) => {
    try {



   const hi = parseInt(req.query.lastId, 10);


    const posts = await Post.findAll({
      where: {

       
        [Op.or] : [
        {           
        [Op.and] : [
        {           
          [Op.or] : [
             {content1: req.body.ingredients1 },
             {content1: req.body.ingredients2 },
             {content1: req.body.ingredients3 },                                  
          ],
        
        },
        {
          [Op.or] : [
            {content2: req.body.ingredients1 },
            {content2: req.body.ingredients2 },
            {content2: req.body.ingredients3 },                                  
         ],
        }   
        ],

      },
       {
        [Op.and] : [
          {           
            [Op.or] : [
               {content1: req.body.ingredients1 },
               {content1: req.body.ingredients2 },
               {content1: req.body.ingredients3 },                                  
            ],
          
          },
          {
            [Op.or] : [
              {content3: req.body.ingredients1 },
              {content3: req.body.ingredients2 },
              {content3: req.body.ingredients3 },                                  
           ],
          }   
          ]
        
        },
        {
          [Op.and] : [
            {           
              [Op.or] : [
                 {content2: req.body.ingredients1 },
                 {content2: req.body.ingredients2 },
                 {content2: req.body.ingredients3 },                                  
              ],
            
            },
            {
              [Op.or] : [
                {content1: req.body.ingredients1 },
                {content1: req.body.ingredients2 },
                {content1: req.body.ingredients3 },                                  
             ],
            }   
            ]
          
          },
          {
            [Op.and] : [
              {           
                [Op.or] : [
                   {content2: req.body.ingredients1 },
                   {content2: req.body.ingredients2 },
                   {content2: req.body.ingredients3 },                                  
                ],
              
              },
              {
                [Op.or] : [
                  {content3: req.body.ingredients1 },
                  {content3: req.body.ingredients2 },
                  {content3: req.body.ingredients3 },                                  
               ],
              }   
              ]
            
            },
            {
              [Op.and] : [
                {           
                  [Op.or] : [
                     {content3: req.body.ingredients1 },
                     {content3: req.body.ingredients2 },
                     {content3: req.body.ingredients3 },                                  
                  ],
                
                },
                {
                  [Op.or] : [
                    {content1: req.body.ingredients1 },
                    {content1: req.body.ingredients2 },
                    {content1: req.body.ingredients3 },                                  
                 ],
                }   
                ]
              
              },
              {
                [Op.and] : [
                  {           
                    [Op.or] : [
                       {content3: req.body.ingredients1 },
                       {content3: req.body.ingredients2 },
                       {content3: req.body.ingredients3 },                                  
                    ],
                  
                  },
                  {
                    [Op.or] : [
                      {content2: req.body.ingredients1 },
                      {content2: req.body.ingredients2 },
                      {content2: req.body.ingredients3 },                                  
                   ],
                  }   
                  ]
                
                },
        ]
      },
      limit:10,
      offset: hi,
      order: [
        ['createdAt', 'DESC'],
      ],
      include:[{
        model:User,
        attributes: ['id', 'nickname'],
      }, {
        model: Image,
      }, {
        model: User,
        as: 'Likers',
        attributes: ['id'],
      }, ],
    });
   
//  console.log("posts::::::::",JSON.stringify(posts),"enddddddd")
     res.status(200).json(posts)
  } catch (error) {
    console.error(error);
    next(error);
  }
});


router.get('/my/postss', async (req, res, next) => { 
  try {
    const user = await User.findOne({ where: { id: req.user.id}});
    if (user) {
      const where = {};
      if (parseInt(req.query.lastId, 10)) { // 초기 로딩이 아닐 때
        where.id = { [Op.lt]: parseInt(req.query.lastId, 10)}
      } // 21 20 19 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1

      const posts = await user.getPosts({
        where,
        limit: 10,
        order: [
          ['createdAt', 'DESC'],
        ],
        include: [{
          model: Image,
        }, {
          model: User,
          attributes: ['id', 'nickname'],
        }, {
          model: User,
          through: 'Like',
          as: 'Likers',
          attributes: ['id'],
        }, {
          model: Post,
          as: 'Retweet',
          include: [{
            model: User,
            attributes: ['id', 'nickname'],
          }, {
            model: Image,
          }]
        }],
      });
      res.status(200).json(posts);
    } 
    else {
      res.status(404).send('존재하지 않는 사용자입니다.');
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});



// router.get('/', async (req, res, next) => { // GET /posts
//   try {
//     const where = {};
//     if (parseInt(req.query.lastId, 10)) { // 초기 로딩이 아닐 때
//       where.id = { [Op.lt]: parseInt(req.query.lastId, 10)}
//     } // 21 20 19 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1
//     const posts = await Post.findAll({
//       where,
//       limit: 10,
//       order: [
//         ['createdAt', 'DESC'],
//         [Comment, 'createdAt', 'DESC'],
//       ],
//       include: [{
//         model: User,
//         attributes: ['id', 'nickname'],
//       }, {
//         model: Image,
//       }, {
//         model: Comment,
//         include: [{
//           model: User,
//           attributes: ['id', 'nickname'],
//         }],
//       }, {
//         model: User, // 좋아요 누른 사람
//         as: 'Likers',
//         attributes: ['id'],
//       }, {
//         model: Post,
//         as: 'Retweet',
//         include: [{
//           model: User,
//           attributes: ['id', 'nickname'],
//         }, {
//           model: Image,
//         }]
//       }],
//     });
//     res.status(200).json(posts);
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// });


router.get('/related', async (req, res, next) => {
  try {
    const followings = await Post.findAll({
      attributes: ['id'],
      
      include: [
        {
          model: User,
          as: 'Followers',
          attributes: ['id'],
         where: {id: req.user.id}
      }
    ]
    });
    // console.log("followings:::::::",JSON.stringify(followings),"endddddd");
    const where = {
      id: { [Op.in]: followings.map((v) => v.id)}
    };
    console.log("where:::",where);
    // if (parseInt(req.query.lastId, 10)) { // 초기 로딩이 아닐 때
    //   where.id = { [Op.lt]: parseInt(req.query.lastId, 10)}
    // } // 21 20 19 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1
    
    const posts = await Post.findAll({
      where,
      limit: 10,
      order: [
        ['createdAt', 'DESC'],
        [Comment, 'createdAt', 'DESC'],
      ],
      include: [{
        model: User,
        attributes: ['id', 'nickname'],
      }, {
        model: Image,
      }, {
        model: Comment,
        include: [{
          model: User,
          attributes: ['id', 'nickname'],
        }],
      }, {
        model: User, // 좋아요 누른 사람
        as: 'Likers',
        attributes: ['id'],
      }, {
        model: Post,
        as: 'Retweet',
        include: [{
          model: User,
          attributes: ['id', 'nickname'],
        }, {
          model: Image,
        }]
      }],
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;













