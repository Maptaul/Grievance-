import { useState } from "react";
import { useTranslation } from "react-i18next";
import locations from "../../public/locations.json";

const OfficeLocations = () => {
  const { t } = useTranslation();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const handleSelectLocation = (location) => {
    setDropdownOpen(false);
    setLoading(true);
    setTimeout(() => {
      setSelectedLocation(location);
      setLoading(false);
    }, 1000);
  };

  // Filter locations based on search
  const filteredLocations = locations.filter((location) =>
    t(`location.${location.name}`, { defaultValue: location.name })
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <section className="min-h-[70vh] pt-20 pb-8 text-center">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="font-black text-2xl mb-6">
          {t("office_locations_title")}
        </h1>

        {/* Dropdown */}
        <div className="relative w-fit mx-auto">
          <div
            onClick={() => setDropdownOpen(!isDropdownOpen)}
            className="cursor-pointer border-2 border-blue-600 px-6 py-2 rounded-full font-black bg-white"
          >
            {selectedLocation
              ? t(`location.${selectedLocation.name}`, {
                  defaultValue: selectedLocation.name,
                })
              : t("office_locations_select_placeholder")}
          </div>

          {isDropdownOpen && (
            <div className="absolute top-14 left-1/2 -translate-x-1/2 bg-white p-4 rounded-xl shadow-lg z-10 w-72 max-h-72 overflow-y-auto">
              {/* Search input */}
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t("office_locations_search_placeholder")}
                className="w-full mb-3 px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-center"
                autoFocus
              />
              <ul className="space-y-4">
                {filteredLocations.length === 0 ? (
                  <li className="text-gray-400 text-sm text-center">
                    {t("office_locations_no_locations_found")}
                  </li>
                ) : (
                  filteredLocations.map((location) => (
                    <li
                      key={location.id}
                      onClick={() => handleSelectLocation(location)}
                      className="cursor-pointer border-b border-gray-200 last:border-b-0 font-bold text-sm hover:text-blue-600 transition"
                    >
                      {t(`locations.${location.name}`, {
                        defaultValue: location.name,
                      })}
                    </li>
                  ))
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="mt-12">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-sm font-medium text-gray-600">
              {t("office_locations_loading")}
            </p>
          </div>
        )}

        {/* Location Details */}
        {!loading && selectedLocation && (
          <div className="mt-12 bg-white shadow-lg p-10 rounded-3xl">
            <h2 className="text-3xl font-bold mb-6">
              {t(`locations.${selectedLocation.name}`, {
                defaultValue: selectedLocation.name,
              })}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-[300px]">
                <img
                  src={selectedLocation.image}
                  alt={t(`locations.${selectedLocation.name}`, {
                    defaultValue: selectedLocation.name,
                  })}
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
