import React, { useState } from 'react';
import { Play, Youtube, Eye, Video, ArrowRight, Star } from 'lucide-react';

export default function Gallery() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const projectVideos = [
    {
      id: 1,
      url: "https://www.youtube.com/embed/UqVlilFyBgE",
      title: "Premium Residential Project Tour",
      description: "Take a virtual tour of our premium residential development with modern amenities and luxury finishes.",
      category: "Residential",
      featured: true
    },
    {
      id: 2,
      url: "https://www.youtube.com/embed/rfI6MRoHaWE",
      title: "Commercial Hub Development",
      description: "Explore our state-of-the-art commercial development in the heart of the city's business district.",
      category: "Commercial"
    },
    {
      id: 3,
      url: "https://www.youtube.com/embed/_DA7hIm5tJM",
      title: "Luxury Villa Showcase",
      description: "Discover the elegance and sophistication of our luxury villa collection with premium amenities.",
      category: "Luxury"
    },
    {
      id: 4,
      url: "https://www.youtube.com/embed/--Cd2r4LEbM",
      title: "Eco-Friendly Township",
      description: "Experience sustainable living in our eco-friendly township development with green initiatives.",
      category: "Eco-Friendly"
    },
    {
      id: 5,
      url: "https://www.youtube.com/embed/tww3iq5OtKU",
      title: "Gated Community Features",
      description: "Learn about the premium amenities in our exclusive gated community including security and recreation.",
      category: "Gated Community"
    },
    {
      id: 6,
      url: "https://www.youtube.com/embed/i7XiuqmUx9M",
      title: "Construction Progress Update",
      description: "Latest progress update on our ongoing construction projects with timeline and quality updates.",
      category: "Progress Update"
    },
    {
      id: 7,
      url: "https://www.youtube.com/embed/hijFsJg9qoE",
      title: "Location Advantages",
      description: "Discover the strategic location benefits of our developments and connectivity advantages.",
      category: "Location"
    },
    {
      id: 8,
      url: "https://www.youtube.com/embed/y2scrZrjcKk",
      title: "Investment Opportunities",
      description: "Explore lucrative investment opportunities in real estate with guaranteed returns.",
      category: "Investment"
    }
  ];

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
      {/* Hero Section */}
      <div className="w-full bg-gradient-to-r from-amber-600 to-yellow-500 px-6 py-20 text-center relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-white/10 bg-[radial-gradient(circle_at_25%_25%,rgba(255,255,255,0.1)_2px,transparent_2px)] bg-[length:60px_60px]"></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex items-center justify-center mb-8">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 mr-4">
              <Video className="w-16 h-16 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight font-heading">
              Video Gallery
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-amber-100 max-w-4xl mx-auto leading-relaxed mb-8 font-inter">
            Explore our properties through immersive video tours and discover the quality and professionalism that defines Satyamsai Real Estate.
          </p>
          <div className="flex items-center justify-center gap-2 text-white/90">
            <Star className="w-5 h-5 fill-current" />
            <span className="text-lg font-medium font-inter">{projectVideos.length} Premium Video Tours</span>
            <Star className="w-5 h-5 fill-current" />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-10 mb-16 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Video Tours', value: '8+', icon: Video },
            { label: 'Projects Featured', value: '15+', icon: Star },
            { label: 'Happy Clients', value: '500+', icon: Eye },
            { label: 'Years Experience', value: '10+', icon: Youtube }
          ].map((stat, index) => (
            <div key={index} className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 border border-amber-200">
              <stat.icon className="w-8 h-8 text-amber-600 mx-auto mb-3" />
              <div className="text-2xl md:text-3xl font-bold text-amber-700 font-heading">{stat.value}</div>
              <div className="text-sm md:text-base text-gray-600 font-medium font-inter">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Video Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-medium mb-4 font-inter">
            <Star className="w-4 h-4 fill-current" />
            Featured Tour
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6 tracking-tight font-heading">
            Premium Project Showcase
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-inter">
            Start your journey with our most popular project tour, showcasing the finest in modern living
          </p>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-amber-200 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2">
          <div className="relative group cursor-pointer" onClick={() => handleVideoClick(projectVideos[0])}>
            <div className="relative pb-[56.25%] h-0">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={projectVideos[0].url}
                title={projectVideos[0].title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
              <div className="bg-amber-600 hover:bg-amber-700 text-white rounded-full p-6 transform scale-110 transition-all duration-200 shadow-2xl">
                <Play className="w-12 h-12 fill-current ml-1" />
              </div>
            </div>
          </div>
          
          <div className="p-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-medium font-inter">
                {projectVideos[0].category}
              </span>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 font-inter">
                <Star className="w-3 h-3 fill-current" />
                Featured
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 font-heading">{projectVideos[0].title}</h3>
            <p className="text-gray-600 text-lg leading-relaxed mb-6 font-inter">{projectVideos[0].description}</p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-gray-500">
                <Youtube className="w-5 h-5 text-red-500" />
                <span className="font-medium font-inter">YouTube Premium Tour</span>
              </div>
              <button 
                onClick={() => handleVideoClick(projectVideos[0])}
                className="bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-700 hover:to-yellow-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-inter"
              >
                <Play className="w-5 h-5" />
                Watch Full Tour
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Video Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6 tracking-tight font-heading">
            Complete Video Collection
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-inter">
            Browse through all our project videos and virtual tours to find your perfect investment
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {projectVideos.slice(1).map((video) => (
            <div key={video.id} className="group">
              <div 
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-amber-200 transform hover:-translate-y-2 cursor-pointer"
                onClick={() => handleVideoClick(video)}
              >
                <div className="relative">
                  <div className="relative pb-[56.25%] h-0 bg-gradient-to-br from-amber-100 to-yellow-100">
                    <iframe
                      className="absolute top-0 left-0 w-full h-full rounded-t-2xl"
                      src={video.url}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  
                  {/* Category badge */}
                  <div className="absolute top-3 left-3">
                    <span className="bg-amber-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                      {video.category}
                    </span>
                  </div>
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-t-2xl">
                    <div className="bg-amber-600 hover:bg-amber-700 text-white rounded-full p-4 transform scale-110 transition-all duration-200 shadow-xl">
                      <Play className="w-8 h-8 fill-current ml-0.5" />
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="flex items-center gap-2">
                        <Video className="w-4 h-4" />
                        <span className="font-semibold text-sm">Watch Video Tour</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-amber-600 transition-colors duration-200 font-heading">
                    {video.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4 font-inter">
                    {video.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-500">
                      <Youtube className="w-4 h-4 mr-2 text-red-500" />
                      <span className="font-medium font-inter">HD Video Tour</span>
                    </div>
                    <button className="bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-700 hover:to-yellow-600 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-inter">
                      <Eye className="w-4 h-4" />
                      Watch
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="bg-gradient-to-r from-amber-600 to-yellow-500 rounded-3xl p-8 md:p-12 text-center shadow-2xl relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full bg-white/20 bg-[radial-gradient(circle_at_75%_25%,rgba(255,255,255,0.3)_2px,transparent_2px)] bg-[length:40px_40px]"></div>
          </div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-heading">
              Ready to Explore More?
            </h2>
            <p className="text-xl text-amber-100 mb-8 max-w-3xl mx-auto leading-relaxed font-inter">
              Visit our projects page to see detailed information about our developments or contact us for a personal tour and investment consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/projects"
                className="bg-white text-amber-600 hover:bg-amber-50 px-8 py-4 rounded-2xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2 font-inter"
              >
                <ArrowRight className="w-5 h-5" />
                View All Projects
              </a>
              <a
                href="/contact"
                className="bg-amber-700 hover:bg-amber-800 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2 border-2 border-amber-500 font-inter"
              >
                <Eye className="w-5 h-5" />
                Schedule a Tour
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {showModal && selectedVideo && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto animate-slideUp">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-amber-600 to-yellow-500 text-white p-6 rounded-t-3xl">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Video className="w-8 h-8" />
                  <div>
                    <h3 className="text-2xl font-bold font-heading">{selectedVideo.title}</h3>
                    <p className="opacity-90 text-amber-100 font-inter">{selectedVideo.category} • HD Video Tour</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-white/80 hover:text-white bg-white/20 hover:bg-white/30 p-3 rounded-2xl transition-all duration-200 transform hover:scale-110"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 lg:p-8">
              {/* Video Player */}
              <div className="relative pb-[56.25%] h-0 mb-8 rounded-2xl overflow-hidden shadow-2xl">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={selectedVideo.url}
                  title={selectedVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              {/* Video Info */}
              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-6 border border-amber-200 mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-medium font-inter">
                    {selectedVideo.category}
                  </span>
                  <Youtube className="w-5 h-5 text-red-500" />
                  <span className="text-sm text-gray-600 font-inter">YouTube Premium Tour</span>
                </div>
                <h4 className="text-2xl font-bold text-gray-800 mb-3 font-heading">{selectedVideo.title}</h4>
                <p className="text-gray-700 leading-relaxed text-lg font-inter">{selectedVideo.description}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gradient-to-r from-gray-600 to-gray-500 hover:from-gray-700 hover:to-gray-600 text-white py-3 px-6 rounded-2xl font-semibold transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl font-inter"
                >
                  Close
                </button>
                <a
                  href="/contact"
                  className="flex-1 bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-700 hover:to-yellow-600 text-white py-3 px-6 rounded-2xl font-semibold transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 font-inter"
                >
                  <ArrowRight className="w-5 h-5" />
                  Get More Info
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
