import React from "react";
import { Link } from "react-router-dom";
const PostCard = ({ post }) => {
  const bubbles = Array.from({ length: 6 }); // 6 bubbles
  return (
    <div className="relative w-full sm:w-[320px] lg:w-[300px] h-[380px] bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-xl overflow-hidden shadow-2xl hover:scale-105 transform transition-transform duration-500 group">
      {/* Floating bubbles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {bubbles.map((_, i) => (
          <span
            key={i}
            className="absolute w-3 h-3 bg-white rounded-full opacity-50 animate-bubble"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: `-${Math.random() * 50}px`,
              width: `${Math.random() * 8 + 4}px`,
              height: `${Math.random() * 8 + 4}px`,
              animationDuration: `${Math.random() * 5 + 5}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></span>
        ))}
      </div>

      {/* Image */}
      <Link to={`/post/${post.slug}`}>
        <div className="h-[200px] w-full overflow-hidden rounded-t-xl relative">
          <img
            src={post.image}
            alt="post cover"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col justify-between h-[180px]">
        <div>
          <p className="text-white text-lg font-extrabold line-clamp-2 transition-colors duration-300 group-hover:text-yellow-300">
            {post.title}
          </p>
          <span className="text-sm text-gray-200 italic mt-1">
            {post.category}
          </span>
        </div>

        <Link
          to={`/post/${post.slug}`}
          className="mt-4 py-2 text-center rounded-full bg-white text-blue-600 font-semibold shadow-lg hover:bg-yellow-300 hover:text-purple-800 transition-colors duration-300"
        >
          Read Article
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
