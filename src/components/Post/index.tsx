import React, { useEffect, useState } from 'react'
import { type Post, getPosts, getCommentsPost, } from '../../service/getPosts';
import { useNavigate } from 'react-router-dom';

const Post: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchTag, setSearchTag] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    loadPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadPosts = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const response = await getPosts(page, 10);
      setPosts(prevPosts => [...prevPosts, ...response.data.data]);
      setPage(prevPage => prevPage + 1);
      if (response.data.length < 10) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error loading posts:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !loading) {
        loadPosts();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTag(e.target.value.toLowerCase());
  };

  const filteredPosts = searchTag
    ? posts.filter(post => post.tags.some(tag => tag.toLowerCase().includes(searchTag)))
    : posts;

  const handleGetComments = (id: string) => navigate(`/post/${id}`);

  return (
    <div>
      <div className='flex flex-col justify-center w-full p-5'>
        <input
          className='block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          type="text"
          value={searchTag}
          onChange={handleSearchChange}
          placeholder="Buscar por tag"
        />
      </div>
      <div className='mt-6 flex flex-col md:flex-row md:flex-wrap justify-center items-center gap-5' >
        <h1 className="text-4xl font-bold text-gray-700 w-full text-center">Post</h1>
        {filteredPosts.map(post => (
          <div className='mt-3 p-4 w-64 md:w-1/2 lg:w-1/3 bg-white rounded-lg shadow-m' onClick={() => handleGetComments(post.id)} key={post.id}>
            <img className="h-48 xl:h-80 w-full overflow-hidden object-cover" src={post.image} alt={post.text} />
            <p className='mt-2 text-gray-800'>{post.text}</p>
            <p className="mt-2 text-xs text-gray-500">By: {post.owner.firstName} {post.owner.lastName}</p>
            <p className='ml-4 text-xs inline-flex items-center font-bold px-2 py-1 bg-orange-200 text-orange-700 rounded-full'>Tags: {post.tags.join(', ')}</p>
          </div>
        ))}
      </div>
      {loading && <p>Loading more posts...</p>}
    </div>
  )
}

export default Post