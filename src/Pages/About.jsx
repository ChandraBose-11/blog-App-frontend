import React, { useEffect, useState } from "react";

const About = () => {
  const [counters, setCounters] = useState({ posts: 0, tutorials: 0, followers: 0 });

  useEffect(() => {
    const target = { posts: 250, tutorials: 80, followers: 1200 };
    const interval = setInterval(() => {
      setCounters((prev) => {
        const updated = { ...prev };
        let done = true;
        for (let key in prev) {
          if (prev[key] < target[key]) {
            updated[key] = prev[key] + 1;
            done = false;
          }
        }
        if (done) clearInterval(interval);
        return updated;
      });
    }, 10);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 overflow-hidden py-16 px-6">
      {/* Floating bubbles */}
      {[...Array(25)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full opacity-30 bg-gradient-to-r from-purple-400 to-pink-300 w-6 h-6 animate-bounce-slow"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${4 + Math.random() * 6}s`,
          }}
        />
      ))}

      <div className="relative max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl backdrop-blur-md p-10 transition-all duration-500 hover:shadow-purple-300 hover:scale-[1.01]">
        <h1 className="text-5xl font-extrabold text-center text-purple-700 mb-10 animate-fadeIn ">
          About <span className="text-pink-500">Blogger Hunt</span>
        </h1>

        {/* Who We Are */}
        <section className="mb-10 animate-slideUp">
          <p className="text-gray-700 text-lg leading-relaxed">
            <span className="font-semibold text-purple-600">Blogger Hunt</span> is a next-generation blogging platform built for
            creators, developers, and learners. Founded by{" "}
            <span className="font-medium text-pink-500">Chandra Bose</span>, our goal is to create a digital ecosystem
            where anyone can learn, share, and grow through technology and storytelling.
          </p>
        </section>

        {/* Our Story */}
        <section className="bg-purple-50 p-6 rounded-2xl border-l-4 border-purple-400 shadow-sm mb-10 animate-fadeIn delay-100">
          <h2 className="text-2xl font-semibold text-purple-700 mb-3">Our Story</h2>
          <p className="text-gray-700 text-lg">
            It all started as a passion project — a simple idea to document and share coding experiences. 
            Over time, Blogger Hunt evolved into a thriving platform where readers from across the globe 
            exchange ideas, tutorials, and experiences about software, design, and innovation.
          </p>
        </section>

        {/* Mission */}
        <section className="bg-pink-50 p-6 rounded-2xl border-l-4 border-pink-400 shadow-sm mb-10 animate-slideUp delay-200">
          <h2 className="text-2xl font-semibold text-pink-600 mb-3">Our Mission</h2>
          <p className="text-gray-700 text-lg">
            To make technology accessible to everyone by offering high-quality tutorials, honest insights, and
            real-world experiences — encouraging everyone to learn, build, and share their journey.
          </p>
        </section>

        {/* Vision */}
        <section className="bg-blue-50 p-6 rounded-2xl border-l-4 border-blue-400 shadow-sm mb-10 animate-slideUp delay-300">
          <h2 className="text-2xl font-semibold text-blue-700 mb-3">Our Vision</h2>
          <p className="text-gray-700 text-lg">
            Our vision is to become the go-to destination for developers and tech enthusiasts who want to stay ahead in the
            digital age — a space where passion meets innovation.
          </p>
        </section>

        {/* Stats */}
       <section className="relative text-center mt-16 mb-16 animate-zoomIn">
  <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 mb-10 animate-gradient-text">
    Blogger Hunt Growth Stats
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
    {/* Posts */}
    <div className="relative group rounded-2xl p-8 bg-white/30 backdrop-blur-xl shadow-xl border border-purple-200 overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
      <h3 className="text-5xl font-bold text-purple-600 drop-shadow-lg transition-all duration-500 group-hover:scale-110">
        {counters.posts}
      </h3>
      <p className="text-lg mt-2 text-gray-700 font-medium tracking-wide">Posts</p>
      <div className="mt-4 h-1 w-16 mx-auto bg-gradient-to-r from-purple-400 to-pink-400 rounded-full group-hover:w-32 transition-all duration-500"></div>
    </div>

    {/* Tutorials */}
    <div className="relative group rounded-2xl p-8 bg-white/30 backdrop-blur-xl shadow-xl border border-pink-200 overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
      <h3 className="text-5xl font-bold text-pink-500 drop-shadow-lg transition-all duration-500 group-hover:scale-110">
        {counters.tutorials}
      </h3>
      <p className="text-lg mt-2 text-gray-700 font-medium tracking-wide">Tutorials</p>
      <div className="mt-4 h-1 w-16 mx-auto bg-gradient-to-r from-pink-400 to-blue-400 rounded-full group-hover:w-32 transition-all duration-500"></div>
    </div>

    {/* Followers */}
    <div className="relative group rounded-2xl p-8 bg-white/30 backdrop-blur-xl shadow-xl border border-blue-200 overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
      <h3 className="text-5xl font-bold text-blue-500 drop-shadow-lg transition-all duration-500 group-hover:scale-110">
        {counters.followers}
      </h3>
      <p className="text-lg mt-2 text-gray-700 font-medium tracking-wide">Followers</p>
      <div className="mt-4 h-1 w-16 mx-auto bg-gradient-to-r from-blue-400 to-purple-400 rounded-full group-hover:w-32 transition-all duration-500"></div>
    </div>
  </div>
