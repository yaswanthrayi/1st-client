import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="w-screen min-h-screen bg-gray-100 overflow-x-hidden">
      {/* Fullscreen Hero */}
      <div className="w-full min-h-screen flex items-center justify-center px-4 bg-white">
        <div className="w-full max-w-6xl bg-white/90 rounded-xl shadow-xl px-8 py-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-800 mb-6 tracking-tight">
            Your Dream Land is here!
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
            The simple way to get to your dreamland is by choosing the right one.
            <br />
            <span className="text-blue-700 font-semibold">
              We help you in choosing the right approved plots.
            </span>
          </p>
        </div>
      </div>

      {/* Google Form Full Width */}
      <div className="w-screen px-4 mb-16 flex justify-center">
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSccICcCwNmuQcB59FbC2i0BNkKXPzk9ePAj_wPDDXp8s7cGLw/viewform?embedded=true"
          width="100%"
          height="700"
          frameBorder="0"
          title="Contact Form"
          className="rounded-xl border border-gray-300 shadow-lg bg-white w-full max-w-screen"
        >
          Loading…
        </iframe>
      </div>

      {/* Who We Are Section */}
      <div className="w-full bg-white px-6 py-16 text-center">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-6">Who We Are</h2>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-8">
            We are a new organization in the market associated with many developers,
            those are plotted land development firms and the fastest-growing real estate companies.
            We have successfully completed over 200 plotted land development projects. We believe that
            businesses should exist as part of a healthy community in order to serve that community.
            We provide our customers an ideal opportunity to make safe and secure long-term savings
            by owning a piece of land and thereby create true, long-term wealth for their families.
          </p>
          <button
            onClick={() => navigate("/about")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-base px-6 py-3 rounded-lg transition duration-300"
          >
            Read More
          </button>
        </div>
      </div>

      {/* Ongoing Project */}
      <div className="w-screen mb-16 px-4">
        <div className="relative rounded-2xl overflow-hidden shadow-lg border border-blue-600 max-w-6xl mx-auto">
          <img
            src="/Current-pr.jpg"
            alt="Ongoing Project"
            className="w-full h-80 object-cover"
          />
          <div className="absolute top-4 left-4 bg-blue-600 text-white px-5 py-2 rounded-full text-lg font-semibold shadow">
            Ongoing Project
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-6 py-4">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 drop-shadow">
              Ongoing Premium Venture
            </h3>
            <p className="text-sm md:text-lg text-blue-100 drop-shadow">
              Discover our latest project, blending modern amenities with nature for the perfect investment and living experience.
            </p>
          </div>
        </div>
      </div>

      {/* Google Map */}
      <div className="w-full flex justify-center mt-16 mb-20 px-4">
        <iframe
          title="Satyamsai Real Estate Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.026216861471!2d80.5935817!3d16.4961363!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35fb8754410227%3A0x4bcbbfa3f0318a26!2sSatyamsai%20Real%20Estate!5e0!3m2!1sen!2sin!4v1721720000000!5m2!1sen!2sin"
          width="100%"
          height="350"
          style={{
            border: 0,
            borderRadius: "1rem",
            minWidth: "300px",
            maxWidth: "1200px",
          }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="shadow-lg"
        ></iframe>
      </div>
    </div>
  );
}
