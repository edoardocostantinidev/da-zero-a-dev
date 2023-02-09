import React, { Component } from 'react';
import { Post } from './Post'

export class Home extends Component {
    static displayName = Home.name;

    constructor(props) {
        super(props);
        this.state = {
            draftPost: { title: '', content: '' },
            posts: [],
            loading: true,
            message: ''
        };
        this.postNewPost = this.postNewPost.bind(this);
    }

    componentDidMount() {
        this.getPostData();
    }
    async getPostData() {
        const response = await fetch('board/posts');
        const data = await response.json();
        this.setState({ posts: data, loading: false });
    }

    setTitle(title) {
        this.state.draftPost.title = title;
        this.setState({});
    }

    setContent(content) {
        this.state.draftPost.content = content;
        this.setState({});
    }

    async postNewPost(e) {
        e.preventDefault();
        let res = await fetch('board/posts',
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state.draftPost)
            });
        if (res.status == 200) {
            this.setState({ message: 'creato con successo' })
            this.getPostData();
        }
    }

    render() {
        return (
            <div>
                <h1>Board</h1>
                <p>Ecco il riassunto di tutti i post:</p>
                <ul>
                    {this.state.posts.map(post =>
                        <li key={post.title}>
                            <Post>{ post }</Post>
                        </li>
                    )}
                </ul>
                <br></br>
                <div>
                    <h1>Crea post</h1>
                    <form onSubmit={this.postNewPost}>
                        <br></br>
                        <input
                            id="title"
                            type="text"
                            onChange={(e) => this.setTitle(e.target.value)}
                            value={this.state.draftPost.title}
                            placeholder="Titolo"
                        />
                        <br></br>
                        <br></br>
                        <input
                            id="content"
                            type="text"
                            onChange={(e) => this.setContent(e.target.value)}
                            value={this.state.draftPost.content}
                            placeholder="Contenuto"
                        />
                        <br></br>
                        <br></br>
                        <button type="submit">Crea</button>
                    </form>
                    <p>{this.state.message}</p>
                </div>
            </div>

        );
    }
}
