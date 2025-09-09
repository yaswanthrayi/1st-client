import React, { useState } from "react";
import { Phone, Mail, MapPin, Send, User, MessageSquare, CheckCircle, AlertCircle, Star, Building, Clock, Users } from "lucide-react";
import { supabase } from '../lib/supabase';

const socialLinks = [
  {
    href: "https://www.facebook.com/profile.php?id=100095164723612&rdid=KxrLPlFeABzo7llR&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1AsYP3GM4p%2F#",
    label: "Facebook",
    icon: (
      <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 5 3.657 9.127 8.438 9.877v-6.987h-2.54v-2.89h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.632.771-1.632 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.343 21.127 22 17 22 12"/>
      </svg>
    ),
  },
  {
    href: "https://www.instagram.com/satyamsairealestate",
    label: "Instagram",
    icon: (
      <svg className="w-6 h-6 text-pink-600" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  {
    href: "https://www.youtube.com/@satyamsairealestate?si=I7qTVjasMTy7qiNp",
    label: "YouTube",
    icon: (
      <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 24 24">
        <path d="M21.8 8.001a2.752 2.752 0 0 0-1.94-1.94C18.07 6 12 6 12 6s-6.07 0-7.86.061A2.752 2.752 0 0 0 2.2 8.001C2 9.79 2 12 2 12s0 2.21.2 3.999a2.752 2.752 0 0 0 1.94 1.94C5.93 18 12 18 12 18s6.07 0 7.86-.061a2.752 2.752 0 0 0 1.94-1.94C22 14.21 22 12 22 12s0-2.21-.2-3.999zM10 15.5v-7l6 3.5-6 3.5z"/>
      </svg>
    ),
  },
  {
    href: "mailto:satyamsairealestate@gmail.com",
    label: "Email",
    icon: (
      <Mail className="w-6 h-6 text-orange-600" />
    ),
  },
  {
    href: "https://wa.me/917032836799",
    label: "WhatsApp",
    icon: (
      <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.52 3.48A11.93 11.93 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.6 5.97L0 24l6.18-1.62A11.93 11.93 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52zM12 22c-1.85 0-3.67-.5-5.24-1.44l-.37-.22-3.67.96.98-3.58-.24-.37A9.93 9.93 0 1 1 12 22zm5.2-7.6c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.43-2.25-1.38-.83-.74-1.39-1.65-1.56-1.93-.16-.28-.02-.43.12-.57.12-.12.28-.32.42-.48.14-.16.18-.28.28-.46.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47-.16-.01-.34-.01-.52-.01-.18 0-.48.07-.73.34-.25.28-.97.95-.97 2.3 0 1.35.99 2.65 1.13 2.83.14.18 1.95 2.98 4.74 4.06.66.28 1.18.45 1.58.58.66.21 1.26.18 1.73.11.53-.08 1.65-.67 1.88-1.32.23-.65.23-1.21.16-1.32-.07-.11-.25-.18-.53-.32z"/>
      </svg>
    ),
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      console.log('Submitting form data:', formData);
      
      const { data, error } = await supabase
        .from('form')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            subject: formData.subject,
            message: formData.message
          }
        ]);

      console.log('Supabase insert response:', { data, error });

      if (error) {
        throw error;
      }

      console.log('Form submitted successfully');
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }
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
              <MessageSquare className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight drop-shadow-2xl">
              Contact Us
            </h1>
          </div>
          <p className="text-lg sm:text-xl md:text-2xl text-orange-100 max-w-4xl mx-auto leading-relaxed mb-8 drop-shadow-lg">
            Any questions, comments, suggestions or services related - You tell us, We listen!
          </p>
          <div className="flex items-center justify-center gap-2 text-orange-200">
            <Star className="w-5 h-5 fill-current" />
            <span className="text-lg font-medium">Your Premier Real Estate Partner</span>
            <Star className="w-5 h-5 fill-current" />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-10 mb-16 relative z-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[
            { label: 'Happy Clients', value: '500+', icon: Users },
            { label: 'Years Experience', value: '10+', icon: Clock },
            { label: 'Projects Completed', value: '15+', icon: Building },
            { label: 'Support 24/7', value: '365', icon: Phone }
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

      {/* Contact Information Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-16 sm:mb-20">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-orange-800 mb-6 tracking-tight">
            Get In Touch
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Reach out to us through any of these channels. We're here to assist you with all your real estate needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Phone Numbers */}
          <div className="group">
            <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-orange-100 transform hover:-translate-y-2">
              <div className="bg-gradient-to-br from-orange-600 to-orange-700 p-6 text-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 w-fit mx-auto mb-4 shadow-lg">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Phone Numbers</h3>
                <p className="text-orange-100 text-sm sm:text-base">Call us anytime</p>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  <a 
                    href="tel:+917032836799" 
                    className="flex items-center justify-center gap-3 text-orange-600 hover:text-orange-700 font-semibold text-lg transition-colors duration-200 bg-orange-50 hover:bg-orange-100 rounded-xl py-3 px-4"
                  >
                    <Phone className="w-5 h-5" />
                    070328 36799
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Email Addresses */}
          <div className="group">
            <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-orange-100 transform hover:-translate-y-2">
              <div className="bg-gradient-to-br from-orange-600 to-orange-700 p-6 text-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 w-fit mx-auto mb-4 shadow-lg">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Email Address</h3>
                <p className="text-orange-100 text-sm sm:text-base">Send us a message</p>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  <a 
                    href="mailto:satyamsairealestate@gmail.com" 
                    className="flex items-center justify-center gap-3 text-orange-600 hover:text-orange-700 font-semibold transition-colors duration-200 bg-orange-50 hover:bg-orange-100 rounded-xl py-3 px-4 text-center break-all"
                  >
                    <Mail className="w-5 h-5 flex-shrink-0" />
                    <span className="text-sm sm:text-base">satyamsairealestate@gmail.com</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Office Address */}
          <div className="group md:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-orange-100 transform hover:-translate-y-2">
              <div className="bg-gradient-to-br from-orange-600 to-orange-700 p-6 text-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 w-fit mx-auto mb-4 shadow-lg">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Office Address</h3>
                <p className="text-orange-100 text-sm sm:text-base">Visit us today</p>
              </div>
              <div className="p-6">
                <div className="text-gray-700 leading-relaxed text-center space-y-2">
                  <p className="font-semibold text-orange-700 text-lg">Satyamsai Real Estate</p>
                  <div className="text-sm sm:text-base space-y-1">
                    <p>No.1, H, No.14, P&T, Colony-3</p>
                    <p>56-10-37, Road, near, Panta Kaluva Rd</p>
                    <p>Patamata, Vijayawada</p>
                    <p className="font-medium text-orange-700">Andhra Pradesh 520010</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-16 sm:mb-20">
        <div className="text-center mb-8 sm:mb-12">
          <h3 className="text-2xl sm:text-3xl font-bold text-orange-800 mb-4">Follow Us</h3>
          <p className="text-gray-600 text-base sm:text-lg">Stay connected with us on social media for updates and property listings</p>
        </div>
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
          {socialLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="bg-white p-4 sm:p-5 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 border border-orange-100 group"
            >
              <div className="group-hover:scale-110 transition-transform duration-200">
                {link.icon}
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Contact Form */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-16 sm:mb-20">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-orange-100">
          {/* Form Header */}
          <div className="bg-gradient-to-br from-orange-800 via-orange-700 to-amber-800 px-6 sm:px-8 py-8 sm:py-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute inset-0 opacity-10">
              <div className="w-full h-full bg-white/20 bg-[radial-gradient(circle_at_75%_25%,rgba(255,255,255,0.3)_2px,transparent_2px)] bg-[length:40px_40px]"></div>
            </div>
            <div className="relative z-10">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 w-fit mx-auto mb-6 shadow-xl">
                <MessageSquare className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 drop-shadow-lg">
                Make An Enquiry
              </h2>
              <p className="text-lg sm:text-xl text-orange-100 max-w-3xl mx-auto leading-relaxed drop-shadow">
                Ready to find your dream property? Fill out the form below and we'll get back to you within 24 hours.
              </p>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6 sm:p-8 lg:p-12">
            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="mb-6 sm:mb-8 p-4 sm:p-6 bg-green-50 border-2 border-green-200 rounded-2xl flex items-center gap-3 shadow-lg">
                <div className="bg-green-500 rounded-full p-2">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-green-800 text-lg">Thank you for your enquiry!</h4>
                  <p className="text-green-700">We will get back to you within 24 hours.</p>
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-6 sm:mb-8 p-4 sm:p-6 bg-red-50 border-2 border-red-200 rounded-2xl flex items-center gap-3 shadow-lg">
                <div className="bg-red-500 rounded-full p-2">
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-red-800 text-lg">Oops! Something went wrong</h4>
                  <p className="text-red-700">Please try submitting the form again.</p>
                </div>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative group">
                  <label htmlFor="name" className="block text-sm font-semibold text-orange-800 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-500 w-5 h-5 group-focus-within:text-orange-600 transition-colors" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your full name"
                      className="w-full pl-12 pr-4 py-4 border-2 border-orange-200 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-orange-50/50 text-gray-900 placeholder-orange-400 transition-all duration-300 hover:border-orange-300"
                    />
                  </div>
                </div>

                <div className="relative group">
                  <label htmlFor="email" className="block text-sm font-semibold text-orange-800 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-500 w-5 h-5 group-focus-within:text-orange-600 transition-colors" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your email address"
                      className="w-full pl-12 pr-4 py-4 border-2 border-orange-200 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-orange-50/50 text-gray-900 placeholder-orange-400 transition-all duration-300 hover:border-orange-300"
                    />
                  </div>
                </div>

                <div className="relative group">
                  <label htmlFor="phone" className="block text-sm font-semibold text-orange-800 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-500 w-5 h-5 group-focus-within:text-orange-600 transition-colors" />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                      className="w-full pl-12 pr-4 py-4 border-2 border-orange-200 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-orange-50/50 text-gray-900 placeholder-orange-400 transition-all duration-300 hover:border-orange-300"
                    />
                  </div>
                </div>

                <div className="relative group">
                  <label htmlFor="subject" className="block text-sm font-semibold text-orange-800 mb-2">
                    Subject
                  </label>
                  <div className="relative">
                    <Star className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-500 w-5 h-5 group-focus-within:text-orange-600 transition-colors" />
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="What can we help you with?"
                      className="w-full pl-12 pr-4 py-4 border-2 border-orange-200 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-orange-50/50 text-gray-900 placeholder-orange-400 transition-all duration-300 hover:border-orange-300"
                    />
                  </div>
                </div>
              </div>

              <div className="relative group">
                <label htmlFor="message" className="block text-sm font-semibold text-orange-800 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us more about your requirements..."
                  rows="6"
                  className="w-full p-4 border-2 border-orange-200 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-orange-50/50 text-gray-900 placeholder-orange-400 resize-none transition-all duration-300 hover:border-orange-300"
                ></textarea>
              </div>

              <div className="text-center pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-bold px-8 sm:px-12 py-4 sm:py-5 rounded-2xl text-lg sm:text-xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 flex items-center justify-center gap-3 mx-auto disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 min-w-[200px]"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-6 h-6" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Google Map */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-16 sm:mb-20">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-orange-800 mb-4">Visit Our Location</h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Come visit our office for a personal consultation and explore investment opportunities in person.
          </p>
        </div>
        
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-orange-100 p-2">
          <iframe
            title="Satyamsai Real Estate Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.026216861471!2d80.5935817!3d16.4961363!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35fb8754410227%3A0x4bcbbfa3f0318a26!2sSatyamsai%20Real%20Estate!5e0!3m2!1sen!2sin!4v1721720000000!5m2!1sen!2sin"
            width="100%"
            height="400"
            style={{
              border: 0,
              borderRadius: "1.5rem",
            }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="shadow-lg"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;