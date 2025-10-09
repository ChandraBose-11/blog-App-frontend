import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Spinner } from "flowbite-react";
import CommentSection from "../Components/CommentSection";


const Postpage = () => {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(false);

        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        console.log("API Response:", data);

        if (!res.ok) throw new Error("Failed to fetch post");

        if (data && data.post) setPost(data.post);
        else throw new Error("Post not found");
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postSlug]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );

  if (error || !post)
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        Failed to load post 😢
      </div>
    );

  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
        {post.title}
      </h1>

      <Link to={`/search?category=${post.category}`} className="self-center mt-5">
        <Button color="gray" pill size="xs">{post.category}</Button>
      </Link>

      <img
        src={post.image}
        alt={post.title}
        className="mt-10 p-3 max-h-[600px] w-full object-cover"
      />

      <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
        <span>{post.createdAt && new Date(post.createdAt).toLocaleDateString("en-IN")}</span>
        <span className="italic">{post.content ? (post.content.length / 1000).toFixed(0) : 1} mins read</span>
      </div>

      <div
        className="p-3 max-w-2xl mx-auto w-full post-content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      <CommentSection postId={post._id}/>
    </main>
  );
};

export default Postpage;