</section>
        {/* Why Choose Us */}
        <section className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-2xl shadow-lg border-l-4 border-teal-400 animate-fadeIn delay-400">
          <h2 className="text-2xl font-semibold text-teal-600 mb-3">Why Choose Blogger Hunt?</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2 text-lg">
            <li>Practical, developer-focused content — no fluff.</li>
            <li>Written by real developers with hands-on experience.</li>
            <li>Engaging discussions and community insights.</li>
            <li>Modern, interactive UI and seamless reading experience.</li>
            <li>Fresh updates on modern frameworks and technologies.</li>
          </ul>
        </section>

        {/* Core Values */}
        <section className="bg-white p-6 rounded-2xl shadow-lg mt-10 border-l-4 border-yellow-400 animate-slideUp delay-500">
          <h2 className="text-2xl font-semibold text-yellow-600 mb-3">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-6 text-lg text-gray-700">
            <div className="bg-yellow-50 p-4 rounded-xl shadow-inner transform hover:scale-105 transition">
              <h3 className="font-bold text-yellow-700 mb-2">🌍 Knowledge Sharing</h3>
              <p>We believe learning is best when shared. Every post sparks curiosity and growth.</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-xl shadow-inner transform hover:scale-105 transition">
              <h3 className="font-bold text-yellow-700 mb-2">💡 Innovation</h3>
              <p>We explore the latest technologies and trends to keep our readers inspired and informed.</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-xl shadow-inner transform hover:scale-105 transition">
              <h3 className="font-bold text-yellow-700 mb-2">🤝 Community</h3>
              <p>We value connection, feedback, and collaboration among creators and readers alike.</p>
            </div>
          </div>
        </section>

        {/* Join Us */}
        <section className="bg-gradient-to-r from-pink-100 via-purple-50 to-blue-100 mt-10 p-6 rounded-2xl shadow-lg animate-fadeIn delay-600">
          <h2 className="text-2xl font-semibold text-purple-700 mb-3">Join the Blogger Hunt Community!</h2>
          <p className="text-gray-700 text-lg">
            Ready to start your journey? Create an account, explore our blogs, and share your own thoughts. Together, we can
            build a creative community where ideas transform into action.
          </p>
        </section>

        {/* Inspirational Quote */}
        <div className="mt-10 text-center bg-gradient-to-r from-purple-200 via-pink-100 to-blue-200 p-6 rounded-2xl shadow-inner animate-zoomIn delay-700">
          <p className="italic text-lg font-semibold text-purple-700">
            “Every great developer you know was once a beginner who never gave up.”
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
