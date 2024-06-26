import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCommentsPost } from '../../service/getPosts';
import { useNavigate } from 'react-router-dom';


interface Owner {
  id: string;
  title: string;
  firstName: string;
  lastName: string;
  picture: string;
}

interface Comment {
  id: string;
  message: string;
  owner: Owner;
  post: string;
  publishDate: string;
}


const DetailPost = () => {
  const { id: postId } = useParams<string>();
  const [comments, setComments] = useState<Comment[]>([]);
  const navigate = useNavigate();


  useEffect(() => {
    getCommentsPost(postId).then(response => {
      setComments(response.data.data)
      console.log(response.data.data)
    });
  }, [postId]);

  if (comments.length === 0) {
    navigate('/')
  }

  return (
    <section className="relative min-h-screen flex flex-col justify-center bg-slate-50 overflow-hidden antialiased">
      <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-24">
        <div className="flex flex-col justify-center divide-y divide-slate-200 [&>*]:py-16">
          <div className="w-full max-w-3xl mx-auto">
            {comments.map(comment => (
              <div key={comment.id} className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:ml-[8.75rem] md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                <div className="relative">
                  <div className="md:flex items-center md:space-x-4 mb-3">
                    <div className="flex items-center space-x-4 md:space-x-2 md:space-x-reverse">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow md:order-1">
                        <svg className="fill-emerald-500" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                          <path d="M8 0a8 8 0 1 0 8 8 8.009 8.009 0 0 0-8-8Zm0 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z" />
                        </svg>
                      </div>
                      <time className="text-sm font-medium text-indigo-500 md:w-28">{comment.publishDate}</time>
                    </div>
                    <div className="text-slate-500 ml-14"><span className="text-slate-900 font-bold">{comment.owner.firstName}</span></div>
                  </div>
                  <div className="bg-white p-4 rounded border border-slate-200 text-slate-500 shadow ml-14 md:ml-44">{comment.message}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailPost;
