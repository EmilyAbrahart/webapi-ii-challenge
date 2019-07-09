const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {})

router.get('/:id', (req, res) => {
  const id = req.params.id;
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