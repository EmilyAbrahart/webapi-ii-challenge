import React from 'react';

const Post = props => {
	return (
		<div>
			<h3>{props.title}</h3>
			<div>{props.content}</div>
		</div>
	);
};

export default Post;
