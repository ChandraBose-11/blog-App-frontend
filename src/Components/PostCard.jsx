import React from "react";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  const bubbles = Array.from({ length: 8 });

  return (
    <div className="relative  sm:w-[320px] lg:w-[300px] h-[400px] rounded-2xl shadow-2xl overflow-hidden group transform transition-transform duration-500 hover:scale-105">
      
      {/* Floating bubbles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {bubbles.map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full opacity-20 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 animate-bubble"
            style={{
              width: `${6 + Math.random() * 10}px`,
              height: `${6 + Math.random() * 10}px`,
              left: `${Math.random() * 100}%`,
              bottom: `-${Math.random() * 50}px`,
              animationDuration: `${5 + Math.random() * 5}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></span>
        ))}
      </div>

      {/* Post Image */}
      <Link to={`/post/${post.slug}`}>
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-48 object-cover rounded-t-2xl z-10 relative transition-transform duration-500 group-hover:scale-110"
        />
      </Link>

      {/* Content */}
      <div className="relative z-20 p-5 flex flex-col justify-between h-[200px] bg-white rounded-b-2xl shadow-inner">
        <h2 className="text-lg font-bold line-clamp-2 text-gray-800 bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 animate-gradient-text">
          {post.title}
        </h2>
        <span className="text-sm text-gray-500 italic mt-1">{post.category}</span>

        <Link
          to={`/post/${post.slug}`}
          className="mt-4 py-2 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 text-white text-center font-semibold shadow-lg hover:from-yellow-400 hover:via-orange-400 hover:to-pink-400 transition-all duration-500"
        >
          Read Article
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
