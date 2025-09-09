import React from "react";
import { useNavigate } from "react-router-dom";
import { Phone, Award, Home as HomeIcon, Users, MapPin, Clock, Star, CheckCircle, Play } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();

  // Function to open PDF in new tab
  const openPDF = (pdfPath) => {
    window.open(pdfPath, '_blank');
  };

  // Function to handle floor plan (placeholder for now)
  const handleFloorPlan = (projectName) => {
    // You can implement floor plan functionality here
    alert(`Floor plan for ${projectName} will be available soon!`);
  };

  const projects = [
    {
      name: "Fortune Brindavanam",
      location: "Penamaluru",
      description: "A stunning 35-acre gated community with open plots starting from 167 square yards.",
      features: ["1 min drive to Bandar road", "5 min to International Schools", "10 min to Benz Circle"],
      image: "/pr-1.jpg",
      brochurePdf: "/Fortune-Brindavanam.pdf"
    },
    {
      name: "Green Vistaraa",
      location: "Gandigunta, Vijayawada",
      description: "APCRDA-approved gated community with 80% residential plots, 20% independent houses.",
      features: ["1 min to Bandar Road", "20 min to Benz Circle", "20 min to Airport"],
      image: "/pr-2.jpg",
      brochurePdf: "/Green-Vistaraa-.pdf"
    },
    {
      name: "Fortune Prime Town",
      location: "Machilipatnam",
      description: "Next to new ORR and IRR with open plots and individual houses.",
      features: ["Near Machilipatnam Port", "Industrial Corridor", "Medical College"],
      image: "/pr-3.jpg",
      brochurePdf: "/Prime-Town_Satyamsai1.pdf"
    }
  ];

  const completedProjects = [
    { name: "Home Town", location: "Penamaluru, Vijayawada" },
    { name: "Fortune Icon City", location: "Kankipadu, Vijayawada" },
    { name: "Fortune Legendary", location: "Kankipadu, Vijayawada" },
    { name: "Fortune SunShine City", location: "Penamaluru, Vijayawada" },
    { name: "Fortune Delight", location: "Gannavaram, Vijayawada" },
    { name: "Fortune County", location: "Akunuru Village" }
  ];

  const stats = [
    { number: "4+", label: "Years Trusted Since 2019", icon: Clock },
    { number: "11+", label: "Projects Developed", icon: HomeIcon },
    { number: "1k+", label: "Satisfied Families", icon: Users },
    { number: "1k+", label: "Plots & Homes Sold", icon: Award }
  ];

  const strengths = [
    "Quality Constructions",
    "Affordable Prices", 
    "Smart Home Design",
    "Exceptional Lifestyle"
  ];

  return (
    <div className="w-full min-h-screen bg-slate-50 overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative w-full min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-orange-800 via-orange-700 to-amber-800">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        
        <div className="relative z-10 w-full max-w-7xl text-center text-white px-4 sm:px-8 py-16">
          <div className="space-y-6 sm:space-y-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight">
              <span className="block text-white drop-shadow-2xl">Your Dream Property</span>
              <span className="block text-orange-200 drop-shadow-2xl">is Here!</span>
            </h1>
            
            <div className="max-w-4xl mx-auto space-y-4">
              <p className="text-lg sm:text-xl md:text-2xl font-medium text-orange-100 drop-shadow-lg">
                Leading real estate firm in Vijayawada
              </p>
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-orange-200 drop-shadow-lg">
                Satyamsai Real Estate
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center pt-8">
              <button 
                onClick={() => navigate("/projects")}
                className="w-full sm:w-auto bg-orange-500 hover:bg-orange-400 text-white font-bold px-8 py-4 rounded-xl text-base sm:text-lg transition-all duration-300 shadow-2xl hover:shadow-orange-500/30 transform hover:scale-105 border border-orange-400"
              >
                Explore Projects
              </button>
              <button 
                onClick={() => navigate("/gallery")}
                className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-white font-bold px-8 py-4 rounded-xl text-base sm:text-lg transition-all duration-300 shadow-2xl hover:shadow-slate-800/30 transform hover:scale-105 flex items-center justify-center gap-3"
              >
                <Play className="w-5 h-5" />
                Video Gallery
              </button>
              <button 
                className="w-full sm:w-auto bg-transparent border-2 border-white text-white hover:bg-white hover:text-orange-800 font-bold px-8 py-4 rounded-xl text-base sm:text-lg transition-all duration-300 backdrop-blur-sm flex items-center justify-center gap-3"
              >
                <Phone className="w-5 h-5" />
                Call Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Founder Section */}
      <div className="w-full bg-white px-4 sm:px-6 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex flex-col items-center space-y-6 p-8 rounded-3xl bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100 shadow-xl">
              <div className="relative">
                <img 
                  src="/satyam-sai.jpg" 
                  alt="Satyam Sai"
                  className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-orange-500 shadow-2xl"
                />
                <div className="absolute -bottom-2 -right-2 bg-orange-500 text-white p-2 rounded-full shadow-lg">
                  <Award className="w-6 h-6" />
                </div>
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl sm:text-4xl font-bold text-orange-800">
                  Satyam Sai
                </h2>
                <p className="text-lg sm:text-xl text-orange-600 font-semibold">Managing Director</p>
              </div>
            </div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 sm:p-8 border border-orange-100 shadow-lg">
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                  Satyamsai Real Estate is a leading real estate firm in the city of Vijayawada, Andhra Pradesh, India. We specialize in providing residential and commercial properties for sale, rent, and lease. Our team of professionals are dedicated to providing our clients with the highest quality of service and satisfaction.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-lg">
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                  We strive to provide our clients with the best possible experience when they come to us for their real estate needs. We understand that buying or renting a property is an important decision and we are here to make sure that you get the best deal possible.
                </p>
              </div>
            </div>

            {/* Our Strengths */}
            <div className="space-y-6">
              <h3 className="text-2xl sm:text-3xl font-bold text-orange-800 text-center lg:text-left">Our Strengths</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {strengths.map((strength, index) => (
                  <div key={index} className="bg-gradient-to-br from-orange-600 to-orange-700 text-white p-6 rounded-xl text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group">
                    <CheckCircle className="w-8 h-8 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                    <h4 className="font-semibold text-sm sm:text-base">{strength}</h4>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Stats */}
      <div className="w-full bg-gradient-to-br from-orange-800 via-orange-700 to-amber-800 px-4 sm:px-6 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-lg">Our Success So Far</h2>
            <p className="text-lg sm:text-xl text-orange-200 max-w-2xl mx-auto">Building trust and delivering excellence since 2019</p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 text-center border border-white/20 shadow-xl hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
                  <div className="bg-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-orange-200 font-medium text-sm sm:text-base leading-tight">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Projects */}
      <div className="w-full bg-white px-4 sm:px-6 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-orange-800 mb-4">Recent Projects</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">Discover our latest developments designed for modern living</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="group bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.name}
                    className="w-full h-56 sm:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <div className="p-6 sm:p-8 space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl sm:text-2xl font-bold text-orange-800 group-hover:text-orange-700 transition-colors duration-300">{project.name}</h3>
                    <div className="flex items-center text-orange-600 font-medium">
                      <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="text-sm sm:text-base">{project.location}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{project.description}</p>
                  
                  <div className="space-y-2">
                    {project.features.map((feature, fIndex) => (
                      <div key={fIndex} className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 flex-shrink-0"></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-4">
                    <button 
                      onClick={() => openPDF(project.brochurePdf)}
                      className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      Download Brochure
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="w-full bg-gradient-to-br from-orange-50 to-amber-50 px-4 sm:px-6 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-orange-800 mb-6">Why Choose Us</h2>
            <div className="max-w-4xl mx-auto bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-orange-100">
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                Every Satyamsai Real Estate project is built with a vision of redefining your property investment experience by providing well-researched locations and transparent services. We follow good work ethics, cordial human relations, and a commitment to perform and deliver as promised.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
            {[
              "Best prices at prime locations",
              "On-time delivery with L.P. numbers",
              "Approved Layouts (DTCP and CRDA)",
              "Quality construction with Vastu design",
              "Homes for every budget",
              "100% customer satisfaction"
            ].map((point, index) => (
              <div key={index} className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-orange-100 group">
                <div className="flex items-start space-x-4">
                  <div className="bg-orange-500 p-2 rounded-full group-hover:bg-orange-600 transition-colors duration-300">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-gray-700 font-medium text-sm sm:text-base leading-relaxed flex-1">{point}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Completed Projects */}
      <div className="w-full bg-white px-4 sm:px-6 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-orange-800 mb-4">Completed Projects</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">Successfully delivered projects that stand as testimonials to our quality</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
            {completedProjects.map((project, index) => (
              <div key={index} className="bg-gradient-to-br from-orange-600 via-orange-700 to-amber-700 text-white p-6 sm:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <h3 className="text-lg sm:text-xl font-bold group-hover:text-orange-200 transition-colors duration-300">{project.name}</h3>
                      <div className="flex items-center text-orange-200 text-sm sm:text-base">
                        <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span>{project.location}</span>
                      </div>
                    </div>
                    <div className="bg-white/20 p-2 rounded-full">
                      <HomeIcon className="w-5 h-5" />
                    </div>
                  </div>
                  
                  <button className="w-full bg-white text-orange-700 px-4 py-3 rounded-xl font-semibold hover:bg-orange-50 transition-all duration-300 transform hover:scale-105 shadow-lg">
                    Read More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Video Gallery CTA Section */}
      <div className="w-full bg-gradient-to-br from-slate-800 via-slate-700 to-gray-800 px-4 sm:px-6 py-16 sm:py-20">
        <div className="max-w-5xl mx-auto text-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">Experience Our Projects Virtually</h2>
              <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                Take virtual tours of our developments through our comprehensive video gallery. See our projects come to life before you visit.
              </p>
            </div>
            
            <button 
              onClick={() => navigate("/gallery")}
              className="inline-flex items-center gap-4 bg-orange-500 hover:bg-orange-400 text-white px-8 py-4 rounded-xl text-lg font-bold transition-all duration-300 shadow-2xl hover:shadow-orange-500/30 transform hover:scale-105 border border-orange-400"
            >
              <div className="bg-white/20 p-2 rounded-full">
                <Play className="w-6 h-6" />
              </div>
              Watch Project Videos
            </button>
          </div>
        </div>
      </div>

      {/* Google Map */}
      <div className="w-full bg-gradient-to-br from-orange-50 to-amber-50 px-4 sm:px-6 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-orange-800 mb-4">Visit Our Location</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">Come and experience our hospitality in person at our Vijayawada office</p>
          </div>
          
          <div className="bg-white p-4 sm:p-6 rounded-3xl shadow-2xl border border-orange-100">
            <iframe
              title="Satyamsai Real Estate Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.026216861471!2d80.5935817!3d16.4961363!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35fb8754410227%3A0x4bcbbfa3f0318a26!2sSatyamsai%20Real%20Estate!5e0!3m2!1sen!2sin!4v1721720000000!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{
                border: 0,
                borderRadius: "1rem",
              }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-2xl"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}