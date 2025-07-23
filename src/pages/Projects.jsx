const projectImages = [
  "/pr-1.jpg",
  "/pr-2.jpg",
  "/pr-3.jpg",
  "/pr-4.jpg",
  "/pr-5.jpg",
  "/pr-6.jpg",
  "/pr-7.jpg",
  "/pr-8.jpg",
  "/pr-9.jpg",
  "/pr-10.jpg",
  "/pr-11.jpg",
  "/pr-12.jpg",
];

const projectDescriptions = [
  "A premium gated community with lush green parks and modern amenities.",
  "Spacious plots located near the city’s fastest growing corridor.",
  "A serene residential enclave surrounded by nature and tranquility.",
  "Prime commercial land ideal for business and investment opportunities.",
  "Modern villas with contemporary architecture and landscaped gardens.",
  "Affordable plots with easy access to schools and hospitals.",
  "Luxury apartments offering panoramic views and top-class facilities.",
  "Eco-friendly township with rainwater harvesting and solar lighting.",
  "Plots with excellent connectivity to highways and public transport.",
  "Family-friendly community with playgrounds and walking tracks.",
  "Exclusive farmland for organic cultivation and weekend retreats.",
  "Ready-to-build sites with all approvals and clear documentation.",
];

export default function Projects() {
  return (
    <section className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-blue-100 pt-32 pb-16 px-0">
      <div className="w-full">
        {/* Highlighted Current Project */}
        <div className="mb-16 px-2 md:px-10">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-blue-600">
            <img
              src="/Current-pr.jpg"
              alt="Current Project"
              className="w-full h-80 object-cover"
            />
            <div className="absolute top-4 left-4 bg-blue-600 text-white px-6 py-2 rounded-full text-xl font-bold shadow-lg">
              Current Project
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-8 py-6">
              <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-2 drop-shadow">
                Ongoing Premium Venture
              </h3>
              <p className="text-lg md:text-2xl text-blue-100 drop-shadow">
                Discover our latest project, blending modern amenities with nature for the perfect investment and living experience.
              </p>
            </div>
          </div>
        </div>
        {/* Projects Grid */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-blue-800 mb-4 text-center tracking-tight">
          Our Projects
        </h2>
        <p className="text-lg md:text-2xl text-gray-600 mb-12 text-center">
          Explore our latest real estate projects. Each project is crafted with care, quality, and a vision for the future.
        </p>
  {/* Embedded Videos Section */}
<div className="mb-12 px-2 md:px-10">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    {/* Video 1 */}
    <div className="relative pb-[56.25%] h-0 rounded-2xl overflow-hidden shadow-xl border-4 border-blue-200">
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src="https://www.youtube.com/embed/UqVlilFyBgE"
        title="YouTube video 1"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>

    {/* Video 2 */}
    <div className="relative pb-[56.25%] h-0 rounded-2xl overflow-hidden shadow-xl border-4 border-blue-200">
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src="https://www.youtube.com/embed/rfI6MRoHaWE"
        title="YouTube video 2"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>

    {/* Video 3 */}
    <div className="relative pb-[56.25%] h-0 rounded-2xl overflow-hidden shadow-xl border-4 border-blue-200">
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src="https://www.youtube.com/embed/_DA7hIm5tJM"
        title="YouTube video 3"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>

    {/* Video 4 */}
    <div className="relative pb-[56.25%] h-0 rounded-2xl overflow-hidden shadow-xl border-4 border-blue-200">
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src="https://www.youtube.com/embed/--Cd2r4LEbM"
        title="YouTube video 4"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>

    {/* Video 5 */}
    <div className="relative pb-[56.25%] h-0 rounded-2xl overflow-hidden shadow-xl border-4 border-blue-200">
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src="https://www.youtube.com/embed/tww3iq5OtKU"
        title="YouTube video 5"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>

    {/* Video 6 */}
    <div className="relative pb-[56.25%] h-0 rounded-2xl overflow-hidden shadow-xl border-4 border-blue-200">
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src="https://www.youtube.com/embed/i7XiuqmUx9M"
        title="YouTube video 6"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>

    {/* Video 7 */}
    <div className="relative pb-[56.25%] h-0 rounded-2xl overflow-hidden shadow-xl border-4 border-blue-200">
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src="https://www.youtube.com/embed/hijFsJg9qoE"
        title="YouTube video 7"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>

    {/* Video 8 */}
    <div className="relative pb-[56.25%] h-0 rounded-2xl overflow-hidden shadow-xl border-4 border-blue-200">
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src="https://www.youtube.com/embed/y2scrZrjcKk"
        title="YouTube video 8"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  </div>
</div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-2 md:px-10">
          {projectImages.map((src, idx) => (
            <div
              key={src}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden group flex flex-col"
            >
              <div className="relative">
                <img
                  src={src}
                  alt={`Project ${idx + 1}`}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <span className="text-white text-xl font-semibold p-4">
                    Project {idx + 1}
                  </span>
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-end">
                <p className="text-gray-700 text-base md:text-lg">
                  {projectDescriptions[idx]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}