const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Handling GET request from friendFollowersList'
  });
});

router.post('/', (req, res, next) => {
  res.status(201).json({
    message: 'new relationship created'
  });
});

router.get('/:relationshipId', (req, res, next) => {
  const relationshipId = req.params.relationshipId;
  res.status(200).json({
    message: 'Handling GET request for: ' + relationshipId
  });
});

router.patch('/:relationshipId', (req, res, next) => {
  const relationshipId = req.params.relationshipId;
  res.status(200).json({
    message: 'updating relationship with id: ' + relationshipId
  });
});

router.delete('/:relationshipId', (req, res, next) => {
  const relationshipId = req.params.relationshipId;
  res.status(200).json({
    message: 'deleting relationship with id: ' + relationshipId
  });
});

module.exports = router;