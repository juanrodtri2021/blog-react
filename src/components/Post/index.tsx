import React, { useEffect, useState } from 'react'
import { type Post, getPosts, } from '../../service/getPosts';
import { getTags } from '../../service/getTags';

const Post: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [tags, setTags] = useState<[]>([]);
  const [selectedTag, setSelectedTag] = useState<string>('');

  useEffect(() => {
    getPosts().then((response) => console.log(response));
    getTags().then((response) => console.log(response));
  }, []);

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag);
  };

  console.log(import.meta.env.VITE_SOME_KEY)
  const filteredPosts = selectedTag
    ? posts.filter(post => post.tags.includes(selectedTag))
    : posts

  return (
    <div>
      <div>
        <h2>Tags</h2>
        <ul>
          {tags.map(tag => (
            <li key={tag} onClick={() => handleTagClick(tag)}>
              {tag}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Posts</h2>
        {filteredPosts.map(post => (
          <div key={post.id}>
            <img src={post.image} alt={post.text} />
            <h3>{post.text}</h3>
            <p>By: {post.owner.firstName} {post.owner.lastName}</p>
            <p>Tags: {post.tags.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Post