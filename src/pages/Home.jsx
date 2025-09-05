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
    <div className="w-full min-h-screen bg-gradient-to-br from-amber-50 to-yellow-50 overflow-x-hidden">
      {/* Hero Section */}
      <div className="w-full min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-amber-600 to-yellow-500 relative">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 w-full max-w-6xl text-center text-white px-8 py-12">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight drop-shadow-lg font-heading">
            Your Dream Property is Here!
          </h1>
          <p className="text-xl md:text-2xl mb-8 leading-relaxed drop-shadow font-inter">
            Leading real estate firm in Vijayawada
            <br />
            <span className="text-yellow-200 font-semibold">
              Satyamsai Real Estate
            </span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => navigate("/projects")}
              className="bg-yellow-400 hover:bg-yellow-300 text-amber-900 font-bold px-8 py-4 rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-inter"
            >
              Explore Projects
            </button>
            <button 
              onClick={() => navigate("/gallery")}
              className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-8 py-4 rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-inter"
            >
              <Play className="inline-block w-5 h-5 mr-2" />
              Video Gallery
            </button>
            <button 
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-amber-700 font-bold px-8 py-4 rounded-full text-lg transition-all duration-300 font-inter"
            >
              <Phone className="inline-block w-5 h-5 mr-2" />
              Call Now
            </button>
          </div>
        </div>
      </div>

      {/* Founder Section */}
      <div className="w-full bg-white px-6 py-16">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-12">
            <img 
              src="/satyam-sai.jpg" 
              alt="Satyam Sai"
              className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-amber-400 shadow-lg"
            />
            <h2 className="text-3xl md:text-4xl font-bold text-amber-700 mb-2 font-heading">
              Satyam Sai
            </h2>
            <p className="text-xl text-amber-600 font-semibold font-inter">Managing Director</p>
          </div>
          
          <div className="bg-gradient-to-r from-amber-100 to-yellow-100 rounded-2xl p-8 mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-8 font-inter">
              Satyamsai Real Estate is a leading real estate firm in the city of Vijayawada, Andhra Pradesh, India. We specialize in providing residential and commercial properties for sale, rent, and lease. Our team of professionals are dedicated to providing our clients with the highest quality of service and satisfaction.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed font-inter">
              We strive to provide our clients with the best possible experience when they come to us for their real estate needs. We understand that buying or renting a property is an important decision and we are here to make sure that you get the best deal possible. We have a wide range of properties available, from open plots, luxurious villas to budget apartments and commercial complexes.
            </p>
          </div>

          {/* Our Strengths */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {strengths.map((strength, index) => (
              <div key={index} className="bg-amber-600 text-white p-6 rounded-xl text-center shadow-lg hover:bg-amber-700 transition-colors duration-300">
                <CheckCircle className="w-8 h-8 mx-auto mb-3" />
                <h3 className="font-semibold font-inter">{strength}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Success Stats */}
      <div className="w-full bg-gradient-to-r from-amber-600 to-yellow-500 px-6 py-16">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-12 drop-shadow font-heading">Our Success So Far</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20">
                  <IconComponent className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
                  <div className="text-4xl font-bold text-white mb-2 font-heading">{stat.number}</div>
                  <div className="text-yellow-200 font-medium font-inter">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Projects */}
      <div className="w-full bg-white px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-amber-700 text-center mb-12 font-heading">Recent Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="bg-gradient-to-b from-amber-50 to-yellow-50 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <img 
                  src={project.image} 
                  alt={project.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-amber-700 mb-2 font-heading">{project.name}</h3>
                  <p className="text-amber-600 mb-3 font-medium flex items-center font-inter">
                    <MapPin className="w-4 h-4 mr-1" />
                    {project.location}
                  </p>
                  <p className="text-gray-700 mb-4 leading-relaxed font-inter">{project.description}</p>
                  <div className="space-y-2 mb-4">
                    {project.features.map((feature, fIndex) => (
                      <div key={fIndex} className="flex items-center text-sm text-gray-600">
                        <Star className="w-4 h-4 text-yellow-500 mr-2" />
                        <span className="font-inter">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => openPDF(project.brochurePdf)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-amber-900 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 font-inter"
                    >
                      Brochure
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="w-full bg-gradient-to-br from-amber-100 to-yellow-100 px-6 py-16">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-amber-700 mb-8 font-heading">Why Choose Us</h2>
          <p className="text-lg text-gray-700 mb-12 leading-relaxed font-inter">
            Every Satyamsai Real Estate project is built with a vision of redefining your property investment experience by providing well-researched locations and transparent services. We follow good work ethics, cordial human relations, and a commitment to perform and deliver as promised.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Best prices at prime locations",
              "On-time delivery with L.P. numbers",
              "Approved Layouts (DTCP and CRDA)",
              "Quality construction with Vastu design",
              "Homes for every budget",
              "100% customer satisfaction"
            ].map((point, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CheckCircle className="w-8 h-8 text-amber-600 mx-auto mb-4" />
                <p className="text-gray-700 font-medium font-inter">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Completed Projects */}
      <div className="w-full bg-white px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-amber-700 text-center mb-12 font-heading">Completed Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {completedProjects.map((project, index) => (
              <div key={index} className="bg-gradient-to-r from-amber-600 to-yellow-500 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <h3 className="text-xl font-bold mb-2 font-heading">{project.name}</h3>
                <p className="text-yellow-100 mb-4 font-inter">{project.location}</p>
                <button className="bg-white text-amber-700 px-4 py-2 rounded-lg font-medium hover:bg-yellow-50 transition-colors duration-300 font-inter">
                  Read More
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Video Gallery CTA Section */}
      <div className="w-full bg-gradient-to-r from-purple-600 to-indigo-500 px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4 font-heading">Experience Our Projects Virtually</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto font-inter">
            Take virtual tours of our developments through our comprehensive video gallery. See our projects come to life before you visit.
          </p>
          <button 
            onClick={() => navigate("/gallery")}
            className="bg-white text-purple-600 hover:bg-purple-50 px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 inline-flex items-center gap-3 font-inter"
          >
            <Play className="w-6 h-6" />
            Watch Project Videos
          </button>
        </div>
      </div>

      {/* Google Map */}
      <div className="w-full flex justify-center py-16 px-4 bg-gradient-to-br from-amber-50 to-yellow-50">
        <div className="w-full max-w-6xl">
          <h2 className="text-4xl font-bold text-amber-700 text-center mb-8 font-heading">Visit Our Location</h2>
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
            className="shadow-2xl border-4 border-amber-200"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
