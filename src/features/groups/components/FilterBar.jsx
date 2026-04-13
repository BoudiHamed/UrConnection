import { useState } from 'react';
import { COUNTRY_LIST, COUNTRIES_CITIES } from '../../../lib/countries';

const TOPICS = ['All', 'Programming', 'Language', 'Math', 'Science', 'Design', 'Business', 'Art'];

export default function FilterBar({ onSearch, onTopicChange, currentTopic, onCountryChange, onCityChange, currentCountry, currentCity }) {
  const [search, setSearch] = useState('');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    onSearch(value);
  };

  const availableCities = currentCountry ? COUNTRIES_CITIES[currentCountry] : [];

  const handleCountryChange = (e) => {
    onCountryChange(e.target.value);
    onCityChange(''); // reset city on country change
  };

  return (
    <div className="mb-10 space-y-5">
      {/* Search Input */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-500 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search groups by name or interest..."
          className="block w-full pl-14 pr-4 py-4 bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm focus:ring-4 focus:ring-indigo-50 dark:focus:ring-indigo-900/20 focus:border-indigo-500 dark:focus:border-indigo-400 outline-none transition-all placeholder:text-gray-400 dark:text-gray-100 font-medium"
          value={search}
          onChange={handleSearchChange}
        />
      </div>

      {/* Location Filters Row */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Country Select */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
            <span className="text-lg"></span>
          </div>
          <select
            className="w-full pl-11 pr-4 py-3.5 bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 rounded-2xl outline-none transition-all cursor-pointer focus:border-indigo-500 dark:focus:border-indigo-400 font-semibold text-gray-600 dark:text-gray-200 appearance-none"
            value={currentCountry}
            onChange={handleCountryChange}
          >
            <option value="" className="dark:bg-gray-900">All Countries</option>
            {COUNTRY_LIST.map((c) => (
              <option key={c} value={c} className="dark:bg-gray-900">{c}</option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* City Select */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
            <span className="text-lg"></span>
          </div>
          <select
            className={`w-full pl-11 pr-4 py-3.5 border-2 rounded-2xl outline-none transition-all appearance-none font-semibold ${
              !currentCountry
                ? 'bg-gray-50 dark:bg-gray-950 border-gray-100 dark:border-gray-900 text-gray-300 dark:text-gray-700 cursor-not-allowed'
                : 'bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 text-gray-600 dark:text-gray-200 cursor-pointer focus:border-indigo-500 dark:focus:border-indigo-400'
            }`}
            value={currentCity}
            disabled={!currentCountry}
            onChange={(e) => onCityChange(e.target.value)}
          >
            <option value="" className="dark:bg-gray-900">{currentCountry ? 'All Cities' : 'Select a country first'}</option>
            {availableCities.map((c) => (
              <option key={c} value={c} className="dark:bg-gray-900">{c}</option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Topic Pills */}
      <div className="flex flex-wrap gap-2">
        {TOPICS.map((topic) => (
          <button
            key={topic}
            onClick={() => onTopicChange(topic)}
            className={`px-5 py-2.5 rounded-xl text-sm font-black border-2 transition-all cursor-pointer transform active:scale-95 ${
              currentTopic === topic
                ? 'bg-indigo-600 border-indigo-600 text-white shadow-xl shadow-indigo-100 dark:shadow-none -translate-y-px'
                : 'bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 text-gray-400 dark:text-gray-500 hover:border-indigo-200 dark:hover:border-indigo-900 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50/30 dark:hover:bg-indigo-900/10'
            }`}
          >
            {topic}
          </button>
        ))}
      </div>

      <div className="h-px bg-gray-100 dark:bg-gray-800 w-full" />
    </div>
  );
}
