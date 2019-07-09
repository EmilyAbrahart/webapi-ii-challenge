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
				.json({ error: 'The posts information could not be retrieved.' });
		});
});

// Get post by ID
router.get('/:id', (req, res) => {
	const id = req.params.id;
	Post.findById(id)
		.then(data => {
			if (data.length > 0) {
				res.status(200).json(data);
			} else {
				res
					.status(404)
					.json({ message: 'The post with the specified ID does not exist.' });
			}
		})
		.catch(error => {
			res.status(500).json({ error: 'The post could not be retrieved.' });
		});
});

router.get('/:id/comments', (req, res) => {
	const id = req.params.id;
	Post.findPostComments(id)
		.then(data => {
			if (data.length > 0) {
				res.status(200).json(data);
			} else {
				res
					.status(404)
					.json({ message: 'The post with the specified ID does not exist.' });
			}
		})
		.catch(error => {
			res.status(500).json({ error: 'The comments could not be retrieved.' });
		});
});

// Add new post
router.post('/', (req, res) => {
	const { title, contents } = req.body;
	if (!title || !contents) {
		res.status(400).json({
			errorMessage: 'Please provide title and contents for the post.'
		});
	} else {
		Post.insert({ title, contents })
			.then(data => {
				Post.findById(data.id).then(data => {
					res.status(201).json(data);
				});
			})
			.catch(error => {
				res.status(500).json({
					error: 'There was an error while saving the post to the database'
				});
			});
	}
});

router.post('/:id/comments', (req, res) => {
	const id = req.params.id;
	const text = req.body;

	if (!text) {
		res
			.status(400)
			.json({ errorMessage: 'Please provide text for the comment.' });
	} else {
		Post.insertComment(text).then();
	}
});

router.delete('/:id', (req, res) => {
	const id = req.params.id;
	Post.remove(id)
		.then(data => {
			if (data === 0) {
				res
					.status(404)
					.json({ message: 'The post with the specified ID does not exist.' });
			} else {
				res.status(200).json({
					message: `Post with ID of ${id} has been deleted successfully`
				});
			}
		})
		.catch(error => {
			res.status(500).json({ error: 'The post could not be removed' });
		});
});

router.put('/:id', (req, res) => {
	const id = req.params.id;
	const { title, contents } = req.body;

	if (!title || !contents) {
		res.status(400).json({
			errorMessage: 'Please provide title and contents for the post.'
		});
	} else {
		Post.update(id, { title, contents })
			.then(data => {
				if (data === 0) {
					res
						.status(404)
						.json({
							message: 'The post with the specified ID does not exist.'
						});
				} else {
					Post.findById(id).then(data => {
						res.status(201).json(data);
					});
				}
			})
			.catch(error => {
				res.status(500).json({
					error: 'There was an error while saving the post to the database'
				});
			});
	}
});

module.exports = router;
