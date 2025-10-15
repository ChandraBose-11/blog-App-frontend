import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import PostCard from "../Components/PostCard";

const Category = () => {
  const { categoryName } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Convert URL dashes to spaces to match backend category
        const categoryQuery = categoryName.replace(/-/g, " ");
        const res = await fetch(`/api/post/getPosts?category=${categoryQuery}`);
        const data = await res.json();
        setPosts(data.posts);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPosts();
  }, [categoryName]);

  return (
    <div className="max-w-6xl mx-auto px-5 py-12">
      <h1 className="text-4xl font-bold text-center capitalize mb-8">{categoryName.replace(/-/g, " ")}</h1>

      {posts && posts.length > 0 ? (
        <div className="flex flex-wrap gap-5 justify-center">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No posts found in this category.</p>
      )}

      <div className="text-center mt-8">
        <Link to="/" className="text-teal-500 font-semibold hover:underline">
          &larr; Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Category;
