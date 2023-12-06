import { useEffect, useState } from "react";

type Post = {
  title: string;
  _id: string;
};

export default function PostGallery() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  async function getPosts() {
    setIsLoading(true)
    const GET_POST_API_URL = "http://localhost:4200/api/posts";
    const data = await fetch(GET_POST_API_URL).then((responce) =>
      responce.json()
    ).catch(()=>{
    setIsLoading(false)

    })
    console.table("data", data);
    setTimeout(() => {
        setIsLoading(false)
    }, 1000);

    setPosts(data);
  }

  useEffect(() => {
    getPosts();
  }, []);
  return posts.length ? (
    <ol className="article-container">
      <li>
        <button className="button" onClick={getPosts}>{isLoading ? 'Loading...' : 'Refresh'}</button>
      </li>
      {posts.map(({ title, _id }) => (
        <li key={_id}>
          <article className="card">
            <p>{title}</p>
          </article>
        </li>
      ))}
    </ol>
  ) : (
    <span>No Post </span>
  );
}
