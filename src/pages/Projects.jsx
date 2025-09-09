import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { RefreshCw, Calendar, MapPin, Eye, Star, Building, ArrowRight, Video, Clock, Users, Award } from 'lucide-react';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Static fallback data for if database is empty
  const fallbackProjects = [
    {
      id: 'fallback-1',
      title: 'Premium Gated Community',
      description: 'A premium gated community with lush green parks and modern amenities.',
      images: ['/pr-1.jpg'],
      created_at: new Date().toISOString()
    },
    {
      id: 'fallback-2',
      title: 'Commercial Development',
      description: 'Prime commercial land ideal for business and investment opportunities.',
      images: ['/pr-2.jpg'],
      created_at: new Date().toISOString()
    },
    {
      id: 'fallback-3',
      title: 'Residential Enclave',
      description: 'A serene residential enclave surrounded by nature and tranquility.',
      images: ['/pr-3.jpg'],
      created_at: new Date().toISOString()
    },
    {
      id: 'fallback-4',
      title: 'Modern Villas',
      description: 'Modern villas with contemporary architecture and landscaped gardens.',
      images: ['/pr-4.jpg'],
      created_at: new Date().toISOString()
    },
    {
      id: 'fallback-5',
      title: 'Luxury Apartments',
      description: 'Luxury apartments offering panoramic views and top-class facilities.',
      images: ['/pr-5.jpg'],
      created_at: new Date().toISOString()
    },
    {
      id: 'fallback-6',
      title: 'Eco-Friendly Township',
      description: 'Eco-friendly township with rainwater harvesting and solar lighting.',
      images: ['/pr-6.jpg'],
      created_at: new Date().toISOString()
    }
  ];

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching projects:', error);
        // Use fallback data if database fetch fails
        setProjects(fallbackProjects);
      } else {
        // If no projects in database, use fallback data
        if (data && data.length > 0) {
          setProjects(data);
        } else {
          setProjects(fallbackProjects);
        }
      }
    } catch (error) {
      console.error('Error:', error);
      // Use fallback data on error
      setProjects(fallbackProjects);
    } finally {
      setLoading(false);
    }
  };

  const handleViewProject = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-orange-100">
            <RefreshCw className="w-16 h-16 animate-spin text-orange-600 mx-auto mb-4" />
            <p className="text-xl text-slate-700 font-semibold">Loading our amazing projects...</p>
            <p className="text-slate-500 mt-2">Please wait while we fetch the latest developments</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-slate-50 overflow-x-hidden">
      {/* Hero Section */}
      <div className="w-full bg-gradient-to-br from-orange-800 via-orange-700 to-amber-600 px-4 sm:px-6 lg:px-8 py-16 lg:py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="mb-8">
            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium tracking-wide uppercase border border-white/20 mb-6 text-white">
              Our Development Portfolio
            </span>
          </div>
          
          <div className="flex items-center justify-center mb-8 flex-wrap gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <Building className="w-12 h-12 lg:w-16 lg:h-16 text-orange-200" />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-tight drop-shadow-lg">
              Our Projects
            </h1>
          </div>
          
          <p className="text-lg sm:text-xl md:text-2xl text-orange-100 max-w-4xl mx-auto leading-relaxed mb-8">
            Explore our latest real estate projects. Each project is crafted with care, quality, and a vision for the future.
          </p>
          
          <div className="flex items-center justify-center gap-2 text-white/90">
            <Star className="w-5 h-5 fill-current text-orange-200" />
            <span className="text-lg font-medium">Premium Development Portfolio</span>
            <Star className="w-5 h-5 fill-current text-orange-200" />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 mb-16 relative z-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {[
            { label: 'Active Projects', value: projects.length > 0 ? `${projects.length}+` : '6+', icon: Building },
            { label: 'Happy Families', value: '1K+', icon: Users },
            { label: 'Sq.Ft Developed', value: '50K+', icon: MapPin },
            { label: 'Years Experience', value: '4+', icon: Clock }
          ].map((stat, index) => (
            <div key={index} className="group bg-white rounded-2xl p-4 lg:p-6 text-center shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-orange-100">
              <stat.icon className="w-8 h-8 lg:w-10 lg:h-10 text-orange-600 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
              <div className="text-2xl lg:text-3xl font-bold text-orange-700 mb-1">{stat.value}</div>
              <div className="text-sm lg:text-base text-slate-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Dynamic Projects Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center mb-16">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium tracking-wide uppercase mb-6">
              Featured Projects
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-6 tracking-tight">
            Premium Real Estate Projects
          </h2>
          <p className="text-lg lg:text-xl text-slate-600 text-center max-w-4xl mx-auto leading-relaxed">
            Discover our carefully crafted projects, each designed with precision and built with quality. 
            These projects are managed and updated by our team to showcase our latest developments.
          </p>
        </div>
        
        {projects.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-white rounded-3xl p-8 lg:p-12 border border-orange-100 shadow-2xl max-w-2xl mx-auto">
              <div className="bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl p-8 mb-8">
                <MapPin className="w-16 h-16 lg:w-20 lg:h-20 text-orange-600 mx-auto mb-6" />
                <h3 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-4">No Projects Available Yet</h3>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  Our admin team will add projects here soon. In the meantime, check out our amazing video gallery to see our work in action!
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/gallery"
                  className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <Video className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  Visit Video Gallery
                </a>
                <a
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-2 bg-white text-orange-600 border-2 border-orange-600 hover:bg-orange-50 px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer transform hover:-translate-y-2 border border-orange-100"
                onClick={() => handleViewProject(project)}
              >
                <div className="relative overflow-hidden">
                  {project.images && project.images.length > 0 ? (
                    <>
                      <img
                        src={project.images[0]}
                        alt={project.title}
                        className="w-full h-56 lg:h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                      />
                      {project.images.length > 1 && (
                        <div className="absolute top-3 right-3 bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                          +{project.images.length - 1} more
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="w-full h-56 lg:h-64 bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center">
                      <MapPin className="w-16 h-16 text-orange-400" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-6 text-white w-full">
                      <div className="flex items-center gap-2 mb-2">
                        <Eye className="w-5 h-5" />
                        <span className="text-lg font-semibold">View Project Details</span>
                      </div>
                      <p className="text-orange-200 text-sm">Click to explore this project</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 lg:p-8 flex-1 flex flex-col">
                  <h3 className="text-xl lg:text-2xl font-bold text-slate-800 mb-3 line-clamp-2 group-hover:text-orange-700 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 text-base leading-relaxed flex-1 line-clamp-3 mb-6">
                    {project.description}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-orange-100">
                    <div className="flex items-center text-sm text-slate-500">
                      <Calendar className="w-4 h-4 mr-2" />
                      {formatDate(project.created_at)}
                    </div>
                    <button className="group bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105">
                      <Eye className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Project Detail Modal */}
      {showModal && selectedProject && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto border border-orange-100">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-orange-700 to-orange-600 text-white p-6 lg:p-8 rounded-t-3xl">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2 border border-white/20">
                    <Building className="w-6 h-6 lg:w-8 lg:h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl lg:text-3xl font-bold">{selectedProject.title}</h3>
                    <p className="opacity-90 mt-1 text-orange-100">Project Details & Information</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-2xl transition-all duration-300 transform hover:scale-110 border border-white/20"
                >
                  <span className="text-2xl">×</span>
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 lg:p-8 space-y-8">
              {/* Project Images */}
              {selectedProject.images && selectedProject.images.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <div className="bg-orange-100 rounded-lg p-2">
                      <Eye className="w-5 h-5 lg:w-6 lg:h-6 text-orange-600" />
                    </div>
                    <h4 className="text-xl lg:text-2xl font-bold text-slate-800">Project Gallery</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                    {selectedProject.images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image}
                          alt={`${selectedProject.title} - Image ${index + 1}`}
                          className="w-full h-48 md:h-64 object-cover rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1 border border-orange-100"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-center justify-center">
                          <Eye className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Project Description */}
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <div className="bg-orange-100 rounded-lg p-2">
                    <Star className="w-5 h-5 lg:w-6 lg:h-6 text-orange-600" />
                  </div>
                  <h4 className="text-xl lg:text-2xl font-bold text-slate-800">Project Description</h4>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 lg:p-8 border border-orange-200">
                  <p className="text-slate-700 leading-relaxed text-lg">
                    {selectedProject.description || 'No description available for this project.'}
                  </p>
                </div>
              </div>

              {/* Project Info */}
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <div className="bg-orange-100 rounded-lg p-2">
                    <Calendar className="w-5 h-5 lg:w-6 lg:h-6 text-orange-600" />
                  </div>
                  <h4 className="text-xl lg:text-2xl font-bold text-slate-800">Project Information</h4>
                </div>
                <div className="bg-gradient-to-br from-slate-50 to-orange-50 rounded-2xl p-6 border border-slate-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center gap-3">
                      <div className="bg-orange-100 rounded-lg p-2">
                        <Calendar className="w-6 h-6 lg:w-8 lg:h-8 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">Created On</p>
                        <p className="text-lg font-semibold text-slate-800">{formatDate(selectedProject.created_at)}</p>
                      </div>
                    </div>
                    {selectedProject.images && (
                      <div className="flex items-center gap-3">
                        <div className="bg-orange-100 rounded-lg p-2">
                          <Eye className="w-6 h-6 lg:w-8 lg:h-8 text-orange-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">Gallery Images</p>
                          <p className="text-lg font-semibold text-slate-800">{selectedProject.images.length} images</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-200">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gradient-to-r from-slate-600 to-slate-500 hover:from-slate-700 hover:to-slate-600 text-white py-4 px-6 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Close
                </button>
                <a
                  href="/contact"
                  className="group flex-1 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white py-4 px-6 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  Get More Information
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}