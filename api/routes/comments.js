const express = require('express');
const router = express.Router();
const db = require('../../db.js');

router.get('/', (req, res, next) => {
  let sql = `SELECT * FROM comments ORDER BY author_id, post_id, created_at;`;

  let query = db.query(sql, (err, comments) => {
    if (err) {
      console.error('SQL error: ', err);
      return next(err);
    }
    //console.log(users);
    res.status(200).json({
      comments
    });
  });
});

router.post('/', (req, res, next) => {
  const comment = {
    post_id: req.body.post_id || null,
    author_id: req.body.author_id || null,
    body: req.body.body || null
  }; 
  let sql = `INSERT INTO comments (post_id, author_id, body)  
          VALUES(${db.escape(comment.post_id)}, ${db.escape(comment.author_id)}, ${db.escape(comment.body)});`;
  
  let query = db.query(sql, (err, row) => {
    if (err) {
      console.error('SQL error: ', err);
      return next(err);
    }
    let message = 'comment created...';
    if (row.affectedRows == 0) {
      message = 'lacking postId or authorId';
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

router.get('/:commentId', (req, res, next) => {
  const id = req.params.commentId;
  let sql = `SELECT * FROM comments WHERE comment_id = ${id} ORDER BY author_id, post_id, created_at;`;

  let query = db.query(sql, (err, comments) => {
    if (err) {
      console.error('SQL error: ', err);
      return next(err);
    }
    //console.log(users);
    res.status(200).json({
      comments
    });
  });
});

router.patch('/:commentId', (req, res, next) => {
  const comment = {
    comment_id: req.params.commentId || null,
    body: req.body.body || null
  }; 
  let sql = `UPDATE comments SET body = ${db.escape(comment.body)} 
            WHERE comment_id = ${comment.comment_id};`;
  
  let query = db.query(sql, (err, row) => {
    if (err) {
      console.error('SQL error: ', err);
      return next(err);
    }
    let message = 'comment updated...';
    if (row.affectedRows == 0) {
      message = 'comment_id not found';
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

router.delete('/:commentId', (req, res, next) => {
  const id = req.params.commentId;
  let sql = `DELETE FROM comments WHERE comment_id = ${id};`;

  let query = db.query(sql, (err, comments) => {
    if (err) {
      console.error('SQL error: ', err);
      return next(err);
    }
    //console.log(users);
    res.status(200).json({
      message: "User successfully deleted"
    });
  });
});

module.exports = router;