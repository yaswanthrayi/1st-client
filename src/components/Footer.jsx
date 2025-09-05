import React from 'react';

export default function Footer() {
  // Function to open PDF files
  const openProjectPDF = (projectName) => {
    const pdfMappings = {
      'Fortune Delight': '/Golden-Homes-2.pdf', // Fallback
      'Fortune SunShine City': '/Sunshine-City_1.pdf',
      'Fortune Legendary': '/Golden-Homes-2.pdf', // Fallback
      'Fortune Icon City': '/Golden-Homes-2.pdf', // Fallback
      'Fortune Home Town': '/Golden-Homes-2.pdf' // Fallback
    };
    
    const pdfPath = pdfMappings[projectName] || '/Golden-Homes-2.pdf';
    window.open(pdfPath, '_blank');
  };

  return (
    <footer className="bg-gradient-to-b from-amber-700 to-amber-800 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Company Description */}
        <div className="mb-8 text-center">
          <p className="text-lg leading-relaxed max-w-4xl mx-auto text-yellow-100 font-inter">
            Satyamsai Real Estate is a leading real estate firm dedicated to providing transparent, reliable, and professional real estate services in Vijayawada and surrounding areas.
          </p>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Office Address */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-yellow-300 font-heading">Office Address</h3>
            <div className="space-y-2 text-yellow-100 font-inter">
              <p>Satyamsai Real Estate</p>
              <p>No.1, H, No.14, P&T, Colony-3</p>
              <p>56-10-37, Road, near, Panta Kaluva Rd</p>
              <p>Patamata, Vijayawada</p>
              <p>Andhra Pradesh 520010</p>
              <p className="mt-4 font-semibold text-yellow-300">070328 36799</p>
              <a 
                href="mailto:satyamsairealestate@gmail.com" 
                className="text-yellow-300 hover:text-yellow-200 transition-colors duration-200"
              >
                satyamsairealestate@gmail.com
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-yellow-300 font-heading">Company</h3>
            <ul className="space-y-2">
              {['Home', 'About', 'Projects','Contact', 'Admin Panel'].map((item) => (
                <li key={item}>
                  <a 
                    href={item === 'Admin Panel' ? '/admin-login' : `/${item.toLowerCase()}`} 
                    className="text-yellow-100 hover:text-yellow-300 transition-colors duration-200 hover:underline font-inter"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Completed Projects */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-yellow-300 font-heading">Completed Projects</h3>
            <ul className="space-y-2">
              {[
                'Fortune Delight',
                'Fortune SunShine City',
                'Fortune Legendary',
                'Fortune Icon City',
                'Fortune Home Town'
              ].map((project) => (
                <li key={project}>
                  <button
                    onClick={() => openProjectPDF(project)}
                    className="text-yellow-100 hover:text-yellow-300 transition-colors duration-200 hover:underline font-inter text-left cursor-pointer bg-transparent border-none p-0"
                  >
                    {project}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-amber-600 my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-yellow-100">
              Copyright © {new Date().getFullYear()}, All Right Reserved Harivillu Projects
            </p>
          </div>
          
          <div className="flex space-x-6 text-sm">
            <a 
              href="/terms-conditions" 
              className="text-yellow-100 hover:text-yellow-300 transition-colors duration-200 hover:underline"
            >
              Terms & Conditions
            </a>
            <a 
              href="/privacy-policy" 
              className="text-yellow-100 hover:text-yellow-300 transition-colors duration-200 hover:underline"
            >
              Privacy & Policy
            </a>
          </div>
        </div>

        {/* Contact Icons/Social Media - Optional Enhancement */}
        <div className="mt-8 pt-6 border-t border-amber-600">
          <div className="flex justify-center space-x-6">
            <a 
              href="tel:+918341482547" 
              className="bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium"
            >
              Call Now
            </a>
            <a 
              href="mailto:harivilluventures@gmail.com" 
              className="bg-yellow-600 hover:bg-yellow-500 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium"
            >
              Email Us
            </a>
            <a 
              href="https://wa.me/918341482547" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
