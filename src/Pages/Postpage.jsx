import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Spinner } from "flowbite-react";
import CommentSection from "../Components/CommentSection";
import PostCard from "../components/PostCard";


const Postpage = () => {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);

  const [recentPosts, setRecentPosts] = useState([]);
  const [recentLoading, setRecentLoading] = useState(true);

  // Fetch single post
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(false);

        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        // console.log("Single Post API Response:", data);

        if (!res.ok || !data.post) throw new Error("Failed to fetch post");

        setPost(data.post);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postSlug]);

  // Fetch recent posts
  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        setRecentLoading(true);
        const res = await fetch(`/api/post/getposts?limit=4`);
        const data = await res.json();
        // console.log("Recent Posts API Response:", data);

        if (!res.ok) throw new Error("Failed to fetch recent posts");

        // Adjust depending on your API response structure
        setRecentPosts(data.posts || data.post || data || []);
      } catch (err) {
        console.error(err.message);
        setRecentPosts([]);
      } finally {
        setRecentLoading(false);
      }
    };

    fetchRecentPosts();
  }, []);

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
      {/* Post Title */}
      <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
        {post.title}
      </h1>

      {/* Post Category */}
      <Link
        to={`/search?category=${post.category}`}
        className="self-center mt-5"
      >
        <Button color="gray" pill size="xs">
          {post.category}
        </Button>
      </Link>

      {/* Post Image */}
      <img
        src={post.image}
        alt={post.title}
        className="mt-10 p-3 max-h-[600px] w-full object-cover"
      />

      {/* Post Info */}
      <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
        <span>
          {post.createdAt &&
            new Date(post.createdAt).toLocaleDateString("en-IN")}
        </span>
        <span className="italic">
          {post.content ? (post.content.length / 1000).toFixed(0) : 1} mins read
        </span>
      </div>

      {/* Post Content */}
      <div
        className="p-3 max-w-2xl mx-auto w-full post-content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Comment Section */}
      <CommentSection postId={post._id} />

      {/* Recent Articles */}
      <div className="flex flex-col justify-center items-center mb-5 mt-10">
        <h1 className="text-xl mt-5">Recent Articles</h1>

        {recentLoading ? (
          <Spinner size="lg" className="mt-5" />
        ) : recentPosts.length === 0 ? (
          <p className="mt-5 text-gray-500">No recent articles found.</p>
        ) : (
          <div className="flex flex-wrap gap-5 mt-5 justify-center">
            {recentPosts.map((recentPost) => (
              <PostCard key={recentPost._id} post={recentPost} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Postpage;
