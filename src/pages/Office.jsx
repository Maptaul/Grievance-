import { useState } from "react";
import locations from "../../public/locations.json";

const OfficeLocations = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  return (
    <section className=" min-h-[70vh] pt-20 pb-8 text-center">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="font-black text-2xl mb-6">Select an Office Location</h1>

        {/* Dropdown */}
        <div className="relative w-fit mx-auto">
          <div
            onClick={() => setDropdownOpen(!isDropdownOpen)}
            className="cursor-pointer border-2 border-blue-600 px-6 py-2 rounded-full font-black bg-white"
          >
            {selectedLocation ? selectedLocation.name : "-- Select --"}
          </div>

          {isDropdownOpen && (
            <div className="absolute top-14 left-1/2 -translate-x-1/2 bg-white p-4 rounded-xl shadow-lg z-10 w-64 max-h-60 overflow-y-auto">
              <ul className="space-y-2">
                {locations.map((location) => (
                  <li
                    key={location.id}
                    onClick={() => {
                      setSelectedLocation(location);
                      setDropdownOpen(false);
                    }}
                    className="cursor-pointer border-b border-gray-200 last:border-b-0 font-bold text-sm hover:text-blue-600 transition"
                  >
                    {location.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Details */}
        {selectedLocation && (
          <div className="mt-12 bg-white shadow-lg p-10 rounded-3xl">
            <h2 className="text-3xl font-bold mb-6">{selectedLocation.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-[300px]">
                <img
                  src={selectedLocation.image}
                  alt={selectedLocation.name}
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
              <div className="h-[300px]">
                <iframe
                  src={selectedLocation.mapLink}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full rounded-2xl border-0"
                ></iframe>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default OfficeLocations;
