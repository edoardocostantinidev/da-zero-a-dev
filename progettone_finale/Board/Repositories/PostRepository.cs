using Board.Model;

namespace Board.Repositories
{
    public class PostRepository
    {
        private List<Post> _posts = new List<Post>();

        public List<Post> GetPosts() { return _posts; }
        public void AddPost(Post post) { _posts.Add(post); }
    }
}
