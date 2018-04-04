const express = require('express');
const router = express.Router();
const db = require('../../db.js');

router.get('/', (req, res, next) => {
  let sql = `SELECT * FROM posts ORDER BY author_id, created_at desc;`;

  let query = db.query(sql, (err, users) => {
    if (err) {
      console.error('SQL error: ', err);
      return next(err);
    }
    //console.log(users);
    res.status(200).json({
      users
    });
  });
});

router.post('/', (req, res, next) => {
  const post = {
    user_id: req.body.user_id || null,
    body: req.body.body || null,
    title: req.body.title || null
  };

  let sql = `INSERT INTO posts (author_id, body, title)  
            VALUES(${db.escape(post.user_id)}, ${db.escape(post.body)}, ${db.escape(post.title)});`;

  let query = db.query(sql, (err, row) => {
    if (err) {
      console.error('SQL error: ', err);
      return next(err);
    }
    let message = 'post created...';
    if (row.affectedRows == 0) {
      message = 'lacking userid or title';
      console.log(message);
      console.log('affectedRows: ' + row.affectedRows);
      res.status(500).json({
        message
      });
    } else {
      console.log('affectedRows: ' + row.affectedRows);
      res.status(201).json({
        message
      });
    }
  });
});

router.get('/:postId', (req, res, next) => {
  const id = req.params.postId;

  let sql = `SELECT * FROM posts WHERE post_id = ${db.escape(id)};`;

  let query = db.query(sql, (err, post) => {
    if (err) {
      console.error('SQL error: ', err);
      return next(err);
    }
    console.log(post);
    res.status(200).json({
      post
    });
  });
})

router.patch('/:postId', (req, res, next) => {

  const post = {
    post_id: req.params.postId || null,
    body: req.body.body || null,
    title: req.body.title || null
  };

  let sql = `UPDATE posts SET body = ${db.escape(post.body)}, title = ${db.escape(post.title)} WHERE post_id = ${db.escape(post.post_id)}
            ;`;

  let query = db.query(sql, (err, row) => {
    if (err) {
      console.error('SQL error: ', err);
      return next(err);
    }
    let message = 'post updated...';
    if (row.affectedRows == 0) {
      message = 'lacking userid or title';
      console.log(message);
      console.log('affectedRows: ' + row.affectedRows);
      res.status(500).json({
        message
      });
    } else {
      console.log('affectedRows: ' + row.affectedRows);
      res.status(201).json({
        message
      });
    }
  });
})

router.delete('/:postId', (req, res, next) => {
  const id = req.params.postId;

  let sql = `DELETE FROM posts WHERE post_id = ${db.escape(id)};`;

  let query = db.query(sql, (err, post) => {
    if (err) {
      console.error('SQL error: ', err);
      return next(err);
    }
    let message = 'post deleted...';
    if (post.affectedRows == 0) {
      message = 'post not found';
      console.log(message);
      res.status(500).json({
        message: message
      });
    } else {
      console.log(post);
      res.status(200).json({
        message: message
      });
    }
  });
})

module.exports = router;
