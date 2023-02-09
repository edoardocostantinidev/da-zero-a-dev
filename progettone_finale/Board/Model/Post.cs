namespace Board.Model
{
    public class Post
    {
        public Post(string title, string content)
        {
            Title = title;
            Content = content;
        }

        public string Title { get; set; }
        public string Content { get; set; }
        public List<string>? Comments { get; set; }

        public void AddComment(string comment)
        {
            if( Comments == null)
            {
                Comments = new List<string>();
            }

            Comments.Add(comment);
        }
    }
}
