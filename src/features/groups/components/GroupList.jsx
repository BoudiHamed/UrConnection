import { useState, useEffect, useRef } from "react";
import { useGetGroups } from "../hooks/useGetGroups";
import { useUserLocation } from "../hooks/useUserLocation";
import GroupCard from "./GroupCard";
import FilterBar from "./FilterBar";

export default function GroupList() {
  const { data: groups, isLoading, error } = useGetGroups();
  const { country: detectedCountry, city: detectedCity, isDetecting } = useUserLocation();
  const hasAppliedLocation = useRef(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("All");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    if (!isDetecting && !hasAppliedLocation.current) {
      hasAppliedLocation.current = true;
      if (detectedCountry) {
        setSelectedCountry(detectedCountry);
        if (detectedCity) {
          setSelectedCity(detectedCity);
        }
      }
    }
  }, [isDetecting, detectedCountry, detectedCity]);

  if (isLoading)
    return (
      <div className="flex justify-center p-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 dark:border-indigo-400"></div>
      </div>
    );

  if (error)
    return (
      <div className="bg-red-50 dark:bg-red-950/20 p-4 rounded-lg text-red-700 dark:text-red-400 text-center border border-red-100 dark:border-red-900/50">
        Error loading groups: {error.message}
      </div>
    );

  const filteredGroups = groups?.filter((group) => {
    const matchesSearch =
      group.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTopic =
      selectedTopic === "All" ||
      group.topic.toLowerCase() === selectedTopic.toLowerCase();

    const matchesCountry =
      !selectedCountry ||
      (group.country || "").toLowerCase() === selectedCountry.toLowerCase();

    const matchesCity =
      !selectedCity ||
      (group.city || "").toLowerCase() === selectedCity.toLowerCase();

    return matchesSearch && matchesTopic && matchesCountry && matchesCity;
  });

  const hasActiveFilters = searchQuery || selectedTopic !== "All" || selectedCountry || selectedCity;

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedTopic("All");
    setSelectedCountry("");
    setSelectedCity("");
  };

  return (
    <>
      <FilterBar
        onSearch={setSearchQuery}
        onTopicChange={setSelectedTopic}
        currentTopic={selectedTopic}
        onCountryChange={setSelectedCountry}
        onCityChange={setSelectedCity}
        currentCountry={selectedCountry}
        currentCity={selectedCity}
      />

      {(hasActiveFilters || isDetecting) && (
        <div className="flex flex-wrap gap-2 mb-6 items-center">
          <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Active:</span>
          {isDetecting && (
            <span className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-black px-3 py-1.5 rounded-lg border border-blue-100 dark:border-blue-800">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Detecting Location...
            </span>
          )}
          {searchQuery && (
            <span className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs font-black px-3 py-1.5 rounded-lg border border-indigo-100 dark:border-indigo-800">
              "{searchQuery}"
            </span>
          )}
          {selectedTopic !== "All" && (
            <span className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs font-black px-3 py-1.5 rounded-lg border border-indigo-100 dark:border-indigo-800">
              {selectedTopic}
            </span>
          )}
          {selectedCountry && (
            <span className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs font-black px-3 py-1.5 rounded-lg border border-indigo-100 dark:border-indigo-800">
               {selectedCountry}
            </span>
          )}
          {selectedCity && (
            <span className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs font-black px-3 py-1.5 rounded-lg border border-indigo-100 dark:border-indigo-800">
               {selectedCity}
            </span>
          )}
          <button
            onClick={handleClearFilters}
            className="text-xs font-bold text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition-colors cursor-pointer ml-1"
          >
            ✕ Clear all
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGroups?.map((group) => (
          <GroupCard key={group.id} group={group} />
        ))}
        {filteredGroups?.length === 0 && (
          <div className="col-span-full text-center py-20 bg-gray-50 dark:bg-gray-900/50 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-800">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-gray-400 dark:text-gray-500 text-lg font-medium">
              No groups match your filters.
            </p>
            <button
              onClick={handleClearFilters}
              className="mt-4 text-indigo-600 dark:text-indigo-400 font-bold hover:underline cursor-pointer"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </>
  );
}
