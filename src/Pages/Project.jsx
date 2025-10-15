import React, { useEffect, useState } from "react";
import PostCard from "../Components/PostCard" // your existing PostCard
import { Spinner } from "flowbite-react";

const Project = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fetch all posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/post/getposts");
        const data = await res.json();
        if (!res.ok) throw new Error("Failed to fetch posts");
        setPosts(data.posts || data.post || []);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100">
        <Spinner size="xl" />
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500 bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100">
        Failed to load posts 😢
      </div>
    );

  return (
    <div className="relative  min-h-screen py-12 px-6 bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 overflow-hidden">
      {/* Floating background bubbles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full opacity-30 bg-gradient-to-r from-purple-400 to-pink-300 animate-bubble"
          style={{
            width: `${10 + Math.random() * 30}px`,
            height: `${10 + Math.random() * 30}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${4 + Math.random() * 6}s`,
          }}
        />
      ))}

      <h1 className="text-5xl font-extrabold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 animate-gradient-text">
        All Articles
      </h1>

      {posts.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No posts available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {posts.map((post) => (
            <div
              key={post._id}
              className="transform transition-transform duration-500 hover:scale-105 animate-zoomIn"
            >
              <PostCard post={post} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Project;
