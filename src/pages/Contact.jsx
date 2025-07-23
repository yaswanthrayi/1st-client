// Contact.jsx
import React from "react";

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
      <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <rect x="3" y="5" width="18" height="14" rx="2" fill="#e0e7ff" />
        <path d="M3 7l9 6 9-6" stroke="#2563eb" strokeWidth="2" strokeLinejoin="round" />
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
  return (
    <section className="min-h-screen w-full bg-gradient-to-br from-blue-100 via-white to-blue-200 flex flex-col mt-32 pb-16 px-0">
      <div className="w-full flex flex-col items-center justify-start">
                {/* Profile Photo */}
        <div className="flex justify-center mt-8 mb-4">
          <img
            src="/sai.jpg"
            alt="Profile"
            className="w-62 h-62 rounded-full object-cover border-4 border-blue-300 shadow-lg"
          />
        </div>
        <div className="w-full bg-white/95 rounded-none shadow-none p-0 border-0">
          <h2 className="text-4xl md:text-5xl font-extrabold text-blue-800 mb-4 text-center tracking-tight">
            Contact Us
          </h2>
          <p className="text-lg md:text-xl text-gray-700 mb-2 text-center">
            Any questions, comments, suggestions or services related<br />
            You tell us, We listen!
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
            <div className="bg-blue-50 rounded-2xl shadow p-6 w-full max-w-md">
              <h3 className="text-2xl font-bold text-blue-700 mb-2">Contact Info</h3>
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">Number:</span> <a href="tel:+917032836799" className="text-blue-600 hover:underline">+91 70328 36799</a>
              </p>
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">Address:</span><br />
                No.1, H, No.14, P&amp;T, Colony-3, 56-10-37, Road, near, Panta Kaluva Rd,<br />
                Patamata, Vijayawada, Andhra Pradesh 520010
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Email:</span> <a href="mailto:satyamsaiairealestate@gmail.com" className="text-blue-600 hover:underline">satyamsairealestate@gmail.com</a>
              </p>
              <div className="flex gap-4 mt-4 justify-center">
                {socialLinks.map(link => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="hover:scale-110 transition-transform"
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
          {/* Mail icon before the Google Form */}
          <div className="flex justify-center mb-6">
            <svg className="w-20 h-20 text-blue-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 48 48">
              <rect x="6" y="12" width="36" height="24" rx="4" fill="#e0e7ff" />
              <path d="M6 16l18 13L42 16" stroke="#2563eb" strokeWidth="2" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="w-full flex justify-center mb-10">
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSccICcCwNmuQcB59FbC2i0BNkKXPzk9ePAj_wPDDXp8s7cGLw/viewform?embedded=true"
              width="100%"
              height="700"
              frameBorder="0"
              marginHeight="0"
              marginWidth="0"
              title="Contact Form"
              className="rounded-xl border-2 border-blue-200 shadow w-full bg-white"
              style={{ minWidth: "100vw", maxWidth: "100vw", display: "block", margin: "0", padding: "0" }}
            >
              Loading…
            </iframe>
          </div>
          {/* Google Map Embed */}
          <div className="w-full flex justify-center">
            <iframe
              title="Satyamsai Real Estate Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.026216861471!2d80.5935817!3d16.4961363!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35fb8754410227%3A0x4bcbbfa3f0318a26!2sSatyamsai%20Real%20Estate!5e0!3m2!1sen!2sin!4v1721720000000!5m2!1sen!2sin"
              width="100%"
              height="350"
              style={{ border: 0, borderRadius: "1rem", minWidth: "300px", maxWidth: "1000px" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="shadow-lg mx-auto"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Contact;