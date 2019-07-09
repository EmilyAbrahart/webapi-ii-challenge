const router = require('express').Router();
const Post = require('../data/db');

// Get all posts
router.get('/', (req, res) => {
  Post.find()
  .then(data => {
    res.status(200).json(data);
  })
  .catch(error => {
    res
    .status(500)
    .json({error: "The posts information could not be retrieved."})
  })
})

// Get post by ID
router.get('/:id', (req, res) => {
  const id = req.params.id;
  Post.findById(id)
  .then(data => {
    if (data) {
      res.status(200).json(data);
    } else {
      res
        .status(404)
        .json({ message: 'The post with the specified ID does not exist.' });
    }
  })
  .catch(error => {
    res
      .status(500)
      .json({ error: 'The post could not be retrieved.' });
  });
});

router.get('/:id/comments', (req, res) => {
  const id = req.params.id;
})

router.post('/', (req, res) => {});

router.post('/:id/comments', (req, res) => {
  const id = req.params.id;
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
})

module.exports = router;