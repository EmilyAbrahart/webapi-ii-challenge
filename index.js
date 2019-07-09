const express = require('express');
const server = express();
const postsRoutes = require('./posts/postsRoutes');

server.use(express.json());
server.use('/api/posts', postsRoutes);

server.listen(3000, () => {
  console.log('listening on port 3000')
});