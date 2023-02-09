import React, { Component } from 'react';

export class Post extends Component {
    static displayName = Post.name;

    constructor(props) {
        super(props);
        this.state = { 
            title: props.children.title,
            content: props.children.content,
            comments: [],
            draftComment: ''
        }

        this.postNewComment = this.postNewComment.bind(this);

    }

    componentDidMount() {
        this.loadComments()
    }

    setComment(comment) {
        this.setState({draftComment: comment})
    }

    async loadComments() {
        const res = await fetch(`board/posts/${this.state.title}/comments`)
        const response = await res.json();
        console.log(response);
        this.setState({ comments: response ?? [] })
    }

    async postNewComment(e) {
        e.preventDefault();
        let res = await fetch(`board/posts/${this.state.title}/comments`,
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state.draftComment)
            });
        if (res.status == 200) {
            this.setState({ message: 'creato commento con successo' })
            this.loadComments();
        }
    }

    render() {
        return (
            <div>
                <h2>{this.state.title}</h2>
                <p>{this.state.content}</p>
                <div>
                    <p>Commenti:</p>
                    <ul>
                        {this.state.comments.map(comment =>
                            <li key={comment}>
                                <p>{comment}</p>
                            </li>
                        )}
                    </ul>
                    <form onSubmit={this.postNewComment}>
                        <input
                            id="comment"
                            type="text"
                            onChange={(e) => this.setComment(e.target.value)}
                            value={this.state.draftComment}
                            placeholder="Commenta qui"
                        />
                        <br></br>
                        <br></br>
                        <button type="submit">Crea</button>
                    </form>
                </div>
             </div>
        )
    }
}