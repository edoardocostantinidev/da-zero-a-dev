using Board.Model;
using Board.Repositories;
using Microsoft.AspNetCore.Mvc;
using System.Xml.Linq;

namespace Board.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BoardController : ControllerBase
    {
        private readonly ILogger<BoardController> _logger;
        private readonly PostRepository _postRepository;
        

        public BoardController(ILogger<BoardController> logger, PostRepository postRepository)
        {
            _logger = logger;
            _postRepository = postRepository;
        }

        [HttpGet("posts")]
        public IEnumerable<Post> GetPosts()
        {
            return _postRepository.GetPosts();
        }

        [HttpPost("posts")]
        public IActionResult Post([FromBody] Post post)
        {
            _postRepository.AddPost(post);
            return StatusCode(200);
        }

        [HttpPost("posts/{postTitle}/comments")]
        public IActionResult PostComments([FromRoute] string postTitle, [FromBody] string comment)
        {
            _postRepository
                .GetPosts()
                .Find((post) => post.Title.Equals(postTitle))?
                .AddComment(comment);
            return StatusCode(200);
        }

        [HttpGet("posts/{postTitle}/comments")]
        public IEnumerable<string>? GetComments([FromRoute] string postTitle)
        {
            return _postRepository
                .GetPosts()
                .Find((post) => post.Title.Equals(postTitle))?
                .Comments;
        }
    }
}