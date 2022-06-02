const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');
// const withAuth = require('../../utils/auth');


router.get('/', (req, res) => {
    console.log(req.session);

    Post.findAll({
        where: {
          // use the ID from the session
          user_id: req.session.user_id
            
        },
        
        // attributes: [
        //   'id',
        //   'post_body',
        //   'title',
        //   'created_at',
        // ],
        // include: [
        //   {
        //     model: Comment,
        //     attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        //     include: {
        //       model: User,
        //       attributes: ['username']
        //     }
        //   },
        //   {
        //     model: User,
        //     attributes: ['username']
        //   }
        // ]
      })
        .then(dbPostData => {
          // serialize data before passing to template
          console.log({dbPostData})
          const posts = dbPostData.map(post => post.get({ plain: true }));
          console.log(posts, 'these are the posts')
          res.render('dashboard', { posts, loggedIn: true });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });  
    });

router.get('/edit/:id', (req, res) => {
    Post.findOne(req.params.id, {
        attributes: [
          'id',
          'post_body',
          'title',
          'created_at',
        ],
        include: [
          {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
              model: User,
              attributes: ['username']
            }
          },
          {
            model: User,
            attributes: ['username']
          }
        ]
      })
        .then(dbPostData => {
          if (dbPostData) {
            const post = dbPostData.get({ plain: true });
            
            res.render('edit-post', {
              post,
              loggedIn: true
            });
          } else {
            res.status(404).end();
          }
        })
        .catch(err => {
          res.status(500).json(err);
        });
})

module.exports = router;