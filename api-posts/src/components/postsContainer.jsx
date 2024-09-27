import React from 'react';
import axios from 'axios';
import Post from './post';

export default class PostContainer extends React.Component {
	state = {
		posts: [],
		errorMessage: ''
	};

	componentDidMount() {
		axios
			.get('http://localhost:3000/api/posts/')
			.then(res => {
				this.setState({ posts: res.data });
			})
			.catch(error => {
				this.setState({ errorMessage: error });
			});
	}

	render() {
		return (
			<div>
				<div>
					{this.state.posts.map(post => (
						<Post {...post} />
					))}
				</div>
			</div>
		);
	}
}
