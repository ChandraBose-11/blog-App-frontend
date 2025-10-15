import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostCard from "../Components/PostCard";
import {
  FaLaptopCode,
  FaHeart,
  FaDollarSign,
  FaBookOpen,
  FaFilm,
  FaNewspaper,
} from "react-icons/fa";

const categories = [
  { name: "Technology", icon: <FaLaptopCode />, color: "from-purple-500 to-indigo-600" },
  { name: "Lifestyle", icon: <FaHeart />, color: "from-pink-400 to-red-500" },
  { name: "Business", icon: <FaDollarSign />, color: "from-yellow-400 to-orange-500" },
  { name: "Education", icon: <FaBookOpen />, color: "from-blue-400 to-blue-700" },
  { name: "Entertainment", icon: <FaFilm />, color: "from-purple-400 to-pink-400" },
  { name: "News", icon: <FaNewspaper />, color: "from-red-500 to-red-700" },
];

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/post/getPosts?startIndex=0&limit=8");
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);

  const bubbleColors = ["#A855F7", "#EC4899", "#3B82F6"]; // gradient colors for bubbles

  return (
    <div className="relative min-h-screen overflow-hidden bg-white">

      {/* Floating Gradient Bubbles */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-50 animate-bubble"
            style={{
              width: `${15 + Math.random() * 30}px`,
              height: `${15 + Math.random() * 30}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`,
              background: `linear-gradient(135deg, ${bubbleColors[i % bubbleColors.length]}, ${bubbleColors[(i+1) % bubbleColors.length]})`
            }}
          />
        ))}
      </div>
 <section className="hero-section relative w-full h-[90vh] flex flex-col justify-center items-center text-center overflow-hidden">

      {/* Top-to-Bottom Bubbles */}
      <div className="bubbles absolute w-full h-full pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <span
            key={i}
            className="bubble"
            style={{
              width: `${Math.random() * 25 + 15}px`,
              height: `${Math.random() * 25 + 15}px`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 8 + 6}s`,
              animationDelay: `${Math.random() * 5}s`,
              backgroundColor: `rgba(55, 65, 81, 0.4)`, // dark bubble color for contrast
            }}
          ></span>
        ))}
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-2xl px-4">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-black mb-6 animate-float">
          Welcome to Blogger Hunt
        </h1>
        <p className="text-lg text-black mb-6 animate-slideFade">
          Explore trends in technology, lifestyle, business, education, entertainment, and news. Learn, grow, and stay updated with our curated posts.
        </p>
        <Link
          to="/search"
          className="hero-button inline-block bg-white text-[#dd4ea1] font-semibold px-6 py-3 rounded-lg shadow-lg animate-pulseButton"
        >
          View All Posts
        </Link>
      </div>
    </section>

      {/* Categories Section */}
      <section className="max-w-6xl mx-auto py-16 px-5">
        <h2 className="text-3xl font-bold text-center mb-12 animate-gradient-text bg-clip-text text-transparent bg-gradient-to-br from-purple-500 via-pink-400 to-blue-400">
          Explore Categories
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={`/category/${cat.name.toLowerCase().replace(/\s+/g, "-")}`}
              className={`flex flex-col items-center justify-center p-6 rounded-2xl text-white font-semibold shadow-lg backdrop-blur-md bg-opacity-20 hover:scale-110 category-hover bg-gradient-to-br ${cat.color}`}
            >
              <div className="text-3xl mb-2 animate-bounce">{cat.icon}</div>
              {cat.name}
            </Link>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="w-full bg-white py-20 px-5">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">About Blogger Hunt</h2>
          <p className="text-gray-700 mb-10">
            Blogger Hunt is your go-to platform to stay updated with the latest trends in technology, lifestyle, business, education, entertainment, and news. We provide curated posts to help you learn, grow, and stay informed.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="p-6 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl text-white shadow-lg hover:scale-105 about-card">
              <h3 className="font-semibold text-xl mb-2">Curated Content</h3>
              <p>Hand-picked posts to save you time and keep you updated.</p>
            </div>
            <div className="p-6 bg-gradient-to-br from-pink-400 to-red-500 rounded-xl text-white shadow-lg hover:scale-105 about-card">
              <h3 className="font-semibold text-xl mb-2">Diverse Categories</h3>
              <p>Technology, Lifestyle, Business, Education, Entertainment, and News.</p>
            </div>
            <div className="p-6 bg-gradient-to-br from-blue-400 to-blue-700 rounded-xl text-white shadow-lg hover:scale-105 about-card">
              <h3 className="font-semibold text-xl mb-2">Learn & Grow</h3>
              <p>Get insights, tips, and knowledge to grow in your field.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="w-full px-5 py-16">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-12 max-w-[1400px] mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-br from-purple-500 via-pink-400 to-blue-400 animate-gradient-text">
              Recent Posts
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {posts.map((post, idx) => (
                <div
                  key={post._id}
                  className="transform transition-transform duration-500 hover:scale-105 animate-zoomIn stagger-fade"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <PostCard post={post} />
                </div>
              ))}
            </div>
            <Link
              to="/search"
              className="text-lg text-purple-600 hover:underline text-center mt-8 block"
            >
              View All Posts
            </Link>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
