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
    <div className="min-h-screen w-full bg-slate-50 overflow-y-auto">
      {/* Hero Section */}
      <div className="w-full bg-gradient-to-br from-orange-800 via-orange-700 to-amber-600 px-4 sm:px-6 lg:px-8 py-16 lg:py-24 text-center relative">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="mb-8">
            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium tracking-wide uppercase border border-white/20 mb-6 text-white">
              About Our Company
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-12 tracking-tight leading-tight drop-shadow-lg">
            About Us
          </h1>
          
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 lg:p-12 border border-white/20 shadow-2xl max-w-4xl mx-auto">
            <div className="mb-8">
              <img
                src="/satyam-sai.jpg"
                alt="Satyam Sai"
                className="w-32 h-32 lg:w-40 lg:h-40 rounded-full mx-auto mb-6 object-cover border-4 border-orange-200 shadow-2xl"
              />
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
                Satyam Sai
              </h2>
              <p className="text-lg lg:text-xl text-orange-200 font-medium">Managing Director</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="w-full bg-white px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium tracking-wide uppercase mb-6">
              Our Mission
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-8 flex items-center justify-center gap-3 flex-wrap">
              <HomeIcon className="w-8 h-8 lg:w-10 lg:h-10 text-orange-600" />
              Satyamsai Real Estate started with a mission
            </h2>
            
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 lg:p-12 border border-orange-100 shadow-lg">
              <p className="text-lg lg:text-xl text-slate-700 leading-relaxed mb-8">
                Satyamsai Real Estate is a leading real estate firm in the city of Vijayawada, Andhra Pradesh, India. We specialize in providing residential and commercial properties for sale, rent, and lease. Our team of professionals are dedicated to providing our clients with the highest quality of service and satisfaction.
              </p>
              <p className="text-lg lg:text-xl text-slate-700 leading-relaxed">
                We strive to provide our clients with the best possible experience when they come to us for their real estate needs. We understand that buying or renting a property is an important decision and we are here to make sure that you get the best deal possible.
              </p>
            </div>
          </div>

          {/* Our Strengths */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-12">
            {strengths.map((strength, index) => (
              <div key={index} className="group bg-gradient-to-br from-orange-600 to-orange-700 text-white p-4 lg:p-6 rounded-xl text-center shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <CheckCircle className="w-6 h-6 lg:w-8 lg:h-8 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="font-semibold text-sm lg:text-base">{strength}</h3>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button className="group bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 inline-flex items-center gap-3">
              <Phone className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              Call Now
            </button>
          </div>
        </div>
      </div>

      {/* Chairman's Vision */}
      <div className="w-full bg-slate-50 px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl p-6 lg:p-12 shadow-2xl border border-slate-100">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium tracking-wide uppercase mb-6">
                Leadership Vision
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4 flex items-center justify-center gap-3 flex-wrap">
                <Eye className="w-8 h-8 lg:w-10 lg:h-10 text-orange-600" />
                Managing Director's Vision
              </h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="relative">
                  <img
                    src="/satyam-sai.jpg"
                    alt="Managing Director Satyam Sai"
                    className="w-full h-64 sm:h-80 lg:h-96 rounded-2xl object-cover shadow-2xl border-4 border-orange-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-2xl"></div>
                </div>
              </div>
              
              <div className="order-1 lg:order-2 space-y-6">
                <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-xl border border-orange-100">
                  <p className="text-lg text-slate-700 leading-relaxed">
                    Managing Director Satyam Sai established Satyamsai Real Estate with a vision to provide transparent, reliable, and professional real estate services to families in Vijayawada and surrounding areas.
                  </p>
                </div>
                
                <div className="bg-gradient-to-br from-slate-50 to-orange-50 p-6 rounded-xl border border-slate-200">
                  <p className="text-lg text-slate-700 leading-relaxed">
                    With years of experience in the real estate industry, our team has gained the trust of numerous clients by delivering on our promises and providing honest advice. We believe in building long-term relationships based on trust and transparency.
                  </p>
                </div>
                
                <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-xl border border-orange-100">
                  <p className="text-lg text-slate-700 leading-relaxed">
                    Satyam Sai is committed to helping every client find their dream property with complete peace of mind and exceptional after-sales support.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rainbow of Happiness */}
      <div className="w-full bg-white px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-orange-600 via-orange-700 to-amber-600 rounded-2xl p-6 lg:p-12 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10 text-center">
              <div className="mb-8">
                <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium tracking-wide uppercase border border-white/20 mb-6">
                  Your Dream Awaits
                </span>
              </div>
              
              <h2 className="text-3xl lg:text-4xl font-bold mb-8 flex items-center justify-center gap-3 flex-wrap">
                <Heart className="w-8 h-8 lg:w-10 lg:h-10 text-orange-200" />
                Your dream property awaits
              </h2>
              
              <div className="max-w-4xl mx-auto space-y-6">
                <p className="text-lg lg:text-xl leading-relaxed text-orange-100">
                  A property investment brings security and happiness to your family, and Satyamsai Real Estate is here to make your dream of owning the perfect property a reality with complete transparency and professional service.
                </p>
                <p className="text-lg lg:text-xl leading-relaxed text-orange-100">
                  Find your ideal property hassle-free with Satyamsai Real Estate's comprehensive range of residential and commercial options in prime locations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="w-full bg-gradient-to-br from-orange-800 via-orange-700 to-amber-600 px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium tracking-wide uppercase border border-white/20 mb-6 text-white">
              Our Success
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Our Achievements</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <div className="group bg-white/10 backdrop-blur-md rounded-2xl p-6 lg:p-8 text-center border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 shadow-xl">
              <Award className="w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-4 text-orange-200 group-hover:scale-110 transition-transform duration-300" />
              <div className="text-4xl lg:text-5xl font-bold text-white mb-2">{plots}+</div>
              <div className="text-orange-200 font-medium text-lg lg:text-xl">Plots Sold</div>
            </div>
            
            <div className="group bg-white/10 backdrop-blur-md rounded-2xl p-6 lg:p-8 text-center border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 shadow-xl">
              <Users className="w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-4 text-orange-200 group-hover:scale-110 transition-transform duration-300" />
              <div className="text-4xl lg:text-5xl font-bold text-white mb-2">{clients}+</div>
              <div className="text-orange-200 font-medium text-lg lg:text-xl">Satisfied Clients</div>
            </div>
            
            <div className="group bg-white/10 backdrop-blur-md rounded-2xl p-6 lg:p-8 text-center border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 shadow-xl">
              <HomeIcon className="w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-4 text-orange-200 group-hover:scale-110 transition-transform duration-300" />
              <div className="text-4xl lg:text-5xl font-bold text-white mb-2">{properties}+</div>
              <div className="text-orange-200 font-medium text-lg lg:text-xl">Listed Properties</div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust & Quality Section */}
      <div className="w-full bg-slate-50 px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl p-6 lg:p-12 shadow-2xl border border-slate-100">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium tracking-wide uppercase mb-6">
                Why Choose Us
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4 flex items-center justify-center gap-3 flex-wrap">
                <Shield className="w-8 h-8 lg:w-10 lg:h-10 text-orange-600" />
                Why Choose Satyamsai Real Estate
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
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
                <div key={index} className="group bg-gradient-to-br from-slate-50 to-orange-50 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-slate-100">
                  <CheckCircle className="w-8 h-8 lg:w-10 lg:h-10 text-orange-600 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <p className="text-slate-700 font-semibold text-center leading-relaxed">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}