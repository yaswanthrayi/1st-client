import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { RefreshCw, Calendar, MapPin, Eye, Star, Building, ArrowRight, Video } from 'lucide-react';

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
      <div className="min-h-screen w-full bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-16 h-16 animate-spin text-amber-600 mx-auto mb-4" />
          <p className="text-xl text-gray-600 font-inter">Loading our amazing projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
      {/* Hero Section */}
      <div className="w-full bg-gradient-to-r from-amber-600 to-yellow-500 px-6 py-20 text-center relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-white/10 bg-[radial-gradient(circle_at_75%_25%,rgba(255,255,255,0.2)_2px,transparent_2px)] bg-[length:50px_50px]"></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex items-center justify-center mb-8">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 mr-4">
              <Building className="w-16 h-16 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight font-heading">
              Our Projects
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-amber-100 max-w-4xl mx-auto leading-relaxed mb-8 font-inter">
            Explore our latest real estate projects. Each project is crafted with care, quality, and a vision for the future.
          </p>
          <div className="flex items-center justify-center gap-2 text-white/90">
            <Star className="w-5 h-5 fill-current" />
            <span className="text-lg font-medium font-inter">Premium Development Portfolio</span>
            <Star className="w-5 h-5 fill-current" />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-10 mb-16 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Active Projects', value: projects.length > 0 ? `${projects.length}+` : '6+', icon: Building },
            { label: 'Happy Families', value: '200+', icon: Star },
            { label: 'Sq.Ft Developed', value: '50K+', icon: MapPin },
            { label: 'Years Experience', value: '10+', icon: Calendar }
          ].map((stat, index) => (
            <div key={index} className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 border border-amber-200">
              <stat.icon className="w-8 h-8 text-amber-600 mx-auto mb-3" />
              <div className="text-2xl md:text-3xl font-bold text-amber-700 font-heading">{stat.value}</div>
              <div className="text-sm md:text-base text-gray-600 font-medium font-inter">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Dynamic Projects Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-medium mb-6 font-inter">
            <Building className="w-4 h-4" />
            Our Development Portfolio
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6 tracking-tight font-heading">
            Premium Real Estate Projects
          </h2>
          <p className="text-lg md:text-xl text-gray-600 text-center max-w-4xl mx-auto leading-relaxed font-inter">
            Discover our carefully crafted projects, each designed with precision and built with quality. 
            These projects are managed and updated by our team to showcase our latest developments.
          </p>
        </div>
        
        {projects.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 border border-amber-200 shadow-xl max-w-2xl mx-auto">
              <MapPin className="w-20 h-20 text-amber-400 mx-auto mb-6" />
              <h3 className="text-3xl font-bold text-gray-800 mb-4 font-heading">No Projects Available Yet</h3>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed font-inter">
                Our admin team will add projects here soon. In the meantime, check out our amazing video gallery to see our work in action!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/gallery"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-700 hover:to-yellow-600 text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <Video className="w-5 h-5" />
                  Visit Video Gallery
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-white text-amber-600 border-2 border-amber-600 hover:bg-amber-50 px-6 py-3 rounded-2xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <ArrowRight className="w-5 h-5" />
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group flex flex-col cursor-pointer transform hover:-translate-y-2 border border-amber-200"
                onClick={() => handleViewProject(project)}
              >
                <div className="relative">
                  {project.images && project.images.length > 0 ? (
                    <>
                      <img
                        src={project.images[0]}
                        alt={project.title}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                        loading="lazy"
                      />
                      {project.images.length > 1 && (
                        <div className="absolute top-3 right-3 bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg font-inter">
                          +{project.images.length - 1} more
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="w-full h-64 bg-gradient-to-br from-amber-100 to-yellow-100 flex items-center justify-center">
                      <MapPin className="w-16 h-16 text-amber-400" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-6 text-white w-full">
                      <div className="flex items-center gap-2 mb-2">
                        <Eye className="w-5 h-5" />
                        <span className="text-lg font-semibold font-inter">View Project Details</span>
                      </div>
                      <p className="text-amber-100 text-sm font-inter">Click to explore this project</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-amber-600 transition-colors duration-200 font-heading">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 text-base leading-relaxed flex-1 line-clamp-3 mb-4 font-inter">
                    {project.description}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-amber-100">
                    <div className="flex items-center text-sm text-gray-500 font-inter">
                      <Calendar className="w-4 h-4 mr-2" />
                      {formatDate(project.created_at)}
                    </div>
                    <button className="bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-700 hover:to-yellow-600 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-inter">
                      <Eye className="w-4 h-4" />
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
          <div className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-amber-600 to-yellow-500 text-white p-6 rounded-t-3xl">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Building className="w-8 h-8" />
                  <div>
                    <h3 className="text-2xl lg:text-3xl font-bold font-heading">{selectedProject.title}</h3>
                    <p className="opacity-90 mt-1 text-amber-100 font-inter">Project Details & Information</p>
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
            <div className="p-6 lg:p-8 space-y-8">
              {/* Project Images */}
              {selectedProject.images && selectedProject.images.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <Eye className="w-6 h-6 text-amber-600" />
                    <h4 className="text-2xl font-bold text-gray-800 font-heading">Project Gallery</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {selectedProject.images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image}
                          alt={`${selectedProject.title} - Image ${index + 1}`}
                          className="w-full h-48 md:h-64 object-cover rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-200 transform group-hover:-translate-y-1"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-2xl flex items-center justify-center">
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
                  <Star className="w-6 h-6 text-amber-600" />
                  <h4 className="text-2xl font-bold text-gray-800 font-heading">Project Description</h4>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-8 border border-amber-200">
                  <p className="text-gray-700 leading-relaxed text-lg font-inter">
                    {selectedProject.description || 'No description available for this project.'}
                  </p>
                </div>
              </div>

              {/* Project Info */}
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <Calendar className="w-6 h-6 text-amber-600" />
                  <h4 className="text-2xl font-bold text-gray-800 font-heading">Project Information</h4>
                </div>
                <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-2xl p-6 border border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-8 h-8 text-amber-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-500 uppercase tracking-wide font-inter">Created On</p>
                        <p className="text-lg font-semibold text-gray-800 font-inter">{formatDate(selectedProject.created_at)}</p>
                      </div>
                    </div>
                    {selectedProject.images && (
                      <div className="flex items-center gap-3">
                        <Eye className="w-8 h-8 text-amber-600" />
                        <div>
                          <p className="text-sm font-medium text-gray-500 uppercase tracking-wide font-inter">Gallery Images</p>
                          <p className="text-lg font-semibold text-gray-800 font-inter">{selectedProject.images.length} images</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gradient-to-r from-gray-600 to-gray-500 hover:from-gray-700 hover:to-gray-600 text-white py-4 px-6 rounded-2xl font-semibold transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl font-inter"
                >
                  Close
                </button>
                <a
                  href="/contact"
                  className="flex-1 bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-700 hover:to-yellow-600 text-white py-4 px-6 rounded-2xl font-semibold transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 font-inter"
                >
                  <ArrowRight className="w-5 h-5" />
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
