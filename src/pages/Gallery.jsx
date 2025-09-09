import React, { useState, useEffect } from 'react';
import { Play, Youtube, Eye, Video, ArrowRight, Star } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Gallery() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [projectVideos, setProjectVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('videos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Transform database data to match the expected format
      const transformedVideos = data.map((video, index) => ({
        id: video.id,
        url: video.url,
        title: video.title,
        description: video.description,
        category: "Real Estate", // Default category since it's not in the database
        featured: index === 0 // Make the first video featured
      }));
      
      setProjectVideos(transformedVideos);
    } catch (error) {
      console.error('Error fetching videos:', error);
      // Fallback to default videos if database fetch fails
      setProjectVideos([
        {
          id: 1,
          url: "https://www.youtube.com/embed/UqVlilFyBgE",
          title: "Premium Residential Project Tour",
          description: "Take a virtual tour of our premium residential development with modern amenities and luxury finishes.",
          category: "Residential",
          featured: true
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 overflow-x-hidden">
      {/* Hero Section */}
      <div className="w-full bg-gradient-to-br from-orange-800 via-orange-700 to-amber-800 px-4 sm:px-6 py-16 sm:py-20 text-center relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-white/10 bg-[radial-gradient(circle_at_25%_25%,rgba(255,255,255,0.1)_2px,transparent_2px)] bg-[length:60px_60px]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col sm:flex-row items-center justify-center mb-8 gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 shadow-xl">
              <Video className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight drop-shadow-2xl">
              Video Gallery
            </h1>
          </div>
          <p className="text-lg sm:text-xl md:text-2xl text-orange-100 max-w-4xl mx-auto leading-relaxed mb-8 drop-shadow-lg">
            Explore our properties through immersive video tours and discover the quality and professionalism that defines Satyamsai Real Estate.
          </p>
          <div className="flex items-center justify-center gap-2 text-orange-200">
            <Star className="w-5 h-5 fill-current" />
            <span className="text-lg font-medium">{projectVideos.length} Premium Video Tours</span>
            <Star className="w-5 h-5 fill-current" />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-10 mb-16 relative z-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[
            { label: 'Video Tours', value: '8+', icon: Video },
            { label: 'Projects Featured', value: '15+', icon: Star },
            { label: 'Happy Clients', value: '500+', icon: Eye },
            { label: 'Years Experience', value: '10+', icon: Youtube }
          ].map((stat, index) => (
            <div key={index} className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 sm:p-6 text-center shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-orange-100">
              <div className="bg-orange-500 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-orange-800 mb-1">{stat.value}</div>
              <div className="text-sm sm:text-base text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-20">
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-600"></div>
            <span className="ml-4 text-gray-600 text-lg">Loading videos...</span>
          </div>
        </div>
      ) : projectVideos.length === 0 ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-20">
          <div className="text-center py-20">
            <Video className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-600 mb-2">No Videos Available</h2>
            <p className="text-gray-500">Please check back later for video content</p>
          </div>
        </div>
      ) : (
        <>
          {/* Featured Video Section */}
          {projectVideos[0] && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-20">
              <div className="text-center mb-12 sm:mb-16">
                <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-lg">
                  <Star className="w-4 h-4 fill-current" />
                  Featured Tour
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-orange-800 mb-6 tracking-tight">
                  Premium Project Showcase
                </h2>
                <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Start your journey with our most popular project tour, showcasing the finest in modern living
                </p>
              </div>
        
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-orange-100 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
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
                    <div className="bg-orange-600 hover:bg-orange-700 text-white rounded-full p-6 transform scale-110 transition-all duration-200 shadow-2xl">
                      <Play className="w-12 h-12 fill-current ml-1" />
                    </div>
                  </div>
                </div>
                
                <div className="p-6 sm:p-8">
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {projectVideos[0].category}
                    </span>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" />
                      Featured
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-orange-800 mb-4">{projectVideos[0].title}</h3>
                  <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6">{projectVideos[0].description}</p>
                  
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3 text-gray-500">
                      <Youtube className="w-5 h-5 text-red-500" />
                      <span className="font-medium">YouTube Premium Tour</span>
                    </div>
                    <button 
                      onClick={() => handleVideoClick(projectVideos[0])}
                      className="w-full sm:w-auto bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      <Play className="w-5 h-5" />
                      Watch Full Tour
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Video Grid */}
          {projectVideos.length > 1 && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-20">
              <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-orange-800 mb-6 tracking-tight">
                  Complete Video Collection
                </h2>
                <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Browse through all our project videos and virtual tours to find your perfect investment
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
                {projectVideos.slice(1).map((video) => (
                  <div key={video.id} className="group">
                    <div 
                      className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-orange-100 transform hover:-translate-y-2 cursor-pointer"
                      onClick={() => handleVideoClick(video)}
                    >
                      <div className="relative">
                        <div className="relative pb-[56.25%] h-0 bg-gradient-to-br from-orange-50 to-amber-50">
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
                          <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                            {video.category}
                          </span>
                        </div>
                        
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-t-2xl">
                          <div className="bg-orange-600 hover:bg-orange-700 text-white rounded-full p-4 transform scale-110 transition-all duration-200 shadow-xl">
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
                        <h3 className="text-xl font-bold text-orange-800 mb-3 line-clamp-2 group-hover:text-orange-700 transition-colors duration-200">
                          {video.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
                          {video.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-xs text-gray-500">
                            <Youtube className="w-4 h-4 mr-2 text-red-500" />
                            <span className="font-medium">HD Video Tour</span>
                          </div>
                          <button className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
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
          )}

          {/* Call to Action */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-20">
            <div className="bg-gradient-to-br from-orange-800 via-orange-700 to-amber-800 rounded-3xl p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute inset-0 opacity-10">
                <div className="w-full h-full bg-white/20 bg-[radial-gradient(circle_at_75%_25%,rgba(255,255,255,0.3)_2px,transparent_2px)] bg-[length:40px_40px]"></div>
              </div>
              
              <div className="relative z-10">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 drop-shadow-lg">
                  Ready to Explore More?
                </h2>
                <p className="text-lg sm:text-xl text-orange-100 mb-8 max-w-3xl mx-auto leading-relaxed drop-shadow">
                  Visit our projects page to see detailed information about our developments or contact us for a personal tour and investment consultation.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/projects"
                    className="bg-white text-orange-700 hover:bg-orange-50 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2"
                  >
                    <ArrowRight className="w-5 h-5" />
                    View All Projects
                  </a>
                  <a
                    href="/contact"
                    className="bg-orange-600 hover:bg-orange-500 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2 border-2 border-orange-400"
                  >
                    <Eye className="w-5 h-5" />
                    Schedule a Tour
                  </a>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Video Modal */}
      {showModal && selectedVideo && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-orange-700 to-orange-600 text-white p-6 rounded-t-3xl">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Video className="w-8 h-8" />
                  <div>
                    <h3 className="text-2xl font-bold">{selectedVideo.title}</h3>
                    <p className="opacity-90 text-orange-100">{selectedVideo.category} • HD Video Tour</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-white/80 hover:text-white bg-white/20 hover:bg-white/30 p-3 rounded-2xl transition-all duration-200 transform hover:scale-110 text-2xl leading-none"
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
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 border border-orange-200 mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {selectedVideo.category}
                  </span>
                  <Youtube className="w-5 h-5 text-red-500" />
                  <span className="text-sm text-gray-600">YouTube Premium Tour</span>
                </div>
                <h4 className="text-2xl font-bold text-orange-800 mb-3">{selectedVideo.title}</h4>
                <p className="text-gray-700 leading-relaxed text-lg">{selectedVideo.description}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gradient-to-r from-slate-600 to-slate-500 hover:from-slate-700 hover:to-slate-600 text-white py-3 px-6 rounded-2xl font-semibold transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
                >
                  Close
                </button>
                <a
                  href="/contact"
                  className="flex-1 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white py-3 px-6 rounded-2xl font-semibold transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
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