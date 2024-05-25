import React, { useEffect, useState } from 'react'
import { type Post, getPosts, } from '../../service/getPosts';

const Post: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getPosts().then((response) => setPosts(response.data.data));
  }, []);


  return (
    <div>
      <div className='mt-6 flex flex-col justify-center items-center gap-1'>
        <h1 className="text-xl font-bold text-gray-700 md:text-2xl">Post</h1>
        {posts.map(post => (
          <div className=' mt-3 p-4 w-64 bg-white rounded-lg shadow-m' key={post.id}>
            <img className="h-full w-full object-cover" src={post.image} alt={post.text} />
            <p className='mt-2 text-gray-800'>{post.text}</p>
            <p className="mt-2 text-xs text-gray-500">By: {post.owner.firstName} {post.owner.lastName}</p>
            <p className='ml-4 text-xs inline-flex items-center font-bold px-2 py-1 bg-orange-200 text-orange-700 rounded-full'>Tags: {post.tags.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Post