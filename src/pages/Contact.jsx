// Contact.jsx
import React, { useState } from "react";
import { Phone, Mail, MapPin, Send, User, MessageSquare, CheckCircle, AlertCircle } from "lucide-react";
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
      <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <rect x="3" y="5" width="18" height="14" rx="2" fill="#fef3c7" />
        <path d="M3 7l9 6 9-6" stroke="#d97706" strokeWidth="2" strokeLinejoin="round" />
      </svg>
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
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null

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
      // Reset form
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
      // Clear status after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-amber-50 to-yellow-50 overflow-x-hidden">
      {/* Hero Section */}
      <div className="w-full bg-gradient-to-r from-amber-600 to-yellow-500 px-6 py-16 text-center">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-8 drop-shadow-lg font-heading">Contact</h1>
          <p className="text-xl text-yellow-200 drop-shadow font-inter">
            Any questions, comments, suggestions or services related
            <br />
            You tell us, We listen!
          </p>
        </div>
      </div>

      {/* Contact Information Cards */}
      <div className="w-full bg-white px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Phone Numbers */}
            <div className="bg-gradient-to-br from-amber-100 to-yellow-100 rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Phone className="w-12 h-12 text-amber-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-amber-700 mb-4 font-heading">Phone Numbers</h3>
              <div className="space-y-2">
                <p className="text-gray-700 font-inter">
                  <a href="tel:+917032836799" className="text-amber-600 hover:text-amber-700 font-medium">
                    070328 36799
                  </a>
                </p>
              </div>
            </div>

            {/* Email Addresses */}
            <div className="bg-gradient-to-br from-amber-100 to-yellow-100 rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Mail className="w-12 h-12 text-amber-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-amber-700 mb-4 font-heading">Email Addresses</h3>
              <div className="space-y-2">
                <p className="text-gray-700 font-inter">
                  <a href="mailto:satyamsairealestate@gmail.com" className="text-amber-600 hover:text-amber-700 font-medium">
                    satyamsairealestate@gmail.com
                  </a>
                </p>
              </div>
            </div>

            {/* Office Address */}
            <div className="bg-gradient-to-br from-amber-100 to-yellow-100 rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
              <MapPin className="w-12 h-12 text-amber-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-amber-700 mb-4 font-heading">Office Address</h3>
              <div className="text-gray-700 leading-relaxed font-inter">
                <p className="font-semibold text-amber-700 mb-2">Satyamsai Real Estate</p>
                <p>No.1, H, No.14, P&T, Colony-3</p>
                <p>56-10-37, Road, near, Panta Kaluva Rd</p>
                <p>Patamata, Vijayawada</p>
                <p>Andhra Pradesh 520010</p>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-amber-700 mb-6 font-heading">Follow Us</h3>
            <div className="flex justify-center gap-6">
              {socialLinks.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="bg-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="w-full bg-gradient-to-br from-amber-100 to-yellow-100 px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-4xl font-bold text-amber-700 text-center mb-8 flex items-center justify-center gap-3 font-heading">
              <MessageSquare className="w-10 h-10 text-amber-600" />
              Make An Enquiry
            </h2>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-100 border border-green-400 rounded-lg flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-green-700 font-medium font-inter">Thank you for your enquiry! We will get back to you soon.</span>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-100 border border-red-400 rounded-lg flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <span className="text-red-700 font-medium font-inter">Sorry, there was an error submitting your form. Please try again.</span>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-600 w-5 h-5" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Name*"
                  className="w-full pl-12 pr-4 py-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-amber-50 text-amber-900 placeholder-amber-600"
                />
              </div>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-600 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Email*"
                  className="w-full pl-12 pr-4 py-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-amber-50 text-amber-900 placeholder-amber-600"
                />
              </div>

              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-600 w-5 h-5" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone"
                  className="w-full pl-12 pr-4 py-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-amber-50 text-amber-900 placeholder-amber-600"
                />
              </div>

              <div className="relative">
                <MessageSquare className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-600 w-5 h-5" />
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Subject"
                  className="w-full pl-12 pr-4 py-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-amber-50 text-amber-900 placeholder-amber-600"
                />
              </div>

              <div className="md:col-span-2 relative">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Message"
                  rows="5"
                  className="w-full p-4 border border-amber-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-amber-50 text-amber-900 placeholder-amber-600 resize-none"
                ></textarea>
              </div>

              <div className="md:col-span-2 text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-700 hover:to-yellow-600 text-white font-bold px-8 py-4 rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2 mx-auto disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 font-inter"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
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
      <div className="w-full flex justify-center py-16 px-4 bg-white">
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
};

export default Contact;