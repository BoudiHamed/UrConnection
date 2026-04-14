import { useState, useEffect } from 'react';
import { COUNTRIES_CITIES } from '../../../lib/countries';

const LOCATION_STORAGE_KEY = 'ur_connections_user_location';

/**
 * Tries to find a matching country name from our COUNTRIES_CITIES map.
 * Handles common discrepancies between API names and our stored names.
 */
function findMatchingCountry(apiCountry) {
  if (!apiCountry) return '';

  // Direct match
  if (COUNTRIES_CITIES[apiCountry]) return apiCountry;

  // Common API-to-local name mappings
  const aliases = {
    'United States of America': 'United States',
    'USA': 'United States',
    'US': 'United States',
    'UK': 'United Kingdom',
    'Great Britain': 'United Kingdom',
    'Republic of Korea': 'South Korea',
    'Korea': 'South Korea',
    'Czechia': 'Czechia',
    'Czech Republic': 'Czechia',
    'Côte d\'Ivoire': 'Ivory Coast',
    'Cote d\'Ivoire': 'Ivory Coast',
    'Bosnia & Herzegovina': 'Bosnia and Herzegovina',
    'UAE': 'United Arab Emirates',
  };

  if (aliases[apiCountry]) return aliases[apiCountry];

  // Case-insensitive partial match
  const lowerApi = apiCountry.toLowerCase();
  const match = Object.keys(COUNTRIES_CITIES).find(
    (c) => c.toLowerCase() === lowerApi
  );
  return match || '';
}

/**
 * Tries to find a matching city within the country's city list.
 */
function findMatchingCity(country, apiCity) {
  if (!country || !apiCity || !COUNTRIES_CITIES[country]) return '';

  const cities = COUNTRIES_CITIES[country];

  // Direct match
  if (cities.includes(apiCity)) return apiCity;

  // Case-insensitive match
  const lowerApi = apiCity.toLowerCase();
  const match = cities.find((c) => c.toLowerCase() === lowerApi);
  return match || '';
}

/**
 * Custom hook that detects the user's country and city on first visit.
 * 
 * Strategy:
 * 1. Check localStorage for a cached result first (avoids repeated API calls).
 * 2. If not cached, try the IP-based geolocation API (no permissions needed).
 * 3. Cache the result in localStorage.
 * 
 * Returns: { country, city, isDetecting }
 */
export function useUserLocation() {
  const [location, setLocation] = useState({ country: '', city: '' });
  const [isDetecting, setIsDetecting] = useState(true);

  useEffect(() => {
    // Check if we already have a cached location
    try {
      const cached = localStorage.getItem(LOCATION_STORAGE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        setLocation(parsed);
        setIsDetecting(false);
        return;
      }
    } catch {
      // Ignore parse errors
    }

    // Use IP-based geolocation (no permission prompt needed)
    const detectLocation = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/', {
          signal: AbortSignal.timeout(5000), // 5s timeout
        });

        if (!response.ok) throw new Error('API request failed');

        const data = await response.json();

        const country = findMatchingCountry(data.country_name);
        const city = findMatchingCity(country, data.city);

        const result = { country, city };

        // Cache for future visits
        localStorage.setItem(LOCATION_STORAGE_KEY, JSON.stringify(result));

        setLocation(result);
      } catch {
        // Silently fail — filters will just stay empty
        setLocation({ country: '', city: '' });
      } finally {
        setIsDetecting(false);
      }
    };

    detectLocation();
  }, []);

  return { ...location, isDetecting };
}
