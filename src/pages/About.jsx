import { useEffect, useState } from "react";

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

  return (
    <section className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-blue-100 overflow-y-auto py-10 mt-28">
      <div className="w-full bg-white/95 rounded-4xl shadow-2xl px-2 md:px-16 py-12 flex flex-col">
        {/* Profile Image at the Top */}
        <div className="flex justify-center mb-8">
          <img
            src="/public/459902806_372615092587312_5139707910920786418_n.jpg"
            alt="Profile"
            className="w-48 h-48 rounded-full object-cover shadow-lg border-4 border-blue-200"
          />
        </div>

        {/* Our Company */}
        <div className="bg-blue-50 rounded-xl p-8 shadow hover:shadow-lg transition flex flex-col">
          <h2 className="text-4xl font-extrabold text-blue-800 mb-10 text-center tracking-tight">Our Company</h2>
          <h3 className="text-2xl font-semibold text-blue-700 mb-8 text-center">Who We Are</h3>
          <p className="text-gray-700 text-2xl md:text-3xl mb-4 text-center leading-relaxed">
            We believe that businesses should exist as part of a healthy community in order to serve that community.
            We provide our customers an ideal opportunity to make safe and secure long-term savings by owning a piece of land and thereby create true, long-term wealth for their families.
          </p>
        </div>

        {/* Responsibility */}
        <div className="bg-blue-50 rounded-xl p-8 shadow hover:shadow-lg transition flex flex-col">
          <h4 className="text-3xl font-semibold text-blue-700 mb-8 flex items-center gap-2">
            <svg className="w-7 h-7 text-blue-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 6v6l4 2" /></svg>
            Responsibility
          </h4>
          <ul className="list-disc list-inside text-gray-700 space-y-4 text-xl md:text-2xl">
            <li>Consult with clients on how to buy their Land quickly and for a good value</li>
            <li>Take clients on Land tours and attend open lands</li>
            <li>Advise clients throughout the negotiation process to help them get maximum value for their home</li>
            <li>Study your local real estate community and be knowledgeable on current land sales</li>
            <li>Advertise your realtor services to the local community through marketing materials and networking</li>
            <li>Maintain and update listings of available properties</li>
            <li>Obtain and maintain exclusive listings of your own</li>
            <li>Answer questions about contracts and terms of sale</li>
          </ul>
        </div>

        {/* Our Vision & Mission */}
        <div className="flex flex-col gap-6 justify-center">
          <img
            src="https://vmrdaproperties.in/wp-content/uploads/2020/02/estate-about-img-01.jpg"
            alt="About Company"
            className="rounded-xl shadow-lg object-cover w-full h-56 md:h-64"
          />
          <div className="bg-green-50 rounded-xl p-8 shadow hover:shadow-lg transition flex flex-col justify-center mt-4">
            <h4 className="text-3xl font-semibold text-green-700 mb-8 flex items-center gap-2">
              <svg className="w-7 h-7 text-green-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M13 16h-1v-4h-1m1-4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" /></svg>
              Our Vision & Mission
            </h4>
            <p className="text-gray-700 text-2xl md:text-3xl mt-4">
              Our vision is to have happy and satisfied clients who have had the opportunity to make safe and secure long-term savings by owning a piece of land and thereby creating true value, long-term wealth for their families.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-10 mt-8">
          <div className="flex flex-col items-center bg-blue-100 rounded-xl p-8 shadow hover:shadow-xl transition w-full md:w-1/3">
            <img src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80" alt="Plots Sold" className="w-20 h-20 rounded-full mb-4 object-cover shadow" />
            <span className="text-6xl font-extrabold text-blue-700 animate-pulse">{plots}+</span>
            <span className="text-gray-700 mt-4 font-medium text-2xl">Plots Sold</span>
          </div>
          <div className="flex flex-col items-center bg-green-100 rounded-xl p-8 shadow hover:shadow-xl transition w-full md:w-1/3">
            <img src="https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=400&q=80" alt="Satisfied Clients" className="w-20 h-20 rounded-full mb-4 object-cover shadow" />
            <span className="text-6xl font-extrabold text-green-700 animate-pulse">{clients}+</span>
            <span className="text-gray-700 mt-4 font-medium text-2xl">Satisfied Clients</span>
          </div>
          <div className="flex flex-col items-center bg-yellow-100 rounded-xl p-8 shadow hover:shadow-xl transition w-full md:w-1/3">
            <img src="https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=400&q=80" alt="Listed Properties" className="w-20 h-20 rounded-full mb-4 object-cover shadow" />
            <span className="text-6xl font-extrabold text-yellow-600 animate-pulse">{properties}+</span>
            <span className="text-gray-700 mt-4 font-medium text-2xl">Listed Properties</span>
          </div>
        </div>
        </div>
        </section>
  );
}