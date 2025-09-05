import { useEffect, useState } from "react";
import { CheckCircle, Award, Home as HomeIcon, Users, Phone, Eye, Heart, Shield } from "lucide-react";

function useCountUp(target, duration = 1200) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = parseInt(target);
    if (start === end) return;
    let incrementTime = Math.floor(duration / end);
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);
    return () => clearInterval(timer);
  }, [target, duration]);
  return count;
}

export default function About() {
  const plots = useCountUp(280, 1200);
  const clients = useCountUp(250, 1200);
  const properties = useCountUp(10, 1200);

  const strengths = [
    "Quality Constructions",
    "Affordable Prices", 
    "Smart Home Design",
    "Exceptional Lifestyle"
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-amber-50 to-yellow-50 overflow-y-auto">
      {/* Hero Section */}
      <div className="w-full bg-gradient-to-r from-amber-600 to-yellow-500 px-6 py-16 text-center">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-8 drop-shadow-lg font-heading">About</h1>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <img
              src="/satyam-sai.jpg"
              alt="Satyam Sai"
              className="w-40 h-40 rounded-full mx-auto mb-6 object-cover border-4 border-yellow-300 shadow-lg"
            />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 font-heading">
              Satyam Sai
            </h2>
            <p className="text-xl text-yellow-200 font-semibold font-inter">Managing Director</p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="w-full bg-white px-6 py-16">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-amber-700 mb-6 flex items-center justify-center gap-3 font-heading">
              <HomeIcon className="w-10 h-10 text-amber-600" />
              Satyamsai Real Estate started with a mission
            </h2>
            <div className="bg-gradient-to-r from-amber-100 to-yellow-100 rounded-2xl p-8">
              <p className="text-lg text-gray-700 leading-relaxed mb-8 font-inter">
                Satyamsai Real Estate is a leading real estate firm in the city of Vijayawada, Andhra Pradesh, India. We specialize in providing residential and commercial properties for sale, rent, and lease. Our team of professionals are dedicated to providing our clients with the highest quality of service and satisfaction.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed font-inter">
                We strive to provide our clients with the best possible experience when they come to us for their real estate needs. We understand that buying or renting a property is an important decision and we are here to make sure that you get the best deal possible.
              </p>
            </div>
          </div>

          {/* Our Strengths */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {strengths.map((strength, index) => (
              <div key={index} className="bg-amber-600 text-white p-6 rounded-xl text-center shadow-lg hover:bg-amber-700 transition-colors duration-300">
                <CheckCircle className="w-8 h-8 mx-auto mb-3" />
                <h3 className="font-semibold font-inter">{strength}</h3>
              </div>
            ))}
          </div>

          <button className="bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-700 hover:to-yellow-600 text-white font-bold px-8 py-4 rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-inter">
            <Phone className="inline-block w-5 h-5 mr-2" />
            Call Now
          </button>
        </div>
      </div>

      {/* Chairman's Vision */}
      <div className="w-full bg-gradient-to-br from-amber-100 to-yellow-100 px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <h2 className="text-4xl font-bold text-amber-700 mb-8 text-center flex items-center justify-center gap-3 font-heading">
              <Eye className="w-10 h-10 text-amber-600" />
              Managing Director's Vision
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <img
                  src="/satyam-sai.jpg"
                  alt="Managing Director Satyam Sai"
                  className="w-full h-80 rounded-xl object-cover shadow-lg border-4 border-amber-200"
                />
              </div>
              
              <div>
                <p className="text-lg text-gray-700 leading-relaxed mb-6 font-inter">
                  Managing Director Satyam Sai established Satyamsai Real Estate with a vision to provide transparent, reliable, and professional real estate services to families in Vijayawada and surrounding areas.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-6 font-inter">
                  With years of experience in the real estate industry, our team has gained the trust of numerous clients by delivering on our promises and providing honest advice. We believe in building long-term relationships based on trust and transparency.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed font-inter">
                  Satyam Sai is committed to helping every client find their dream property with complete peace of mind and exceptional after-sales support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rainbow of Happiness */}
      <div className="w-full bg-white px-6 py-16">
        <div className="max-w-6xl mx-auto text-center">
          <div className="bg-gradient-to-r from-yellow-400 to-amber-500 rounded-2xl p-8 text-white shadow-xl">
            <h2 className="text-4xl font-bold mb-8 flex items-center justify-center gap-3 drop-shadow font-heading">
              <Heart className="w-10 h-10" />
              Your dream property awaits
            </h2>
            <p className="text-lg leading-relaxed mb-6 drop-shadow font-inter">
              A property investment brings security and happiness to your family, and Satyamsai Real Estate is here to make your dream of owning the perfect property a reality with complete transparency and professional service.
            </p>
            <p className="text-lg leading-relaxed drop-shadow font-inter">
              Find your ideal property hassle-free with Satyamsai Real Estate's comprehensive range of residential and commercial options in prime locations.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="w-full bg-gradient-to-r from-amber-600 to-yellow-500 px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12 drop-shadow font-heading">Our Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20 hover:bg-white/20 transition-all duration-300">
              <Award className="w-16 h-16 mx-auto mb-4 text-yellow-300" />
              <div className="text-5xl font-bold text-white mb-2 font-heading">{plots}+</div>
              <div className="text-yellow-200 font-medium text-xl font-inter">Plots Sold</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20 hover:bg-white/20 transition-all duration-300">
              <Users className="w-16 h-16 mx-auto mb-4 text-yellow-300" />
              <div className="text-5xl font-bold text-white mb-2 font-heading">{clients}+</div>
              <div className="text-yellow-200 font-medium text-xl font-inter">Satisfied Clients</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20 hover:bg-white/20 transition-all duration-300">
              <HomeIcon className="w-16 h-16 mx-auto mb-4 text-yellow-300" />
              <div className="text-5xl font-bold text-white mb-2 font-heading">{properties}+</div>
              <div className="text-yellow-200 font-medium text-xl font-inter">Listed Properties</div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust & Quality Section */}
      <div className="w-full bg-gradient-to-br from-amber-50 to-yellow-50 px-6 py-16">
        <div className="max-w-6xl mx-auto text-center">
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <h2 className="text-4xl font-bold text-amber-700 mb-8 flex items-center justify-center gap-3 font-heading">
              <Shield className="w-10 h-10 text-amber-600" />
              Why Choose Satyamsai Real Estate
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                "Transparent and honest service",
                "Professional real estate expertise",
                "Competitive market pricing",
                "Prime location properties",
                "Dedicated client support team",
                "Hassle-free property transactions",
                "Comprehensive property portfolio",
                "Trusted local market knowledge",
                "Exceptional after-sales service"
              ].map((point, index) => (
                <div key={index} className="bg-gradient-to-r from-amber-100 to-yellow-100 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CheckCircle className="w-8 h-8 text-amber-600 mx-auto mb-4" />
                  <p className="text-gray-700 font-medium font-inter">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}